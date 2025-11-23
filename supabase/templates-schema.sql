-- =====================================================
-- PIXEL ART EDITOR - TEMPLATES SYSTEM
-- Schema pour le système de modèles à réaliser partagés
-- =====================================================

-- Table pour les modèles partagés par les utilisateurs
CREATE TABLE IF NOT EXISTS pixel_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Auteur du modèle
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    author_email TEXT NOT NULL,
    
    -- Informations du modèle
    name TEXT NOT NULL,
    description TEXT,
    
    -- Catégorie principale (thème)
    category TEXT NOT NULL CHECK (category IN (
        'Jeux Vidéo', 'Films', 'Séries TV', 'Dessin Animé', 'Manga/Anime',
        'Super-Héros', 'Personnages', 'Animaux', 'Nature', 'Architecture',
        'Véhicules', 'Nourriture', 'Objets', 'Emoji', 'Formes',
        'Fantasy', 'Science-Fiction', 'Horreur', 'Autre'
    )),
    
    -- Style précis (tags multiples)
    style_tags TEXT[] DEFAULT '{}', -- Ex: ['jeux-video', 'zelda', '8-bit']
    -- Styles disponibles : 
    -- - jeux-video, zelda, mario, pokemon, minecraft, retro, 8-bit, 16-bit
    -- - dessin-anime, anime, manga, studio-ghibli, disney
    -- - marvel, dc-comics, super-heros, batman, spider-man
    -- - fantasy, medieval, science-fiction, futuriste
    -- - nature, animaux, fleurs, arbres, oiseaux
    -- - vehicules, voitures, avions, bateaux
    -- - nourriture, fruits, legume, dessert
    -- - objets, meubles, outils, electronique
    
    -- Données du modèle
    template_data JSONB NOT NULL, -- Contient la frame avec les pixels
    
    -- Métadonnées visuelles
    thumbnail TEXT, -- Aperçu base64 du modèle fini
    preview_data JSONB, -- Aperçu complet pour la galerie
    
    -- Difficulté
    difficulty INTEGER DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 5),
    
    -- Statistiques
    view_count INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    
    -- Validation et modération
    is_public BOOLEAN DEFAULT true,
    is_approved BOOLEAN DEFAULT true, -- Pour modération future
    is_featured BOOLEAN DEFAULT false, -- Modèles mis en avant
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Contraintes
    CONSTRAINT name_length CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
    CONSTRAINT description_length CHECK (description IS NULL OR char_length(description) <= 500)
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_pixel_templates_category ON pixel_templates(category);
CREATE INDEX IF NOT EXISTS idx_pixel_templates_author ON pixel_templates(author_id);
CREATE INDEX IF NOT EXISTS idx_pixel_templates_public ON pixel_templates(is_public, is_approved);
CREATE INDEX IF NOT EXISTS idx_pixel_templates_created ON pixel_templates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pixel_templates_featured ON pixel_templates(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_pixel_templates_style_tags ON pixel_templates USING GIN(style_tags);
CREATE INDEX IF NOT EXISTS idx_pixel_templates_difficulty ON pixel_templates(difficulty);
CREATE INDEX IF NOT EXISTS idx_pixel_templates_view_count ON pixel_templates(view_count DESC);

-- Index pour la recherche par tags
CREATE INDEX IF NOT EXISTS idx_pixel_templates_tags_gin ON pixel_templates USING GIN(style_tags);

-- Table pour les favoris des utilisateurs
CREATE TABLE IF NOT EXISTS template_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_id UUID NOT NULL REFERENCES pixel_templates(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(template_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_template_favorites_user ON template_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_template_favorites_template ON template_favorites(template_id);

-- Table pour le suivi des complétions
CREATE TABLE IF NOT EXISTS template_completions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_id UUID NOT NULL REFERENCES pixel_templates(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    completion_time_seconds INTEGER, -- Temps mis pour compléter
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(template_id, user_id) -- Un utilisateur ne peut compléter qu'une fois par modèle
);

CREATE INDEX IF NOT EXISTS idx_template_completions_template ON template_completions(template_id);
CREATE INDEX IF NOT EXISTS idx_template_completions_user ON template_completions(user_id);

-- Fonction pour incrémenter le compteur de vues
CREATE OR REPLACE FUNCTION increment_template_view_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pixel_templates 
    SET view_count = view_count + 1 
    WHERE id = NEW.template_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_pixel_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pixel_templates_updated_at_trigger ON pixel_templates;
CREATE TRIGGER update_pixel_templates_updated_at_trigger
    BEFORE UPDATE ON pixel_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_pixel_templates_updated_at();

-- Fonction pour incrémenter le compteur de complétions
CREATE OR REPLACE FUNCTION increment_template_completion_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pixel_templates 
    SET completion_count = completion_count + 1 
    WHERE id = NEW.template_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour incrémenter le compteur de complétions
DROP TRIGGER IF EXISTS increment_template_completion_count_trigger ON template_completions;
CREATE TRIGGER increment_template_completion_count_trigger
    AFTER INSERT ON template_completions
    FOR EACH ROW
    EXECUTE FUNCTION increment_template_completion_count();

-- Fonction pour mettre à jour le compteur de favoris
CREATE OR REPLACE FUNCTION update_template_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE pixel_templates 
        SET favorite_count = favorite_count + 1 
        WHERE id = NEW.template_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE pixel_templates 
        SET favorite_count = GREATEST(favorite_count - 1, 0)
        WHERE id = OLD.template_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour le compteur de favoris
DROP TRIGGER IF EXISTS update_template_favorite_count_trigger ON template_favorites;
CREATE TRIGGER update_template_favorite_count_trigger
    AFTER INSERT OR DELETE ON template_favorites
    FOR EACH ROW
    EXECUTE FUNCTION update_template_favorite_count();

-- RLS Policies
ALTER TABLE pixel_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_completions ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut voir les modèles publics et approuvés
CREATE POLICY "Anyone can view public templates"
    ON pixel_templates FOR SELECT
    USING (is_public = true AND is_approved = true);

-- Politique : Les utilisateurs authentifiés peuvent créer des modèles
CREATE POLICY "Authenticated users can create templates"
    ON pixel_templates FOR INSERT
    WITH CHECK (auth.uid() = author_id);

-- Politique : Les auteurs peuvent modifier leurs propres modèles
CREATE POLICY "Authors can update their own templates"
    ON pixel_templates FOR UPDATE
    USING (auth.uid() = author_id);

-- Politique : Les auteurs peuvent supprimer leurs propres modèles
CREATE POLICY "Authors can delete their own templates"
    ON pixel_templates FOR DELETE
    USING (auth.uid() = author_id);

-- Politique : Les utilisateurs peuvent gérer leurs favoris
CREATE POLICY "Users can manage their own favorites"
    ON template_favorites FOR ALL
    USING (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent voir leurs complétions
CREATE POLICY "Users can view their own completions"
    ON template_completions FOR SELECT
    USING (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent créer leurs complétions
CREATE POLICY "Users can create their own completions"
    ON template_completions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

COMMENT ON TABLE pixel_templates IS 'Modèles de pixel art partagés par les utilisateurs pour que d''autres puissent les réaliser';
COMMENT ON TABLE template_favorites IS 'Favoris des utilisateurs pour les modèles';
COMMENT ON TABLE template_completions IS 'Suivi des complétions de modèles par les utilisateurs';

