# 🎨 Pixel Art Editor - Quick Start Guide

## 🚀 Getting Started (5 minutes)

Your pixel art editor now has **user authentication** and **cloud storage**! Follow these steps to get it working:

### Step 1: Create a Supabase Account (2 minutes)

1. Go to **[https://supabase.com](https://supabase.com)**
2. Click **"Start your project"** (it's free!)
3. Sign up with GitHub or email
4. Create a new project:
   - Project name: `pixel-art-editor`
   - Database password: Choose a strong password
   - Region: Select closest to you
   - Click **"Create new project"**
5. Wait 2-3 minutes for setup

### Step 2: Get Your API Credentials (1 minute)

1. In your Supabase dashboard, go to **Settings** (⚙️ icon in sidebar)
2. Click **API**
3. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiI...` (long string)

### Step 3: Configure Your App (1 minute)

Open this file in your code editor:
```
public/js/config/supabase-config.js
```

Replace the placeholder values:
```javascript
const SUPABASE_URL = 'https://your-actual-project-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

**⚠️ IMPORTANT**: These are the real values from Step 2!

### Step 4: Create Database Tables (1 minute)

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `docs/database-schema.sql` from your project
4. Copy ALL the SQL code (Ctrl+A, Ctrl+C)
5. Paste it into the Supabase SQL editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see: ✅ **Success. Database schema created successfully!**

### Step 5: Test It! (1 minute)

```bash
npm start
# or
node server.js
```

1. Open **http://localhost:3000**
2. You'll be redirected to the login page
3. Click **"Inscription"** tab
4. Create an account with your email and password
5. You're in! 🎉

## 🎯 What's New?

### ✅ User Authentication
- **Sign up / Sign in** with email and password
- **Google OAuth** (optional - needs additional setup)
- **Password reset** functionality
- **Secure sessions** - stays logged in

### ✅ Cloud Storage
- **Save projects** to the cloud (no more localStorage limits!)
- **Load projects** from any device
- **Multi-device sync** - access your art anywhere
- **Private by default** - only you can see your projects

### ✅ User Profile
- See your **email** displayed in the app
- **Logout** button in the header
- Automatic **session management**

## 📁 New Files Created

```
public/
├── login.html              ← Beautiful login/signup page
├── js/
│   ├── auth.js            ← Authentication service
│   ├── database.js        ← Database operations
│   └── config/
│       └── supabase-config.js  ← YOUR CREDENTIALS GO HERE

docs/
├── database-schema.sql    ← SQL to run in Supabase
└── SETUP-AUTHENTICATION.md ← Detailed setup guide
```

## 🔧 Troubleshooting

### Error: "Supabase not configured"
**Solution**: You haven't updated the credentials in `public/js/config/supabase-config.js`

### Error: "Invalid API key"
**Solution**: Double-check you copied the correct URL and key from Supabase → Settings → API

### Error: "Failed to fetch" or "Network error"
**Solution**:
- Check your internet connection
- Make sure your Supabase project is active (not paused)
- Verify the URL is correct (should start with `https://`)

### Can't create account / sign in
**Solution**:
1. Check browser console for errors (F12)
2. Make sure you ran the database schema SQL (Step 4)
3. Go to Supabase → Authentication → Providers → Email should be enabled

### Email confirmation not received
**Solution**:
- Check spam folder
- In Supabase dashboard: **Authentication** → **Users** → find your user → click **"..."** → **"Confirm Email"**
- Or disable email confirmation: **Authentication** → **Providers** → **Email** → Uncheck "Confirm email"

## 🚀 Deploying to Vercel

### Option 1: Environment Variables (Recommended)

1. In Vercel dashboard → **Settings** → **Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = `your-supabase-url`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
3. Redeploy

### Option 2: Keep in Code (Not Recommended for Production)

The anon key is safe to expose in client-side code, but it's better practice to use environment variables.

## 📖 Full Documentation

For more detailed information:
- **`docs/SETUP-AUTHENTICATION.md`** - Complete authentication setup guide
- **`docs/database-schema.sql`** - Database structure
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)

## 🎨 Using the Database in Your Code

The database service is available globally as `window.dbService`:

```javascript
// Save a project
await window.dbService.saveProject({
    name: 'My Pixel Art',
    frames: frames,
    currentFrame: 0,
    fps: 24,
    thumbnail: window.dbService.generateThumbnail()
});

// Load all projects
const result = await window.dbService.getAllProjects();
console.log(result.data); // Array of projects

// Delete a project
await window.dbService.deleteProject('My Pixel Art');
```

## 💡 Next Steps

1. ✅ Complete the setup above
2. 🎨 Test creating and saving pixel art
3. 🔄 Update your existing save/load functions in `script.js` to use `window.dbService`
4. 🚀 Deploy to Vercel with environment variables
5. 📱 Share with friends!

---

## 🆘 Need Help?

1. Check the console for detailed error messages (F12)
2. Review `docs/SETUP-AUTHENTICATION.md`
3. Check Supabase logs: Dashboard → **Logs**
4. Make sure all steps above were completed

**Happy pixel art creating! 🎉**
