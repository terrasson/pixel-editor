// Database Service for Pixel Art Projects
// This module handles all database operations with Supabase

// Converts [{color, isEmpty}] → ['#RRGGBB' | ''] for compact DB storage.
// normaliseFrames/normalisePixel in script.js handles the reverse on load.
function _compressFrames(frames) {
    if (!Array.isArray(frames)) return frames;
    return frames.map(frame => {
        if (!Array.isArray(frame)) return frame;
        return frame.map(p => (p && !p.isEmpty && p.color) ? p.color : '');
    });
}

class DatabaseService {
    constructor() {
        this.supabase = null;
    }

    // Initialize database service
    init() {
        if (!window.authService || !window.authService.getClient()) {
            console.error('Auth service not initialized');
            return false;
        }

        this.supabase = window.authService.getClient();
        return true;
    }

    // Get current user ID
    getUserId() {
        return window.authService?.getUserId();
    }

    // Upload Storage avec un timeout strict (évite de bloquer trop longtemps sur NANO)
    async _uploadWithTimeout(bucket, path, blob, contentType, timeoutMs = 8000) {
        const upload = this.supabase.storage
            .from(bucket)
            .upload(path, blob, { upsert: true, contentType });
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('upload timeout')), timeoutMs)
        );
        try {
            const { error } = await Promise.race([upload, timeout]);
            return { success: !error };
        } catch (e) {
            return { success: false, error: e };
        }
    }

    // Save a project (create or update)
    async saveProject(projectData, onProgress = null) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { name, frames, frameLayers, _nextLayerId, currentFrame, fps, customPalette, customColors, thumbnail } = projectData;
            const safeName = name.replace(/[^a-z0-9]/gi, '_');

            onProgress?.('storage');

            const compressedFrames = _compressFrames(frames);
            const framesJson = JSON.stringify(compressedFrames);
            const layersJson = frameLayers && Array.isArray(frameLayers) && frameLayers.length > 0
                ? JSON.stringify(frameLayers) : null;

            // Upload vers Storage seulement si les données dépassent 20 Ko
            // En-dessous, on stocke directement en JSONB (plus simple, moins de bandwidth)
            const shouldUseStorage = framesJson.length > 20000 || (layersJson && layersJson.length > 20000);

            let framesForDb = compressedFrames;
            let frameLayersForDb = null;

            if (shouldUseStorage) {
                const framesPath = `${userId}/${safeName}_frames.json`;
                const layersPath = `${userId}/${safeName}_layers.json`;
                const framesBlob = new Blob([framesJson], { type: 'application/json' }); // framesJson already compressed
                const layersBlob = layersJson ? new Blob([layersJson], { type: 'application/json' }) : null;

                const [framesResult, layersResult] = await Promise.all([
                    this._uploadWithTimeout('thumbnails', framesPath, framesBlob, 'application/json', 15000),
                    layersBlob
                        ? this._uploadWithTimeout('thumbnails', layersPath, layersBlob, 'application/json', 15000)
                        : Promise.resolve({ success: true })
                ]);

                if (framesResult.success) {
                    const { data: framesUrlData } = this.supabase.storage.from('thumbnails').getPublicUrl(framesPath);
                    if (framesUrlData?.publicUrl) framesForDb = { _url: framesUrlData.publicUrl };
                } else {
                    console.warn('⚠️ Storage upload échoué — frames stockées inline en DB');
                }

                if (layersBlob && layersResult.success) {
                    const { data: layersUrlData } = this.supabase.storage.from('thumbnails').getPublicUrl(layersPath);
                    if (layersUrlData?.publicUrl) frameLayersForDb = { _url: layersUrlData.publicUrl };
                } else if (frameLayers) {
                    frameLayersForDb = frameLayers;
                }
            } else if (frameLayers) {
                frameLayersForDb = frameLayers;
            }

            // Upload thumbnail en arrière-plan (non-bloquant)
            let thumbnailUrl = (thumbnail && !thumbnail.startsWith('data:')) ? thumbnail : null;
            if (thumbnail && thumbnail.startsWith('data:')) {
                fetch(thumbnail).then(r => r.blob()).then(blob => {
                    this._uploadWithTimeout('thumbnails', `${userId}/${safeName}.png`, blob, 'image/png', 7000)
                        .then(({ success }) => {
                            if (success) {
                                const { data: urlData } = this.supabase.storage
                                    .from('thumbnails').getPublicUrl(`${userId}/${safeName}.png`);
                                if (urlData?.publicUrl) thumbnailUrl = urlData.publicUrl;
                            }
                        }).catch(() => {});
                }).catch(() => {});
            }

            onProgress?.('database');

            const payload = {
                frames: framesForDb,
                frame_layers: frameLayersForDb,
                next_layer_id: _nextLayerId ?? 0,
                current_frame: currentFrame,
                fps: fps || 24,
                custom_palette: customPalette,
                custom_colors: customColors ?? null,
                updated_at: new Date().toISOString()
            };
            // Ne mettre à jour thumbnail que si on en a une — évite d'écraser l'existante avec null
            if (thumbnailUrl) payload.thumbnail = thumbnailUrl;

            // Helper : exécute une requête Supabase avec timeout strict
            const withDbTimeout = (query, ms = 10000) => Promise.race([
                query,
                new Promise((_, reject) => setTimeout(() => reject(new Error('DB timeout')), ms))
            ]);

            // Try upsert first (requires unique constraint on user_id+name)
            // Falls back to SELECT+INSERT/UPDATE if constraint doesn't exist yet
            try {
                const { data, error } = await withDbTimeout(
                    this.supabase
                        .from('pixel_projects')
                        .upsert({ user_id: userId, name, ...payload }, { onConflict: 'user_id,name' })
                        .select('id')
                        .single()
                );
                if (error) throw error;
                return { success: true, data, isUpdate: true, layersDropped: false };
            } catch (upsertError) {
                if (upsertError.message === 'DB timeout') throw upsertError;
                // Fallback: unique constraint not yet added → SELECT + INSERT/UPDATE
                const { data: existing } = await withDbTimeout(
                    this.supabase
                        .from('pixel_projects')
                        .select('id')
                        .eq('user_id', userId)
                        .eq('name', name)
                        .maybeSingle()
                );

                if (existing) {
                    const { data, error } = await withDbTimeout(
                        this.supabase
                            .from('pixel_projects')
                            .update(payload)
                            .eq('id', existing.id)
                            .select('id')
                            .single()
                    );
                    if (error) throw error;
                    return { success: true, data, isUpdate: true, layersDropped: false };
                } else {
                    const { data, error } = await withDbTimeout(
                        this.supabase
                            .from('pixel_projects')
                            .insert({ user_id: userId, name, ...payload })
                            .select('id')
                            .single()
                    );
                    if (error) throw error;
                    return { success: true, data, isUpdate: false, layersDropped: false };
                }
            }
        } catch (error) {
            console.error('Save project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Load a project by name
    async loadProject(projectName) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('pixel_projects')
                .select('*')
                .eq('user_id', userId)
                .eq('name', projectName)
                .single();

            if (error) throw error;

            // Si les frames sont dans Storage (pointer { _url }), les récupérer
            if (data?.frames?._url) {
                try {
                    const resp = await fetch(data.frames._url);
                    if (resp.ok) {
                        data.frames = await resp.json();
                    }
                } catch (e) {
                    console.warn('Failed to fetch frames from Storage:', e);
                    data.frames = null;
                }
            }

            // Si les calques sont stockés dans Storage (pointer { _url }), les récupérer
            if (data?.frame_layers?._url) {
                try {
                    const resp = await fetch(data.frame_layers._url);
                    if (resp.ok) {
                        data.frame_layers = await resp.json();
                    }
                } catch (e) {
                    console.warn('Failed to fetch layers from Storage:', e);
                    data.frame_layers = null;
                }
            }

            return { success: true, data };
        } catch (error) {
            console.error('Load project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all projects for current user (avec cache TTL 30s)
    async getAllProjects({ forceRefresh = false } = {}) {
        if (!this.supabase) this.init();

        const userId = this.getUserId();
        if (!userId) return { success: false, error: 'User not authenticated' };

        const now = Date.now();
        if (!forceRefresh && this._projectsCache && this._projectsCacheUser === userId && (now - this._projectsCacheTime) < 30000) {
            return { success: true, data: this._projectsCache };
        }

        try {
            // Ne charger que les métadonnées — pas les frames (trop lourd)
            // Les frames sont chargées à la demande dans loadProject()
            const { data, error } = await this.supabase
                .from('pixel_projects')
                .select('id, name, thumbnail, created_at, updated_at, fps, current_frame, custom_colors')
                .eq('user_id', userId)
                .order('updated_at', { ascending: false })
                .limit(50);

            if (error) throw error;

            this._projectsCache = data;
            this._projectsCacheUser = userId;
            this._projectsCacheTime = now;

            return { success: true, data };
        } catch (error) {
            console.error('Get all projects error:', error);
            return { success: false, error: error.message };
        }
    }

    // Invalider le cache projets (à appeler après save/delete)
    invalidateProjectsCache() {
        this._projectsCache = null;
        this._projectsCacheTime = 0;
    }

    // Delete a project
    async deleteProject(projectName) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { error } = await this.supabase
                .from('pixel_projects')
                .delete()
                .eq('user_id', userId)
                .eq('name', projectName);

            if (error) throw error;

            // Nettoyage Storage (fire-and-forget)
            const safeName = projectName.replace(/[^a-z0-9]/gi, '_');
            this.supabase.storage.from('thumbnails').remove([
                `${userId}/${safeName}_frames.json`,
                `${userId}/${safeName}_layers.json`,
                `${userId}/${safeName}.png`
            ]).catch(() => {});

            return { success: true };
        } catch (error) {
            console.error('Delete project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete a project by ID
    async deleteProjectById(projectId) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Récupérer le nom pour pouvoir nettoyer le Storage
            const { data: proj } = await this.supabase
                .from('pixel_projects')
                .select('name')
                .eq('id', projectId)
                .eq('user_id', userId)
                .single();

            const { error } = await this.supabase
                .from('pixel_projects')
                .delete()
                .eq('id', projectId)
                .eq('user_id', userId);

            if (error) throw error;

            // Nettoyage Storage (fire-and-forget)
            if (proj?.name) {
                const safeName = proj.name.replace(/[^a-z0-9]/gi, '_');
                this.supabase.storage.from('thumbnails').remove([
                    `${userId}/${safeName}_frames.json`,
                    `${userId}/${safeName}_layers.json`,
                    `${userId}/${safeName}.png`
                ]).catch(() => {});
            }

            return { success: true };
        } catch (error) {
            console.error('Delete project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get project count for current user
    async getProjectCount() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { count, error } = await this.supabase
                .from('pixel_projects')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            if (error) throw error;

            return { success: true, count };
        } catch (error) {
            console.error('Get project count error:', error);
            return { success: false, error: error.message };
        }
    }

    // Save user preferences
    async savePreferences(preferences) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Upsert (insert or update)
            const { data, error } = await this.supabase
                .from('user_preferences')
                .upsert({
                    user_id: userId,
                    ...preferences
                })
                .select()
                .single();

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Save preferences error:', error);
            return { success: false, error: error.message };
        }
    }

    // Load user preferences
    async loadPreferences() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('user_preferences')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                // If no preferences exist, return defaults
                if (error.code === 'PGRST116') {
                    return { success: true, data: null };
                }
                throw error;
            }

            return { success: true, data };
        } catch (error) {
            console.error('Load preferences error:', error);
            return { success: false, error: error.message };
        }
    }

    // User profile (optional onboarding)
    async getUserProfile() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return { success: true, data: null };
                }
                throw error;
            }

            return { success: true, data };
        } catch (error) {
            console.warn('Get user profile error:', error.message);
            return { success: false, error: error.message };
        }
    }

    async saveUserProfile(profile) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const payload = {
                user_id: userId,
                age_range: profile.age_range || null,
                gender: profile.gender || null,
                country: profile.country || null,
                region: profile.region || null,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await this.supabase
                .from('user_profiles')
                .upsert(payload, { onConflict: 'user_id' })
                .select('age_range, gender, country, region, updated_at')
                .single();

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Save user profile error:', error);
            return { success: false, error: error.message };
        }
    }

    // Helper pour détecter le type d'appareil
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'mobile';
        return 'desktop';
    }

    // Helper pour détecter le navigateur
    getBrowser() {
        const ua = navigator.userAgent;
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) return 'Chrome';
        if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) return 'Safari';
        if (ua.indexOf('Edg') > -1) return 'Edge';
        if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';
        return 'Unknown';
    }

    // Enregistrer un feedback utilisateur
    async submitFeedback(feedbackData) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            const deviceType = this.getDeviceType();
            const browser = this.getBrowser();

            const { error } = await this.supabase
                .from('user_feedback')
                .insert({
                    user_id: userId,
                    feedback_type: feedbackData.type,
                    subject: feedbackData.subject,
                    message: feedbackData.message,
                    email: feedbackData.email || null,
                    device_type: deviceType,
                    browser: browser,
                    user_agent: navigator.userAgent,
                    created_at: new Date().toISOString()
                });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Submit feedback error:', error);
            return { success: false, error: error.message };
        }
    }

    // Generate thumbnail from current canvas
    generateThumbnail() {
        const SIZE = 128;
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, SIZE, SIZE);

        // Utiliser les données frames directement (compatible canvas rendering)
        const frameData = (typeof currentFrameBuffer !== 'undefined' && Array.isArray(currentFrameBuffer))
            ? currentFrameBuffer
            : (typeof frames !== 'undefined' && frames.length > 0 ? frames[0] : null);

        if (!frameData || frameData.length === 0) return canvas.toDataURL('image/png');

        const gs = Math.round(Math.sqrt(frameData.length));
        if (gs === 0) return canvas.toDataURL('image/png');
        const px = SIZE / gs;

        for (let i = 0; i < frameData.length; i++) {
            const p = frameData[i];
            if (!p || p.isEmpty) continue;
            ctx.fillStyle = p.color;
            ctx.fillRect((i % gs) * px, Math.floor(i / gs) * px, px, px);
        }

        return canvas.toDataURL('image/png');
    }


    // =====================================================
    // PUBLIC SHARING FUNCTIONS (via shareable link)
    // =====================================================

    // Create a public shareable link for a project
    async createPublicShare(projectName, options = {}) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Get project (metadata only — le snapshot n'existe plus, on lit depuis pixel_projects via JOIN au read)
            const { data: project, error: projectError } = await this.supabase
                .from('pixel_projects')
                .select('id, name, thumbnail')
                .eq('user_id', userId)
                .eq('name', projectName)
                .maybeSingle();

            if (projectError) throw projectError;
            if (!project) throw new Error('Project not found');

            // Get all existing shares for this project
            const { data: existingShares } = await this.supabase
                .from('public_shares')
                .select('id')
                .eq('project_id', project.id)
                .order('created_at', { ascending: false });

            if (existingShares && existingShares.length > 0) {
                const keepId = existingShares[0].id;

                // Delete duplicates (keep only the most recent)
                if (existingShares.length > 1) {
                    const idsToDelete = existingShares.slice(1).map(s => s.id);
                    await this.supabase.from('public_shares').delete().in('id', idsToDelete);
                }

                const { data: updated, error: updateError } = await this.supabase
                    .from('public_shares')
                    .update({
                        project_thumbnail: project.thumbnail,
                        project_name: project.name,
                        is_public_gallery: options.publishToGallery === true
                    })
                    .eq('id', keepId)
                    .select()
                    .single();

                if (updateError) throw updateError;
                return { success: true, data: updated, isNew: false };
            }

            // Calculate expiry date if specified
            let expiresAt = null;
            if (options.expiresInDays) {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + parseInt(options.expiresInDays));
                expiresAt = expiryDate.toISOString();
            }

            // Create public share
            const { data, error } = await this.supabase
                .from('public_shares')
                .insert({
                    project_id: project.id,
                    owner_id: userId,
                    project_name: project.name,
                    project_thumbnail: project.thumbnail,
                    allow_duplicate: options.allowDuplicate !== false,
                    expires_at: expiresAt,
                    is_public_gallery: options.publishToGallery === true
                })
                .select()
                .single();

            if (error) throw error;

            return { success: true, data, isNew: true };
        } catch (error) {
            console.error('Create public share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete a gallery share (owner only)
    async deleteGalleryShare(shareId) {
        if (!this.supabase) this.init();
        try {
            const userId = this.getUserId();
            if (!userId) throw new Error('User not authenticated');
            const { error } = await this.supabase
                .from('public_shares')
                .delete()
                .eq('id', shareId)
                .eq('owner_id', userId);
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Delete gallery share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get public gallery (all public shares)
    async getPublicGallery({ limit = 40, sortBy = 'recent' } = {}) {
        if (!this.supabase) this.init();

        try {
            const orderColumn = sortBy === 'popular' ? 'view_count' : 'created_at';

            // Lazy load : ne ramène PAS frames (trop gros pour un listing).
            // Le front affiche project_thumbnail et fetch les frames au clic via /shared/<token>.
            const { data, error } = await this.supabase
                .from('public_shares')
                .select('id, project_id, share_token, project_name, project_thumbnail, view_count, duplicate_count, created_at, owner_id, pixel_projects:project_id(fps, frame_count, created_at)')
                .eq('is_public_gallery', true)
                .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
                .order(orderColumn, { ascending: false })
                .limit(limit * 5); // fetch more to account for deduplication

            if (error) throw error;

            // Reconstruire project_snapshot sans frames (le front tombe en fallback thumbnail)
            const withSnapshot = (data || []).map(share => ({
                ...share,
                project_snapshot: share.pixel_projects ? {
                    name: share.project_name,
                    fps: share.pixel_projects.fps,
                    frame_count: share.pixel_projects.frame_count || 1,
                    created_at: share.pixel_projects.created_at
                } : null
            })).filter(s => s.project_snapshot); // drop orphelins

            // Deduplicate: keep only the most recent share per project
            const seen = new Set();
            const deduped = withSnapshot.filter(share => {
                const key = share.project_id || share.project_name;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            }).slice(0, limit);

            return { success: true, data: deduped };
        } catch (error) {
            console.error('Get gallery error:', error);
            return { success: false, error: error.message };
        }
    }

    // Set whether a public share appears in the public gallery
    async setGalleryVisibility(shareId, isPublic) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('public_shares')
                .update({ is_public_gallery: isPublic })
                .eq('id', shareId)
                .eq('owner_id', userId)
                .select()
                .single();

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Set gallery visibility error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get public share by token
    async getPublicShare(shareToken) {
        if (!this.supabase) this.init();

        try {
            const { data, error } = await this.supabase
                .from('public_shares')
                .select('id, project_id, share_token, project_name, project_thumbnail, view_count, duplicate_count, allow_duplicate, is_public_gallery, expires_at, created_at, updated_at, owner_id, pixel_projects:project_id(frames, fps, current_frame, custom_palette, custom_colors, created_at)')
                .eq('share_token', shareToken)
                .single();

            if (error) throw error;

            // Check if expired
            if (data.expires_at && new Date(data.expires_at) < new Date()) {
                throw new Error('This share link has expired');
            }

            // Reconstruire project_snapshot depuis le JOIN pour préserver la shape consommée par shared.html / index.html
            if (!data.pixel_projects) {
                throw new Error('Le projet partagé n\'existe plus');
            }

            // Si les frames sont offloadées en Storage ({_url}), les fetcher inline
            // pour que shared.html reçoive un array — même logique que loadProject().
            let frames = data.pixel_projects.frames;
            if (frames && typeof frames === 'object' && !Array.isArray(frames) && frames._url) {
                try {
                    const resp = await fetch(frames._url);
                    if (resp.ok) frames = await resp.json();
                } catch (e) {
                    console.warn('Failed to fetch shared frames from Storage:', e);
                    frames = null;
                }
            }

            data.project_snapshot = {
                name: data.project_name,
                frames,
                fps: data.pixel_projects.fps,
                current_frame: data.pixel_projects.current_frame,
                custom_palette: data.pixel_projects.custom_palette,
                custom_colors: data.pixel_projects.custom_colors,
                created_at: data.pixel_projects.created_at
            };

            return { success: true, data };
        } catch (error) {
            console.error('Get public share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Log analytics for public share
    async logPublicShareAnalytics(shareId, action, metadata = {}) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId(); // May be null for anonymous users

            const { error } = await this.supabase
                .from('public_share_analytics')
                .insert({
                    share_id: shareId,
                    action: action,
                    user_id: userId,
                    user_agent: metadata.userAgent || navigator.userAgent,
                    referrer: metadata.referrer || document.referrer
                });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.warn('Log analytics error:', error.message);
            return { success: false, error: error.message };
        }
    }

    // Duplicate a public shared project
    async duplicatePublicShare(shareToken) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('You must be logged in to duplicate projects');
            }

            // Get share data
            const shareResult = await this.getPublicShare(shareToken);
            if (!shareResult.success) throw new Error(shareResult.error);

            const share = shareResult.data;

            // Check if duplication is allowed
            if (!share.allow_duplicate) {
                throw new Error('The owner has disabled duplication for this project');
            }

            const projectSnapshot = share.project_snapshot;

            // Create new project name with suffix
            let newName = `${projectSnapshot.name} (copie)`;
            let counter = 1;

            // Check if name exists, add counter if needed
            while (true) {
                const { data: existing } = await this.supabase
                    .from('pixel_projects')
                    .select('id')
                    .eq('user_id', userId)
                    .eq('name', newName)
                    .single();

                if (!existing) break;
                counter++;
                newName = `${projectSnapshot.name} (copie ${counter})`;
            }

            // Create duplicate
            const { data, error } = await this.supabase
                .from('pixel_projects')
                .insert({
                    user_id: userId,
                    name: newName,
                    frames: projectSnapshot.frames,
                    current_frame: projectSnapshot.current_frame,
                    fps: projectSnapshot.fps,
                    custom_palette: projectSnapshot.custom_palette,
                    custom_colors: projectSnapshot.custom_colors,
                    thumbnail: share.project_thumbnail
                })
                .select()
                .single();

            if (error) throw error;

            // Log analytics
            await this.logPublicShareAnalytics(share.id, 'duplicated');

            return { success: true, data };
        } catch (error) {
            console.error('Duplicate public share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all public shares created by current user
    async getMyPublicShares() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('public_shares')
                .select('*')
                .eq('owner_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Get my public shares error:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete a public share
    async deletePublicShare(shareToken) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { error } = await this.supabase
                .from('public_shares')
                .delete()
                .eq('share_token', shareToken)
                .eq('owner_id', userId);

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Delete public share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Generate shareable URL for a project
    getShareableUrl(shareToken) {
        // Get APP_URL from environment or use current origin
        const appUrl = window.APP_URL || window.location.origin;
        return `${appUrl}/shared/${shareToken}`;
    }

    // =====================================================
    // TEMPLATES SYSTEM - Modèles à Réaliser
    // =====================================================
    
    /**
     * Publie un modèle dans la banque de modèles
     */
    async publishTemplate(templateData) {
        if (!this.supabase) this.init();
        
        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            
            const userEmail = window.authService?.getUserEmail() || '';
            
            const {
                name,
                description,
                category,
                styleTags,
                templateData: frameData,
                previewData,
                thumbnail,
                difficulty,
                isAnimation,
                isAnimationTemplate
            } = templateData;
            
            // Validation
            if (!name || !category || !frameData) {
                throw new Error('Nom, catégorie et données du modèle requis');
            }
            
            const { data, error } = await this.supabase
                .from('pixel_templates')
                .insert({
                    author_id: userId,
                    author_email: userEmail,
                    name,
                    description: description || null,
                    category,
                    style_tags: styleTags || [],
                    template_data: frameData, // Peut être une frame unique ou un array de frames (animation)
                    preview_data: previewData || frameData, // Version complète pour l'aperçu
                    thumbnail: thumbnail || null,
                    is_animation: isAnimation || false, // Marqueur pour animation (complète ou à réaliser)
                    is_animation_template: isAnimationTemplate || false, // Marqueur pour distinguer animation complète vs à réaliser
                    difficulty: difficulty || 1,
                    is_public: true,
                    is_approved: true
                })
                .select()
                .single();
            
            if (error) throw error;

            this.invalidateTemplatesCache();
            return { success: true, data };
        } catch (error) {
            console.error('Publish template error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Récupère tous les modèles publics avec filtres
     * Ne charge PAS template_data ni preview_data (données pixel lourdes) — chargées à la demande via getTemplateById
     */
    async getTemplates(filters = {}) {
        if (!this.supabase) this.init();

        const cacheKey = JSON.stringify(filters);
        const now = Date.now();
        if (this._templatesCache?.[cacheKey] && (now - (this._templatesCacheTime?.[cacheKey] ?? 0)) < 300000) {
            return { success: true, data: this._templatesCache[cacheKey] };
        }

        try {
            const COLUMNS = 'id, name, description, category, difficulty, style_tags, thumbnail, view_count, is_animation, is_animation_template, author_id, author_email, author_username, created_at';
            let query = this.supabase
                .from('pixel_templates')
                .select(COLUMNS)
                .eq('is_public', true)
                .eq('is_approved', true);

            if (filters.category) {
                query = query.eq('category', filters.category);
            }
            if (filters.styleTags && filters.styleTags.length > 0) {
                query = query.overlaps('style_tags', filters.styleTags);
            }
            if (filters.difficulty) {
                query = query.eq('difficulty', filters.difficulty);
            }

            const orderBy = filters.orderBy || 'created_at';
            const orderDirection = filters.orderDirection || 'desc';
            query = query.order(orderBy, { ascending: orderDirection === 'asc' });

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;
            if (error) throw error;

            this._templatesCache = this._templatesCache || {};
            this._templatesCacheTime = this._templatesCacheTime || {};
            this._templatesCache[cacheKey] = data || [];
            this._templatesCacheTime[cacheKey] = now;

            return { success: true, data: data || [] };
        } catch (error) {
            console.error('Get templates error:', error);
            return { success: false, error: error.message, data: [] };
        }
    }

    invalidateTemplatesCache() {
        this._templatesCache = null;
        this._templatesCacheTime = null;
    }
    
    /**
     * Récupère un modèle par ID et incrémente le compteur de vues
     */
    async getTemplateById(templateId) {
        if (!this.supabase) this.init();
        
        try {
            // Récupérer le modèle
            const { data, error } = await this.supabase
                .from('pixel_templates')
                .select('*')
                .eq('id', templateId)
                .eq('is_public', true)
                .eq('is_approved', true)
                .single();
            
            if (error) throw error;
            
            // Incrémenter le compteur de vues (asynchrone, on ne bloque pas sur l'erreur)
            this.supabase
                .from('pixel_templates')
                .update({ view_count: (data.view_count || 0) + 1 })
                .eq('id', templateId)
                .then(() => console.log('✅ Compteur de vues incrémenté'))
                .catch(err => console.warn('⚠️ Impossible d\'incrémenter le compteur de vues:', err));
            
            return { success: true, data };
        } catch (error) {
            console.error('Get template error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Récupère les modèles de l'utilisateur
     */
    async getMyTemplates() {
        if (!this.supabase) this.init();
        
        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            
            const { data, error } = await this.supabase
                .from('pixel_templates')
                .select('*')
                .eq('author_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            
            return { success: true, data: data || [] };
        } catch (error) {
            console.error('Get my templates error:', error);
            return { success: false, error: error.message, data: [] };
        }
    }
    
    /**
     * Marque un modèle comme complété
     */
    async markTemplateAsCompleted(templateId, completionTimeSeconds = null) {
        if (!this.supabase) this.init();
        
        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            
            const { data, error } = await this.supabase
                .from('template_completions')
                .upsert({
                    template_id: templateId,
                    user_id: userId,
                    completion_time_seconds: completionTimeSeconds,
                    completed_at: new Date().toISOString()
                }, {
                    onConflict: 'template_id,user_id'
                })
                .select()
                .single();
            
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error('Mark template completed error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Ajoute/retire un modèle des favoris
     */
    async toggleTemplateFavorite(templateId, isFavorite) {
        if (!this.supabase) this.init();
        
        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            
            if (isFavorite) {
                const { data, error } = await this.supabase
                    .from('template_favorites')
                    .insert({
                        template_id: templateId,
                        user_id: userId
                    })
                    .select()
                    .single();
                
                if (error) throw error;
                return { success: true, data };
            } else {
                const { error } = await this.supabase
                    .from('template_favorites')
                    .delete()
                    .eq('template_id', templateId)
                    .eq('user_id', userId);
                
                if (error) throw error;
                return { success: true, data: null };
            }
        } catch (error) {
            console.error('Toggle template favorite error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Supprime un modèle (auteur uniquement)
     */
    async deleteTemplate(templateId) {
        if (!this.supabase) this.init();
        
        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            
            const { error } = await this.supabase
                .from('pixel_templates')
                .delete()
                .eq('id', templateId)
                .eq('author_id', userId);
            
            if (error) throw error;

            this.invalidateTemplatesCache();
            return { success: true };
        } catch (error) {
            console.error('Delete template error:', error);
            return { success: false, error: error.message };
        }
    }

    // =====================================================
    // USER PROFILES SYSTEM - Gestion des pseudonymes
    // =====================================================
    
    /**
     * Récupère le profil utilisateur (pseudo) — avec cache TTL 60s
     */
    async getUserProfile({ forceRefresh = false } = {}) {
        if (!this.supabase) this.init();

        const userId = this.getUserId();
        if (!userId) return { success: false, error: 'User not authenticated', data: null };

        const now = Date.now();
        if (!forceRefresh && this._profileCache && this._profileCacheUser === userId && (now - this._profileCacheTime) < 60000) {
            return { success: true, data: this._profileCache };
        }

        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                throw error;
            }

            this._profileCache = data || null;
            this._profileCacheUser = userId;
            this._profileCacheTime = now;

            return { success: true, data: data || null };
        } catch (error) {
            console.error('Get user profile error:', error);
            return { success: false, error: error.message, data: null };
        }
    }

    // Invalider le cache profil (à appeler après setUserProfile)
    invalidateProfileCache() {
        this._profileCache = undefined;
        this._profileCacheTime = 0;
    }
    
    /**
     * Crée ou met à jour le profil utilisateur (pseudo et avatar)
     */
    async setUserProfile(username, avatarData = null, avatarSize = 16) {
        if (!this.supabase) this.init();
        
        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }
            
            // Validation du pseudo
            if (!username || username.trim().length < 2 || username.trim().length > 30) {
                throw new Error('Le pseudo doit contenir entre 2 et 30 caractères');
            }
            
            // Vérifier le format (alphanumérique, tirets et underscores uniquement)
            if (!/^[a-zA-Z0-9_-]+$/.test(username.trim())) {
                throw new Error('Le pseudo ne peut contenir que des lettres, chiffres, tirets et underscores');
            }
            
            // Vérifier si le pseudo est déjà utilisé par un autre utilisateur
            const { data: existingProfiles } = await this.supabase
                .from('user_profiles')
                .select('user_id')
                .eq('username', username.trim());
            
            if (existingProfiles && existingProfiles.length > 0) {
                const otherUser = existingProfiles.find(p => p.user_id !== userId);
                if (otherUser) {
                    throw new Error('Ce pseudo est déjà utilisé par un autre utilisateur');
                }
            }
            
            // Préparer les données du profil (UPSERT pour préserver l'avatar existant)
            const profileData = {
                user_id: userId,
                username: username.trim(),
                updated_at: new Date().toISOString()
            };

            // Ajouter l'avatar uniquement s'il est fourni (sinon l'UPSERT préserve l'existant)
            if (avatarData !== null) {
                profileData.avatar_data = avatarData;
                profileData.avatar_size = avatarSize;
            }

            // UPSERT : crée ou met à jour le profil sans écraser l'avatar si non fourni
            const { data, error } = await this.supabase
                .from('user_profiles')
                .upsert(profileData, { onConflict: 'user_id' })
                .select()
                .single();

            if (error) {
                console.error('Upsert profile error:', error);
                throw error;
            }

            // Mettre à jour author_username dans tous les templates
            await this.supabase
                .from('pixel_templates')
                .update({ author_username: username.trim() })
                .eq('author_id', userId);

            this.invalidateProfileCache();
            return { success: true, data };
        } catch (error) {
            console.error('Set user profile error:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Récupère le pseudo d'un utilisateur par son ID
     */
    async getUsernameByUserId(userId) {
        if (!this.supabase) this.init();
        
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('username')
                .eq('user_id', userId)
                .single();
            
            if (error && error.code !== 'PGRST116') {
                throw error;
            }
            
            return data?.username || null;
        } catch (error) {
            console.error('Get username by user ID error:', error);
            return null;
        }
    }
}

// Create global database service instance
window.dbService = new DatabaseService();
