-- =====================================================
-- PIXEL_PROJECTS : colonne 'type' pour distinguer projets et tampons
-- =====================================================
-- Permet de stocker projets et tampons dans la même table
-- en les filtrant par type ('project' | 'stamp').

ALTER TABLE public.pixel_projects
    ADD COLUMN IF NOT EXISTS type VARCHAR(16) DEFAULT 'project';

-- Contraintes valeurs possibles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'pixel_projects_type_check'
    ) THEN
        ALTER TABLE public.pixel_projects
            ADD CONSTRAINT pixel_projects_type_check
            CHECK (type IN ('project', 'stamp'));
    END IF;
END $$;

-- Index pour accélérer le filtrage par utilisateur + type
CREATE INDEX IF NOT EXISTS pixel_projects_user_type_idx
    ON public.pixel_projects (user_id, type);

-- Backfill : toute ligne existante sans type devient 'project'
UPDATE public.pixel_projects
SET type = 'project'
WHERE type IS NULL;

-- Remplace l'ancienne UNIQUE (user_id, name) par UNIQUE (user_id, name, type)
-- afin d'autoriser un projet et un tampon avec le même nom pour un utilisateur.
DO $$
DECLARE
    old_constraint TEXT;
BEGIN
    SELECT conname INTO old_constraint
    FROM pg_constraint
    WHERE conrelid = 'public.pixel_projects'::regclass
      AND contype = 'u'
      AND pg_get_constraintdef(oid) = 'UNIQUE (user_id, name)';
    IF old_constraint IS NOT NULL THEN
        EXECUTE format('ALTER TABLE public.pixel_projects DROP CONSTRAINT %I', old_constraint);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conrelid = 'public.pixel_projects'::regclass
          AND contype = 'u'
          AND pg_get_constraintdef(oid) = 'UNIQUE (user_id, name, type)'
    ) THEN
        ALTER TABLE public.pixel_projects
            ADD CONSTRAINT pixel_projects_user_name_type_key UNIQUE (user_id, name, type);
    END IF;
END $$;
