-- =====================================================
-- ACTIVATION RLS ET POLITIQUES DE SÉCURITÉ
-- Script pour sécuriser les tables marquées "Unrestricted"
-- =====================================================
--
-- Ce script active Row Level Security (RLS) et crée
-- les politiques appropriées pour :
--   - user_profiles
--   - usage_events
--   - pixel_projects_list (si c'est une vue, elle sera ignorée)
--
-- =====================================================

-- =====================================================
-- 1. TABLE user_profiles
-- =====================================================

-- Activer RLS
ALTER TABLE IF EXISTS user_profiles ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Policy 1: Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view their own profile"
    ON user_profiles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy 2: Les utilisateurs peuvent créer leur propre profil
CREATE POLICY "Users can insert their own profile"
    ON user_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy 3: Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
    ON user_profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 2. TABLE usage_events
-- =====================================================

-- Activer RLS
ALTER TABLE IF EXISTS usage_events ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own events" ON usage_events;
DROP POLICY IF EXISTS "Users can insert their own events" ON usage_events;

-- Policy 1: Les utilisateurs peuvent voir leurs propres événements
CREATE POLICY "Users can view their own events"
    ON usage_events
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy 2: Les utilisateurs peuvent créer leurs propres événements
CREATE POLICY "Users can insert their own events"
    ON usage_events
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Note: Les utilisateurs ne peuvent PAS modifier ou supprimer leurs événements
-- (pour l'intégrité des données analytics)

-- =====================================================
-- 3. TABLE/VUE pixel_projects_list
-- =====================================================

-- Gérer pixel_projects_list (table ou vue)
DO $$
DECLARE
    is_table BOOLEAN;
    is_view BOOLEAN;
    has_user_id BOOLEAN;
BEGIN
    -- Vérifier si c'est une table
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pixel_projects_list'
        AND table_type = 'BASE TABLE'
    ) INTO is_table;
    
    -- Vérifier si c'est une vue
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'pixel_projects_list'
    ) INTO is_view;
    
    IF is_table THEN
        -- C'est une table : activer RLS
        ALTER TABLE pixel_projects_list ENABLE ROW LEVEL SECURITY;
        
        -- Vérifier si la table a un user_id
        SELECT EXISTS (
            SELECT 1 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'pixel_projects_list' 
            AND column_name = 'user_id'
        ) INTO has_user_id;
        
        -- Supprimer les anciennes politiques
        DROP POLICY IF EXISTS "Users can view their own projects list" ON pixel_projects_list;
        DROP POLICY IF EXISTS "Users can insert their own projects list" ON pixel_projects_list;
        DROP POLICY IF EXISTS "Users can update their own projects list" ON pixel_projects_list;
        DROP POLICY IF EXISTS "Users can delete their own projects list" ON pixel_projects_list;
        
        -- Créer les politiques selon la structure
        IF has_user_id THEN
            -- Policy SELECT: Les utilisateurs peuvent voir leurs propres projets
            CREATE POLICY "Users can view their own projects list"
                ON pixel_projects_list
                FOR SELECT
                USING (auth.uid() = user_id);
            
            -- Policy INSERT: Les utilisateurs peuvent créer leurs propres projets
            CREATE POLICY "Users can insert their own projects list"
                ON pixel_projects_list
                FOR INSERT
                WITH CHECK (auth.uid() = user_id);
            
            -- Policy UPDATE: Les utilisateurs peuvent mettre à jour leurs propres projets
            CREATE POLICY "Users can update their own projects list"
                ON pixel_projects_list
                FOR UPDATE
                USING (auth.uid() = user_id)
                WITH CHECK (auth.uid() = user_id);
            
            -- Policy DELETE: Les utilisateurs peuvent supprimer leurs propres projets
            CREATE POLICY "Users can delete their own projects list"
                ON pixel_projects_list
                FOR DELETE
                USING (auth.uid() = user_id);
        ELSE
            -- Si pas de user_id, politique restrictive par défaut
            CREATE POLICY "Users can view their own projects list"
                ON pixel_projects_list
                FOR SELECT
                USING (false); -- Personne ne peut voir (à adapter selon vos besoins)
            
            RAISE WARNING 'pixel_projects_list n''a pas de colonne user_id - Politique restrictive créée';
        END IF;
        
        RAISE NOTICE '✅ pixel_projects_list (table) : RLS activé';
        
    ELSIF is_view THEN
        -- C'est une vue : essayer d'activer RLS (certaines vues le supportent)
        BEGIN
            ALTER VIEW pixel_projects_list SET (security_invoker = true);
            ALTER VIEW pixel_projects_list ENABLE ROW LEVEL SECURITY;
            
            -- Pour les vues, créer une politique basée sur la table sous-jacente
            -- (généralement pixel_projects)
            DROP POLICY IF EXISTS "Users can view their own projects list" ON pixel_projects_list;
            
            CREATE POLICY "Users can view their own projects list"
                ON pixel_projects_list
                FOR SELECT
                USING (
                    -- Si la vue expose user_id
                    EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_schema = 'public' 
                        AND table_name = 'pixel_projects_list' 
                        AND column_name = 'user_id'
                    )
                    AND user_id = auth.uid()
                );
            
            RAISE NOTICE '✅ pixel_projects_list (vue) : RLS activé';
        EXCEPTION WHEN OTHERS THEN
            RAISE WARNING '⚠️  pixel_projects_list (vue) : Impossible d''activer RLS directement. Vérifiez les politiques sur les tables sous-jacentes.';
        END;
    ELSE
        RAISE NOTICE 'ℹ️  pixel_projects_list n''existe pas - Ignoré';
    END IF;
