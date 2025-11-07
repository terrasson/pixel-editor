// Configuration Supabase
// Note: These credentials are from your .env file
// The anon key is PUBLIC and safe to expose in client-side code
// It's protected by Row Level Security (RLS) policies in your database

const SUPABASE_URL = 'https://kgdzbddtprdtdiflwegc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHpiZGR0cHJkdGRpZmx3ZWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzE5NjgsImV4cCI6MjA3NzMwNzk2OH0.eWvNE2wXPVQe7zc6QwCHY9mTdoxmDNrskzfU6NHUe8I';

// Export configuration
window.SUPABASE_CONFIG = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY
};

console.log('✅ Supabase config loaded:', SUPABASE_URL);
