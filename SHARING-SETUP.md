# 📤 Système de Partage - Guide d'Installation

## 🎯 Vue d'ensemble

Le nouveau système de partage permet aux utilisateurs de partager leurs projets pixel art directement via Supabase, sans avoir à envoyer de fichiers volumineux. Les utilisateurs peuvent :

- ✅ Partager un projet avec un autre utilisateur par email
- ✅ Recevoir des notifications de projets partagés
- ✅ Dupliquer ou visualiser des projets partagés
- ✅ Gérer les permissions (voir, dupliquer, éditer)
- ✅ Définir une durée d'expiration pour les partages

## 📋 Prérequis

- Compte Supabase actif
- Configuration de base de données existante (table `pixel_projects`)
- Authentification Supabase configurée

## 🚀 Installation

### Étape 1 : Exécuter le schéma SQL

1. Connectez-vous à votre dashboard Supabase
2. Allez dans **SQL Editor** (dans la barre latérale)
3. Cliquez sur **"+ New query"**
4. Ouvrez le fichier `supabase/sharing-schema.sql` de ce projet
5. Copiez **tout** le contenu SQL
6. Collez-le dans l'éditeur SQL de Supabase
7. Cliquez sur **"Run"** ou appuyez sur `Ctrl/Cmd + Enter`
8. Vous devriez voir : ✅ **"Schéma de partage créé avec succès !"**

### Étape 2 : Vérifier les tables créées

Dans Supabase, allez dans **Database** → **Tables** et vérifiez que ces tables existent :

- ✅ `project_shares` - Contient les partages de projets
- ✅ `project_access_log` - Log des accès (optionnel, pour analytics)

### Étape 3 : Vérifier les politiques RLS

Allez dans **Database** → **Policies** et vérifiez que les politiques sont actives pour `project_shares` :

- Users can view shares they created
- Users can view shares shared with them
- Users can create shares for their projects
- Owners can update their shares
- Recipients can update share status
- Owners can delete their shares
- Recipients can decline shares

### Étape 4 : Tester l'application

1. Démarrez votre application : `npm start`
2. Connectez-vous avec un compte
3. Créez un petit projet de test
4. Cliquez sur **"📤 Partager"**
5. Choisissez **"Partager avec un utilisateur"**
6. Entrez l'email d'un autre utilisateur (ou créez un deuxième compte)
7. Cliquez sur **"Partager"**

### Étape 5 : Tester la réception

1. Connectez-vous avec le deuxième compte (celui qui a reçu le partage)
2. Vous devriez voir un badge rouge avec le nombre de partages en attente
3. Cliquez sur **"👥 Projets partagés"**
4. Vous devriez voir le projet partagé
5. Testez les actions : Dupliquer, Voir, Refuser

## 🎨 Fonctionnalités

### 1. Partage de Projet

**Depuis le bouton "Partager" :**
```
1. Cliquez sur "📤 Partager"
2. Choisissez "Partager avec un utilisateur"
3. Entrez l'email du destinataire
4. Choisissez la permission :
   - 📋 Peut dupliquer (défaut)
   - 👁️ Voir uniquement
   - ✏️ Peut éditer (collaboratif)
5. Ajoutez un message optionnel
6. Définissez une durée (optionnel)
7. Cliquez sur "Partager"
```

### 2. Réception de Projets Partagés

**Badge de notification :**
- Un badge rouge apparaît sur "👥 Projets partagés"
- Indique le nombre de partages en attente

**Visualiser les projets partagés :**
```
1. Cliquez sur "👥 Projets partagés"
2. Vous voyez la liste des projets partagés avec vous
3. Pour chaque projet :
   - 📋 Dupliquer : Copie le projet dans votre compte
   - 👁️ Voir : Charge le projet temporairement
   - ✕ Refuser : Refuse le partage
```

### 3. Types de Permissions

| Permission | Description | Actions disponibles |
|-----------|-------------|-------------------|
| **📋 Peut dupliquer** | L'utilisateur peut copier le projet dans son compte | Dupliquer, Voir, Refuser |
| **👁️ Voir uniquement** | L'utilisateur peut seulement visualiser | Voir, Refuser |
| **✏️ Peut éditer** | L'utilisateur peut modifier l'original (collaboratif) | Éditer, Voir, Refuser |

## 🔧 Configuration Avancée

### Nettoyer les partages expirés

Le schéma inclut une fonction pour nettoyer automatiquement les partages expirés :

```sql
SELECT cleanup_expired_shares();
```

Vous pouvez l'exécuter manuellement ou créer un cron job dans Supabase.

