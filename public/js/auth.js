// Authentication Service using Supabase
// This module handles all authentication operations

class AuthService {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.initialized = false;
        this._initPromise = null;
    }

    // Initialize Supabase client
    async init() {
        if (this.initialized) return true;
        // Si une initialisation est déjà en cours, attendre qu'elle se termine
        if (this._initPromise) return this._initPromise;
        this._initPromise = this._doInit();
        const result = await this._initPromise;
        return result;
    }

    async _doInit() {

        try {
            // Load Supabase from CDN
            if (typeof window.supabase === 'undefined') {
                console.error('❌ Supabase library not loaded. Make sure to include it in your HTML.');
                return false;
            }

            const config = window.SUPABASE_CONFIG;
            if (!config || !config.url || !config.anonKey) {
                console.error('❌ Supabase configuration not found');
                return false;
            }

            // Check if credentials are placeholders
            if (config.url === 'YOUR_SUPABASE_URL_HERE' || config.anonKey === 'YOUR_SUPABASE_ANON_KEY_HERE') {
                console.error('❌ Supabase credentials not configured');
                console.error('Please update public/js/config/supabase-config.js with your actual credentials');
                console.error('See docs/SETUP-AUTHENTICATION.md for setup instructions');
                return false;
            }

            this.supabase = window.supabase.createClient(config.url, config.anonKey);

            // Check for existing session
            const { data: { session } } = await this.supabase.auth.getSession();
            if (session) {
                this.currentUser = session.user;
            }

            // Listen for auth changes
            this.supabase.auth.onAuthStateChange((event, session) => {
                console.log('Auth state changed:', event);
                this.currentUser = session?.user || null;

                if (event === 'SIGNED_IN') {
                    this.onSignIn();
                } else if (event === 'SIGNED_OUT') {
                    this.onSignOut();
                }
            });

            this.initialized = true;
            console.log('✅ Auth service initialized');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize auth service:', error);
            return false;
        }
    }

    // Sign up with email and password
    async signUp(email, password) {
        try {
            if (!this.supabase) {
                throw new Error('Supabase not initialized. Please configure your credentials.');
            }

            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign in with email and password
    async signIn(email, password) {
        try {
            if (!this.supabase) {
                throw new Error('Supabase not initialized. Please configure your credentials.');
            }

            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            this.currentUser = data.user;
            return { success: true, data };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign in with Google (OAuth)
    async signInWithGoogle() {
        try {
            if (!this.supabase) {
                throw new Error('Supabase not initialized. Please configure your credentials.');
            }

            const { data, error } = await this.supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });

            if (error) throw error;

            return { success: true, data };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sign out
    async signOut() {
        try {
            if (!this.supabase) {
                throw new Error('Supabase not initialized. Please configure your credentials.');
            }

            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;

            this.currentUser = null;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get user email
    getUserEmail() {
        return this.currentUser?.email || 'Guest';
    }

    // Get user ID
    getUserId() {
        return this.currentUser?.id;
    }

    // Send password reset email
    async resetPassword(email) {
        try {
            if (!this.supabase) {
                throw new Error('Supabase not initialized. Please configure your credentials.');
            }

            const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password.html`
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update password
    async updatePassword(newPassword) {
        try {
            if (!this.supabase) {
                throw new Error('Supabase not initialized. Please configure your credentials.');
            }

            const { error } = await this.supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            return { success: true };
        } catch (error) {
            console.error('Update password error:', error);
            return { success: false, error: error.message };
        }
    }

    // Callback when user signs in
    onSignIn() {
        console.log('User signed in:', this.currentUser?.email);
        // Redirect to main app if on login page
        if (window.location.pathname.includes('login.html')) {
            window.location.href = '/index.html';
        }
    }

    // Callback when user signs out
    onSignOut() {
        console.log('User signed out');
        // Redirect to login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = '/login.html';
        }
    }

    // Get Supabase client for direct database access
    getClient() {
        return this.supabase;
    }
}

// Create global auth service instance
window.authService = new AuthService();

// Auto-initialize when config is ready
if (window.SUPABASE_CONFIG) {
    window.authService.init();
} else {
    // Wait for config to be loaded
    document.addEventListener('DOMContentLoaded', () => {
        window.authService.init();
    });
}
