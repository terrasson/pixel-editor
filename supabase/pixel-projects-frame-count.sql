-- =====================================================
-- PIXEL_PROJECTS : colonne dénormalisée frame_count
-- =====================================================
-- Permet au listing galerie de savoir si un projet est animé
-- sans charger tout frames (gain egress ~99% sur /gallery).

ALTER TABLE public.pixel_projects
    ADD COLUMN IF NOT EXISTS frame_count INT DEFAULT 1;

-- Trigger qui maintient frame_count à jour
CREATE OR REPLACE FUNCTION update_pixel_projects_frame_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.frames IS NOT NULL AND jsonb_typeof(NEW.frames) = 'array' THEN
        NEW.frame_count := jsonb_array_length(NEW.frames);
    ELSE
        NEW.frame_count := 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS pixel_projects_frame_count_trigger ON public.pixel_projects;
CREATE TRIGGER pixel_projects_frame_count_trigger
    BEFORE INSERT OR UPDATE OF frames ON public.pixel_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_pixel_projects_frame_count();

-- Backfill pour les lignes existantes
UPDATE public.pixel_projects
SET frame_count = CASE
    WHEN jsonb_typeof(frames) = 'array' THEN jsonb_array_length(frames)
    ELSE 1
END
WHERE frame_count IS NULL OR frame_count = 1;
