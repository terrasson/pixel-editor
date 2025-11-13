# 📤 Système de Partage de Projets

## Vue d'ensemble

Le système de partage permet aux utilisateurs de partager leurs projets pixel art avec d'autres utilisateurs via Supabase, sans avoir à transférer manuellement des fichiers.

## 🎯 Fonctionnalités

### ✅ Déjà Implémenté

1. **Partage via Supabase**
   - Partage par email avec un autre utilisateur
   - Permissions configurables (voir uniquement, dupliquer, éditer)
   - Messages personnalisés optionnels
   - Dates d'expiration optionnelles (7 jours, 30 jours, 90 jours, permanent)

2. **Partage via Fichier** (méthode traditionnelle)
   - Export du projet en fichier JSON
   - Compatible avec l'ancien système

3. **Gestion des Projets Partagés**
   - Vue de tous les projets partagés avec vous
   - Badge de notification pour les nouveaux partages
   - Actions : Voir, Dupliquer, Refuser
   - Suivi automatique des partages acceptés/refusés

4. **Sécurité**
   - Row Level Security (RLS) activé sur toutes les tables
   - Impossibilité de se partager un projet à soi-même
   - Vérification des permissions avant chaque action
   - Logs d'accès pour audit

## 📋 Installation

### Étape 1 : Appliquer le Schéma SQL

Si vous n'avez pas encore appliqué le schéma de partage à votre base de données Supabase :

1. Ouvrez le **Supabase Dashboard**
2. Allez dans **SQL Editor** (dans la barre latérale)
3. Cliquez sur **"New query"**
4. Copiez le contenu du fichier `supabase/sharing-schema.sql`
5. Collez-le dans l'éditeur SQL
6. Cliquez sur **"Run"** (ou Ctrl/Cmd + Enter)
7. Vérifiez le message de succès : ✅ **"Schéma de partage créé avec succès !"**

### Étape 2 : Vérifier les Tables Créées

Après avoir exécuté le schéma, vérifiez que les tables suivantes ont été créées :

1. **`project_shares`** - Stocke les informations de partage
   - `id` : Identifiant unique du partage
   - `project_id` : Référence au projet partagé
   - `owner_id` : Propriétaire du projet
   - `shared_with_email` : Email du destinataire
   - `permission` : Type de permission (view_only, can_duplicate, can_edit)
   - `status` : Statut du partage (pending, accepted, declined)
   - `message` : Message optionnel
   - `expires_at` : Date d'expiration optionnelle

2. **`project_access_log`** - Logs des accès aux projets partagés
   - `id` : Identifiant unique
   - `share_id` : Référence au partage
   - `user_id` : Utilisateur ayant effectué l'action
   - `action` : Type d'action (viewed, duplicated, declined, accepted)
   - `accessed_at` : Date de l'action

### Étape 3 : Tester le Système

1. Démarrez l'application :
   ```bash
   npm start
   ```

2. Connectez-vous avec votre compte

3. Cliquez sur **📤 Partager**

4. Choisissez **"Partager avec un utilisateur"**

5. Entrez l'email d'un autre utilisateur (qui doit avoir un compte)

6. Le destinataire verra une notification avec un badge sur le bouton **👥 Projets partagés**

## 🎨 Utilisation

### Pour le Propriétaire (Celui qui Partage)

1. **Ouvrir un projet** que vous souhaitez partager

2. **Cliquer sur 📤 Partager**

3. **Choisir "Partager avec un utilisateur"**

4. **Remplir le formulaire** :
   - Email du destinataire (obligatoire)
   - Permission :
     - **📋 Peut dupliquer** (recommandé) : Le destinataire peut copier le projet dans son compte
     - **👁️ Voir uniquement** : Le destinataire peut uniquement visualiser
     - **✏️ Peut éditer** : Le destinataire peut modifier l'original (collaboratif)
   - Message personnalisé (optionnel, max 500 caractères)
   - Durée du partage (optionnel : permanent, 7j, 30j, 90j)

5. **Cliquer sur "Partager"**

6. Le destinataire recevra une notification dans l'application

### Pour le Destinataire (Celui qui Reçoit)

1. **Badge de notification** apparaît sur le bouton **👥 Projets partagés**

2. **Cliquer sur "👥 Projets partagés"** pour voir les projets

3. **Actions disponibles** :
   - **📋 Dupliquer** : Copie le projet dans votre compte (crée "Nom du projet (copie)")
   - **👁️ Voir** : Charge le projet en lecture (remplace le projet actuel)
   - **✕ Refuser** : Refuse le partage et le retire de la liste

## 🔧 Architecture Technique

### Frontend (public/js/sharing.js)

**Fonctions principales** :

- `initSharingSystem()` - Initialise le système au chargement
- `showShareMethodDialog()` - Affiche le choix de méthode de partage
- `showShareSupabaseDialog()` - Affiche le formulaire de partage Supabase
- `handleShareViaSupabase()` - Gère l'envoi du partage
- `showSharedWithMeDialog()` - Affiche les projets partagés avec l'utilisateur
- `handleDuplicateShare()` - Duplique un projet partagé
- `handleViewShare()` - Visualise un projet partagé
- `handleDeclineShare()` - Refuse un partage
- `updatePendingSharesBadge()` - Met à jour le badge de notification

### Backend (public/js/database.js)

**Méthodes du service** :

```javascript
// Partager un projet
await window.dbService.shareProject(projectName, recipientEmail, options)

// Obtenir les projets partagés avec moi
await window.dbService.getSharedWithMeProjects()

// Obtenir le nombre de partages en attente
await window.dbService.getPendingSharesCount()

// Accepter un partage
await window.dbService.acceptShare(shareId)

// Refuser un partage
await window.dbService.declineShare(shareId)

// Dupliquer un projet partagé
await window.dbService.duplicateSharedProject(shareId)

// Obtenir les données d'un projet partagé
await window.dbService.getSharedProjectData(shareId)

// Obtenir mes partages (projets que j'ai partagés)
await window.dbService.getMyShares()

// Révoquer un partage
await window.dbService.revokeShare(shareId)
```

