# ⚡ Configuration Rapide Supabase

## 🚀 **3 étapes pour activer la sauvegarde cloud**

### **1. Créer un compte Supabase (gratuit)**
- Aller sur [supabase.com](https://supabase.com)
- Se connecter avec GitHub
- Créer un nouveau projet `pixel-editor`

### **2. Configurer la base de données**
- Dans Supabase → **SQL Editor**
- Copier-coller le contenu de `supabase-setup.sql`
- Cliquer **Run** ▶️

### **3. Mettre vos clés dans le code**
- Dans `public/js/supabase-config.js`, remplacer :

```javascript
const SUPABASE_URL = 'https://votre-projet.supabase.co';
const SUPABASE_ANON_KEY = 'votre-cle-publique-ici';
```

**Par vos vraies valeurs** (trouvables dans Supabase → Settings → API)

## ✅ **C'est fini !**

- **💾 Sauvegarder** = Sauve sur Supabase
- **📂 Charger** = Charge depuis Supabase  
- **🌐 Mes projets** = Liste tous vos projets

Plus besoin de fichiers JSON perdus dans iCloud ! 🎉 