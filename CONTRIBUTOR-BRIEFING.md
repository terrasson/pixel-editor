# Briefing Contributeur — Migration Canvas

## Contexte du projet

pixel-editor.app est un éditeur de pixel art animé avec :
- Grilles de 8×8 à 256×256 pixels
- Animation multi-frames
- Sauvegarde cloud (Supabase)
- Export GIF + Sprite Sheet
- Version mobile/tablet/desktop
- Galerie publique

Stack : HTML / CSS / Vanilla JS (frontend) + Express + Supabase (backend)
Déploiement : Vercel

---

## Le problème actuel

L'éditeur crée **un élément `<div>` par pixel** dans le DOM.

```
Grille 32×32  →  1 024 divs    ✅ OK
Grille 128×128 → 16 384 divs   ⚠️ Lent
Grille 256×256 → 65 536 divs   ❌ Très lent, dessin imprécis
```

Chaque div reçoit ses propres événements souris, son propre style CSS,
son propre calcul de position. Sur les grandes grilles :
- Le dessin colorie plusieurs pixels à la fois (cellules trop petites)
- Le zoom/pan est une approximation CSS (artefacts visuels)
- Le pan au trackpad / Magic Mouse / touch n'est pas fluide
- Apple Pencil sur iPad ne fonctionne pas correctement

---

## La solution : rendu canvas

Remplacer tous les divs par **3 éléments `<canvas>`** superposés :

```
<canvas id="pixelCanvas">      → pixels colorés + grille
<canvas id="onionSkinCanvas">  → frames fantômes (onion skin)
<canvas id="templateCanvas">   → guides de template
```

Le modèle de données (`frames[]`, undo/redo, save/load) reste
**entièrement intact**. Seul le moteur de rendu change.

---

## Ce qui ne touche pas

Pour être clair sur le périmètre :

- ❌ Pas touche à Supabase / auth / database.js
- ❌ Pas touche à l'export GIF / Sprite Sheet (déjà canvas)
- ❌ Pas touche à la galerie / partage / templates
- ❌ Pas touche à editor.html (aucun changement HTML)
- ❌ Pas touche aux modals, sidebar, toolbar

---

## Plan en 4 phases

### Phase 1 — Fondation (non-destructive)
Ajouter le canvas EN PARALLÈLE des divs existants.
Flag `CANVAS_RENDERING = false` → l'app tourne exactement comme avant.
Objectif : prouver que le canvas affiche la même chose.

### Phase 2 — Basculement du dessin
Remplacer `e.target` (div ciblé) par `getPixelIndexFromPoint(x, y)`
(calcul mathématique depuis les coordonnées souris/touch).
Activer `CANVAS_RENDERING = true`.
→ L'app dessine sur le canvas. Les divs sont encore là mais inutilisés.

### Phase 3 — Suppression des divs
Supprimer la création des `div.pixel`, toutes les règles CSS `.pixel`,
et réécrire `script-templates.js` (seul fichier fortement couplé au DOM).
→ Zéro div.pixel dans le DOM. Code propre.

### Phase 4 — Optimisations
- `paintPixel()` : mise à jour d'une seule cellule (pas repaint complet)
- Lignes de grille désactivées sur 128×128+
- Pan trackpad / Magic Mouse / touch via `wheel` deltaX/deltaY
- Apple Pencil : `pointerType === 'pen'` → dessine, 2 doigts → pan

---

## Fichiers clés

```
public/js/script.js           → moteur principal (~7500 lignes)
public/js/script-templates.js → templates (le plus couplé au DOM)
public/styles/desktop.css     → CSS grille à nettoyer
public/styles/mobile.css      → CSS grille à nettoyer
public/styles/common.css      → CSS grille à nettoyer
```

Le plan technique complet (fonctions, formules, risques) est dans :
→ `CANVAS-MIGRATION-PLAN.md`

---

## Points d'attention

**Le risque principal** est `script-templates.js`. Les templates insèrent
des SVG dans chaque div.pixel et lisent `pixel.classList` / `pixel.dataset`.
Il faudra créer un tableau `templateState[]` indexé comme `frames[]` et
rendre la couche template via `renderTemplateLayer()` sur canvas.

**Stratégie de rollback** : le flag `CANVAS_RENDERING` permet de revenir
aux divs instantanément si une régression apparaît en Phase 2.

**Tests prioritaires** :
- Détection de pixel à zoom ×1, ×4, ×8 et après pan
- Touch iOS Safari (le `elementFromPoint` est remplacé par calcul)
- Export GIF après migration (doit rester identique)

---

## Résultat attendu

| | Avant | Après |
|--|-------|-------|
| 256×256 dessin | ❌ Imprécis | ✅ Fluide |
| Pan trackpad | ❌ Absent | ✅ Natif |
| Magic Mouse | ❌ Absent | ✅ Natif |
| Apple Pencil | ❌ Absent | ✅ Natif |
| Grilles 512×512+ | ❌ Impossible | ✅ Possible |
| Zoom pixel-perfect | ⚠️ Artefacts CSS | ✅ Net |

---

Questions / discussion : contact@pixel-editor.app
