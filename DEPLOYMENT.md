# 🚀 Deployment Guide

Complete step-by-step guide to deploy Legal & Police Global Network to production.

## Table of Contents
1. [Railway Deployment (Backend + Database)](#railway-deployment)
2. [Vercel Deployment (Frontend)](#vercel-deployment)
3. [Supabase Database Setup](#supabase-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)

---

## 🚂 Railway Deployment (Backend + Database)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign in with GitHub

### Step 2: Deploy Backend

#### Option A: Using Railway Dashboard
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `legal-police-global-network` repository
4. Select `backend` as root directory
5. Click "Deploy"

#### Option B: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to backend
cd backend

# Initialize Railway project
railway init

# Link to your project
railway link

# Deploy
railway up
```

### Step 3: Add PostgreSQL Database
1. In Railway dashboard, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create database
4. Connection details are auto-provided as `DATABASE_URL`

### Step 4: Configure Environment Variables
In Railway dashboard → Variables tab, add:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
FRONTEND_URL=https://your-vercel-app.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Note:** Railway auto-provides these database variables:
- `DATABASE_URL`
- `PGHOST`
- `PGPORT`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`

### Step 5: Run Database Migrations
```bash
# Connect to Railway PostgreSQL
railway run psql $DATABASE_URL -f migrations/schema.sql

# Or use Railway shell
railway shell
psql $DATABASE_URL < migrations/schema.sql
```

### Step 6: Get Backend URL
- Railway provides a URL like: `https://your-app.up.railway.app`
- Copy this URL for frontend configuration

---

## ▲ Vercel Deployment (Frontend)

### Step 1: Prepare Frontend
```bash
cd frontend

# Create production build locally to test
npm run build
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import `legal-police-global-network` from GitHub
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? legal-police-network
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Step 3: Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```env
REACT_APP_API_URL=https://your-railway-backend.up.railway.app/api
```

### Step 4: Redeploy
After adding environment variables:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## 🗄️ Supabase Setup (Alternative Database)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name:** legal-police-network
   - **Database Password:** (save this!)
   - **Region:** Choose closest to users

### Step 2: Get Connection Details
1. Go to Project Settings → Database
2. Copy connection details:
   - Host
   - Port
   - Database name
   - User
   - Password

### Step 3: Run Schema
1. Go to SQL Editor in Supabase
2. Click "New Query"
3. Copy entire content from `backend/migrations/schema.sql`
4. Click "Run"

### Step 4: Update Backend Environment
In Railway (or your backend host):
```env
DB_HOST=db.xxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-supabase-password
```

---

## 🔐 Environment Variables Reference

### Backend (.env)
```env
# Server
NODE_ENV=production
PORT=5000

# Database (Railway PostgreSQL - auto-provided)
DATABASE_URL=postgresql://user:pass@host:5432/db

# OR Manual PostgreSQL/Supabase
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Frontend URL
FRONTEND_URL=https://your-vercel-app.vercel.app

# WebSocket (optional)
WS_PORT=5001
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-railway-backend.up.railway.app/api
```

---

## 📧 Email Configuration (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to Google Account settings
2. Security → 2-Step Verification
3. Turn on 2FA

### Step 2: Generate App Password
1. Go to Google Account → Security
2. 2-Step Verification → App passwords
3. Select "Mail" and "Other (Custom name)"
4. Name it "Legal Police Network"
5. Copy the 16-character password
6. Use this in `EMAIL_PASSWORD` environment variable

---

## ✅ Post-Deployment Checklist

### 1. Test Backend
```bash
# Health check
curl https://your-railway-backend.up.railway.app/api/health

# Should return:
# {"status":"OK","message":"Legal & Police Global Network API is running"}
```

### 2. Test Frontend
- Visit your Vercel URL
- Check if homepage loads
- Try registering a new account
- Verify email functionality

### 3. Create Admin Account
```bash
# Connect to database
railway run psql $DATABASE_URL

# Update a user to admin
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### 4. Test Core Features
- [ ] User registration
- [ ] Email verification
- [ ] Login/Logout
- [ ] Profile update
- [ ] Join server
- [ ] Send message
- [ ] Create article
- [ ] Admin panel access

### 5. Monitor Logs
```bash
# Railway logs
railway logs

# Vercel logs
vercel logs
```

---

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test connection
railway run psql $DATABASE_URL -c "SELECT version();"

# Check if tables exist
railway run psql $DATABASE_URL -c "\dt"
```

### CORS Errors
Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly:
```env
FRONTEND_URL=https://your-app.vercel.app
```

### WebSocket Connection Failed
- Railway provides both HTTP and WebSocket support
- Ensure your WebSocket URL uses `wss://` (not `ws://`)
- Check Railway logs for WebSocket errors

### Build Failures
```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

---

## 📊 Monitoring & Maintenance

### Railway Monitoring
- Dashboard shows CPU, Memory, Network usage
- Set up alerts for downtime
- Monitor database size

### Vercel Analytics
- Enable Vercel Analytics in dashboard
- Track page views, performance
- Monitor Core Web Vitals

### Database Backups
```bash
# Backup Railway PostgreSQL
railway run pg_dump $DATABASE_URL > backup.sql

# Restore
railway run psql $DATABASE_URL < backup.sql
```

---

## 🚀 Performance Optimization

### Backend
- Enable gzip compression
- Add Redis for caching (Railway add-on)
- Optimize database queries
- Add database indexes

### Frontend
- Enable Vercel Edge Network
- Optimize images
- Code splitting
- Lazy loading

---

## 📞 Support

If you encounter issues:
1. Check Railway/Vercel logs
2. Review environment variables
3. Test database connection
4. Open GitHub issue
5. Email: rm2778643@gmail.com

---

**Deployment Complete! 🎉**

Your Legal & Police Global Network is now live and ready to connect professionals worldwide!