### Base de Données (Supabase)

**Sécurité (RLS Policies)** :

1. Les utilisateurs peuvent voir les partages qu'ils ont créés
2. Les utilisateurs peuvent voir les partages qui leur sont destinés
3. Les utilisateurs ne peuvent partager que leurs propres projets
4. Les propriétaires peuvent mettre à jour et supprimer leurs partages
5. Les destinataires peuvent accepter/refuser les partages
6. Logs d'accès pour audit et analytics

**Triggers Automatiques** :

1. **Mise à jour de `updated_at`** : Met à jour automatiquement la date de modification
2. **Liaison automatique** : Associe automatiquement un partage en attente quand un utilisateur s'inscrit avec l'email correspondant

## 📊 Types de Permissions

### 📋 Can Duplicate (Peut Dupliquer)
- **Usage** : Recommandé pour le partage général
- **Permet** :
  - Voir le projet
  - Créer une copie dans son compte
  - Modifier sa copie sans affecter l'original
- **Ne permet pas** : Modifier l'original

### 👁️ View Only (Voir Uniquement)
- **Usage** : Partage en lecture seule
- **Permet** :
  - Voir le projet
  - Inspecter les frames
- **Ne permet pas** : Copier ou modifier

### ✏️ Can Edit (Peut Éditer)
- **Usage** : Collaboration en temps réel
- **Permet** :
  - Voir le projet
  - Modifier l'original directement
  - Sauvegarder les modifications
- **⚠️ Attention** : Les modifications affectent l'original !

## 🔔 Système de Notifications

- **Badge de notification** : Affiche le nombre de partages en attente
- **Mise à jour automatique** : Vérifie les nouveaux partages toutes les 30 secondes
- **Badge sur deux boutons** : Mobile et Desktop pour visibilité optimale

## 🎯 Bénéfices

### ✅ Réduction de la Consommation de Données
- Seule une référence est partagée (quelques octets)
- Pas de téléchargement/upload de fichiers volumineux
- Transfert optimisé via Supabase

### ✅ Expérience Utilisateur Améliorée
- Partage en 3 clics
- Notifications en temps réel
- Interface intuitive
- Support multi-appareils

### ✅ Sécurité et Confidentialité
- Partages traçables
- Permissions granulaires
- Révocation possible
- Row Level Security

### ✅ Collaboration
- Partage avec édition collaborative (permission can_edit)
- Logs d'accès pour voir qui a consulté
- Messages personnalisés

## 🐛 Dépannage

### Le bouton de partage ne s'affiche pas
**Solution** : Vérifiez que `sharing.js` est bien chargé dans `index.html` (ligne 432)

### Erreur lors du partage
**Solutions** :
1. Vérifiez que le schéma SQL a été appliqué
2. Vérifiez que l'utilisateur destinataire existe dans Supabase
3. Vérifiez les permissions RLS dans Supabase Dashboard → Authentication → Policies

### Le badge de notification ne s'affiche pas
**Solutions** :
1. Vérifiez la connexion Internet
2. Ouvrez la console (F12) pour voir les erreurs
3. Vérifiez que `updatePendingSharesBadge()` est appelée

### Impossible de dupliquer un projet partagé
**Solutions** :
1. Vérifiez la permission (doit être `can_duplicate` ou `can_edit`)
2. Vérifiez que vous avez assez d'espace dans votre compte
3. Consultez les logs dans la console

### Le partage n'apparaît pas pour le destinataire
**Solutions** :
1. Vérifiez que l'email est correct
2. Le destinataire doit avoir un compte Supabase avec cet email
3. Attendez quelques secondes et rafraîchissez la page
4. Vérifiez que le partage n'a pas expiré

## 📝 Exemples de Code

### Partager un Projet

```javascript
const result = await window.dbService.shareProject(
    'Mon Super Pixel Art',
    'destinataire@email.com',
    {
        permission: 'can_duplicate',
        message: 'Regarde ce que j\'ai créé ! 🎨',
        expiresAt: null // Permanent
    }
);

if (result.success) {
    console.log('Projet partagé !');
} else {
    console.error('Erreur:', result.error);
}
```

### Obtenir les Projets Partagés

```javascript
const result = await window.dbService.getSharedWithMeProjects();

if (result.success) {
    result.data.forEach(share => {
        console.log(`${share.project.name} - De: ${share.owner_email}`);
    });
}
```

### Dupliquer un Projet Partagé

```javascript
const result = await window.dbService.duplicateSharedProject(shareId);

if (result.success) {
    console.log(`Projet dupliqué: ${result.data.name}`);
}
```

## 🚀 Prochaines Améliorations Possibles

1. **Notifications par email** via Supabase Edge Functions
2. **Partage public** avec lien partageable
3. **Galerie communautaire** de projets partagés publiquement
4. **Commentaires** sur les projets partagés
5. **Versionning** des projets collaboratifs
6. **Permissions avancées** (par frame, par couleur, etc.)

## 📚 Ressources

- **Schéma SQL** : `supabase/sharing-schema.sql`
- **Service JavaScript** : `public/js/database.js` (lignes 388-781)
- **Interface** : `public/js/sharing.js`
- **Styles** : `public/styles/common.css` (lignes 808-1211)
- **HTML** : `public/index.html` (lignes 321-424)

---

**Le système de partage est maintenant prêt à l'emploi ! 🎉**
