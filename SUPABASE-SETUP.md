# 🔧 Configuration Supabase pour l'Export GIF

## Problème résolu : "Unsupported image type"

L'erreur `ERROR_BAD_REQUEST: Unsupported image type: supported formats are jpeg, png, gif, or webp` était causée par une mauvaise configuration de l'appel à l'API Supabase Edge Functions.

## ✅ Solution implémentée

### 1. Amélioration de la gestion d'erreur
- Validation des données avant envoi à l'Edge Function
- Messages d'erreur plus clairs et informatifs
- Fallback automatique vers gif.js en cas d'échec Supabase

### 2. Correction de l'appel API
- Remplacement de `supabase.functions.invoke()` par `fetch()` direct
- Headers d'authentification corrects
- Gestion des réponses binaires (GIF)

### 3. Configuration Supabase requise

#### Étape 1 : Configurer les clés dans `public/js/supabase-config.js`
```javascript
const SUPABASE_URL = 'https://votre-projet.supabase.co';
const SUPABASE_ANON_KEY = 'votre-cle-publique-ici';
```

#### Étape 2 : Déployer l'Edge Function
```bash
# Déployer la fonction create-gif
supabase functions deploy create-gif

# Vérifier le déploiement
supabase functions list
```

#### Étape 3 : Tester la configuration
```bash
# Test local
node test-supabase-gif.js

# Test en production
# Utiliser l'interface web de l'éditeur
```

## 🚀 Fonctionnement

### Mode Supabase (recommandé)
1. L'utilisateur clique sur "🎬 Export GIF"
2. Les frames sont envoyées à l'Edge Function Supabase
3. Le serveur génère le GIF et le retourne
4. Le GIF est téléchargé automatiquement

### Mode Fallback (gif.js)
1. Si Supabase échoue, basculement automatique vers gif.js
2. Génération locale du GIF dans le navigateur
3. Téléchargement du GIF généré localement

## 🔍 Dépannage

### Erreur "Configuration Supabase manquante"
- Vérifier que `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont configurés
- S'assurer que les clés ne contiennent pas les valeurs par défaut

### Erreur "Unsupported image type"
- Cette erreur ne devrait plus se produire avec la nouvelle implémentation
- Si elle persiste, vérifier la configuration de l'Edge Function

### Fallback vers gif.js
- Normal si Supabase n'est pas configuré
- Vérifier les logs de la console pour plus de détails

## 📝 Notes techniques

- L'Edge Function `create-gif` génère des GIFs à partir de données de frames
- Pas d'upload d'images, donc pas de problème de type d'image
- Validation côté client avant envoi au serveur
- Gestion d'erreur robuste avec messages informatifs