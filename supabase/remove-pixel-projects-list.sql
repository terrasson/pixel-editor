-- =====================================================
-- SUPPRIMER pixel_projects_list
-- Script pour supprimer la table/vue pixel_projects_list
-- si elle n'est pas utilisée dans l'application
-- =====================================================
--
-- ⚠️  ATTENTION : Ce script supprime définitivement pixel_projects_list
-- Vérifiez d'abord dans votre code si cette table/vue est utilisée !
--
-- =====================================================

-- Supprimer la vue si elle existe
DROP VIEW IF EXISTS pixel_projects_list CASCADE;

-- Supprimer la table si elle existe (au cas où c'est une table)
DROP TABLE IF EXISTS pixel_projects_list CASCADE;

-- Vérification
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pixel_projects_list'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.views 
        WHERE table_schema = 'public' 
        AND table_name = 'pixel_projects_list'
    ) THEN
        RAISE NOTICE '';
        RAISE NOTICE '✅ pixel_projects_list a été supprimé avec succès !';
        RAISE NOTICE '';
    ELSE
        RAISE WARNING '⚠️  pixel_projects_list existe toujours - Vérifiez les dépendances';
    END IF;
END $$;

-- =====================================================
-- NOTES
-- =====================================================
--
-- Après avoir exécuté ce script :
--   1. Rafraîchissez votre Supabase Dashboard
--   2. pixel_projects_list ne devrait plus apparaître dans la liste
--   3. Le tag "Unrestricted" disparaîtra
--
-- =====================================================

