# 🚀 Guide de Déploiement sur IONOS - pixel-editor.app

Ce guide vous accompagne pour déployer votre application Pixel Editor sur IONOS avec le domaine `pixel-editor.app`.

## 📋 Prérequis

- ✅ Domaine `pixel-editor.app` créé et configuré dans IONOS
- ✅ Compte IONOS actif
- ✅ Supabase configuré et fonctionnel
- ✅ Base de données Supabase avec toutes les tables créées

## 🔧 Configuration Supabase pour le nouveau domaine

### Étape 1 : Mettre à jour les URLs autorisées dans Supabase

1. **Connectez-vous à Supabase Dashboard**
   - Allez sur https://supabase.com
   - Sélectionnez votre projet

2. **Configuration Authentication**
   - Allez dans **Authentication** → **URL Configuration**
   - Dans **Site URL**, ajoutez : `https://pixel-editor.app`
   - Dans **Redirect URLs**, ajoutez :
     - `https://pixel-editor.app`
     - `https://pixel-editor.app/login.html`
     - `https://pixel-editor.app/index.html`
     - `https://www.pixel-editor.app` (si vous utilisez www)
     - `https://www.pixel-editor.app/login.html`
     - `https://www.pixel-editor.app/index.html`

3. **Sauvegardez les modifications**

### Étape 2 : Vérifier les CORS (si nécessaire)

Si vous avez des problèmes de CORS après déploiement :
- Allez dans **Settings** → **API**
- Vérifiez que votre domaine est autorisé dans les paramètres CORS

## 📦 Préparation des fichiers pour IONOS

### Option 1 : Déploiement via FTP/SFTP (Recommandé pour IONOS)

1. **Préparer les fichiers**
   ```bash
   # Dans le répertoire du projet
   # Les fichiers à uploader sont dans le dossier public/
   ```

2. **Fichiers à uploader sur IONOS** :
   - Tout le contenu du dossier `public/`
   - Structure recommandée :
     ```
     /public/
     ├── index.html
     ├── login.html
     ├── admin.html (optionnel - pour analytics)
     ├── js/
     ├── styles/
     ├── service-worker.js
     └── manifest.json (si présent)
     ```

3. **Fichiers à NE PAS uploader** :
   - `node_modules/`
   - `server.js` (si vous utilisez uniquement des fichiers statiques)
   - `.env`
   - Fichiers de configuration locaux

### Option 2 : Déploiement via Git (si IONOS le supporte)

1. **Créer un dépôt Git** (si pas déjà fait)
2. **Pousser le code** sur GitHub/GitLab
3. **Configurer le déploiement automatique** dans IONOS (si disponible)

## 🌐 Configuration IONOS

### Étape 1 : Configuration du domaine

1. **Dans votre espace client IONOS** :
   - Allez dans **Domaines & SSL**
   - Sélectionnez `pixel-editor.app`
   - Vérifiez que le domaine pointe vers votre hébergement

2. **Configuration DNS** (si nécessaire) :
   - Type A : `@` → IP de votre serveur IONOS
   - Type A : `www` → IP de votre serveur IONOS (si vous utilisez www)
   - Type CNAME : `www` → `pixel-editor.app` (alternative)

### Étape 2 : Configuration SSL/HTTPS

**⚠️ IMPORTANT** : Supabase nécessite HTTPS en production !

1. **Activer SSL dans IONOS** :
   - Allez dans **Domaines & SSL**
   - Activez le certificat SSL pour `pixel-editor.app`
   - IONOS propose généralement Let's Encrypt (gratuit)

2. **Vérifier HTTPS** :
   - Attendez quelques minutes après activation
   - Testez : `https://pixel-editor.app`
   - Le cadenas vert doit apparaître dans le navigateur

### Étape 3 : Configuration du serveur web

#### Si vous utilisez Apache (IONOS par défaut) :

Créez un fichier `.htaccess` dans le dossier `public/` :

```apache
# .htaccess pour pixel-editor.app

# Forcer HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirection www vers non-www (ou inversement selon votre préférence)
# RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
# RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Support des routes SPA (si nécessaire)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Headers de sécurité
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Cache pour les assets statiques
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

#### Si vous utilisez Nginx :

Créez un fichier de configuration (à placer dans la configuration Nginx d'IONOS) :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name pixel-editor.app www.pixel-editor.app;
    
    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pixel-editor.app www.pixel-editor.app;
    
    # Certificat SSL (géré par IONOS)
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/certificate.key;
    
    root /path/to/public;
    index index.html;
    
    # Support des routes SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache pour les assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Headers de sécurité
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
}
```

## 📤 Upload des fichiers

### Méthode 1 : Via FileZilla (FTP/SFTP)

