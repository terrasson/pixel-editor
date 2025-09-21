-- Script SQL pour créer la table des projets pixel art dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

CREATE TABLE pixel_projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  frames TEXT NOT NULL,
  current_frame INTEGER DEFAULT 0,
  custom_colors TEXT,
  device_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_pixel_projects_updated_at ON pixel_projects(updated_at DESC);
CREATE INDEX idx_pixel_projects_name ON pixel_projects(name);

-- Politique de sécurité (permet à tout le monde de lire/écrire pour ce projet simple)
-- 🚨 ATTENTION: En production, il faudrait une authentification plus sécurisée
ALTER TABLE pixel_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for everyone" ON pixel_projects
FOR ALL USING (true) WITH CHECK (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pixel_projects_updated_at 
    BEFORE UPDATE ON pixel_projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 