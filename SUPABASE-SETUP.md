# 🚀 Configuration Supabase pour l'Éditeur Pixel Art

## 📋 **Étapes de configuration (5 minutes)**

### **1. Créer un compte Supabase**
1. Aller sur [supabase.com](https://supabase.com)
2. Cliquer sur **"Start your project"**
3. Se connecter avec GitHub (recommandé)

### **2. Créer un nouveau projet**
1. Cliquer sur **"New Project"**
2. Choisir une organisation
3. Donner un nom à votre projet : `pixel-editor`
4. Créer un mot de passe sécurisé
5. Choisir une région (Europe West pour la France)
6. Cliquer sur **"Create new project"**

⏳ *Attendre 2-3 minutes que le projet soit prêt*

### **3. Récupérer les clés API**
1. Dans votre projet Supabase, aller dans **Settings** → **API**
2. Noter ces deux valeurs :
   - **Project URL** : `https://xxxxxxxxxxxx.supabase.co`
   - **anon public** : `eyJhbGciOiJIUzI1NiIsInR5c...`

### **4. Configurer la base de données**
1. Aller dans **SQL Editor** (icône de base de données)
2. Cliquer sur **"New query"**
3. Copier-coller le contenu du fichier `supabase-setup.sql`
4. Cliquer sur **"Run"** ▶️

✅ La table `pixel_projects` est maintenant créée !

### **5. Configurer l'application**
1. Ouvrir le fichier `public/js/supabase-config.js`
2. Remplacer ces lignes :

```javascript
// AVANT (à remplacer)
const SUPABASE_URL = 'https://votre-projet.supabase.co';
const SUPABASE_ANON_KEY = 'votre-cle-publique-ici';

// APRÈS (avec vos vraies valeurs)
const SUPABASE_URL = 'https://xxxxxxxxxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5c...';
```

### **6. Tester la configuration**
1. Ouvrir l'éditeur pixel art dans votre navigateur
2. Ouvrir la console développeur (F12)
3. Dessiner quelques pixels
4. Vérifier le message : `✅ Projet auto-sauvegardé : Auto-save...`
5. Aller dans Supabase → **Table Editor** → `pixel_projects`
6. Voir votre projet sauvegardé ! 🎉

## 📱 **Avantages de Supabase**

✅ **Synchronisation multi-appareils** - Vos projets sont accessibles partout
✅ **Pas de problème iCloud** - Sauvegarde directe en ligne
✅ **Gratuit jusqu'à 500MB** - Largement suffisant pour des pixel arts
✅ **Sauvegarde automatique** - Plus besoin de fichiers JSON
✅ **Historique des versions** - Supabase garde un historique

## 🔧 **Dépannage**

### **Erreur de connexion**
- Vérifier que les clés URL et ANON_KEY sont correctes
- Vérifier que la table `pixel_projects` existe dans Supabase
- Ouvrir la console développeur pour voir les erreurs détaillées

### **Projets qui ne se sauvegardent pas**
- L'application utilise automatiquement localStorage en fallback
- Vérifier la console pour les messages d'erreur Supabase
- Tester la connexion avec `testSupabaseConnection()` dans la console

### **Pas d'accès aux projets**
- Vérifier que la politique de sécurité est bien configurée
- La table doit avoir `ENABLE ROW LEVEL SECURITY` avec une politique permettant toutes les opérations

## 📊 **Structure de la table**

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | BIGSERIAL | ID unique auto-incrémenté |
| `name` | TEXT | Nom du projet |
| `frames` | TEXT | Données des frames (JSON stringifié) |
| `current_frame` | INTEGER | Index de la frame actuelle |
| `custom_colors` | TEXT | Couleurs personnalisées (JSON stringifié) |
| `device_info` | TEXT | Information sur l'appareil (pour identifier l'origine) |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Date de dernière modification |

## 🔒 **Sécurité**

⚠️ **Note importante** : Cette configuration permet à tout le monde de lire/écrire dans la base. Pour une application en production, il faudrait :

1. Implémenter l'authentification Supabase
2. Créer des politiques de sécurité plus strictes
3. Limiter l'accès par utilisateur

Pour ce projet personnel/test, la configuration actuelle est suffisante. 