### Obtenir le nombre de partages en attente

```sql
SELECT get_pending_shares_count('user@example.com');
```

### Analytics des Partages

La table `project_access_log` enregistre toutes les actions :
- `viewed` - Projet visualisé
- `duplicated` - Projet dupliqué
- `accepted` - Partage accepté
- `declined` - Partage refusé

Exemple de requête analytics :

```sql
SELECT
    ps.pixel_projects->>'name' as project_name,
    COUNT(*) FILTER (WHERE pal.action = 'viewed') as views,
    COUNT(*) FILTER (WHERE pal.action = 'duplicated') as duplications
FROM project_shares ps
LEFT JOIN project_access_log pal ON ps.id = pal.share_id
WHERE ps.owner_id = auth.uid()
GROUP BY ps.id, ps.pixel_projects->>'name';
```

## 📊 Structure des Données

### Table `project_shares`

```javascript
{
    id: uuid,
    project_id: uuid,           // Référence au projet
    owner_id: uuid,             // Utilisateur qui partage
    shared_with_email: string,  // Email du destinataire
    shared_with_user_id: uuid,  // ID utilisateur (null si pas inscrit)
    permission: string,         // 'view_only' | 'can_duplicate' | 'can_edit'
    status: string,             // 'pending' | 'accepted' | 'declined'
    message: string,            // Message optionnel
    expires_at: timestamp,      // Date d'expiration (null = permanent)
    created_at: timestamp,
    updated_at: timestamp
}
```

## 🔐 Sécurité

### Row Level Security (RLS)

Toutes les tables utilisent RLS pour garantir que :
- Les utilisateurs ne voient que leurs propres partages créés
- Les utilisateurs ne voient que les partages qui leur sont destinés
- Les propriétaires peuvent gérer leurs partages
- Les destinataires peuvent accepter/refuser les partages

### Validation

- Email validé côté serveur (regex SQL)
- Contrainte d'unicité : un projet ne peut être partagé qu'une fois avec le même email
- Impossible de se partager un projet à soi-même
- Vérification des permissions avant toute action

## 🐛 Dépannage

### Erreur : "Table project_shares does not exist"
→ Exécutez le schéma SQL dans Supabase

### Erreur : "Permission denied for table project_shares"
→ Vérifiez que les politiques RLS sont activées et correctement configurées

### Badge ne s'affiche pas
→ Vérifiez la console pour les erreurs
→ Assurez-vous que l'utilisateur est bien connecté
→ Vérifiez que `sharing.js` est bien chargé

### Partage n'apparaît pas
→ Vérifiez que l'email est correct
→ Vérifiez dans Supabase Dashboard → Database → project_shares

### Erreur : "Project already shared with this user"
→ Le projet a déjà été partagé avec cet utilisateur
→ Supprimez l'ancien partage ou utilisez un autre email

## 🚀 Déploiement

### Variables d'environnement

Aucune variable supplémentaire nécessaire ! Le système utilise la configuration Supabase existante.

### Vercel

Le système fonctionne automatiquement sur Vercel. Assurez-vous que :
- Les variables d'environnement Supabase sont configurées
- Le schéma SQL a été exécuté dans Supabase

## 📈 Améliorations Futures

### Notifications par Email (optionnel)

Pour activer les notifications par email quand un projet est partagé :

1. Activez l'email dans Supabase Auth
2. Créez une Edge Function pour envoyer des emails
3. Appelez cette fonction depuis `database.js` après `shareProject()`

Exemple de contenu d'email :

```
Sujet: [Pixel Art Editor] Vous avez reçu un projet partagé

Bonjour,

[Nom] vous a partagé son projet "[Nom du projet]"
dans l'Éditeur Pixel Art !

Connectez-vous pour voir votre projet :
https://votre-app.vercel.app

---
Éditeur Pixel Art
```

### Collaboration en Temps Réel (avancé)

Pour activer l'édition collaborative en temps réel avec la permission `can_edit` :

1. Utilisez Supabase Realtime
2. Créez un canal pour chaque projet partagé
3. Synchronisez les changements en temps réel

## 📝 Notes

- Les partages en attente sont vérifiés toutes les 30 secondes
- Les miniatures sont copiées lors de la duplication
- Les partages expirés restent dans la base (status = 'pending') jusqu'au nettoyage manuel
- La fonction de nettoyage automatique peut être programmée avec pg_cron

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans la console du navigateur (F12)
2. Vérifiez les logs Supabase : Dashboard → Logs
3. Vérifiez les politiques RLS
4. Consultez la documentation Supabase

---

**Bon partage ! 🎨✨**
