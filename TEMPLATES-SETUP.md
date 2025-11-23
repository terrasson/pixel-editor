# 🚀 Installation du Système de Modèles Partagés

## ⚠️ IMPORTANT : Créer les tables dans Supabase

Pour que la fonctionnalité de publication de modèles fonctionne, vous devez d'abord créer les tables dans votre base de données Supabase.

### Étapes à suivre :

1. **Connectez-vous à votre dashboard Supabase**
   - Allez sur https://supabase.com
   - Connectez-vous à votre projet

2. **Ouvrez le SQL Editor**
   - Dans la barre latérale gauche, cliquez sur **"SQL Editor"**
   - Cliquez sur **"+ New query"** pour créer une nouvelle requête

3. **Exécutez le script SQL**
   - Ouvrez le fichier `supabase/templates-schema.sql` de ce projet
   - **Copiez TOUT le contenu** du fichier
   - Collez-le dans l'éditeur SQL de Supabase
   - Cliquez sur **"Run"** ou appuyez sur `Ctrl/Cmd + Enter`

4. **Vérifiez que les tables sont créées**
   - Allez dans **Database** → **Tables** dans Supabase
   - Vous devriez voir ces nouvelles tables :
     - ✅ `pixel_templates` - Table principale pour les modèles
     - ✅ `template_favorites` - Favoris des utilisateurs
     - ✅ `template_completions` - Suivi des complétions

5. **Vérifiez les politiques RLS**
   - Allez dans **Database** → **Policies**
   - Vérifiez que les politiques sont actives pour `pixel_templates` :
     - "Anyone can view public templates"
     - "Authenticated users can create templates"
     - "Authors can update their own templates"
     - "Authors can delete their own templates"

### ✅ Après l'installation

Une fois les tables créées, vous pourrez :
- ✨ Publier vos créations comme modèles
- 🧩 Parcourir les modèles partagés par d'autres utilisateurs
- 🔍 Filtrer les modèles par catégorie et style
- ⭐ Marquer des modèles comme complétés

### 🐛 En cas d'erreur

Si vous voyez l'erreur :
```
Could not find the table 'public.pixel_templates' in the schema cache
```

Cela signifie que :
1. Les tables n'ont pas encore été créées → Suivez les étapes ci-dessus
2. Ou il y a eu une erreur lors de l'exécution du script → Vérifiez les erreurs dans le SQL Editor

### 📝 Note importante

Si vous avez déjà des données dans votre base de données et que vous exécutez le script plusieurs fois, ne vous inquiétez pas : le script utilise `CREATE TABLE IF NOT EXISTS`, donc il ne supprimera pas les données existantes.

