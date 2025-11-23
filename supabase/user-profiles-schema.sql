-- =====================================================
-- PIXEL ART EDITOR - USER PROFILES SYSTEM
-- Schema pour le système de profils utilisateurs avec pseudonymes
-- =====================================================

-- Table pour les profils utilisateurs
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Lien avec l'utilisateur authentifié
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    user_email TEXT, -- Optionnel (pour compatibilité avec les anciennes versions)
    
    -- Pseudo de l'utilisateur (affiché publiquement)
    username TEXT NOT NULL,
    
    -- Avatar de l'utilisateur (données pixel art en JSONB)
    avatar_data JSONB, -- Array de pixels pour l'avatar (format: [{color: '#FF0000', isEmpty: false}, ...])
    avatar_size INTEGER DEFAULT 16, -- Taille de l'avatar (16x16 par défaut)
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- S'assurer que toutes les colonnes existent (au cas où la table aurait été créée partiellement)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        -- Ajouter user_email si elle n'existe pas (pour compatibilité)
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' AND column_name = 'user_email'
        ) THEN
            ALTER TABLE user_profiles ADD COLUMN user_email TEXT;
        ELSE
            -- Si la colonne existe mais est NOT NULL, la rendre optionnelle
            IF EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'user_profiles' 
                AND column_name = 'user_email' 
                AND is_nullable = 'NO'
            ) THEN
                ALTER TABLE user_profiles ALTER COLUMN user_email DROP NOT NULL;
            END IF;
        END IF;
        
        -- Ajouter username si elle n'existe pas
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' AND column_name = 'username'
        ) THEN
            ALTER TABLE user_profiles ADD COLUMN username TEXT NOT NULL DEFAULT 'user';
        END IF;
        
        -- Ajouter avatar_data si elle n'existe pas
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' AND column_name = 'avatar_data'
        ) THEN
            ALTER TABLE user_profiles ADD COLUMN avatar_data JSONB;
        END IF;
        
        -- Ajouter avatar_size si elle n'existe pas
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' AND column_name = 'avatar_size'
        ) THEN
            ALTER TABLE user_profiles ADD COLUMN avatar_size INTEGER DEFAULT 16;
        END IF;
    END IF;
END $$;

-- Ajouter les contraintes si elles n'existent pas déjà
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        -- Ajouter la contrainte de longueur si elle n'existe pas
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'username_length' 
            AND conrelid = 'user_profiles'::regclass
        ) THEN
            ALTER TABLE user_profiles 
            ADD CONSTRAINT username_length 
            CHECK (char_length(username) >= 2 AND char_length(username) <= 30);
        END IF;
        
        -- Ajouter la contrainte de format si elle n'existe pas
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'username_format' 
            AND conrelid = 'user_profiles'::regclass
        ) THEN
            ALTER TABLE user_profiles 
            ADD CONSTRAINT username_format 
            CHECK (username ~ '^[a-zA-Z0-9_-]+$');
        END IF;
    END IF;
END $$;

-- Index pour les recherches par username
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);

-- RLS Policies pour user_profiles
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
        
        -- Policy : Les utilisateurs peuvent voir tous les profils publics (pour afficher les pseudos)
        DROP POLICY IF EXISTS "Allow authenticated users to view all profiles" ON user_profiles;
        CREATE POLICY "Allow authenticated users to view all profiles"
        ON user_profiles FOR SELECT USING (true);
        
        -- Policy : Les utilisateurs peuvent créer leur propre profil
        DROP POLICY IF EXISTS "Allow users to create their own profile" ON user_profiles;
        CREATE POLICY "Allow users to create their own profile"
        ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
        
        -- Policy : Les utilisateurs peuvent mettre à jour leur propre profil
        DROP POLICY IF EXISTS "Allow users to update their own profile" ON user_profiles;
        CREATE POLICY "Allow users to update their own profile"
        ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
        
        -- Policy : Les utilisateurs peuvent supprimer leur propre profil
        DROP POLICY IF EXISTS "Allow users to delete their own profile" ON user_profiles;
        CREATE POLICY "Allow users to delete their own profile"
        ON user_profiles FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Fonction pour générer un pseudo par défaut basé sur l'email