END $$;

-- =====================================================
-- VÉRIFICATION
-- =====================================================

DO $$
DECLARE
    rls_enabled_user_profiles BOOLEAN;
    rls_enabled_usage_events BOOLEAN;
    rls_enabled_pixel_projects_list BOOLEAN;
    policies_count_user_profiles INTEGER;
    policies_count_usage_events INTEGER;
    policies_count_pixel_projects_list INTEGER;
    is_pixel_projects_list_view BOOLEAN;
BEGIN
    -- Vérifier RLS sur user_profiles
    SELECT relrowsecurity INTO rls_enabled_user_profiles
    FROM pg_class
    WHERE relname = 'user_profiles';
    
    -- Vérifier RLS sur usage_events
    SELECT relrowsecurity INTO rls_enabled_usage_events
    FROM pg_class
    WHERE relname = 'usage_events';
    
    -- Vérifier pixel_projects_list
    SELECT relrowsecurity INTO rls_enabled_pixel_projects_list
    FROM pg_class
    WHERE relname = 'pixel_projects_list';
    
    -- Vérifier si c'est une vue
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'pixel_projects_list'
    ) INTO is_pixel_projects_list_view;
    
    -- Compter les politiques
    SELECT COUNT(*) INTO policies_count_user_profiles
    FROM pg_policies
    WHERE tablename = 'user_profiles';
    
    SELECT COUNT(*) INTO policies_count_usage_events
    FROM pg_policies
    WHERE tablename = 'usage_events';
    
    SELECT COUNT(*) INTO policies_count_pixel_projects_list
    FROM pg_policies
    WHERE tablename = 'pixel_projects_list';
    
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '   VÉRIFICATION RLS ET POLITIQUES';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    
    IF rls_enabled_user_profiles THEN
        RAISE NOTICE '✅ user_profiles : RLS activé (% politiques)', policies_count_user_profiles;
    ELSE
        RAISE WARNING '⚠️  user_profiles : RLS NON activé';
    END IF;
    
    IF rls_enabled_usage_events THEN
        RAISE NOTICE '✅ usage_events : RLS activé (% politiques)', policies_count_usage_events;
    ELSE
        RAISE WARNING '⚠️  usage_events : RLS NON activé';
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_class WHERE relname = 'pixel_projects_list') THEN
        IF is_pixel_projects_list_view THEN
            IF rls_enabled_pixel_projects_list THEN
                RAISE NOTICE '✅ pixel_projects_list (vue) : RLS activé (% politiques)', policies_count_pixel_projects_list;
            ELSE
                RAISE WARNING '⚠️  pixel_projects_list (vue) : RLS NON activé - Vérifiez les politiques sur les tables sous-jacentes';
            END IF;
        ELSE
            IF rls_enabled_pixel_projects_list THEN
                RAISE NOTICE '✅ pixel_projects_list (table) : RLS activé (% politiques)', policies_count_pixel_projects_list;
            ELSE
                RAISE WARNING '⚠️  pixel_projects_list (table) : RLS NON activé';
            END IF;
        END IF;
    ELSE
        RAISE NOTICE 'ℹ️  pixel_projects_list : n''existe pas';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    RAISE NOTICE '💡 Vérifiez dans Supabase Dashboard → Database → Tables';
    RAISE NOTICE '📊 Les tables ne devraient plus être marquées "Unrestricted"';
    RAISE NOTICE '';
END $$;

-- =====================================================
-- ALTERNATIVE : SUPPRIMER pixel_projects_list SI INUTILE
-- =====================================================
--
-- Si pixel_projects_list est une vue inutile et que vous ne l'utilisez pas,
-- vous pouvez la supprimer en décommentant les lignes ci-dessous :
--
-- DROP VIEW IF EXISTS pixel_projects_list CASCADE;
--
-- OU si c'est une table :
--
-- DROP TABLE IF EXISTS pixel_projects_list CASCADE;
--
-- =====================================================
-- NOTES
-- =====================================================
--
-- ✓ RLS est maintenant activé sur user_profiles et usage_events
-- ✓ Chaque utilisateur ne peut voir/modifier que ses propres données
-- ✓ Les événements analytics ne peuvent être que créés, pas modifiés
--
-- ⚠️  Si pixel_projects_list reste "Unrestricted" :
--   1. Vérifiez si c'est une vue ou une table dans Supabase Dashboard
--   2. Si c'est une vue inutile, supprimez-la (voir section ALTERNATIVE ci-dessus)
--   3. Si c'est une table nécessaire, vérifiez qu'elle a bien un user_id
--   4. Si c'est une vue nécessaire, les politiques RLS sur pixel_projects devraient suffire
--
-- Pour vérifier dans Supabase :
--   1. Allez dans Database → Tables
--   2. Cliquez sur une table
--   3. Allez dans l'onglet "Policies"
--   4. Vous devriez voir les politiques créées
--
-- =====================================================

