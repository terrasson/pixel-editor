# Pixel Editor — Current State

## DB / Storage Architecture Analysis (2026-04-14)

### Table pixel_projects — schéma réel
- `frames` : JSONB inline (tableau d'objets `{color, isEmpty}`)
- `frame_layers` : JSONB inline nullable
- `thumbnail` : URL Storage (bucket `thumbnails`)
- RLS activé, index sur `user_id`, `updated_at`, unique `(user_id, name)`

### Problème principal : format pixel verbeux
Chaque pixel est stocké comme `{color: '#FFFFFF', isEmpty: true}` (~35 chars).
- 32×32 × 1 frame = ~35 KB JSON brut
- Mario Bros (33 frames) = ~1.15 MB brut → 157 KB compressé TOAST

### Tous les projets sont en inline DB malgré le seuil 20 KB
La logique Storage existe dans `database.js` (seuil `framesJson.length > 20000`) mais les uploads **timeout systématiquement** → fallback silencieux vers inline. Conséquence : 21 projets, 2.6 MB en TOAST.

### Taille réelle en DB (21 projets)
| Projet | Frames | Taille TOAST |
|--------|--------|-------------|
| Mario Bros | 33 | 157 KB |
| Tag anime papa | 7 | 108 KB |
| Evolution | 12 | 56 KB |
| Mignon | 8 | 34 KB |
| Autres | 1 | < 20 KB |

### Autres problèmes identifiés
- `public_shares.project_snapshot` : copie intégrale des frames en doublon JSONB
- Bucket `thumbnails` utilisé pour les frames JSON (sémantiquement faux)
- `pixel_templates.template_data` + `preview_data` : même pattern risqué (0 données pour l'instant)

---

## Plan d'optimisation recommandé

### Priorité 1 — Changer le format pixel (gain 5-10x, pas d'infra)
Remplacer `[{color, isEmpty}, ...]` par `['#FFFFFF', '', ...]` (string vide = pixel vide).
- Rétrocompatible via `normaliseFrames()`
- Mario Bros : 1.15 MB → ~230 KB brut → ~30-40 KB compressé
- La majorité des projets passeraient sous 5 KB

### Priorité 2 — Storage bucket dédié + timeout plus long
- Créer bucket `project-frames` (pas `thumbnails`)
- Augmenter timeout upload à 30s

### Priorité 3 — public_shares : référencer, ne pas copier
- Supprimer `project_snapshot` ou n'y mettre que les métadonnées (name, thumbnail, fps)
- Charger les frames depuis `pixel_projects` à la volée

### Décision non prise
- Migration du format pixel : **à faire, pas encore implémentée**
