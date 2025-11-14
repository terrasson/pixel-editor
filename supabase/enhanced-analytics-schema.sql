-- =====================================================
-- ENHANCED ANALYTICS & FEEDBACK SYSTEM
-- Schéma pour enrichir les données analytics et feedback
-- =====================================================

-- =====================================================
-- 1. ENRICHIR usage_events avec plus de métadonnées
-- =====================================================

-- Ajouter des colonnes à usage_events si elles n'existent pas
DO $$
BEGIN
    -- Device info
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usage_events' 
        AND column_name = 'device_type'
    ) THEN
        ALTER TABLE usage_events ADD COLUMN device_type TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usage_events' 
        AND column_name = 'browser'
    ) THEN
        ALTER TABLE usage_events ADD COLUMN browser TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usage_events' 
        AND column_name = 'screen_resolution'
    ) THEN
        ALTER TABLE usage_events ADD COLUMN screen_resolution TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usage_events' 
        AND column_name = 'session_id'
    ) THEN
        ALTER TABLE usage_events ADD COLUMN session_id TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usage_events' 
        AND column_name = 'referrer'
    ) THEN
        ALTER TABLE usage_events ADD COLUMN referrer TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'usage_events' 
        AND column_name = 'duration_seconds'
    ) THEN
        ALTER TABLE usage_events ADD COLUMN duration_seconds INTEGER;
    END IF;
END $$;

-- Index pour les requêtes analytics
CREATE INDEX IF NOT EXISTS idx_usage_events_device_type ON usage_events(device_type);
CREATE INDEX IF NOT EXISTS idx_usage_events_browser ON usage_events(browser);
CREATE INDEX IF NOT EXISTS idx_usage_events_session_id ON usage_events(session_id);
CREATE INDEX IF NOT EXISTS idx_usage_events_event_name ON usage_events(event_name);
CREATE INDEX IF NOT EXISTS idx_usage_events_created_at ON usage_events(created_at DESC);

-- =====================================================
-- 2. TABLE feedback - Avis et suggestions utilisateurs
-- =====================================================

CREATE TABLE IF NOT EXISTS user_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Type de feedback
    feedback_type TEXT NOT NULL CHECK (feedback_type IN ('bug', 'suggestion', 'question', 'compliment', 'other')),
    
    -- Contenu
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    
    -- Métadonnées
    email TEXT, -- Email de contact optionnel
    user_agent TEXT,
    device_type TEXT,
    browser TEXT,
    
    -- Statut (pour le créateur)
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'in_progress', 'resolved', 'archived')),
    admin_notes TEXT, -- Notes privées du créateur
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_type ON user_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_user_feedback_status ON user_feedback(status);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at DESC);

-- =====================================================
-- 3. TABLE user_sessions - Suivi des sessions utilisateurs
-- =====================================================

CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL UNIQUE,
    
    -- Informations de session
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    
    -- Device info
    device_type TEXT, -- 'mobile', 'tablet', 'desktop'
    browser TEXT,
    browser_version TEXT,
    os TEXT,
    os_version TEXT,
    screen_resolution TEXT,
    
    -- Métadonnées
    referrer TEXT,
    first_page TEXT,
    last_page TEXT,
    page_views INTEGER DEFAULT 1,
    
    -- Actions importantes
    projects_created INTEGER DEFAULT 0,
    projects_saved INTEGER DEFAULT 0,
    projects_loaded INTEGER DEFAULT 0,
    frames_created INTEGER DEFAULT 0,
    animations_played INTEGER DEFAULT 0,
    gifs_exported INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_started_at ON user_sessions(started_at DESC);

-- =====================================================
-- 4. ENRICHIR user_profiles avec plus d'informations
-- =====================================================

DO $$
BEGIN
    -- Première visite
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles' 
        AND column_name = 'first_visit_at'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN first_visit_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- Dernière visite
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles' 
        AND column_name = 'last_visit_at'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN last_visit_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- Statistiques utilisateur
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles' 
        AND column_name = 'total_projects'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN total_projects INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles' 
        AND column_name = 'total_sessions'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN total_sessions INTEGER DEFAULT 0;
    END IF;

    -- Consentement RGPD
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'user_profiles' 
        AND column_name = 'analytics_consent'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN analytics_consent BOOLEAN DEFAULT true;
    END IF;
END $$;

-- =====================================================
-- 5. TRIGGERS
-- =====================================================

-- Trigger pour mettre à jour updated_at sur user_feedback
CREATE OR REPLACE FUNCTION update_user_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_feedback_updated_at_trigger ON user_feedback;
CREATE TRIGGER update_user_feedback_updated_at_trigger
    BEFORE UPDATE ON user_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_user_feedback_updated_at();

