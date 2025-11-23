# 🎨 Système de Modèles Partagés - Documentation

## Vue d'ensemble

Le système de modèles partagés permet aux utilisateurs de :
- ✨ **Publier** leurs créations comme modèles à réaliser
- 🧩 **Parcourir** une banque de modèles triés par catégorie et style
- 🔍 **Filtrer** les modèles par catégorie et tags de style
- 🎯 **Réaliser** des modèles en suivant les indications de couleur (triangles)

## Installation

### 1. Créer les tables dans Supabase

Exécutez le script SQL suivant dans le SQL Editor de Supabase :

```sql
-- Fichier: supabase/templates-schema.sql
```

Ce script crée :
- `pixel_templates` : Table principale pour les modèles partagés
- `template_favorites` : Favoris des utilisateurs
- `template_completions` : Suivi des complétions
- Politiques RLS (Row Level Security)
- Index pour les performances
- Triggers pour les compteurs automatiques

### 2. Vérifier la configuration

Assurez-vous que :
- ✅ `database.js` contient les nouvelles fonctions de gestion des modèles
- ✅ `script-templates.js` est inclus dans `index-beta.html`
- ✅ Les boutons "Publier un Modèle" sont présents dans l'interface

## Utilisation

### Publier un Modèle

1. Créez votre pixel art dans la grille
2. Cliquez sur le bouton **"✨ Publier un Modèle"**
3. Remplissez le formulaire :
   - **Nom** : Nom du modèle (obligatoire)
   - **Description** : Description optionnelle
   - **Catégorie** : Sélectionnez une catégorie (obligatoire)
   - **Styles/Tags** : Sélectionnez un ou plusieurs tags précis
   - **Difficulté** : Choisissez de 1 à 5 étoiles
4. Cliquez sur **"✨ Publier"**

⚠️ **Important** : Votre modèle sera visible par tous les utilisateurs. Assurez-vous qu'il soit terminé et prêt à être réalisé !

### Parcourir les Modèles

1. Cliquez sur **"🧩 Modèles à Réaliser"**
2. La galerie affiche :
   - Les modèles locaux (fournis avec l'app)
   - Les modèles partagés par les utilisateurs
3. Utilisez les filtres pour trouver des modèles spécifiques :
   - **Catégorie** : Filtre par catégorie principale
   - **Style** : Tapez un mot-clé (ex: "zelda", "marvel", "disney")
4. Cliquez sur un modèle pour le charger dans la grille

### Réaliser un Modèle

1. Chargez un modèle depuis la galerie
2. Les **triangles indicateurs** apparaissent dans les pixels à colorier
3. Utilisez l'**outil pipette** pour extraire la couleur attendue depuis le triangle
4. Coloriez le pixel avec la couleur extraite
5. Le triangle disparaît automatiquement lorsque la couleur est correcte

## Catégories Disponibles

- 😊 Emoji
- 🔷 Formes
- 🐾 Animaux
- 🌳 Nature
- 🏛️ Architecture
- 👤 Personnages
- 🚗 Véhicules
- 🍕 Nourriture
- 📦 Objets
- 🎨 Autre

## Styles/Tags Disponibles

### Jeux Vidéo
- Jeux Vidéo, Zelda, Super Mario, Pokémon, Minecraft, Rétro, 8-bit, 16-bit

### Dessin Animé
- Dessin Animé, Anime, Manga, Studio Ghibli, Disney

### Super-Héros
- Marvel, DC Comics, Super-Héros, Batman, Spider-Man

### Genres
- Fantasy, Médiéval, Science-Fiction, Futuriste

### Nature
- Nature, Animaux, Fleurs, Arbres, Oiseaux

### Véhicules
- Véhicules, Voitures, Avions, Bateaux

### Nourriture
- Nourriture, Fruits, Légumes, Desserts

### Objets
- Objets, Meubles, Outils, Électronique

## Structure Technique

### Base de Données

**Table `pixel_templates`** :
- `id` : UUID unique
- `author_id` : ID de l'auteur
- `author_email` : Email de l'auteur
- `name` : Nom du modèle
- `description` : Description optionnelle
- `category` : Catégorie principale
- `style_tags` : Array de tags de style
- `template_data` : JSONB - Frame avec couleurs pour les indicateurs (isEmpty: false pour pixels à colorier)
- `preview_data` : JSONB - Version complète pour l'aperçu dans la galerie
- `thumbnail` : Image base64 de l'aperçu
- `difficulty` : Difficulté de 1 à 5
- `view_count` : Nombre de vues
- `completion_count` : Nombre de complétions
- `favorite_count` : Nombre de favoris
- `is_public` : Modèle public ou privé
- `is_approved` : Modèle approuvé (pour modération future)
- `is_featured` : Modèle mis en avant

### Fonctions JavaScript

**Dans `database.js`** :
- `publishTemplate(templateData)` : Publie un modèle
- `getTemplates(filters)` : Récupère les modèles avec filtres
- `getTemplateById(templateId)` : Récupère un modèle par ID
- `getMyTemplates()` : Récupère les modèles de l'utilisateur
- `markTemplateAsCompleted(templateId, completionTimeSeconds)` : Marque comme complété
- `toggleTemplateFavorite(templateId, isFavorite)` : Ajoute/retire des favoris
- `deleteTemplate(templateId)` : Supprime un modèle (auteur uniquement)

**Dans `script-templates.js`** :
- `showPublishTemplateDialog()` : Affiche le dialogue de publication
- `publishCurrentTemplate(modal)` : Publie le modèle actuel
- `showTemplateGallery()` : Affiche la galerie de modèles
- `loadTemplate(template)` : Charge un modèle dans la grille
- `loadSharedTemplate(templateId)` : Charge un modèle partagé depuis Supabase
- `addTemplateIndicators(templatePreview)` : Ajoute les triangles indicateurs

## Notes Importantes

### Version Vide vs Version Complète

Quand un modèle est publié :
- **`template_data`** : Contient les pixels avec `isEmpty: false` pour les pixels à colorier, mais avec la couleur stockée. C'est cette version qui est utilisée pour créer les indicateurs.
- **`preview_data`** : Version complète finie pour l'aperçu dans la galerie.

Quand un modèle est chargé :
- La grille est vidée (tous les pixels avec `isEmpty: true`)
- Les indicateurs (triangles) sont créés avec les couleurs de `template_data`
- L'utilisateur doit colorier les pixels pour faire disparaître les indicateurs

### Filtres

Les filtres fonctionnent en temps réel :
- Filtre par **catégorie** : Filtre exact sur la catégorie
- Filtre par **style** : Recherche dans les tags de style (recherche partielle)

### Compteurs Automatiques

Les compteurs sont automatiquement mis à jour via des triggers SQL :
- **view_count** : Incrémenté quand un modèle est chargé
- **completion_count** : Incrémenté quand un modèle est marqué comme complété
- **favorite_count** : Mis à jour quand un modèle est ajouté/retiré des favoris

## Améliorations Futures

- [ ] Système de modération des modèles
- [ ] Notation des modèles par les utilisateurs
- [ ] Recherche avancée avec plusieurs critères
- [ ] Suggestions de modèles basées sur l'activité
- [ ] Statistiques détaillées pour les auteurs
- [ ] Export de modèles personnalisés
- [ ] Challenge du jour
- [ ] Classements et badges

