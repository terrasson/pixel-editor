# 🧪 Guide de Test - Sauvegarde Supabase

**Date:** 1er novembre 2025  
**Objectif:** Tester la sauvegarde sur Supabase et le fallback local

---

## ✅ Ce Qui a Été Corrigé

### Problème Original
- ❌ Le bouton 💾 sauvegardait uniquement en local (téléchargement de fichier)
- ❌ Aucune synchronisation avec Supabase
- ❌ Impossible de retrouver ses projets sur un autre appareil

### Solution Implémentée
- ✅ Nouvelle fonction `saveProjectSmart()` avec 3 niveaux de protection
- ✅ Sauvegarde prioritaire sur Supabase (cloud)
- ✅ Fallback automatique vers localStorage si Supabase échoue
- ✅ Dernier recours : téléchargement de fichier
- ✅ Backup local automatique même quand Supabase fonctionne

---

## 🚀 Instructions de Test

### Étape 1: Vérifier la Connexion Supabase ✅

```bash
node test-database-connection.js
```

**Résultat attendu:**
```
✅ CONNEXION SUPABASE OK !
✅ Table "pixel_projects" trouvée ! (0 projets)
✅ Table "user_preferences" trouvée !
```

**Status:** ✅ **VÉRIFIÉ - FONCTIONNE**

---

### Étape 2: Démarrer le Serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

---

### Étape 3: Se Connecter à l'Application

1. Ouvrir le navigateur : `http://localhost:3000`
2. Vous serez redirigé vers `/login.html` si pas connecté
3. **Créer un compte ou se connecter** avec vos identifiants Supabase

---

### Étape 4: Tester la Sauvegarde

#### Test 1: Sauvegarde Supabase (Cloud) ☁️

1. **Dessiner quelque chose** sur la grille (un smiley, un logo, etc.)
2. **Optionnel:** Ajouter 2-3 frames pour une animation
3. **Cliquer sur** `💾 Sauvegarder`
4. **Entrer un nom:** `test-supabase-1`
5. **Cliquer sur** "Sauvegarder"

**Résultat attendu:**
```
✅ Projet "test-supabase-1" créé avec succès sur le cloud Supabase !
```

**Vérifier dans la console du navigateur (F12):**
```
🔄 Tentative de sauvegarde sur Supabase... test-supabase-1
✅ Project saved to Supabase: {id: "...", name: "test-supabase-1", ...}
💾 Backup local créé
```

**Vérifier dans Supabase Dashboard:**
1. Aller sur https://supabase.com/dashboard/project/kgdzbddtprdtdiflwegc
2. Cliquer sur **Table Editor** → `pixel_projects`
3. Vous devriez voir votre projet `test-supabase-1` ! 🎉

---

#### Test 2: Mise à Jour d'un Projet Existant 🔄

1. **Modifier le dessin** (ajouter des pixels, changer des couleurs)
2. **Cliquer sur** `💾 Sauvegarder`
3. **Utiliser le MÊME nom:** `test-supabase-1`
4. **Cliquer sur** "Sauvegarder"

**Résultat attendu:**
```
✅ Projet "test-supabase-1" mis à jour avec succès sur le cloud Supabase !
```

**Vérifier dans Supabase:**
- Le `updated_at` doit être plus récent
- Les données du projet sont mises à jour

---

#### Test 3: Fallback localStorage (Hors Ligne) 📴

**Simuler une panne Supabase:**

1. **Ouvrir la console du navigateur** (F12)
2. **Désactiver temporairement Supabase:**
   ```javascript
   // Dans la console
   window.dbService.supabase = null;
   ```
3. **Dessiner quelque chose de nouveau**
4. **Cliquer sur** `💾 Sauvegarder`
5. **Entrer un nom:** `test-local-1`
6. **Cliquer sur** "Sauvegarder"

**Résultat attendu:**
```
⚠️ Projet "test-local-1" sauvegardé en LOCAL uniquement.

Supabase n'est pas disponible (...).
Votre projet est en sécurité localement sur cet appareil.
```

**Vérifier dans localStorage:**
```javascript
// Dans la console
console.log(localStorage.getItem('pixelart_test-local-1'));
```

Vous devriez voir les données JSON du projet !

---

#### Test 4: Charger un Projet Sauvegardé 📂

1. **Effacer la grille** (bouton "Effacer tout")
2. **Cliquer sur** `🌐 Mes projets`
3. **Vous devriez voir** la liste de vos projets sauvegardés
4. **Cliquer sur** un projet pour le charger

**Résultat attendu:**
- Le projet se charge avec toutes ses frames
- L'animation fonctionne
- Toutes les couleurs sont préservées

---

## 📊 Checklist de Validation

### Sauvegarde Cloud (Supabase)
- [ ] Connexion Supabase OK (`test-database-connection.js`)
- [ ] Création d'un nouveau projet fonctionne
- [ ] Mise à jour d'un projet existant fonctionne
- [ ] Miniature (thumbnail) générée automatiquement
- [ ] Backup local créé automatiquement
- [ ] Projet visible dans Supabase Dashboard