1. **Récupérer les identifiants FTP** dans IONOS :
   - Allez dans **Hébergement** → **FTP**
   - Notez : serveur FTP, nom d'utilisateur, mot de passe

2. **Connecter FileZilla** :
   - Hôte : `ftp.pixel-editor.app` (ou l'adresse fournie par IONOS)
   - Utilisateur : votre identifiant FTP
   - Mot de passe : votre mot de passe FTP
   - Port : 21 (FTP) ou 22 (SFTP)

3. **Uploader les fichiers** :
   - Naviguez vers le dossier `public/` de votre projet local
   - Sélectionnez tous les fichiers et dossiers
   - Glissez-déposez dans le dossier `htdocs/` ou `www/` sur le serveur IONOS

### Méthode 2 : Via le gestionnaire de fichiers IONOS

1. **Connectez-vous à l'espace client IONOS**
2. **Allez dans Hébergement** → **Gestionnaire de fichiers**
3. **Ouvrez le dossier** `htdocs/` ou `www/`
4. **Uploadez les fichiers** via l'interface web

## ✅ Vérifications post-déploiement

### 1. Test de l'application

1. **Ouvrez** `https://pixel-editor.app`
2. **Vérifiez** :
   - ✅ La page se charge correctement
   - ✅ HTTPS fonctionne (cadenas vert)
   - ✅ Redirection vers login.html si non connecté
   - ✅ Authentification fonctionne
   - ✅ Sauvegarde/chargement de projets fonctionne

### 2. Test des fonctionnalités

- ✅ Créer un compte
- ✅ Se connecter
- ✅ Créer un projet pixel art
- ✅ Sauvegarder un projet
- ✅ Charger un projet
- ✅ Exporter en GIF
- ✅ Profil utilisateur

### 3. Vérification console navigateur

1. **Ouvrez les outils développeur** (F12)
2. **Onglet Console** :
   - Vérifiez qu'il n'y a pas d'erreurs
   - Vérifiez que Supabase se connecte : `✅ Supabase config loaded`

3. **Onglet Network** :
   - Vérifiez que les requêtes vers Supabase passent
   - Vérifiez que les fichiers statiques se chargent

## 🔒 Sécurité

### Checklist sécurité

- ✅ HTTPS activé et fonctionnel
- ✅ Certificat SSL valide
- ✅ Headers de sécurité configurés
- ✅ Supabase RLS activé sur toutes les tables
- ✅ Pas de credentials exposés dans le code client
- ✅ Service Worker configuré (si PWA)

## 📊 Configuration Analytics (Optionnel)

Si vous voulez accéder au dashboard admin :

1. **Uploadez** `admin.html` sur le serveur
2. **Accédez à** `https://pixel-editor.app/admin.html`
3. **Configurez** votre email dans `admin.html` (ligne 12)

## 🐛 Dépannage

### Problème : "Supabase not configured"
**Solution** : Vérifiez que `public/js/config/supabase-config.js` contient les bonnes credentials

### Problème : Erreurs CORS
**Solution** : 
1. Vérifiez les Redirect URLs dans Supabase
2. Vérifiez que le domaine est bien en HTTPS
3. Vérifiez les headers CORS dans la configuration IONOS

### Problème : Redirection infinie
**Solution** : Vérifiez la configuration `.htaccess` et les Redirect URLs dans Supabase

### Problème : Service Worker ne fonctionne pas
**Solution** : 
1. Vérifiez que `service-worker.js` est accessible
2. Vérifiez que HTTPS est activé (requis pour les Service Workers)
3. Videz le cache du navigateur

### Problème : Les fichiers ne se chargent pas
**Solution** :
1. Vérifiez les permissions des fichiers (644 pour fichiers, 755 pour dossiers)
2. Vérifiez que les chemins sont corrects (pas de chemins absolus locaux)
3. Vérifiez les logs d'erreur dans IONOS

## 📝 Checklist finale

Avant de mettre en production :

- [ ] Domaine `pixel-editor.app` configuré dans IONOS
- [ ] SSL/HTTPS activé et fonctionnel
- [ ] URLs Supabase mises à jour avec le nouveau domaine
- [ ] Fichiers uploadés sur le serveur IONOS
- [ ] `.htaccess` configuré (si Apache)
- [ ] Test de toutes les fonctionnalités
- [ ] Vérification console navigateur (pas d'erreurs)
- [ ] Test sur mobile et desktop
- [ ] Dashboard admin accessible (si nécessaire)

## 🎉 C'est prêt !

Une fois toutes ces étapes complétées, votre application sera accessible sur **https://pixel-editor.app** !

---

**Besoin d'aide ?** 
- Documentation IONOS : https://www.ionos.fr/assistance/
- Support Supabase : https://supabase.com/docs/guides/platform

