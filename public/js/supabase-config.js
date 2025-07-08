// Configuration Supabase
// 🚨 REMPLACEZ CES VALEURS PAR VOS VRAIES CLÉS SUPABASE
const SUPABASE_URL = 'https://votre-projet.supabase.co';
const SUPABASE_ANON_KEY = 'votre-cle-publique-ici';

// Client Supabase simple (sans SDK lourd)
class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }

    async query(table, method = 'GET', data = null, filter = '') {
        const url = `${this.url}/rest/v1/${table}${filter}`;
        
        const options = {
            method,
            headers: {
                'apikey': this.key,
                'Authorization': `Bearer ${this.key}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        };

        if (data && (method === 'POST' || method === 'PATCH')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Erreur Supabase: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    // Créer un projet
    async createProject(projectData) {
        return this.query('pixel_projects', 'POST', projectData);
    }

    // Récupérer tous les projets
    async getProjects() {
        return this.query('pixel_projects', 'GET', null, '?order=updated_at.desc');
    }

    // Récupérer un projet par ID
    async getProject(id) {
        const result = await this.query('pixel_projects', 'GET', null, `?id=eq.${id}`);
        return result[0] || null;
    }

    // Mettre à jour un projet
    async updateProject(id, projectData) {
        return this.query('pixel_projects', 'PATCH', projectData, `?id=eq.${id}`);
    }

    // Supprimer un projet
    async deleteProject(id) {
        return this.query('pixel_projects', 'DELETE', null, `?id=eq.${id}`);
    }
}

// Instance globale
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test de connexion
async function testSupabaseConnection() {
    try {
        await supabase.getProjects();
        console.log('✅ Connexion Supabase OK');
        return true;
    } catch (error) {
        console.error('❌ Erreur connexion Supabase:', error);
        return false;
    }
} 