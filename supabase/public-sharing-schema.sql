-- =====================================================
-- PIXEL ART EDITOR - PUBLIC SHARING SYSTEM
-- Schema pour le système de partage public par lien
-- =====================================================

-- Table pour les partages publics
CREATE TABLE IF NOT EXISTS public_shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Identifiant court pour l'URL (ex: abc123)
    share_token TEXT UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 8),

    -- Référence au projet
    project_id UUID NOT NULL REFERENCES pixel_projects(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Les données de projet sont lues via JOIN sur pixel_projects (project_id).
    -- La colonne project_snapshot a été supprimée pour éviter la duplication.
    project_name TEXT NOT NULL,
    project_thumbnail TEXT,

    -- Statistiques
    view_count INTEGER DEFAULT 0,
    duplicate_count INTEGER DEFAULT 0,

    -- Configuration
    allow_duplicate BOOLEAN DEFAULT true,
    is_public_gallery BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Index pour recherche rapide
    CONSTRAINT share_token_length CHECK (char_length(share_token) >= 6)
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_public_shares_token ON public_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_public_shares_owner ON public_shares(owner_id);
CREATE INDEX IF NOT EXISTS idx_public_shares_project ON public_shares(project_id);
CREATE INDEX IF NOT EXISTS idx_public_shares_created ON public_shares(created_at DESC);

-- Table pour les analytics des partages publics
CREATE TABLE IF NOT EXISTS public_share_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    share_id UUID NOT NULL REFERENCES public_shares(id) ON DELETE CASCADE,

    -- Action
    action TEXT NOT NULL CHECK (action IN ('viewed', 'duplicated', 'link_copied')),

    -- Métadonnées optionnelles
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_agent TEXT,
    referrer TEXT,

    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_public_share_analytics_share ON public_share_analytics(share_id);
CREATE INDEX IF NOT EXISTS idx_public_share_analytics_action ON public_share_analytics(action);
CREATE INDEX IF NOT EXISTS idx_public_share_analytics_created ON public_share_analytics(created_at DESC);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_public_share_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_public_shares_updated_at
    BEFORE UPDATE ON public_shares
    FOR EACH ROW
    EXECUTE FUNCTION update_public_share_updated_at();

-- Trigger pour incrémenter view_count
CREATE OR REPLACE FUNCTION increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.action = 'viewed' THEN
        UPDATE public_shares
        SET view_count = view_count + 1
        WHERE id = NEW.share_id;
    ELSIF NEW.action = 'duplicated' THEN
        UPDATE public_shares
        SET duplicate_count = duplicate_count + 1
        WHERE id = NEW.share_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_share_counts
    AFTER INSERT ON public_share_analytics
    FOR EACH ROW
    EXECUTE FUNCTION increment_view_count();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Activer RLS sur public_shares
ALTER TABLE public_shares ENABLE ROW LEVEL SECURITY;

-- Policy 1: Tout le monde peut voir les partages publics non expirés
CREATE POLICY "Anyone can view non-expired public shares"
    ON public_shares
    FOR SELECT
    USING (
        expires_at IS NULL OR expires_at > NOW()
    );

-- Policy 2: Les propriétaires peuvent créer des partages publics
CREATE POLICY "Owners can create public shares"
    ON public_shares
    FOR INSERT
    WITH CHECK (
        auth.uid() = owner_id
        AND EXISTS (
            SELECT 1 FROM pixel_projects
            WHERE id = project_id
            AND user_id = auth.uid()
        )
    );

-- Policy 3: Les propriétaires peuvent mettre à jour leurs partages
CREATE POLICY "Owners can update their public shares"
    ON public_shares
    FOR UPDATE
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- Policy 4: Les propriétaires peuvent supprimer leurs partages
CREATE POLICY "Owners can delete their public shares"
    ON public_shares
    FOR DELETE
    USING (auth.uid() = owner_id);

-- RLS pour public_share_analytics
ALTER TABLE public_share_analytics ENABLE ROW LEVEL SECURITY;

-- Policy 5: Uniquement pour des partages publics valides et non expirés
CREATE POLICY "Anyone can log analytics"
    ON public_share_analytics
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public_shares
            WHERE id = share_id
            AND is_public_gallery = true
            AND (expires_at IS NULL OR expires_at > NOW())
        )
    );

-- Policy 6: Les propriétaires peuvent voir les analytics de leurs partages
CREATE POLICY "Owners can view analytics of their shares"
    ON public_share_analytics
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public_shares
            WHERE id = share_id
            AND owner_id = auth.uid()
        )
    );

-- =====================================================
-- FONCTIONS UTILES
-- =====================================================

-- Fonction pour générer un token unique
CREATE OR REPLACE FUNCTION generate_unique_share_token()
RETURNS TEXT AS $$
DECLARE
    new_token TEXT;
    token_exists BOOLEAN;
BEGIN
    LOOP
        -- Générer un token de 8 caractères
        new_token := substr(md5(random()::text || clock_timestamp()::text), 1, 8);

        -- Vérifier s'il existe déjà
        SELECT EXISTS(SELECT 1 FROM public_shares WHERE share_token = new_token) INTO token_exists;

        -- Si unique, retourner
        IF NOT token_exists THEN
            RETURN new_token;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour nettoyer les partages expirés
CREATE OR REPLACE FUNCTION cleanup_expired_public_shares()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public_shares
    WHERE expires_at IS NOT NULL
    AND expires_at < NOW();

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les statistiques d'un partage
CREATE OR REPLACE FUNCTION get_share_stats(share_token_input TEXT)
RETURNS TABLE (
    views INTEGER,
    duplicates INTEGER,
    unique_visitors BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ps.view_count,
        ps.duplicate_count,
        COUNT(DISTINCT psa.user_agent) as unique_visitors
    FROM public_shares ps
    LEFT JOIN public_share_analytics psa ON ps.id = psa.share_id
    WHERE ps.share_token = share_token_input
    GROUP BY ps.view_count, ps.duplicate_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VUES UTILES
-- =====================================================

-- Vue pour les partages publics avec informations propriétaire
CREATE OR REPLACE VIEW public_shares_with_owner AS
SELECT
    ps.*,
    u.email as owner_email
FROM public_shares ps
LEFT JOIN auth.users u ON ps.owner_id = u.id
WHERE ps.expires_at IS NULL OR ps.expires_at > NOW();

-- =====================================================
-- COMMENTAIRES
-- =====================================================

COMMENT ON TABLE public_shares IS 'Partages publics de projets via lien partageable';
COMMENT ON COLUMN public_shares.share_token IS 'Token court pour l''URL (8 caractères)';
COMMENT ON COLUMN public_shares.allow_duplicate IS 'Autorise la duplication du projet';

-- =====================================================
-- SUCCÈS !
-- =====================================================

SELECT 'Schéma de partage public créé avec succès ! 🎉' as message;