CREATE OR REPLACE FUNCTION generate_default_username(email TEXT)
RETURNS TEXT AS $$
DECLARE
    base_username TEXT;
    counter INTEGER := 0;
    final_username TEXT;
BEGIN
    -- Extraire la partie avant @ de l'email
    base_username := split_part(email, '@', 1);
    
    -- Nettoyer le nom (enlever caractères spéciaux, garder seulement alphanumérique, tirets et underscores)
    base_username := regexp_replace(base_username, '[^a-zA-Z0-9_-]', '', 'g');
    
    -- Limiter à 25 caractères pour laisser de la place pour un numéro si nécessaire
    IF char_length(base_username) > 25 THEN
        base_username := substring(base_username FROM 1 FOR 25);
    END IF;
    
    -- Si le nom est trop court, ajouter "user"
    IF char_length(base_username) < 2 THEN
        base_username := 'user';
    END IF;
    
    -- Vérifier si le pseudo existe déjà et ajouter un numéro si nécessaire
    final_username := base_username;
    WHILE EXISTS (SELECT 1 FROM user_profiles WHERE username = final_username) LOOP
        counter := counter + 1;
        final_username := base_username || counter;
    END LOOP;
    
    RETURN final_username;
END;
$$ LANGUAGE plpgsql;

-- Ajouter le champ author_username à pixel_templates si il n'existe pas
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pixel_templates') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pixel_templates' AND column_name = 'author_username') THEN
            ALTER TABLE pixel_templates ADD COLUMN author_username TEXT;
        END IF;
        
        -- Créer un index pour author_username
        IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_pixel_templates_author_username') THEN
            CREATE INDEX idx_pixel_templates_author_username ON pixel_templates(author_username);
        END IF;
    END IF;
END $$;

-- Fonction pour mettre à jour author_username lors de la création/mise à jour d'un template
CREATE OR REPLACE FUNCTION update_template_author_username()
RETURNS TRIGGER AS $$
DECLARE
    user_username TEXT;
BEGIN
    -- Essayer de récupérer le pseudo depuis user_profiles
    -- Utiliser un bloc d'exception pour gérer les erreurs
    BEGIN
        SELECT username INTO user_username
        FROM user_profiles
        WHERE user_id = NEW.author_id;
        
        -- Si un pseudo est trouvé et qu'il n'est pas vide, l'utiliser
        IF user_username IS NOT NULL AND user_username != '' THEN
            NEW.author_username := user_username;
            RETURN NEW;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            -- En cas d'erreur (table n'existe pas, etc.), continuer avec le fallback
            NULL;
    END;
    
    -- Fallback : utiliser la partie avant @ de l'email
    IF NEW.author_email IS NOT NULL AND NEW.author_email != '' THEN
        NEW.author_username := split_part(NEW.author_email, '@', 1);
    ELSE
        NEW.author_username := 'Anonyme';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour author_username automatiquement
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pixel_templates') THEN
        DROP TRIGGER IF EXISTS trigger_update_template_author_username ON pixel_templates;
        CREATE TRIGGER trigger_update_template_author_username
            BEFORE INSERT OR UPDATE ON pixel_templates
            FOR EACH ROW
            EXECUTE FUNCTION update_template_author_username();
    END IF;
END $$;

-- Ajouter les commentaires de manière sécurisée
DO $$
BEGIN
    -- Commentaire sur la table
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        COMMENT ON TABLE user_profiles IS 'Profils utilisateurs avec pseudonymes pour protéger la vie privée';
        
        -- Commentaire sur la colonne username
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'user_profiles' AND column_name = 'username'
        ) THEN
            COMMENT ON COLUMN user_profiles.username IS 'Pseudo public affiché au lieu de l''email';
        END IF;
    END IF;
    
    -- Commentaire sur la colonne author_username de pixel_templates
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pixel_templates') THEN
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'pixel_templates' AND column_name = 'author_username'
        ) THEN
            COMMENT ON COLUMN pixel_templates.author_username IS 'Pseudo de l''auteur (mis à jour automatiquement depuis user_profiles)';
        END IF;
    END IF;
END $$;

