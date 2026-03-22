// Database Service for Pixel Art Projects
// This module handles all database operations with Supabase

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

    // Save a project (create or update)
    async saveProject(projectData) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { name, frames, currentFrame, fps, customPalette, customColors, thumbnail } = projectData;

            // Check if project already exists
            const { data: existing } = await this.supabase
                .from('pixel_projects')
                .select('id')
                .eq('user_id', userId)
                .eq('name', name)
                .single();

            if (existing) {
                // Update existing project
                const { data, error } = await this.supabase
                    .from('pixel_projects')
                    .update({
                        frames,
                        current_frame: currentFrame,
                        fps: fps || 24,
                        custom_palette: customPalette,
                        custom_colors: customColors ?? null,
                        thumbnail,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', existing.id)
                    .select()
                    .single();

                if (error) throw error;
                return { success: true, data, isUpdate: true };
            } else {
                // Create new project
                const { data, error } = await this.supabase
                    .from('pixel_projects')
                    .insert({
                        user_id: userId,
                        name,
                        frames,
                        current_frame: currentFrame,
                        fps: fps || 24,
                        custom_palette: customPalette,
                        custom_colors: customColors ?? null,
                        thumbnail
                    })
                    .select()
                    .single();

                if (error) throw error;
                return { success: true, data, isUpdate: false };
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

            return { success: true, data };
        } catch (error) {
            console.error('Load project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all projects for current user
    async getAllProjects() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('pixel_projects')
                .select('id, name, thumbnail, created_at, updated_at, fps, current_frame')
                .eq('user_id', userId)
                .order('updated_at', { ascending: false });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Get all projects error:', error);
            return { success: false, error: error.message };
        }
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

            const { error } = await this.supabase
                .from('pixel_projects')
                .delete()
                .eq('id', projectId)
                .eq('user_id', userId);

            if (error) throw error;

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

    // Obtenir ou créer un session_id
    getSessionId() {
        let sessionId = sessionStorage.getItem('pixel_editor_session_id');
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem('pixel_editor_session_id', sessionId);
        }
        return sessionId;
    }

    async logUsageEvent(eventName, payload = {}) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Collecter les métadonnées enrichies
            const enrichedPayload = {
                ...payload,
                device_type: this.getDeviceType(),
                browser: this.getBrowser(),
                screen_resolution: `${window.screen.width}x${window.screen.height}`,
                session_id: this.getSessionId(),
                referrer: document.referrer || null,
                user_agent: navigator.userAgent
            };

            const { error } = await this.supabase
                .from('usage_events')
                .insert({
                    user_id: userId,
                    event_name: eventName,
                    payload: enrichedPayload,
                    device_type: enrichedPayload.device_type,
                    browser: enrichedPayload.browser,
                    screen_resolution: enrichedPayload.screen_resolution,
                    session_id: enrichedPayload.session_id,
                    referrer: enrichedPayload.referrer,
                    created_at: new Date().toISOString()
                });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.warn('Log event error:', error.message);
            return { success: false, error: error.message };
        }
    }

    // Créer ou mettre à jour une session utilisateur
    async startUserSession() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) return { success: false, error: 'Not authenticated' };

            const sessionId = this.getSessionId();
            const deviceType = this.getDeviceType();
            const browser = this.getBrowser();

            // Vérifier si la session existe déjà
            const { data: existingSession } = await this.supabase
                .from('user_sessions')
                .select('id')
                .eq('session_id', sessionId)
                .single();

            if (existingSession) {
                // Mettre à jour la session existante
                const { error } = await this.supabase
                    .from('user_sessions')
                    .update({
                        updated_at: new Date().toISOString(),
                        page_views: existingSession.page_views + 1
                    })
                    .eq('session_id', sessionId);

                if (error) throw error;
                return { success: true, sessionId };
            }

            // Créer une nouvelle session
            const { error } = await this.supabase
                .from('user_sessions')
                .insert({
                    user_id: userId,
                    session_id: sessionId,
                    device_type: deviceType,
                    browser: browser,
                    screen_resolution: `${window.screen.width}x${window.screen.height}`,
                    referrer: document.referrer || null,
                    first_page: window.location.pathname,
                    started_at: new Date().toISOString()
                });

            if (error) throw error;

            return { success: true, sessionId };
        } catch (error) {
            console.warn('Start session error:', error.message);
            return { success: false, error: error.message };
        }
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
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;

        // Get pixel grid
        const pixels = document.querySelectorAll('.pixel');
        const pixelSize = 1; // 1px per pixel in thumbnail

        pixels.forEach((pixel, index) => {
            const x = (index % 32) * pixelSize;
            const y = Math.floor(index / 32) * pixelSize;
            const color = pixel.style.backgroundColor || '#FFFFFF';

            ctx.fillStyle = color;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        });

        return canvas.toDataURL('image/png');
    }

    // =====================================================
    // PROJECT SHARING FUNCTIONS
    // =====================================================

    // Share a project with another user by email
    async shareProject(projectName, recipientEmail, options = {}) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Get project ID
            const { data: project, error: projectError } = await this.supabase
                .from('pixel_projects')
                .select('id, name')
                .eq('user_id', userId)
                .eq('name', projectName)
                .single();

            if (projectError) throw projectError;
            if (!project) throw new Error('Project not found');

            // Validate email format
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(recipientEmail)) {
                throw new Error('Invalid email address');
            }

            // Get current user's email to prevent self-sharing
            const currentUser = await window.authService.getCurrentUser();
            if (currentUser.email === recipientEmail) {
                throw new Error('Cannot share project with yourself');
            }

            // Create share
            const shareData = {
                project_id: project.id,
                owner_id: userId,
                shared_with_email: recipientEmail.toLowerCase(),
                permission: options.permission || 'can_duplicate',
                message: options.message || null,
                expires_at: options.expiresAt || null,
                status: 'pending'
            };

            const { data, error } = await this.supabase
                .from('project_shares')
                .insert(shareData)
                .select()
                .single();

            if (error) {
                // Check if already shared
                if (error.code === '23505') { // Unique constraint violation
                    throw new Error('Project already shared with this user');
                }
                throw error;
            }

            // Log the share event
            await this.logUsageEvent('project_shared', {
                project_id: project.id,
                recipient_email: recipientEmail,
                permission: shareData.permission
            });

            return { success: true, data };
        } catch (error) {
            console.error('Share project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all projects shared WITH current user
    async getSharedWithMeProjects() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            const currentUser = await window.authService.getCurrentUser();

            if (!userId || !currentUser) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('project_shares')
                .select(`
                    id,
                    project_id,
                    owner_id,
                    permission,
                    status,
                    message,
                    created_at,
                    expires_at,
                    pixel_projects (
                        id,
                        name,
                        thumbnail,
                        fps,
                        current_frame,
                        created_at,
                        updated_at
                    )
                `)
                .eq('shared_with_email', currentUser.email)
                .or(`status.eq.pending,status.eq.accepted`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Get owner emails
            const enrichedData = await Promise.all(data.map(async (share) => {
                const { data: owner } = await this.supabase
                    .from('auth.users')
                    .select('email')
                    .eq('id', share.owner_id)
                    .single();

                return {
                    ...share,
                    owner_email: owner?.email || 'Unknown',
                    project: share.pixel_projects
                };
            }));

            return { success: true, data: enrichedData };
        } catch (error) {
            console.error('Get shared with me projects error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get count of pending shares for current user
    async getPendingSharesCount() {
        if (!this.supabase) this.init();

        try {
            const currentUser = await window.authService.getCurrentUser();
            if (!currentUser) {
                throw new Error('User not authenticated');
            }

            const { count, error } = await this.supabase
                .from('project_shares')
                .select('*', { count: 'exact', head: true })
                .eq('shared_with_email', currentUser.email)
                .eq('status', 'pending');

            if (error) throw error;

            return { success: true, count: count || 0 };
        } catch (error) {
            console.error('Get pending shares count error:', error);
            return { success: false, error: error.message, count: 0 };
        }
    }

    // Accept a shared project
    async acceptShare(shareId) {
        if (!this.supabase) this.init();

        try {
            const { data, error } = await this.supabase
                .from('project_shares')
                .update({ status: 'accepted', updated_at: new Date().toISOString() })
                .eq('id', shareId)
                .select()
                .single();

            if (error) throw error;

            // Log access
            await this.supabase
                .from('project_access_log')
                .insert({
                    share_id: shareId,
                    user_id: this.getUserId(),
                    action: 'accepted'
                });

            return { success: true, data };
        } catch (error) {
            console.error('Accept share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Decline a shared project
    async declineShare(shareId) {
        if (!this.supabase) this.init();

        try {
            const { data, error } = await this.supabase
                .from('project_shares')
                .update({ status: 'declined', updated_at: new Date().toISOString() })
                .eq('id', shareId)
                .select()
                .single();

            if (error) throw error;

            // Log access
            await this.supabase
                .from('project_access_log')
                .insert({
                    share_id: shareId,
                    user_id: this.getUserId(),
                    action: 'declined'
                });

            return { success: true, data };
        } catch (error) {
            console.error('Decline share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Duplicate a shared project to own account
    async duplicateSharedProject(shareId) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Get share details
            const { data: share, error: shareError } = await this.supabase
                .from('project_shares')
                .select(`
                    id,
                    permission,
                    pixel_projects (*)
                `)
                .eq('id', shareId)
                .single();

            if (shareError) throw shareError;
            if (!share) throw new Error('Share not found');

            // Check permission
            if (share.permission === 'view_only') {
                throw new Error('You only have view permission for this project');
            }

            const originalProject = share.pixel_projects;

            // Create new project name with suffix
            let newName = `${originalProject.name} (copie)`;
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
                newName = `${originalProject.name} (copie ${counter})`;
            }

            // Create duplicate
            const { data, error } = await this.supabase
                .from('pixel_projects')
                .insert({
                    user_id: userId,
                    name: newName,
                    frames: originalProject.frames,
                    current_frame: originalProject.current_frame,
                    fps: originalProject.fps,
                    custom_palette: originalProject.custom_palette,
                    custom_colors: originalProject.custom_colors,
                    thumbnail: originalProject.thumbnail
                })
                .select()
                .single();

            if (error) throw error;

            // Log access
            await this.supabase
                .from('project_access_log')
                .insert({
                    share_id: shareId,
                    user_id: userId,
                    action: 'duplicated'
                });

            return { success: true, data };
        } catch (error) {
            console.error('Duplicate shared project error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get a shared project's full data (for viewing)
    async getSharedProjectData(shareId) {
        if (!this.supabase) this.init();

        try {
            const { data: share, error } = await this.supabase
                .from('project_shares')
                .select(`
                    id,
                    permission,
                    pixel_projects (*)
                `)
                .eq('id', shareId)
                .single();

            if (error) throw error;

            // Log access
            await this.supabase
                .from('project_access_log')
                .insert({
                    share_id: shareId,
                    user_id: this.getUserId(),
                    action: 'viewed'
                });

            return { success: true, data: share.pixel_projects, permission: share.permission };
        } catch (error) {
            console.error('Get shared project data error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all projects shared BY current user
    async getMyShares() {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await this.supabase
                .from('project_shares')
                .select(`
                    id,
                    shared_with_email,
                    permission,
                    status,
                    message,
                    created_at,
                    expires_at,
                    pixel_projects (
                        id,
                        name,
                        thumbnail
                    )
                `)
                .eq('owner_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Get my shares error:', error);
            return { success: false, error: error.message };
        }
    }

    // Revoke a share (delete)
    async revokeShare(shareId) {
        if (!this.supabase) this.init();

        try {
            const { error } = await this.supabase
                .from('project_shares')
                .delete()
                .eq('id', shareId);

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Revoke share error:', error);
            return { success: false, error: error.message };
        }
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

            // Get project data
            const { data: project, error: projectError } = await this.supabase
                .from('pixel_projects')
                .select('*')
                .eq('user_id', userId)
                .eq('name', projectName)
                .maybeSingle();

            if (projectError) throw projectError;
            if (!project) throw new Error('Project not found');

            // Create snapshot of project data (always fresh)
            const projectSnapshot = {
                name: project.name,
                frames: project.frames,
                current_frame: project.current_frame,
                fps: project.fps,
                custom_palette: project.custom_palette,
                custom_colors: project.custom_colors,
                created_at: project.created_at
            };

            // Check if public share already exists
            const { data: existing } = await this.supabase
                .from('public_shares')
                .select('*')
                .eq('project_id', project.id)
                .maybeSingle();

            if (existing) {
                // Update snapshot with latest project data
                const { data: updated, error: updateError } = await this.supabase
                    .from('public_shares')
                    .update({
                        project_snapshot: projectSnapshot,
                        project_thumbnail: project.thumbnail,
                        project_name: project.name
                    })
                    .eq('id', existing.id)
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
                    project_snapshot: projectSnapshot,
                    project_name: project.name,
                    project_thumbnail: project.thumbnail,
                    allow_duplicate: options.allowDuplicate !== false,
                    expires_at: expiresAt
                })
                .select()
                .single();

            if (error) throw error;

            // Log the share event
            await this.logUsageEvent('project_shared_public', {
                project_id: project.id,
                share_token: data.share_token,
                allow_duplicate: data.allow_duplicate
            });

            return { success: true, data, isNew: true };
        } catch (error) {
            console.error('Create public share error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get public share by token
    async getPublicShare(shareToken) {
        if (!this.supabase) this.init();

        try {
            const { data, error } = await this.supabase
                .from('public_shares')
                .select('*')
                .eq('share_token', shareToken)
                .single();

            if (error) throw error;

            // Check if expired
            if (data.expires_at && new Date(data.expires_at) < new Date()) {
                throw new Error('This share link has expired');
            }

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
        return `${appUrl}/shared.html?token=${shareToken}`;
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
            
            return { success: true, data };
        } catch (error) {
            console.error('Publish template error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Récupère tous les modèles publics avec filtres
     */
    async getTemplates(filters = {}) {
        if (!this.supabase) this.init();
        
        try {
            let query = this.supabase
                .from('pixel_templates')
                .select('*, author_id') // Inclure author_id pour récupérer les avatars
                .eq('is_public', true)
                .eq('is_approved', true);
            
            // Filtre par catégorie
            if (filters.category) {
                query = query.eq('category', filters.category);
            }
            
            // Filtre par tags de style
            if (filters.styleTags && filters.styleTags.length > 0) {
                query = query.overlaps('style_tags', filters.styleTags);
            }
            
            // Filtre par difficulté
            if (filters.difficulty) {
                query = query.eq('difficulty', filters.difficulty);
            }
            
            // Tri
            const orderBy = filters.orderBy || 'created_at';
            const orderDirection = filters.orderDirection || 'desc';
            query = query.order(orderBy, { ascending: orderDirection === 'asc' });
            
            // Limite
            if (filters.limit) {
                query = query.limit(filters.limit);
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            
            return { success: true, data: data || [] };
        } catch (error) {
            console.error('Get templates error:', error);
            return { success: false, error: error.message, data: [] };
        }
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
     * Récupère le profil utilisateur (pseudo)
     */
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
            
            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                throw error;
            }
            
            return { success: true, data: data || null };
        } catch (error) {
            console.error('Get user profile error:', error);
            return { success: false, error: error.message, data: null };
        }
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
