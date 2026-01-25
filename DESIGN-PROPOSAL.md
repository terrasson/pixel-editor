# 🎨 Proposition de Design Visuel - Pixel Editor

## Vue d'ensemble
Design moderne avec effets visuels subtils, sans alourdir l'interface. Style "Glassmorphism" avec profondeur et élégance.

---

## 🎯 **1. FOND & ATMOSPHÈRE**

### Fond principal
- **Dégradé subtil** : Du gris très clair (#F8F9FA) vers un bleu-gris doux (#F0F4F8)
- **Motif de points subtil** : Points légers en arrière-plan (opacité 3-5%) pour texture
- **Effet de profondeur** : Légère ombre portée sur le container principal

### Alternative (plus moderne)
- **Dégradé coloré doux** : 
  - Haut : #FAFBFC (blanc cassé)
  - Bas : #F5F7FA (bleu-gris très clair)
  - Angle : 135deg pour un effet diagonal subtil

---

## 🎨 **2. BANDEAU SUPÉRIEUR (Header)**

### Style Glassmorphism
- **Fond** : Blanc semi-transparent (rgba(255, 255, 255, 0.85))
- **Backdrop blur** : 20px (effet de flou d'arrière-plan)
- **Bordure** : Ligne fine blanche semi-transparente (rgba(255, 255, 255, 0.3))
- **Ombre** : 
  - Ombre douce : `0 4px 20px rgba(0, 0, 0, 0.08)`
  - Ombre interne : `inset 0 1px 0 rgba(255, 255, 255, 0.5)` pour effet de relief

### Effets au survol
- Légère élévation (transform: translateY(-1px))
- Ombre plus prononcée
- Transition fluide (0.3s ease)

### Logo & Texte
- **Ombre portée légère** sur le logo pour le faire ressortir
- **Effet de brillance subtil** au survol (gradient overlay)

---

## 📦 **3. SIDEBARS (Outils & Frames)**

### Style des panneaux
- **Fond** : Blanc avec transparence (rgba(255, 255, 255, 0.7))
- **Backdrop blur** : 15px
- **Bordure** : Ligne fine avec effet de lumière (rgba(255, 255, 255, 0.4))
- **Ombre** : Ombre douce pour séparation visuelle
- **Rayon** : 20px pour coins arrondis modernes

### Boutons dans les sidebars
- **Fond** : Dégradé subtil (blanc vers gris très clair)
- **Bordure** : Ligne fine avec effet de lumière au survol
- **Ombre** : Légère ombre portée
- **Hover** : 
  - Élévation (transform: translateY(-2px))
  - Ombre plus prononcée
  - Légère brillance (box-shadow avec couleur primaire)
- **Transition** : 0.2s ease pour fluidité

### Boutons spéciaux (Photo→Pixel, Modèles)
- **Dégradés colorés** conservés mais avec plus de profondeur
- **Ombre portée colorée** correspondant à la couleur du bouton
- **Effet de brillance** au survol

---

## 🎯 **4. ZONE DE DESSIN (Canvas)**

### Container du canvas
- **Fond** : Blanc pur avec légère ombre interne
- **Bordure** : Double bordure (blanc + gris très clair) pour effet de profondeur
- **Ombre** : Ombre douce mais visible pour faire ressortir la zone
- **Rayon** : 16px

### Grille de pixels
- **Lignes de grille** : Plus subtiles mais visibles
- **Effet de profondeur** : Légère ombre sur chaque cellule au survol

---

## ✨ **5. EFFETS VISUELS & ANIMATIONS**

### Transitions globales
- **Durée** : 0.2s - 0.3s pour fluidité
- **Easing** : `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design)

### Animations au survol
- **Boutons** : Élévation + ombre + légère brillance
- **Cartes/Panneaux** : Légère élévation
- **Icônes** : Légère rotation ou scale (1.05)

### Animations d'apparition
- **Fade-in** : Éléments apparaissent en douceur (opacity 0 → 1)
- **Slide-in** : Panneaux latéraux glissent depuis les bords

### Effets de focus
- **Ring de focus** : Cercle de lumière autour des éléments actifs
- **Couleur primaire** : Orange (#FF7300) pour les éléments actifs

---

## 🎨 **6. PALETTE DE COULEURS**

### Couleurs principales
- **Primaire** : #FF7300 (Orange - conservé)
- **Primaire hover** : #E66800 (Orange foncé)
- **Accent** : #6366F1 (Indigo doux pour contrastes)

### Arrière-plans
- **Principal** : Dégradé #F8F9FA → #F0F4F8
- **Cartes** : rgba(255, 255, 255, 0.7-0.85) avec blur
- **Hover** : rgba(255, 255, 255, 0.9)

### Textes
- **Principal** : #1D1D1F (conservé)
- **Secondaire** : #6E6E73 (conservé)
- **Sur fond clair** : Légèrement assombri pour contraste

---

## 🌟 **7. DÉTAILS SPÉCIAUX**

### Ombres en couches
- **Ombre douce** : Pour profondeur générale
- **Ombre portée** : Pour élévation des éléments
- **Ombre interne** : Pour effet de relief

### Bordures avec lumière
- **Bordure principale** : Ligne fine
- **Bordure lumineuse** : Ligne blanche semi-transparente pour effet de lumière
- **Bordure au survol** : Légèrement colorée (couleur primaire)

### Effets de profondeur
- **Z-index stratifié** : Éléments flottants avec ombres
- **Élévation progressive** : Plus un élément est interactif, plus il est élevé

---

## 📱 **8. RESPONSIVE**

### Desktop
- **Espacement** : 20px entre les éléments
- **Padding** : 24px dans les panneaux
- **Ombres** : Plus prononcées

### Mobile
- **Espacement** : 16px
- **Padding** : 16px
- **Ombres** : Plus subtiles pour performance

---

## 🎯 **9. RÉSUMÉ DES AMÉLIORATIONS**

✅ **Glassmorphism** : Transparence + blur pour modernité
✅ **Ombres en couches** : Profondeur sans alourdir
✅ **Dégradés subtils** : Élégance et modernité
✅ **Animations fluides** : Interactions agréables
✅ **Effets de lumière** : Bordures lumineuses pour relief
✅ **Transitions douces** : Fluidité dans les interactions
✅ **Couleurs vibrantes** : Boutons spéciaux mis en valeur

---

## ⚠️ **POINTS D'ATTENTION**

- **Performance** : Backdrop-filter peut être coûteux → utiliser avec modération
- **Accessibilité** : Maintenir les contrastes de texte
- **Cohérence** : Appliquer les mêmes effets partout
- **Légèreté** : Ne pas surcharger avec trop d'effets

---

## 🚀 **PROCHAINES ÉTAPES**

1. Appliquer le fond avec dégradé
2. Transformer le header en glassmorphism
3. Ajouter les effets aux sidebars
4. Améliorer les boutons avec ombres et transitions
5. Ajouter les animations au survol
6. Tester et ajuster les contrastes

---

**Style final** : Moderne, élégant, avec profondeur visuelle mais léger et performant.

