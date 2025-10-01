# ✅ Checklist de Tests Mobile - Pixel Art Editor

## 📱 Appareils à Tester (par ordre de priorité)

### 🔴 Priorité Haute (Tests obligatoires)

#### iPhone avec encoche
- [ ] **iPhone 14 Pro / Pro Max** (Dynamic Island)
  - [ ] Safari iOS
  - [ ] Mode PWA installée
  - [ ] Portrait
  - [ ] Paysage
  - [ ] ✅ Vérifier que la grille n'est pas coupée par l'encoche
  - [ ] ✅ Vérifier la bannière pub en bas (pas cachée par la barre)

#### iPhone standard
- [ ] **iPhone 12/13/14 standard**
  - [ ] Safari iOS
  - [ ] Chrome iOS
  - [ ] Portrait et paysage

#### Petit iPhone
- [ ] **iPhone SE (2ème/3ème gen)** ou iPhone 12 mini
  - [ ] Safari iOS
  - [ ] ✅ Vérifier que tous les boutons sont accessibles
  - [ ] ✅ Vérifier que la grille est visible entièrement

### 🟡 Priorité Moyenne

#### Android Standard
- [ ] **Galaxy S21/S22/S23** ou équivalent
  - [ ] Chrome Android
  - [ ] Samsung Internet
  - [ ] ✅ Vérifier le fallback backdrop-filter

#### Grand Android
- [ ] **Galaxy Note** ou Pixel 7/8 Pro
  - [ ] Chrome Android
  - [ ] ✅ Vérifier l'utilisation de l'espace

### 🟢 Priorité Basse (Bonus)

