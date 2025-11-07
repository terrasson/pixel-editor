// Script pour tester la connexion Supabase et vérifier que la table existe
// Utilisation: node test-database-connection.js

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://kgdzbddtprdtdiflwegc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZHpiZGR0cHJkdGRpZmx3ZWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzE5NjgsImV4cCI6MjA3NzMwNzk2OH0.eWvNE2wXPVQe7zc6QwCHY9mTdoxmDNrskzfU6NHUe8I';

async function testConnection() {
    console.log('🔍 Test de connexion à Supabase...\n');

    // 1. Créer le client
    console.log('1️⃣ Création du client Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Client créé\n');

    // 2. Vérifier la table pixel_projects
    console.log('2️⃣ Vérification de la table pixel_projects...');
    try {
        const { data, error, count } = await supabase
            .from('pixel_projects')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ ERREUR:', error.message);
            console.error('\n⚠️  La table "pixel_projects" n\'existe probablement pas.');
            console.error('📝 Action requise: Exécutez le script SQL dans Supabase:');
            console.error('   → Allez sur https://supabase.com/dashboard/project/kgdzbddtprdtdiflwegc/editor/sql');
            console.error('   → Collez le contenu de docs/database-schema.sql');
            console.error('   → Cliquez sur "Run"\n');
            return false;
        }

        console.log(`✅ Table "pixel_projects" trouvée ! (${count || 0} projets)\n`);
    } catch (err) {
        console.error('❌ Erreur de connexion:', err.message);
        return false;
    }

    // 3. Vérifier la table user_preferences
    console.log('3️⃣ Vérification de la table user_preferences...');
    try {
        const { error } = await supabase
            .from('user_preferences')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('⚠️  Table "user_preferences" non trouvée (optionnel)');
        } else {
            console.log('✅ Table "user_preferences" trouvée !\n');
        }
    } catch (err) {
        console.warn('⚠️  user_preferences non disponible (optionnel)\n');
    }

    // 4. Vérifier l'authentification
    console.log('4️⃣ Vérification de l\'authentification...');
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.log('ℹ️  Aucune session active (normal si pas connecté)');
        } else if (session) {
            console.log(`✅ Session active: ${session.user.email}`);
        } else {
            console.log('ℹ️  Pas de session (vous devez vous connecter depuis l\'app)');
        }
        console.log('');
    } catch (err) {
        console.warn('⚠️  Impossible de vérifier l\'auth:', err.message);
    }

    console.log('════════════════════════════════════════════════');
    console.log('✅ CONNEXION SUPABASE OK !');
    console.log('════════════════════════════════════════════════\n');
    console.log('📋 Prochaines étapes:');
    console.log('   1. Si les tables n\'existent pas, exécutez database-schema.sql');
    console.log('   2. Lancez l\'application: npm run dev');
    console.log('   3. Connectez-vous avec un compte');
    console.log('   4. Essayez de sauvegarder un projet\n');

    return true;
}

// Exécuter le test
testConnection()
    .then((success) => {
        process.exit(success ? 0 : 1);
    })
    .catch((err) => {
        console.error('❌ Erreur fatale:', err);
        process.exit(1);
    });