-- Trigger pour mettre à jour updated_at sur user_sessions
CREATE OR REPLACE FUNCTION update_user_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_sessions_updated_at_trigger ON user_sessions;
CREATE TRIGGER update_user_sessions_updated_at_trigger
    BEFORE UPDATE ON user_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_sessions_updated_at();

-- Trigger pour mettre à jour last_visit_at sur user_profiles
CREATE OR REPLACE FUNCTION update_user_last_visit()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE user_profiles
    SET last_visit_at = NOW()
    WHERE user_id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_last_visit_trigger ON user_sessions;
CREATE TRIGGER update_user_last_visit_trigger
    AFTER INSERT ON user_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_last_visit();

-- =====================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- RLS pour user_feedback
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create feedback" ON user_feedback;
CREATE POLICY "Users can create feedback"
    ON user_feedback
    FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can view their own feedback" ON user_feedback;
CREATE POLICY "Users can view their own feedback"
    ON user_feedback
    FOR SELECT
    USING (auth.uid() = user_id);

-- RLS pour user_sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create their own sessions" ON user_sessions;
CREATE POLICY "Users can create their own sessions"
    ON user_sessions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own sessions" ON user_sessions;
CREATE POLICY "Users can view their own sessions"
    ON user_sessions
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own sessions" ON user_sessions;
CREATE POLICY "Users can update their own sessions"
    ON user_sessions
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 7. FONCTIONS UTILES POUR ANALYTICS
-- =====================================================

-- Fonction pour obtenir les statistiques globales
CREATE OR REPLACE FUNCTION get_analytics_summary(
    start_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '30 days',
    end_date TIMESTAMPTZ DEFAULT NOW()
)
RETURNS TABLE (
    total_users BIGINT,
    active_users BIGINT,
    total_projects BIGINT,
    total_sessions BIGINT,
    total_feedback BIGINT,
    avg_session_duration NUMERIC,
    most_used_device TEXT,
    most_used_browser TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(DISTINCT user_id) FROM user_profiles)::BIGINT as total_users,
        (SELECT COUNT(DISTINCT user_id) FROM usage_events WHERE created_at BETWEEN start_date AND end_date)::BIGINT as active_users,
        (SELECT COUNT(*) FROM pixel_projects)::BIGINT as total_projects,
        (SELECT COUNT(*) FROM user_sessions WHERE started_at BETWEEN start_date AND end_date)::BIGINT as total_sessions,
        (SELECT COUNT(*) FROM user_feedback WHERE created_at BETWEEN start_date AND end_date)::BIGINT as total_feedback,
        (SELECT AVG(duration_seconds) FROM user_sessions WHERE started_at BETWEEN start_date AND end_date AND duration_seconds IS NOT NULL)::NUMERIC as avg_session_duration,
        (SELECT device_type FROM usage_events WHERE created_at BETWEEN start_date AND end_date AND device_type IS NOT NULL GROUP BY device_type ORDER BY COUNT(*) DESC LIMIT 1) as most_used_device,
        (SELECT browser FROM usage_events WHERE created_at BETWEEN start_date AND end_date AND browser IS NOT NULL GROUP BY browser ORDER BY COUNT(*) DESC LIMIT 1) as most_used_browser;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les événements les plus fréquents
CREATE OR REPLACE FUNCTION get_top_events(
    start_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '30 days',
    end_date TIMESTAMPTZ DEFAULT NOW(),
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    event_name TEXT,
    event_count BIGINT,
    percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH event_stats AS (
        SELECT
            event_name,
            COUNT(*) as event_count,
            SUM(COUNT(*)) OVER () as total_events
        FROM usage_events
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY event_name
    )
    SELECT
        event_stats.event_name,
        event_stats.event_count,
        ROUND((event_stats.event_count::NUMERIC / NULLIF(event_stats.total_events, 0) * 100)::NUMERIC, 2) as percentage
    FROM event_stats
    ORDER BY event_stats.event_count DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VÉRIFICATION
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '   SCHÉMA ANALYTICS ENRICHI CRÉÉ';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Tables créées/modifiées :';
    RAISE NOTICE '   • usage_events (enrichi)';
    RAISE NOTICE '   • user_feedback (nouveau)';
    RAISE NOTICE '   • user_sessions (nouveau)';
    RAISE NOTICE '   • user_profiles (enrichi)';
    RAISE NOTICE '';
    RAISE NOTICE '✅ Fonctions créées :';
    RAISE NOTICE '   • get_analytics_summary()';
    RAISE NOTICE '   • get_top_events()';
    RAISE NOTICE '';
    RAISE NOTICE '💡 Prochaines étapes :';
    RAISE NOTICE '   1. Créer la page admin/dashboard';
    RAISE NOTICE '   2. Ajouter le système de feedback dans l''app';
    RAISE NOTICE '   3. Enrichir logUsageEvent() avec plus de métadonnées';
    RAISE NOTICE '';
END $$;

-- =====================================================

