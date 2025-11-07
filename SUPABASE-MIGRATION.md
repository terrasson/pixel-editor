# ✅ Supabase Migration Complete!

Your pixel art editor now saves projects to **Supabase cloud storage** instead of localStorage!

## What Changed

### 🔄 Updated Functions

#### 1. **Save Project** (`saveToServer()` - line 2490)
- **Before**: Saved to `/api/save` endpoint (temporary storage)
- **After**: Saves to Supabase database using `window.dbService.saveProject()`
- **Features**:
  - Automatically creates new project or updates existing one
  - Generates thumbnail for project preview
  - Saves FPS, frames, and custom palette

#### 2. **Load Project** (`loadFromServer()` - line 2527)
- **Before**: Loaded from `/api/load` endpoint
- **After**: Loads from Supabase using `window.dbService.getAllProjects()` and `window.dbService.loadProject()`
- **Features**:
  - Shows nice dialog with clickable project list
  - Displays last modified date and time
  - Loads all project data including FPS and palette

#### 3. **My Projects** (`showLocalProjects()` - line 214)
- **Before**: Loaded from localStorage
- **After**: Loads from Supabase using `window.dbService.getAllProjects()`
- **Features**:
  - Shows all cloud-saved projects
  - Click to select, then load or delete
  - Real-time sync across devices

#### 4. **Delete Project** (inside `showLocalProjects()`)
- **Before**: Deleted from localStorage
- **After**: Deletes from Supabase using `window.dbService.deleteProjectById()`
- **Features**:
  - Permanently deletes from cloud
  - Refreshes project list automatically

## How to Use

### Saving a Project
1. Click **"💾 Sauvegarder"** button
2. Enter project name
3. Project saves to Supabase automatically!

### Loading a Project
1. Click **"📂 Charger"** button
2. See list of all your projects
3. Click on a project to load it

### Viewing All Projects
1. Click **"🌐 Mes projets"** button
2. See all your cloud projects
3. Click to select, then:
   - **"📂 Charger"** to load
   - **"🗑️ Supprimer"** to delete

### Deleting a Project
1. Go to **"🌐 Mes projets"**
2. Click on a project
3. Click **"🗑️ Supprimer"**
4. Confirm deletion

## Benefits

✅ **No Storage Limit** - Save as many projects as you want
✅ **Multi-Device Sync** - Access projects from phone, tablet, laptop
✅ **Never Lose Data** - Cloud backup protects your work
✅ **Fast Loading** - Optimized database queries
✅ **Private & Secure** - Only you can see your projects (Row Level Security)

## Database Structure

Your projects are stored in the `pixel_projects` table with:
- `id` - Unique project ID (UUID)
- `user_id` - Your user ID (links to your account)
- `name` - Project name
- `frames` - All animation frames (JSON)
- `current_frame` - Which frame you were on
- `fps` - Animation speed
- `custom_palette` - Your color palette
- `thumbnail` - Preview image (base64)
- `created_at` - When created
- `updated_at` - Last modified

## Technical Details

### New Database Service (`window.dbService`)

Available methods:
```javascript
// Save or update project
await window.dbService.saveProject({
    name: 'My Project',
    frames: [/* frame data */],
    currentFrame: 0,
    fps: 24,
    customPalette: [/* colors */],
    thumbnail: 'data:image/png;base64,...'
});

// Get all projects
const result = await window.dbService.getAllProjects();
// Returns: { success: true, data: [...projects] }

// Load specific project
const project = await window.dbService.loadProject('My Project');
// Returns: { success: true, data: {...project} }

// Delete project
await window.dbService.deleteProject('My Project');
// or by ID:
await window.dbService.deleteProjectById('uuid-here');

// Get project count
const count = await window.dbService.getProjectCount();
```

### Authentication Required

All database operations require:
- User must be logged in
- Session must be active
- User can only access their own projects (enforced by RLS)

## What to Do Now

### ⚠️ IMPORTANT: Run Database Schema

If you haven't already, you **MUST** create the database tables in Supabase:

1. Go to your Supabase dashboard
2. Click **SQL Editor** (left sidebar)
3. Click **"New query"**
4. Copy ALL the SQL from `docs/database-schema.sql`
5. Paste and click **"Run"**
6. Wait for success message

### Test It!

1. **Create** a pixel art drawing
2. Click **"💾 Sauvegarder"**
3. Enter a name like "test-project"
4. Check in Supabase dashboard → **Table Editor** → `pixel_projects`
5. You should see your project! 🎉

### Verify Database

In Supabase dashboard:
1. Go to **Table Editor**
2. You should see tables:
   - `pixel_projects` - your saved projects
   - `user_preferences` - user settings
3. Click `pixel_projects` to see all saved projects

## Troubleshooting

### "User not authenticated" error
- **Solution**: Make sure you're logged in. Check browser console for auth errors.

### "Supabase not initialized" error
- **Solution**: Check that `public/js/config/supabase-config.js` has your real credentials.

### Projects not showing up
- **Solution**:
  - Did you run the database schema SQL? (Step above)
  - Check Supabase → Table Editor → `pixel_projects` table exists
  - Check browser console for errors

### "Row Level Security policy violation"
- **Solution**: Run the full database schema SQL again - make sure RLS policies were created.

## Old Functions (Deprecated)

These are no longer used:
- ~~`fetch('/api/save')`~~ → Now uses `window.dbService.saveProject()`
- ~~`fetch('/api/load')`~~ → Now uses `window.dbService.loadProject()`
- ~~`localStorage.getItem('pixelEditor_autoSaveProjects')`~~ → Now uses Supabase
- ~~`server.js` temporary storage~~ → Replaced with cloud database

## Next Steps

1. ✅ Run database schema SQL (if not done)
2. ✅ Test save/load functionality
3. ✅ Try accessing from different devices
4. 📤 Deploy to Vercel with environment variables (see `QUICK-START.md`)
5. 🎨 Share with friends!

---

**Everything is now connected to Supabase!** Your projects are stored in the cloud and accessible from anywhere. 🚀
