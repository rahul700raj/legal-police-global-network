# ⚡ Quick Start Guide

Get Legal & Police Global Network running in 5 minutes!

## 🎯 Prerequisites

- Node.js 16+ installed
- PostgreSQL 14+ installed (or Supabase account)
- Git installed

## 🚀 Quick Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/rahul700raj/legal-police-global-network.git
cd legal-police-global-network

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup (1 minute)

**Option A: Local PostgreSQL**
```bash
# Create database
createdb legal_police_network

# Run schema
psql -d legal_police_network -f backend/migrations/schema.sql
```

**Option B: Supabase (Recommended for beginners)**
1. Go to https://supabase.com and create free account
2. Create new project
3. Go to SQL Editor
4. Copy content from `backend/migrations/schema.sql`
5. Paste and run in SQL Editor

### 3. Environment Variables (1 minute)

**Backend (.env)**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
# For Local PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=legal_police_network
DB_USER=your_username
DB_PASSWORD=your_password

# OR for Supabase
DB_HOST=db.xxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password

# Required
JWT_SECRET=your-secret-key-min-32-characters-long
FRONTEND_URL=http://localhost:3000

# Optional (for email features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Frontend (.env)**
```bash
cd ../frontend
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Run Application (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend running on http://localhost:3000

## 🎉 You're Done!

Visit http://localhost:3000 and:
1. Click "Join Network"
2. Register as Lawyer or Police
3. Explore the platform!

## 🔑 Create Admin Account

```bash
# Connect to database
psql -d legal_police_network

# Make yourself admin
UPDATE users SET role = 'admin', verification_status = 'verified' 
WHERE email = 'your-email@example.com';
```

## 📱 Test Features

### As Regular User:
- ✅ Register & Login
- ✅ Update Profile
- ✅ Join Servers
- ✅ Send Messages
- ✅ Create Articles
- ✅ View Achievements

### As Admin:
- ✅ Access Admin Panel
- ✅ Verify Users
- ✅ View Analytics
- ✅ Moderate Content

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
pg_isready

# Check connection details
psql -d legal_police_network -c "SELECT version();"
```

### Port Already in Use
```bash
# Backend (change PORT in .env)
PORT=5001

# Frontend (change in package.json)
"start": "PORT=3001 react-scripts start"
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Railway deployment (Backend + Database)
- Vercel deployment (Frontend)
- Supabase setup
- Environment configuration

## 📚 Next Steps

1. Read [README.md](README.md) for full documentation
2. Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture
3. Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
4. Explore API endpoints in backend routes

## 💡 Tips

- Use Supabase for easiest database setup
- Enable email verification for production
- Set strong JWT_SECRET (32+ characters)
- Use environment variables for all secrets
- Test locally before deploying

## 🆘 Need Help?

- 📧 Email: rm2778643@gmail.com
- 🐛 Issues: https://github.com/rahul700raj/legal-police-global-network/issues
- 📖 Docs: Check README.md

---

**Happy Coding! 🎉**
