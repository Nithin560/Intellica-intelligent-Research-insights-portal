# 🚀 Intellica — Vercel Deployment & Showcase Guide

This repository has been fully configured for instant deployment and showcase on **Vercel**.

---

## 🌟 What Was Prepared For You:
1. **Flattened Clean Directory Structure**: Redundant nested folders were cleaned up; `frontend/`, `backend/`, and configuration files now reside cleanly in root.
2. **Vercel Routing (`vercel.json`)**: Configured single-page app (SPA) rewrites for both root and `frontend/` so subroutes and reloads never return 404.
3. **Showcase Demo Mode**: Added **"✨ Live Showcase Demo Access"** directly on the login screen. Anyone visiting your live Vercel URL can click **Faculty**, **HOD**, or **Admin** to instantly view real dashboards, charts, credit scores, and analytics without needing an active backend or email OTP.
4. **Resilient Dynamic Endpoints**: Replaced hardcoded `localhost:5000` URLs with dynamic environment variables (`VITE_API_URL` / `VITE_BACKEND_URL`).
5. **Git Repository Initialized**: Ready to push to GitHub with clean `.gitignore`.

---

## ⚡ Option 1: Deploy with GitHub (Recommended)

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new) and create a repository (e.g. `intellica-portal`).
2. Run these commands in your project folder (`c:\Users\nithi\Downloads\Intellica-intelligent-Research-insights-portal-main`):

```bash
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git branch -M main
git push -u origin main
```

### Step 2: Import into Vercel
1. Open [vercel.com](https://vercel.com) and sign in.
2. Click **"Add New..."** ➔ **"Project"**.
3. Select your GitHub repository and click **Import**.
4. Vercel will auto-detect settings from `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
5. Click **Deploy**!
6. In ~30 seconds, your live showcase URL will be generated (e.g., `https://intellica-portal.vercel.app`).

---

## ⚡ Option 2: Instant Deploy via CLI (No GitHub needed)

You can deploy directly from your local terminal using `npx vercel`:

1. In your project directory:
```bash
npx vercel
```
2. Follow the prompts:
   - **Log in** via browser.
   - **Set up and deploy?** `Y`
   - **Which scope?** (Select your account)
   - **Link to existing project?** `N`
   - **What's your project's name?** `intellica-portal`
   - **In which directory is your code located?** `./`
3. To deploy directly to production:
```bash
npx vercel --prod
```
4. Copy your live Vercel link!

---

## 🌐 Connecting a Live Backend (Optional)
If you ever deploy the `backend/` to a host like **Render**, **Railway**, or **Coolify**:
- Go to your Vercel Project Settings ➔ **Environment Variables**.
- Add:
  - `VITE_API_URL` = `https://your-backend-api.onrender.com/api`
  - `VITE_BACKEND_URL` = `https://your-backend-api.onrender.com`
- Trigger a redeploy.
