# 📊 Accès aux Analytics et Logs Utilisateurs

Ce document explique comment accéder aux données analytics et logs des utilisateurs en tant que créateur de l'application.

## 🎯 Options d'accès

### Option 1 : Via Supabase Dashboard (Recommandé)

Le moyen le plus simple d'accéder aux données est directement via le Dashboard Supabase.

#### Étapes :

1. **Connectez-vous à Supabase**
   - Allez sur https://supabase.com
   - Connectez-vous avec votre compte
   - Sélectionnez votre projet

2. **Accéder aux tables**
   - Cliquez sur **"Table Editor"** dans la barre latérale gauche
   - Vous verrez toutes les tables :
     - `user_profiles` - Profils utilisateurs (âge, genre, pays, région)
     - `usage_events` - Tous les événements utilisateurs (clics, sauvegardes, etc.)
     - `user_feedback` - Feedback et avis des utilisateurs
     - `user_sessions` - Sessions utilisateurs (durée, appareil, navigateur)
     - `pixel_projects` - Projets créés

3. **Visualiser les données**
   - Cliquez sur une table pour voir toutes les données
   - Utilisez les filtres pour rechercher
   - Exportez en CSV si nécessaire (bouton "Export" en haut à droite)

4. **Utiliser SQL Editor pour des requêtes avancées**
   - Cliquez sur **"SQL Editor"** dans la barre latérale
   - Créez une nouvelle requête
   - Utilisez les fonctions SQL créées :
     ```sql
     -- Statistiques globales
     SELECT * FROM get_analytics_summary();
     
     -- Top événements
     SELECT * FROM get_top_events(NOW() - INTERVAL '30 days', NOW(), 10);
     ```

#### Requêtes SQL utiles :

```sql
-- Nombre total d'utilisateurs
SELECT COUNT(DISTINCT user_id) FROM user_profiles;

-- Utilisateurs actifs (30 derniers jours)
SELECT COUNT(DISTINCT user_id) 
FROM usage_events 
WHERE created_at > NOW() - INTERVAL '30 days';

-- Événements les plus fréquents
SELECT event_name, COUNT(*) as count
FROM usage_events
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY event_name
ORDER BY count DESC
LIMIT 10;

-- Feedback non lu
SELECT * FROM user_feedback 
WHERE status = 'new'
ORDER BY created_at DESC;

-- Répartition par appareil
SELECT device_type, COUNT(*) as count
FROM usage_events
WHERE device_type IS NOT NULL
GROUP BY device_type
ORDER BY count DESC;

-- Répartition par navigateur
SELECT browser, COUNT(*) as count
FROM usage_events
WHERE browser IS NOT NULL
GROUP BY browser
ORDER BY count DESC;

-- Sessions avec durée moyenne
SELECT 
    device_type,
    AVG(duration_seconds) as avg_duration_seconds,
    COUNT(*) as session_count
FROM user_sessions
WHERE duration_seconds IS NOT NULL
GROUP BY device_type;
```

### Option 2 : Page Admin Dashboard (admin.html)

Une page admin séparée est disponible pour visualiser les analytics de manière plus conviviale.

#### Accès :

1. **Déployez l'application** avec le fichier `admin.html`
2. **Accédez à** : `https://votre-domaine.com/admin.html`
3. **Authentification** : Seul votre email (configuré dans `admin.html`) peut y accéder

#### Fonctionnalités :

- 📊 Statistiques globales (utilisateurs, projets, sessions)
- 📈 Événements les plus fréquents
- 👥 Profils utilisateurs
- 💬 Feedback utilisateurs
- 📱 Appareils et navigateurs

#### Configuration :

Dans `admin.html`, modifiez cette ligne avec votre email :

```javascript
const CREATOR_EMAIL = 'votre-email@example.com';
```

### Option 3 : Export CSV depuis Supabase

Pour analyser les données dans Excel ou Google Sheets :

1. **Dans Supabase Dashboard** → **Table Editor**
2. **Sélectionnez une table** (ex: `usage_events`)
3. **Cliquez sur "Export"** (en haut à droite)
4. **Choisissez le format CSV**
5. **Téléchargez et ouvrez** dans votre outil préféré

### Option 4 : API Supabase (Programmatique)

Si vous voulez créer votre propre dashboard ou intégrer les données ailleurs :

```javascript
// Exemple avec JavaScript
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'VOTRE_SUPABASE_URL',
    'VOTRE_SUPABASE_SERVICE_ROLE_KEY' // ⚠️ Utilisez la clé service_role, pas anon
);

// Récupérer tous les événements
const { data, error } = await supabase
    .from('usage_events')
    .select('*')
    .order('created_at', { ascending: false });

// Récupérer les statistiques
const { data: stats } = await supabase
    .rpc('get_analytics_summary');
```

⚠️ **Important** : Pour l'API programmatique, utilisez la **Service Role Key** (pas l'anon key) pour avoir accès à toutes les données sans restrictions RLS.

## 📋 Tables disponibles

### `user_profiles`
- Informations démographiques (âge, genre, pays, région)
- Statistiques utilisateur (nombre de projets, sessions)
- Dates de visite

### `usage_events`
- Tous les événements utilisateurs (clics, sauvegardes, exports, etc.)
- Métadonnées (appareil, navigateur, résolution d'écran)
- Session ID pour suivre les sessions

### `user_feedback`
- Feedback, suggestions, bugs signalés
- Email de contact (optionnel)
- Statut (new, read, resolved)

### `user_sessions`
- Durée des sessions
- Appareil et navigateur
- Actions effectuées (projets créés, sauvegardés, etc.)

### `pixel_projects`
- Tous les projets créés
- Métadonnées (nom, FPS, frames, couleurs)

## 🔐 Sécurité

- Les données sont protégées par **Row Level Security (RLS)**
- Les utilisateurs ne voient que leurs propres données
- Seul le créateur (vous) peut accéder à toutes les données via :
  - Supabase Dashboard (avec votre compte admin)
  - Service Role Key (pour l'API)
  - Page admin (avec votre email configuré)

## 📊 Métriques importantes à suivre

1. **Engagement** : Nombre d'utilisateurs actifs, sessions, durée moyenne
2. **Utilisation** : Événements les plus fréquents, fonctionnalités utilisées
3. **Feedback** : Suggestions, bugs, questions des utilisateurs
4. **Démographie** : Répartition par âge, genre, pays
5. **Technique** : Appareils, navigateurs, résolutions d'écran

## 🚀 Prochaines étapes

1. ✅ Exécutez le script SQL `supabase/enhanced-analytics-schema.sql`
2. ✅ Configurez votre email dans `admin.html`
3. ✅ Accédez à Supabase Dashboard pour explorer les données
4. ✅ Utilisez les requêtes SQL pour des analyses approfondies
5. ✅ Exportez les données en CSV si nécessaire

---

**Note** : Les données sont collectées de manière anonyme et respectent la vie privée des utilisateurs. Les utilisateurs peuvent modifier ou supprimer leurs informations à tout moment.

