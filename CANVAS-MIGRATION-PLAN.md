# Plan de migration — Rendu Canvas

## Contexte

Aujourd'hui l'éditeur crée un élément `<div>` par pixel dans le DOM.
Sur une grille 32×32 = 1 024 divs. Sur 256×256 = **65 536 divs**.
Le navigateur gère chaque div individuellement (style, événements, reflow)
ce qui devient lent et imprécis sur les grandes grilles.

L'objectif est de remplacer tous ces divs par **3 éléments `<canvas>`**
superposés, tout en conservant intacte la logique métier (données,
sauvegarde, export, authentification).

---

## Ce qui ne change pas

| Composant | Statut |
|-----------|--------|
| Modèle de données `frames[]` | ✅ Inchangé |
| Save / Load Supabase | ✅ Inchangé |
| Export GIF + Sprite Sheet | ✅ Inchangé (déjà canvas) |
| Authentification | ✅ Inchangé |
| Toute la sidebar / toolbar / modals | ✅ Inchangé |
| Undo / Redo (historique) | ✅ Inchangé (déjà basé sur tableaux) |
| Outil Tampon (stamp overlay) | ✅ Inchangé (déjà canvas) |
| Miniatures de frames | ✅ Inchangé (déjà canvas) |
| `editor.html` | ✅ Aucun changement HTML |

---

## Nouvelle architecture

```
#pixelGrid (div conteneur — inchangé)
  ├── <canvas id="pixelCanvas">       couche 0 : pixels + lignes de grille
  ├── <canvas id="onionSkinCanvas">   couche 1 : frames précédente/suivante
  └── <canvas id="templateCanvas">   couche 2 : guides de template
  (stampOverlay — déjà canvas, inchangé)
```

Un buffer mémoire `currentFrameBuffer[]` remplace le DOM comme
source de vérité pour les pixels en cours d'édition.

---

## Les 4 phases

### Phase 1 — Fondation canvas (non-destructive)

**But :** Ajouter le canvas SANS toucher au dessin existant.

- Créer `pixelCanvas` superposé aux divs (`pointer-events: none`)
- Implémenter `renderCanvas()` — peint depuis `currentFrameBuffer[]`
- Implémenter `applyGridTransform()` sur le canvas en parallèle du CSS
- Flag `CANVAS_RENDERING = false` — rien ne bascule encore

**Résultat :** Le canvas affiche la même chose que les divs.
Bascule possible à tout moment. Zéro régression.

---

### Phase 2 — Dessin sur canvas

**But :** Remplacer la détection de pixel par coordonnées mathématiques.

- Implémenter `getPixelIndexFromPoint(clientX, clientY)` :
  ```
  col = floor((clientX - rect.left - panX) / zoom / cellSize)
  row = floor((clientY - rect.top  - panY) / zoom / cellSize)
  ```
- Réécrire `startDrawing()`, `draw()` → lisent les coords, pas `e.target`
- Réécrire `saveCurrentFrame()` → copie `currentFrameBuffer[]`, pas le DOM
- Réécrire `loadFrame()` → copie `frames[i]` dans `currentFrameBuffer[]` + `renderCanvas()`
- Réécrire `optimizeTouchInteractions()` → remplace `elementFromPoint`
- Activer `CANVAS_RENDERING = true`

**Résultat :** Dessin, gomme, pipette, touch, animation fonctionnent sur canvas.

**Point de vigilance :** Tester la détection de pixel à zoom ×1, ×4, ×8
et après pan pour s'assurer qu'il n'y a pas de décalage.

---

### Phase 3 — Suppression des divs

**But :** Nettoyer tout le code div et CSS associé.

- Supprimer la création des `div.pixel` dans `initGrid()`
- Supprimer `applyGridCSSVariables()` → remplacé par calcul de `cellSize`
- Supprimer `cleanUpMarkers()`, `cleanUpOutsideElements()`
- Réécrire `script-templates.js` → SVG dans divs → `renderTemplateLayer()`
- Supprimer toutes les règles CSS `.pixel` dans desktop.css / mobile.css / common.css

**Résultat :** Zéro div.pixel dans le DOM. Code nettoyé.

---

### Phase 4 — Optimisations et cas limites

**But :** Performances sur grandes grilles et fiabilité complète.

- `paintPixel(index)` — mise à jour d'une seule cellule pendant le tracé
  (évite le repaint complet à chaque pixel dessiné sur 256×256)
- Lignes de grille : supprimées sur 128×128+ (sub-pixel de toute façon)
- Miniatures de frames : déjà canvas, supprimer les divs enfants
- Corriger le bug GIF hardcodé sur 32px (affecte les exports 64×64+)
- Tests de régression sur toutes les tailles de grille

---

## Fichiers impactés

| Fichier | Changements |
|---------|-------------|
| `public/js/script.js` | ~40 fonctions modifiées, ~5 nouvelles |
| `public/js/script-templates.js` | Refonte complète (SVG → canvas) |
| `public/styles/desktop.css` | Suppression bloc `.pixel` (~80 lignes) |
| `public/styles/mobile.css` | Suppression bloc `.pixel` (~100 lignes) |
| `public/styles/common.css` | Suppression bloc `.pixel` template (~60 lignes) |
| `public/editor.html` | **Aucun changement** |

---

## Risques identifiés

| Risque | Probabilité | Mitigation |
|--------|-------------|------------|
| Décalage hit-test au zoom | Moyenne | Tests coords à zoom ×1/4/8 + après pan |
| Régression touch iOS Safari | Moyenne | Réécrire touch en Phase 2 en même temps que draw |
| Templates (script-templates.js) | Haute | Adaptateur `templateState[]` pour découpler |
| Double-appel `saveCurrentFrame()` | Faible | Déjà cheap avec buffer mémoire |

---

## Gain attendu

| Grille | Aujourd'hui | Après migration |
|--------|-------------|-----------------|
| 32×32 | ✅ Fluide | ✅ Fluide + plus net |
| 64×64 | ⚠️ Léger | ✅ Fluide |
| 128×128 | ⚠️ Lent | ✅ Fluide |
| 256×256 | ❌ Très lent | ✅ Fluide |
| 512×512+ | ❌ Impossible | ✅ Possible |

Pan trackpad, Magic Mouse, Apple Pencil, iPad : tous naturellement
supportés une fois le système d'événements rebranché sur le canvas.
