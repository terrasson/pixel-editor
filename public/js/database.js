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
                .select('age_range, gender, country, region, updated_at')
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

    async logUsageEvent(eventName, payload = {}) {
        if (!this.supabase) this.init();

        try {
            const userId = this.getUserId();
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { error } = await this.supabase
                .from('usage_events')
                .insert({
                    user_id: userId,
                    event_name: eventName,
                    payload,
                    created_at: new Date().toISOString()
                });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.warn('Log event error:', error.message);
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
}

// Create global database service instance
window.dbService = new DatabaseService();