#### Tablettes
- [ ] **iPad** (n'importe quel modèle)
  - [ ] Portrait
  - [ ] Paysage
  - [ ] ✅ Vérifier les grandes grilles

#### Vieux appareils
- [ ] **iPhone SE 1ère génération** (si disponible)
- [ ] **Vieux Android** (Android 9 ou inférieur)

---

## 🔍 Points de Contrôle par Écran

### A. Page d'accueil / Éditeur

#### Header (Titre du projet)
- [ ] Le titre est centré et lisible
- [ ] Le bouton hamburger n'est pas coupé (sur mobile)
- [ ] Pas de chevauchement avec les encoches

#### Menu Hamburger (Mobile uniquement)
- [ ] Le menu s'ouvre correctement
- [ ] Tous les boutons sont visibles
- [ ] Le menu se ferme proprement
- [ ] L'icône hamburger devient une croix ❌

#### Nuancier de couleurs
- [ ] Le color picker est accessible
- [ ] Les couleurs preset sont visibles
- [ ] Les boutons gomme/undo/redo fonctionnent
- [ ] Bouton de validation de couleur accessible

#### Grille de pixels (CRITIQUE ⚠️)
- [ ] **La grille affiche exactement 32×32 cases**
- [ ] **Aucune case n'est coupée sur les bords**
- [ ] La grille reste carrée (ratio 1:1)
- [ ] Le zoom tactile ne casse pas la grille
- [ ] Les pixels sont tous cliquables
- [ ] Le dessin au doigt fonctionne bien
- [ ] Les coins de la grille sont visibles et fonctionnels

#### Frames (en bas)
- [ ] Les frames ne sont pas cachées par la bannière pub
- [ ] Le bouton "+ Nouvelle Frame" est accessible
- [ ] Le scroll horizontal fonctionne
- [ ] Les miniatures s'affichent correctement

#### Bannière publicitaire
- [ ] La bannière est fixée en bas
- [ ] Elle ne cache aucun élément important
- [ ] Sur iPhone avec encoche : elle respecte la safe area
- [ ] L'espace est réservé et visible

---

## 🎨 Tests Visuels Spécifiques

### Test 1 : Effet Glass (Liquid Glass)
**Sur navigateurs modernes (Safari iOS, Chrome récent) :**
- [ ] Les éléments ont un effet de flou (backdrop-filter)
- [ ] Le fond est transparent avec effet glass
- [ ] Les animations sont fluides

**Sur navigateurs anciens (Firefox Mobile, vieux Chrome) :**
- [ ] Les éléments ont une couleur de fond solide
- [ ] Le fond est légèrement opaque mais harmonieux
- [ ] Pas d'effet de flou mais reste joli
- [ ] ✅ **Aucune zone n'est illisible**

### Test 2 : Couleurs et contraste
- [ ] Le texte blanc est lisible sur fond coloré
- [ ] Les boutons ont assez de contraste
- [ ] Les couleurs preset sont distinctes

### Test 3 : Zones tactiles
- [ ] Tous les boutons font au moins 44×44 pixels (recommandation Apple)
- [ ] Les petits boutons (undo/redo) sont cliquables facilement
- [ ] Pas de zones mortes sur la grille

---

## 📐 Tests par Taille d'Écran

### Très petit (< 375px)
- [ ] Tout est visible sans scroll horizontal
- [ ] Les boutons sont compacts mais utilisables
- [ ] La grille : minimum 6px par case, maximum 12px

### Petit (375-413px)
- [ ] Interface optimisée
- [ ] Grille : 7-13px par case

### Moyen (414-479px)
- [ ] Boutons confortables
- [ ] Grille : 8-14px par case

### Grand téléphone (480-767px)
- [ ] Utilisation optimale de l'espace
- [ ] Grille : 9-16px par case

### Tablette (768-1023px)
- [ ] Layout adapté
- [ ] Grille : 12-20px par case
- [ ] Portrait et paysage fonctionnels

---

## 🔄 Tests de Rotation

### Portrait → Paysage
1. [ ] Commencer en portrait
2. [ ] Dessiner quelque chose sur la grille
3. [ ] Tourner en paysage
4. [ ] ✅ Le dessin est préservé
5. [ ] ✅ La grille se redimensionne sans casser
6. [ ] ✅ Les proportions restent correctes

### Paysage → Portrait
1. [ ] Commencer en paysage
2. [ ] Dessiner quelque chose
3. [ ] Tourner en portrait
4. [ ] ✅ Tout fonctionne encore

---

## 🌐 Tests par Navigateur

### Safari iOS
- [ ] Affichage normal
- [ ] Mode PWA (après installation)
- [ ] Barre d'URL qui apparaît/disparaît ne casse rien
- [ ] Safe areas respectées

### Chrome iOS
- [ ] Même expérience que Safari
- [ ] Barre d'outils Chrome ne gêne pas

### Chrome Android
- [ ] Affichage cohérent
- [ ] Barre d'adresse gérée correctement
- [ ] Fallback backdrop-filter OK

### Samsung Internet
- [ ] Interface fonctionnelle
- [ ] Pas de bugs spécifiques Samsung

### Firefox Mobile (Android)
- [ ] Fallback backdrop-filter actif
- [ ] Couleurs de fond solides visibles
- [ ] Tout reste fonctionnel

---

## 🐛 Tests de Bugs Connus

### Bug iOS : Barre d'URL
- [ ] Scroller vers le haut
- [ ] La barre d'URL réapparaît
- [ ] ✅ La grille ne se déforme pas
- [ ] ✅ Rien ne se casse

### Bug Android : Clavier virtuel
1. [ ] Ouvrir un dialogue de sauvegarde
2. [ ] Le clavier apparaît
3. [ ] ✅ Le dialogue reste visible
4. [ ] Fermer le clavier
5. [ ] ✅ L'interface se remet correctement

### Bug Rotation
- [ ] Tourner rapidement plusieurs fois
- [ ] ✅ Pas de freeze
- [ ] ✅ Pas d'éléments qui disparaissent

---

## ⚡ Tests de Performance

### Fluidité
- [ ] Les animations sont fluides (60fps)
- [ ] Le dessin répond instantanément au toucher
- [ ] Pas de lag quand on ouvre/ferme le menu
- [ ] Le scroll des frames est fluide

### Chargement
- [ ] La page charge en moins de 3 secondes
- [ ] Les effets glass apparaissent progressivement
- [ ] Pas de FOUC (Flash of Unstyled Content)

---

## 📊 Résultat Final

### Statut Global
- [ ] ✅ **TOUT FONCTIONNE** - Prêt à déployer
- [ ] ⚠️ **BUGS MINEURS** - Peut déployer avec notes
- [ ] ❌ **BUGS BLOQUANTS** - Ne pas déployer

### Bugs trouvés
```
Appareil : _____________
Navigateur : ___________
Problème : _____________
____________________________
____________________________
```

### Notes
```
____________________________
____________________________
____________________________
```

---

## 🎯 Critères de Validation

Pour considérer les tests comme **réussis**, il faut :

1. ✅ La grille 32×32 est TOUJOURS visible en entier
2. ✅ Aucun élément n'est caché par les encoches/barres système
3. ✅ Le dessin fonctionne sur tous les appareils testés
4. ✅ Les fallbacks sont élégants (pas de zones blanches/noires)
5. ✅ La rotation ne casse rien
6. ✅ Les performances sont bonnes (pas de lag)

Si l'un de ces critères échoue → **Ne pas déployer**, analyser le problème.

---

## 🚀 Après Validation

Une fois tous les tests passés :
1. [ ] Commit des changements
2. [ ] Push vers le repository
3. [ ] Déploiement sur Vercel
4. [ ] Test rapide sur la version déployée
5. [ ] 🎉 **C'est prêt !**

---

**Date du test :** ___/___/2025  
**Testeur :** __________________  
**Résultat :** ☐ ✅ Validé  ☐ ⚠️ À revoir  ☐ ❌ Échec