### Fallback Local
- [ ] Sauvegarde localStorage fonctionne quand Supabase échoue
- [ ] Message d'avertissement clair pour l'utilisateur
- [ ] Données bien sauvegardées dans localStorage
- [ ] Possibilité de charger le projet local plus tard

### Chargement
- [ ] Liste "Mes projets" affiche les projets Supabase
- [ ] Chargement d'un projet restaure toutes les données
- [ ] Frames multiples préservées
- [ ] FPS et palette personnalisée préservés

---

## 🔧 Résolution de Problèmes

### "User not authenticated"

**Problème:** Vous n'êtes pas connecté

**Solution:**
1. Vérifiez que vous voyez votre email en haut à droite
2. Si non, déconnectez-vous et reconnectez-vous
3. Vérifiez que Supabase Auth est bien configuré

---

### "Supabase not initialized"

**Problème:** Client Supabase non initialisé

**Solution:**
1. Vérifiez que `public/js/config/supabase-config.js` contient les bonnes credentials
2. Vérifiez que les scripts sont chargés dans le bon ordre dans `index.html`:
   ```html
   <script src="js/config/supabase-config.js"></script>
   <script src="js/auth.js"></script>
   <script src="js/database.js"></script>
   ```
3. Rechargez la page (F5)

---

### "relation pixel_projects does not exist"

**Problème:** La table n'existe pas dans Supabase

**Solution:**
1. Aller sur https://supabase.com/dashboard/project/kgdzbddtprdtdiflwegc/editor/sql
2. Copier le contenu de `docs/database-schema.sql`
3. Coller et cliquer sur "Run"
4. Attendre le message de succès
5. Relancer le test

---

### Port 3000 déjà utilisé

**Problème:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Tuer le processus sur le port 3000
lsof -ti:3000 | xargs kill -9

# Ou utiliser un autre port
PORT=3001 npm run dev
```

---

## 📝 Console du Navigateur - Logs Attendus

### Sauvegarde Réussie sur Supabase
```
🔄 Tentative de sauvegarde sur Supabase... test-supabase-1
✅ Project saved to Supabase: {
  id: "uuid-here",
  name: "test-supabase-1",
  user_id: "uuid-here",
  frames: [...],
  ...
}
💾 Backup local créé
```

### Fallback vers localStorage
```
🔄 Tentative de sauvegarde sur Supabase... test-local-1
⚠️ Erreur Supabase: Cannot read properties of null (reading 'from')
🔄 Fallback vers sauvegarde locale...
💾 Projet sauvegardé en local
```

---

## 🎯 Critères de Succès

Le système fonctionne correctement si :

✅ **Tous les tests passent**
✅ **Pas d'erreur dans la console** (sauf warnings attendus)
✅ **Projets visibles dans Supabase Dashboard**
✅ **Fallback local fonctionne quand Supabase est désactivé**
✅ **Backup local créé même quand Supabase fonctionne**
✅ **Chargement restaure parfaitement le projet**

---

## 📚 Fichiers Modifiés

### Code Source
- ✅ `public/js/script.js` - Ajout de `saveProjectSmart()` + correction event listener
- ✅ `public/js/database.js` - Service de base de données (déjà existant)
- ✅ `public/js/auth.js` - Service d'authentification (déjà existant)

### Configuration
- ✅ `public/js/config/supabase-config.js` - Credentials Supabase (déjà configuré)

### Tests & Documentation
- ✅ `test-database-connection.js` - Script de test connexion
- ✅ `docs/CORRECTION-SAUVEGARDE.md` - Documentation détaillée
- ✅ `TEST-SAUVEGARDE.md` - Ce guide de test

---

## 🎉 Résultat Final

**AVANT ❌**
```
Bouton Sauvegarder → saveToFile() → Téléchargement .json
```

**APRÈS ✅**
```
Bouton Sauvegarder → saveProjectSmart() 
  ├─ 1️⃣ Essai Supabase (cloud) ✅
  │   └─ + Backup local automatique 💾
  ├─ 2️⃣ Fallback localStorage (si Supabase fail)
  └─ 3️⃣ Téléchargement fichier (dernier recours)
```

---

## 💡 Prochaines Étapes

Une fois que tous les tests sont validés :

1. **Tester sur mobile** (iOS/Android)
2. **Tester avec plusieurs utilisateurs** (isolation des données)
3. **Tester la synchronisation** (même compte, différents appareils)
4. **Optimiser** (compression, pagination, etc.)
5. **Déployer sur Vercel** (production)

---

**Bonne chance pour les tests ! 🚀**

Si vous rencontrez un problème, consultez:
- Console du navigateur (F12) pour les logs détaillés
- `docs/CORRECTION-SAUVEGARDE.md` pour la documentation complète
- Supabase Dashboard pour vérifier les données





