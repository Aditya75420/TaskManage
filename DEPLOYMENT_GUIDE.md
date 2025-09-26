# Vercel Deployment Guide

## Step 1: Fix Git Tracking (Remove node_modules)

Run these commands in your terminal:

```bash
# Remove node_modules from Git tracking
git rm -r --cached frontend/node_modules
git rm -r --cached server/node_modules

# Add the new .gitignore
git add .gitignore

# Commit the changes
git commit -m "Remove node_modules from tracking and add .gitignore"
```

## Step 2: Push to GitHub

```bash
git push origin main
```

## Step 3: Deploy on Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. Configure the following settings:
   - **Root Directory**: Leave empty (uses root)
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `cd frontend && npm install`
7. Click "Deploy"

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: task-management-frontend
# - Directory: ./
# - Override settings? N
```

## Step 4: Configure Environment Variables (if needed)

If your app uses environment variables:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add any required environment variables

## Step 5: Custom Domain (Optional)

1. Go to your project settings
2. Navigate to Domains
3. Add your custom domain

## Troubleshooting

### If build fails:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify the build command is correct

### If node_modules still showing:
1. Make sure .gitignore is committed
2. Run: `git rm -r --cached .` then `git add .` and `git commit -m "Clean up"`

## Project Structure for Deployment

```
Task Management Web/
├── .gitignore          ✅ Excludes node_modules
├── vercel.json         ✅ Vercel configuration
├── frontend/           ✅ React app
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── server/             ✅ Backend (not deployed to Vercel)
```

Your frontend will be deployed as a static site on Vercel!
