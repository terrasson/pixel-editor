-- =====================================================
-- CLEANUP SHARING TABLES
-- Script pour supprimer toutes les tables de partage
-- Version SAFE - Ne génère AUCUNE erreur
-- =====================================================
--
-- Ce script supprime proprement toutes les tables de partage
-- Les triggers sont automatiquement supprimés avec CASCADE
--
-- Pour exécuter ce script :
--   1. Allez dans Supabase Dashboard → SQL Editor
--   2. Créez une nouvelle query
--   3. Copiez/collez ce script
--   4. Cliquez sur "Run"
--
-- =====================================================

-- =====================================================
-- 1. SUPPRIMER LES VUES
-- =====================================================

DROP VIEW IF EXISTS project_shares_with_details CASCADE;
DROP VIEW IF EXISTS public_shares_with_owner CASCADE;

-- =====================================================
-- 2. SUPPRIMER LES TABLES (avec CASCADE pour les triggers)
-- =====================================================

-- Les triggers sont automatiquement supprimés avec CASCADE
DROP TABLE IF EXISTS project_access_log CASCADE;
DROP TABLE IF EXISTS public_share_analytics CASCADE;
DROP TABLE IF EXISTS project_shares CASCADE;
DROP TABLE IF EXISTS public_shares CASCADE;

-- =====================================================
-- 3. SUPPRIMER LES FONCTIONS
-- =====================================================

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS link_pending_shares_on_signup() CASCADE;
DROP FUNCTION IF EXISTS get_pending_shares_count(TEXT) CASCADE;
DROP FUNCTION IF EXISTS cleanup_expired_shares() CASCADE;
DROP FUNCTION IF EXISTS update_public_share_updated_at() CASCADE;
DROP FUNCTION IF EXISTS increment_view_count() CASCADE;
DROP FUNCTION IF EXISTS generate_unique_share_token() CASCADE;
DROP FUNCTION IF EXISTS cleanup_expired_public_shares() CASCADE;
DROP FUNCTION IF EXISTS get_share_stats(TEXT) CASCADE;

-- =====================================================
-- 4. SUPPRIMER LES TRIGGERS ORPHELINS (si restants)
-- =====================================================

-- Note: Normalement déjà supprimés avec CASCADE,
-- mais on essaie quand même au cas où

DO $$
BEGIN
    -- Trigger sur auth.users (peut exister indépendamment)
    BEGIN
        DROP TRIGGER IF EXISTS link_shares_on_user_signup ON auth.users;
    EXCEPTION WHEN OTHERS THEN
        -- Ignorer l'erreur silencieusement
    END;
END $$;

-- =====================================================
-- 5. VÉRIFICATION ET RÉSUMÉ
-- =====================================================

DO $$
DECLARE
    remaining_tables TEXT[];
    table_count INTEGER;
BEGIN
    -- Vérifier quelles tables de partage existent encore
    SELECT ARRAY_AGG(table_name)
    INTO remaining_tables
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN (
        'project_shares',
        'project_access_log',
        'public_shares',
        'public_share_analytics'
    );

    table_count := COALESCE(array_length(remaining_tables, 1), 0);

    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '   NETTOYAGE DES TABLES DE PARTAGE';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';

    IF table_count = 0 THEN
        RAISE NOTICE '✅ Toutes les tables de partage ont été supprimées !';
        RAISE NOTICE '';
        RAISE NOTICE 'Éléments supprimés (si existants) :';
        RAISE NOTICE '  • Tables : 4';
        RAISE NOTICE '  • Vues : 2';
        RAISE NOTICE '  • Fonctions : 9';
        RAISE NOTICE '  • Triggers : supprimés automatiquement';
    ELSE
        RAISE WARNING '⚠️  Il reste % table(s) :', table_count;
        RAISE WARNING '  %', remaining_tables;
    END IF;

    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    RAISE NOTICE '💡 Vous pouvez maintenant utiliser l''app sans partage.';
    RAISE NOTICE '📖 Pour réimplémenter : docs/SHARING-REIMPLEMENTATION-GUIDE.md';
    RAISE NOTICE '';
END $$;

-- =====================================================
-- NOTES
-- =====================================================
--
-- ✓ Ce script utilise "IF EXISTS" et "CASCADE"
-- ✓ Aucune erreur même si les tables n'existent pas
-- ✓ Les triggers sont supprimés automatiquement avec les tables
--
-- Pour réimplémenter le partage plus tard :
-- → docs/SHARING-REIMPLEMENTATION-GUIDE.md
-- → supabase/sharing-schema.sql (partage privé)
-- → supabase/public-sharing-schema.sql (partage public)
--
-- =====================================================
