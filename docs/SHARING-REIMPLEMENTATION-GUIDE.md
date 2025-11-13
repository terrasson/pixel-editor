# 📤 Guide de Réimplémentation du Système de Partage

> **Date de création** : Janvier 2025
> **Statut** : Documentation d'archive pour réimplémentation future
> **Complexité estimée** : Moyenne à Élevée
> **Temps estimé** : 2-4 jours de développement + tests de sécurité

---

## 📋 Table des Matières

1. [Pourquoi ce guide ?](#pourquoi-ce-guide)
2. [Vue d'ensemble des systèmes](#vue-densemble-des-systèmes)
3. [Système 1 : Partage Privé par Email](#système-1--partage-privé-par-email)
4. [Système 2 : Partage Public par Lien](#système-2--partage-public-par-lien)
5. [Étapes de Réimplémentation](#étapes-de-réimplémentation)
6. [Points d'Attention Sécurité](#points-dattention-sécurité)
7. [Tests à Effectuer](#tests-à-effectuer)
8. [Fichiers Concernés](#fichiers-concernés)

---

## Pourquoi ce guide ?

Le système de partage a été **temporairement retiré** de l'application en janvier 2025 pour les raisons suivantes :

- ⚠️ **Complexité de sécurité** : Nécessite des tests approfondis pour éviter les fuites de données
- ⚠️ **Gestion des permissions** : Système de permissions (view, duplicate, edit) nécessite plus de validation
- ⚠️ **Priorités** : Focus sur les fonctionnalités core de l'éditeur d'abord

Ce guide permet de **ré-implémenter proprement** le partage quand le moment sera venu.

---

## Vue d'ensemble des systèmes

Deux systèmes de partage ont été développés et documentés :

| Caractéristique | Partage Privé (Email) | Partage Public (Lien) |
|----------------|----------------------|----------------------|
| **Fichier SQL** | `supabase/sharing-schema.sql` | `supabase/public-sharing-schema.sql` |
| **Documentation** | `docs/SHARING-SYSTEM.md` | (Partiellement créé) |
| **Tables** | `project_shares`, `project_access_log` | `public_shares`, `public_share_analytics` |
| **Destinataires** | Email spécifique (privé) | Tout le monde avec le lien |
| **Permissions** | view_only, can_duplicate, can_edit | allow_duplicate (boolean) |
| **Notifications** | Badge dans l'app | Non |
| **Web Share API** | Non | Oui (mobile iOS/Android) |
| **Anonyme** | Non (compte requis) | Oui (pour voir) |

---

## Système 1 : Partage Privé par Email

### Concept

Un utilisateur partage un projet avec un autre utilisateur via son email. Le destinataire reçoit une notification dans l'app.

### Tables Supabase

**Fichier** : `supabase/sharing-schema.sql`

```sql
-- Table principale
CREATE TABLE project_shares (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES pixel_projects(id),
    owner_id UUID REFERENCES auth.users(id),
    shared_with_email TEXT NOT NULL,
    shared_with_user_id UUID REFERENCES auth.users(id),
    permission TEXT CHECK (permission IN ('view_only', 'can_duplicate', 'can_edit')),
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined')),
    message TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table de logs
CREATE TABLE project_access_log (
    id UUID PRIMARY KEY,
    share_id UUID REFERENCES project_shares(id),
    user_id UUID REFERENCES auth.users(id),
    action TEXT CHECK (action IN ('viewed', 'duplicated', 'declined', 'accepted')),
    accessed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Fonctionnalités Implémentées

✅ **Backend (database.js)** - Lignes 388-781
- `shareProject(projectName, recipientEmail, options)`
- `getSharedWithMeProjects()`
- `getPendingSharesCount()`
- `acceptShare(shareId)`
- `declineShare(shareId)`
- `duplicateSharedProject(shareId)`
- `getSharedProjectData(shareId)`
- `getMyShares()`
- `revokeShare(shareId)`

✅ **Frontend (sharing.js)** - Fichier complet
- Interface de partage avec formulaire
- Badge de notification
- Liste des projets partagés
- Actions : Dupliquer, Voir, Refuser

✅ **HTML (index.html)**
- Modal de choix de méthode (lignes 321-350)
- Modal de partage Supabase (lignes 352-410)
- Modal projets partagés (lignes 413-425)
- Boutons "Projets partagés" avec badge (lignes 77-80, 290-293)
- Boutons "Partager" (lignes 81, 294)

✅ **Sécurité**
- Row Level Security (RLS) sur toutes les tables
- Validation email côté serveur
- Impossibilité de se partager à soi-même
- Contrainte d'unicité : 1 projet = 1 partage par email

### Avantages

- ✅ Privé et sécurisé
- ✅ Notifications en temps réel
- ✅ Gestion fine des permissions
- ✅ Traçabilité complète

### Inconvénients

- ❌ Destinataire doit avoir un compte
- ❌ Pas de partage sur réseaux sociaux
- ❌ Complexe à maintenir

---

## Système 2 : Partage Public par Lien

### Concept

Un utilisateur génère un lien court partageable. N'importe qui avec le lien peut voir le projet. Web Share API pour mobile.

### Tables Supabase

**Fichier** : `supabase/public-sharing-schema.sql`

```sql
CREATE TABLE public_shares (
    id UUID PRIMARY KEY,
    share_token TEXT UNIQUE NOT NULL,  -- Token court (8 chars)
    project_id UUID REFERENCES pixel_projects(id),
    owner_id UUID REFERENCES auth.users(id),
    project_snapshot JSONB NOT NULL,    -- Snapshot du projet
    project_name TEXT NOT NULL,
    project_thumbnail TEXT,
    view_count INTEGER DEFAULT 0,
    duplicate_count INTEGER DEFAULT 0,
    allow_duplicate BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public_share_analytics (
    id UUID PRIMARY KEY,
    share_id UUID REFERENCES public_shares(id),
    action TEXT CHECK (action IN ('viewed', 'duplicated', 'link_copied')),
    user_id UUID REFERENCES auth.users(id),
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Fonctionnalités Implémentées

✅ **Backend (database.js)** - Lignes 783-1045
- `createPublicShare(projectName, options)`
- `getPublicShare(shareToken)`
- `logPublicShareAnalytics(shareId, action, metadata)`
- `duplicatePublicShare(shareToken)`
- `getMyPublicShares()`
- `deletePublicShare(shareToken)`
- `getShareableUrl(shareToken)`

✅ **Frontend (sharing.js)** - Lignes 92-241
- `handleShareButtonClick()` - Création et partage
- Web Share API pour mobile
- Copie automatique dans presse-papier (desktop)
- Fallback dialog manuel

✅ **Page publique (shared.html)**
- Page complète de visualisation
- Rendu canvas du pixel art
- Statistiques (vues, duplications, frames)
- Bouton duplication (si connecté)
- Responsive mobile/desktop

✅ **Configuration**
- `public/js/config/app-config.js` - APP_URL

### Avantages

- ✅ Partage facile sur réseaux sociaux
- ✅ Web Share API natif iOS/Android
- ✅ Accessible sans compte (visualisation)
- ✅ Analytics détaillés

### Inconvénients

- ❌ Lien public (pas privé)
- ❌ Difficile à révoquer une fois partagé
- ❌ Risque d'abus (spam de liens)

---

## Étapes de Réimplémentation

### Option A : Partage Privé Uniquement (Recommandé pour démarrer)

#### Étape 1 : Base de données (15 min)

1. Ouvrir **Supabase Dashboard** → **SQL Editor**
2. Exécuter le fichier `supabase/sharing-schema.sql`
3. Vérifier que les tables `project_shares` et `project_access_log` existent
4. Vérifier que les politiques RLS sont actives

#### Étape 2 : Backend (5 min)

Les fonctions sont déjà dans `database.js` (lignes 388-781).

**Vérifier que ces fonctions fonctionnent** :
```javascript
// Test rapide dans la console
await window.dbService.shareProject('Test Project', 'email@example.com', {
    permission: 'can_duplicate',
    message: 'Test de partage'
});
```

#### Étape 3 : Interface (30 min)

**Décommenter/Réactiver dans `index.html`** :
```html
<!-- Boutons de partage -->
<button id="shareProjectBtn">📤 Partager</button>
<button id="shareProjectBtn2">📤 Partager</button>

<!-- Boutons projets partagés avec badge -->
<button id="sharedWithMeBtn">
    👥 Projets partagés
    <span id="sharedBadge" class="notification-badge">0</span>
</button>

<!-- Modals (lignes 321-425 de index.html) -->
<!-- À réactiver -->
```

**Réactiver `sharing.js`** :
```html
<script src="js/sharing.js"></script>
```

#### Étape 4 : Tests (1-2h)

Voir section "Tests à Effectuer" ci-dessous.

---

### Option B : Partage Public Uniquement

#### Étape 1 : Base de données

Exécuter `supabase/public-sharing-schema.sql` au lieu de `sharing-schema.sql`.

#### Étape 2 : Configuration

Configurer `public/js/config/app-config.js` avec la bonne URL :
```javascript
window.APP_URL = 'https://votre-app.vercel.app';
```

#### Étape 3 : Interface

Bouton partage direct (pas de choix email/fichier) :
```html
<button id="shareProjectBtn">📤 Partager</button>
```

Event listener direct :
```javascript
document.getElementById('shareProjectBtn').addEventListener('click', handleShareButtonClick);
```

#### Étape 4 : Tests

Tester le Web Share API sur mobile réel.

---

### Option C : Les Deux Systèmes (Avancé)

**Recommandation** : Commencer par Option A, puis ajouter Option B après validation.

1. Appliquer les deux schémas SQL
2. Proposer un choix dans l'UI :
   - "Partager avec un utilisateur" → Système privé
   - "Partager publiquement" → Système public

---

## Points d'Attention Sécurité

### 🔒 Sécurité Critique

1. **Row Level Security (RLS)**
   - ✅ TOUJOURS activer RLS sur les tables de partage
   - ✅ Tester que les utilisateurs ne peuvent pas voir les partages d'autres
   - ✅ Vérifier avec plusieurs comptes test

2. **Validation des Emails**
   - ✅ Validation côté serveur (déjà dans SQL)
   - ✅ Empêcher l'auto-partage (déjà implémenté)
   - ✅ Vérifier l'unicité (contrainte déjà présente)

3. **Permissions**
   - ⚠️ Bien tester les 3 niveaux : view_only, can_duplicate, can_edit
   - ⚠️ S'assurer que view_only ne permet PAS de dupliquer
   - ⚠️ can_edit nécessite des tests de concurrence

4. **Expiration**
   - ✅ Fonction de nettoyage existe (`cleanup_expired_shares()`)
   - ⚠️ Programmer un cron job Supabase pour nettoyer automatiquement

5. **Snapshot vs Live**
   - 🤔 Décider si les partages montrent :
     - **Snapshot** : Le projet au moment du partage (système public actuel)
     - **Live** : Le projet actuel (système privé actuel)
   - Snapshot = plus sûr mais peut être obsolète
   - Live = toujours à jour mais peut exposer des modifs non voulues

### 🔍 Tests de Sécurité Obligatoires

**Avant de déployer en production** :

```
☐ Un utilisateur A ne peut pas voir les partages de B
☐ Un utilisateur A ne peut pas modifier les partages de B
☐ Un utilisateur non authentifié ne peut pas accéder aux partages privés
☐ Un utilisateur ne peut pas se partager un projet à lui-même
☐ Les emails invalides sont rejetés
☐ Les permissions view_only empêchent la duplication
☐ Les partages expirés ne sont plus accessibles
☐ La révocation fonctionne immédiatement
☐ Injection SQL impossible (paramètres préparés)
☐ XSS impossible (échappement HTML)
```

---

## Tests à Effectuer

### Tests Fonctionnels

#### Partage Privé

```
☐ Créer un partage avec permission "can_duplicate"
☐ Le destinataire voit le badge de notification
☐ Le destinataire peut dupliquer le projet
☐ La duplication crée bien un nouveau projet
☐ Le projet dupliqué est modifiable
☐ Créer un partage avec permission "view_only"
☐ Le destinataire peut voir mais pas dupliquer
☐ Tester le refus d'un partage
☐ Vérifier que le refus enlève le partage de la liste
☐ Tester l'expiration (créer avec 1 jour, vérifier après)
☐ Tester la révocation par le propriétaire
```

#### Partage Public

```
☐ Créer un lien de partage
☐ Copier le lien et l'ouvrir dans un autre navigateur
☐ Vérifier que le projet s'affiche correctement
☐ Tester la duplication (connecté)
☐ Tester l'affichage (non connecté)
☐ Vérifier les compteurs (vues, duplications)
☐ Tester Web Share API sur iOS
☐ Tester Web Share API sur Android
☐ Vérifier le fallback desktop (copie presse-papier)
☐ Tester allow_duplicate = false
☐ Vérifier l'expiration des liens
```

### Tests de Performance

```
☐ Charger 100 partages dans la liste
☐ Créer 10 partages rapidement
☐ Tester avec un projet de 100 frames
☐ Vérifier les temps de chargement de shared.html
```

### Tests Multi-navigateurs

```
☐ Chrome Desktop
☐ Firefox Desktop
☐ Safari Desktop
☐ Safari iOS
☐ Chrome Android
☐ Edge Desktop
```

---

## Fichiers Concernés

### Fichiers SQL

```
supabase/
├── sharing-schema.sql           ✅ Partage privé (email)
└── public-sharing-schema.sql    ✅ Partage public (lien)
```

### Fichiers JavaScript

```
public/js/
├── database.js                  ✅ Fonctions backend
│   ├── Lignes 388-781          → Partage privé
│   └── Lignes 783-1045         → Partage public
├── sharing.js                   ✅ UI et événements
│   ├── Lignes 1-87             → Init et helpers
│   ├── Lignes 92-241           → Partage public (Web Share)
│   └── Lignes 243-527          → Partage privé (email)
└── config/
    └── app-config.js           ✅ Configuration APP_URL
```

### Fichiers HTML

```
public/
├── index.html                   ✅ Application principale
│   ├── Lignes 77-81, 290-294   → Boutons de partage
│   ├── Lignes 321-350          → Modal choix méthode
│   ├── Lignes 352-410          → Modal partage email
│   └── Lignes 413-425          → Modal projets partagés
└── shared.html                  ✅ Page publique de visualisation
```

### Fichiers CSS

```
public/styles/
└── common.css                   ✅ Styles de partage
    └── Lignes 808-1211         → Modals et cards de partage
```

### Documentation

```
docs/
├── SHARING-SYSTEM.md            ✅ Doc système privé (détaillée)
├── SHARING-SETUP.md             ✅ Guide installation privé
└── SHARING-REIMPLEMENTATION-GUIDE.md  ← Ce fichier
```

---

## Recommandations pour la Réimplémentation

### Phase 1 : MVP (1 semaine)

1. ✅ Implémenter **uniquement** le partage privé par email
2. ✅ Permission : **can_duplicate uniquement** (pas view_only ni can_edit)
3. ✅ Pas d'expiration (partages permanents)
4. ✅ Tests de sécurité basiques

### Phase 2 : Amélioration (1 semaine)

1. ✅ Ajouter permission view_only
2. ✅ Ajouter expiration optionnelle
3. ✅ Tests de sécurité approfondis
4. ✅ Beta test avec utilisateurs réels

### Phase 3 : Partage Public (2 semaines)

1. ✅ Implémenter le partage public
2. ✅ Web Share API
3. ✅ Page shared.html
4. ✅ Analytics

### Phase 4 : Collaboration (Futur)

1. ✅ Permission can_edit
2. ✅ Temps réel avec Supabase Realtime
3. ✅ Notifications par email

---

## Questions Fréquentes

### Dois-je implémenter les deux systèmes ?

**Non.** Commencez par le partage privé uniquement. C'est plus sûr et plus simple.

### Le code est-il sûr ?

Le code a des protections de base (RLS, validation) mais **nécessite des tests de sécurité** avant production.

### Puis-je modifier le code ?

Oui, c'est même recommandé ! Adaptez-le à vos besoins spécifiques.

### Les partages restent combien de temps ?

Actuellement permanent sauf si `expires_at` est défini. Ajoutez un cron job pour nettoyer.

---

## Checklist de Déploiement

Avant de mettre en production :

```
☐ Tous les tests de sécurité passent
☐ RLS activé et testé sur toutes les tables
☐ Tests avec au moins 3 comptes utilisateurs différents
☐ Tests sur mobile (iOS + Android)
☐ Documentation utilisateur créée
☐ Monitoring/alertes configurés
☐ Plan de rollback préparé
☐ Backup de la base de données
☐ Rate limiting configuré (éviter spam)
☐ RGPD : Politique de confidentialité mise à jour
```

---

## Support et Maintenance

### Logs à Surveiller

- Erreurs de partage dans Supabase Logs
- Nombre de partages créés par utilisateur (détecter spam)
- Taux d'erreur sur `duplicateSharedProject`
- Temps de réponse de `getSharedWithMeProjects`

### Métriques Utiles

- Nombre de partages actifs
- Nombre de partages acceptés vs refusés
- Temps moyen entre partage et première vue
- Top utilisateurs créateurs de partages

---

## Ressources Externes

- **Supabase RLS** : https://supabase.com/docs/guides/auth/row-level-security
- **Web Share API** : https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
- **Sécurité Web** : https://owasp.org/www-project-top-ten/

---

## Historique

- **Janvier 2025** : Développement initial, retiré par sécurité
- **À venir** : Réimplémentation planifiée

---

## Conclusion

Le système de partage est **prêt à 80%** mais nécessite :
- ✅ Tests de sécurité approfondis (critique)
- ✅ Tests utilisateurs réels
- ✅ Décision : privé vs public vs les deux

**Recommandation** : Commencer par le partage privé simple (can_duplicate uniquement), puis itérer.

---

**Bon courage pour la réimplémentation ! 🚀**

*Si vous avez des questions, consultez les fichiers de documentation existants ou testez avec de petits changements incrémentaux.*
