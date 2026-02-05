# 🚀 Getting Started with Legal & Police Global Network

Welcome! This guide will help you get the platform running on your local machine in minutes.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
  - *OR* a **Supabase** account - [Sign up free](https://supabase.com)
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ A code editor (VS Code recommended)

---

## 🎯 Quick Setup (5 Minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/rahul700raj/legal-police-global-network.git
cd legal-police-global-network
```

### Step 2: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

### Step 3: Setup Database

**Option A: Local PostgreSQL**
```bash
# Create database
createdb legal_police_network

# Run migrations
psql -d legal_police_network -f backend/migrations/schema.sql
```

**Option B: Supabase (Easier!)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Copy content from `backend/migrations/schema.sql`
5. Paste and run

### Step 4: Configure Environment Variables

**Backend:**
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
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password

# OR for Supabase
DB_HOST=db.xxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password

# Required
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
FRONTEND_URL=http://localhost:3000
```

**Frontend:**
```bash
cd frontend
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### Step 5: Run the Application

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

---

## 🎉 You're Ready!

Visit **http://localhost:3000** and:

1. Click **"Join Network"**
2. Fill in your details
3. Choose your role (Lawyer/Police)
4. Start exploring!

---

## 👤 Create Admin Account

After registering, make yourself an admin:

```bash
# Connect to database
psql -d legal_police_network

# Run this query (replace with your email)
UPDATE users 
SET role = 'admin', verification_status = 'verified' 
WHERE email = 'your-email@example.com';
```

Now you can access the Admin Panel!

---

## 🧪 Test the Features

### As a Regular User:
1. ✅ Update your profile
2. ✅ Browse servers
3. ✅ Join a discussion server
4. ✅ Send messages
5. ✅ Create an article
6. ✅ View achievements

### As an Admin:
1. ✅ Access Admin Panel
2. ✅ Verify users
3. ✅ View analytics
4. ✅ Manage content

---

## 🔧 Common Issues & Solutions

### Issue: Database Connection Failed

**Solution:**
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql -d legal_police_network -c "SELECT version();"
```

### Issue: Port Already in Use

**Solution:**
```bash
# Backend - Change port in .env
PORT=5001

# Frontend - Change in package.json
"start": "PORT=3001 react-scripts start"
```

### Issue: Module Not Found

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Error

**Solution:**
Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL exactly:
```env
FRONTEND_URL=http://localhost:3000
```

---

## 📚 Next Steps

### Learn More:
- 📖 [README.md](README.md) - Full documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
- 📁 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Code organization
- ✅ [FEATURES_IMPLEMENTED.md](FEATURES_IMPLEMENTED.md) - Feature list

### Customize:
1. **Branding:** Update colors in `frontend/src/index.css`
2. **Logo:** Modify `frontend/src/components/Navbar.js`
3. **Content:** Edit page content in `frontend/src/pages/`
4. **Database:** Add custom tables in `backend/migrations/`

### Extend:
1. Add new API endpoints in `backend/routes/`
2. Create new React components in `frontend/src/components/`
3. Add new pages in `frontend/src/pages/`
4. Implement WebSocket features in `backend/websocket.js`

---

## 🎨 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend:** Changes auto-refresh browser
- **Backend:** Using `nodemon` for auto-restart

### Debugging
```bash
# Backend logs
cd backend
npm run dev

# Frontend logs
cd frontend
npm start

# Database queries
psql -d legal_police_network
```

### Code Style
- Use ES6+ features
- Follow React best practices
- Keep components small and focused
- Write meaningful commit messages

---

## 📊 Project Structure Overview

```
legal-police-global-network/
├── backend/              # Node.js + Express API
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── config/          # Database config
│   └── migrations/      # SQL schema
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable UI
│   │   ├── pages/       # Page components
│   │   └── context/     # Global state
│   └── public/          # Static files
│
└── docs/                # Documentation
```

---

## 🔐 Security Notes

### Development:
- ✅ Use strong JWT_SECRET (32+ characters)
- ✅ Never commit `.env` files
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

### Production:
- ✅ Enable rate limiting
- ✅ Use environment variables
- ✅ Enable CORS properly
- ✅ Use SSL/TLS for database

---

## 🤝 Contributing

Want to contribute?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Get Help

- 💬 **GitHub Issues:** Report bugs or request features
- 📧 **Email:** rm2778643@gmail.com
- 📖 **Documentation:** Check README.md

---

## 🎯 What's Next?

### Immediate:
- [ ] Complete remaining frontend pages
- [ ] Add file upload functionality
- [ ] Implement email notifications

### Future:
- [ ] Mobile app (React Native)
- [ ] Video conferencing
- [ ] Advanced analytics
- [ ] Multi-language support

---

## ✨ Success!

You now have a fully functional professional networking platform running locally!

**Happy coding! 🚀**

---

*Built with ❤️ by Rahul Mishra*

For detailed information:
- [README.md](README.md) - Complete documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup
