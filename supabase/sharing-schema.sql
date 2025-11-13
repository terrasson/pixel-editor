-- =====================================================
-- PIXEL ART EDITOR - SHARING SYSTEM
-- Schema pour le système de partage de projets
-- =====================================================

-- Table pour les partages de projets
CREATE TABLE IF NOT EXISTS project_shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Références
    project_id UUID NOT NULL REFERENCES pixel_projects(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Destinataire
    shared_with_email TEXT NOT NULL,
    shared_with_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Permissions
    permission TEXT NOT NULL DEFAULT 'can_duplicate' CHECK (permission IN ('view_only', 'can_duplicate', 'can_edit')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),

    -- Métadonnées
    message TEXT,
    expires_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Contraintes
    UNIQUE(project_id, shared_with_email),
    CHECK (shared_with_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_project_shares_shared_with_email ON project_shares(shared_with_email);
CREATE INDEX IF NOT EXISTS idx_project_shares_shared_with_user_id ON project_shares(shared_with_user_id);
CREATE INDEX IF NOT EXISTS idx_project_shares_owner_id ON project_shares(owner_id);
CREATE INDEX IF NOT EXISTS idx_project_shares_project_id ON project_shares(project_id);
CREATE INDEX IF NOT EXISTS idx_project_shares_status ON project_shares(status);

-- Table pour le log des accès (optionnel, pour analytics)
CREATE TABLE IF NOT EXISTS project_access_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    share_id UUID NOT NULL REFERENCES project_shares(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL CHECK (action IN ('viewed', 'duplicated', 'declined', 'accepted')),
    accessed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_access_log_share_id ON project_access_log(share_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_shares_updated_at
    BEFORE UPDATE ON project_shares
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour associer automatiquement shared_with_user_id quand un utilisateur s'inscrit
CREATE OR REPLACE FUNCTION link_pending_shares_on_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Mettre à jour les partages en attente pour cet email
    UPDATE project_shares
    SET shared_with_user_id = NEW.id,
        updated_at = NOW()
    WHERE shared_with_email = NEW.email
      AND shared_with_user_id IS NULL;

    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER link_shares_on_user_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION link_pending_shares_on_signup();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Activer RLS sur project_shares
ALTER TABLE project_shares ENABLE ROW LEVEL SECURITY;

-- Policy 1: Les utilisateurs peuvent voir les partages qu'ils ont créés
CREATE POLICY "Users can view shares they created"
    ON project_shares
    FOR SELECT
    USING (auth.uid() = owner_id);

-- Policy 2: Les utilisateurs peuvent voir les partages qui leur sont destinés
CREATE POLICY "Users can view shares shared with them"
    ON project_shares
    FOR SELECT
    USING (
        auth.uid() = shared_with_user_id
        OR (
            shared_with_user_id IS NULL
            AND shared_with_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Policy 3: Les utilisateurs peuvent créer des partages pour leurs propres projets
CREATE POLICY "Users can create shares for their projects"
    ON project_shares
    FOR INSERT
    WITH CHECK (
        auth.uid() = owner_id
        AND EXISTS (
            SELECT 1 FROM pixel_projects
            WHERE id = project_id
            AND user_id = auth.uid()
        )
    );

-- Policy 4: Les propriétaires peuvent mettre à jour leurs partages
CREATE POLICY "Owners can update their shares"
    ON project_shares
    FOR UPDATE
    USING (auth.uid() = owner_id);

-- Policy 5: Les destinataires peuvent mettre à jour le statut des partages qui leur sont destinés
CREATE POLICY "Recipients can update share status"
    ON project_shares
    FOR UPDATE
    USING (
        auth.uid() = shared_with_user_id
        OR (
            shared_with_user_id IS NULL
            AND shared_with_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    )
    WITH CHECK (
        -- Ils peuvent seulement changer le statut, pas les autres champs
        status IN ('accepted', 'declined')
    );

-- Policy 6: Les propriétaires peuvent supprimer leurs partages
CREATE POLICY "Owners can delete their shares"
    ON project_shares
    FOR DELETE
    USING (auth.uid() = owner_id);

-- Policy 7: Les destinataires peuvent "supprimer" (décliner) les partages qui leur sont destinés
CREATE POLICY "Recipients can decline shares"
    ON project_shares
    FOR DELETE
    USING (
        auth.uid() = shared_with_user_id
        OR (
            shared_with_user_id IS NULL
            AND shared_with_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- =====================================================
-- RLS pour project_access_log
-- =====================================================

ALTER TABLE project_access_log ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir les logs de leurs partages
CREATE POLICY "Users can view logs of their shares"
    ON project_access_log
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM project_shares
            WHERE id = share_id
            AND owner_id = auth.uid()
        )
    );

-- Les utilisateurs peuvent créer des logs pour les partages auxquels ils ont accès
CREATE POLICY "Users can create logs for accessible shares"
    ON project_access_log
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM project_shares
            WHERE id = share_id
            AND (
                shared_with_user_id = auth.uid()
                OR (
                    shared_with_user_id IS NULL
                    AND shared_with_email = (SELECT email FROM auth.users WHERE id = auth.uid())
                )
            )
        )
    );

-- =====================================================
-- FONCTIONS UTILES
-- =====================================================

-- Fonction pour obtenir le nombre de partages en attente pour un utilisateur
CREATE OR REPLACE FUNCTION get_pending_shares_count(user_email TEXT)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER
        FROM project_shares
        WHERE shared_with_email = user_email
        AND status = 'pending'
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour nettoyer les partages expirés
CREATE OR REPLACE FUNCTION cleanup_expired_shares()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM project_shares
    WHERE expires_at IS NOT NULL
    AND expires_at < NOW()
    AND status = 'pending';

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VUES UTILES
-- =====================================================

-- Vue pour obtenir les informations complètes des partages
CREATE OR REPLACE VIEW project_shares_with_details AS
SELECT
    ps.*,
    pp.name as project_name,
    pp.thumbnail as project_thumbnail,
    pp.fps as project_fps,
    owner.email as owner_email,
    recipient.email as recipient_email
FROM project_shares ps
JOIN pixel_projects pp ON ps.project_id = pp.id
LEFT JOIN auth.users owner ON ps.owner_id = owner.id
LEFT JOIN auth.users recipient ON ps.shared_with_user_id = recipient.id;

-- =====================================================
-- COMMENTAIRES
-- =====================================================

COMMENT ON TABLE project_shares IS 'Gestion des partages de projets entre utilisateurs';
COMMENT ON COLUMN project_shares.permission IS 'Type de permission: view_only, can_duplicate, can_edit';
COMMENT ON COLUMN project_shares.status IS 'Statut du partage: pending, accepted, declined';
COMMENT ON COLUMN project_shares.expires_at IS 'Date d''expiration du partage (NULL = permanent)';

-- =====================================================
-- SUCCÈS !
-- =====================================================

SELECT 'Schéma de partage créé avec succès !' as message;
