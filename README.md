# Legal & Police Global Network 🌍⚖️

A professional global networking platform connecting lawyers and police officers worldwide for secure collaboration, knowledge sharing, and case discussion.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-14%2B-blue)

## ✨ Features

### 🔐 Authentication & Security
- Role-based signup (Lawyer / Police / Admin)
- JWT authentication with secure token management
- Email verification system
- Profile verification badge system
- Role-based access control (RBAC)

### 🌐 Global Network
- Interactive world map showing active users by country
- Region-based servers (Asia, Europe, America, Africa, Global)
- Country-wise and role-wise user filters
- Real-time user presence indicators

### 💬 Communication
- Real-time messaging using WebSockets
- Server-based discussion channels
- Message editing and deletion
- Typing indicators
- File sharing support

### 📚 Knowledge Sharing
- Article publishing system
- Legal updates and case studies
- Document upload (PDF, images)
- Comment and discussion threads
- Content categorization and tagging

### 🏆 Achievements & Gamification
- Achievement badge system
- Reputation points
- Leaderboard rankings
- Contribution tracking
- Public achievement showcase

### 👨‍💼 Admin Panel
- User verification management
- Content moderation
- Analytics dashboard
- Server management
- User activity monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **WebSocket (ws)** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Express Rate Limit** - API protection

### Database Schema
- Users & Profiles
- Servers & Server Members
- Messages
- Articles & Comments
- Achievements & User Achievements
- Notifications
- Activity Logs

## 📦 Installation

### Prerequisites
- Node.js >= 16.0.0
- PostgreSQL >= 14
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/rahul700raj/legal-police-global-network.git
cd legal-police-global-network
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
# JWT_SECRET, EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD
```

### 3. Database Setup

#### Option A: PostgreSQL (Recommended)
```bash
# Create database
createdb legal_police_network

# Run migrations
psql -d legal_police_network -f migrations/schema.sql
```

#### Option B: Supabase
1. Create a Supabase project at https://supabase.com
2. Copy your connection details
3. Update `.env` with Supabase credentials
4. Run the schema.sql in Supabase SQL Editor

### 4. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 5. Run Development Servers

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 🚀 Deployment

### Deploy to Railway (Backend + Database)

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Initialize project
   cd backend
   railway init

   # Add PostgreSQL
   railway add postgresql

   # Deploy
   railway up
   ```

3. **Set Environment Variables**
   - Go to Railway dashboard
   - Add all variables from `.env.example`
   - Railway auto-provides DATABASE_URL

4. **Run Migrations**
   ```bash
   railway run psql $DATABASE_URL -f migrations/schema.sql
   ```

### Deploy Frontend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel

   # Follow prompts
   # Set REACT_APP_API_URL to your Railway backend URL
   ```

3. **Configure Environment**
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Add `REACT_APP_API_URL=https://your-railway-backend.up.railway.app/api`

### Alternative: Deploy Both to Railway

```bash
# Backend
cd backend
railway init
railway add postgresql
railway up

# Frontend
cd ../frontend
railway init
railway up
```

## 🗄️ Database Connection

### Using Supabase

1. Create project at https://supabase.com
2. Go to Project Settings → Database
3. Copy connection string
4. Update backend `.env`:
   ```env
   DB_HOST=db.xxx.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your-password
   ```
5. Run schema in Supabase SQL Editor

### Using Railway PostgreSQL

1. Add PostgreSQL to Railway project
2. Railway provides `DATABASE_URL`
3. Parse and use in your app:
   ```javascript
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: { rejectUnauthorized: false }
   });
   ```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/verify-email/:token` - Verify email

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:userId` - Get user by ID
- `GET /api/users/stats/global` - Global statistics
- `GET /api/users/search/query` - Search users

### Servers
- `GET /api/servers` - List servers
- `GET /api/servers/:serverId` - Get server details
- `POST /api/servers/:serverId/join` - Join server
- `POST /api/servers/:serverId/leave` - Leave server
- `GET /api/servers/:serverId/members` - Get members

### Messages
- `GET /api/messages/server/:serverId` - Get messages
- `POST /api/messages/server/:serverId` - Send message
- `PUT /api/messages/:messageId` - Edit message
- `DELETE /api/messages/:messageId` - Delete message

### Articles
- `GET /api/articles` - List articles
- `GET /api/articles/:articleId` - Get article
- `POST /api/articles` - Create article
- `POST /api/articles/:articleId/comments` - Add comment
- `POST /api/articles/:articleId/like` - Like article

### Achievements
- `GET /api/achievements` - List achievements
- `GET /api/achievements/user/:userId` - User achievements
- `GET /api/achievements/leaderboard` - Leaderboard

### Admin (Admin Only)
- `GET /api/admin/verifications/pending` - Pending verifications
- `POST /api/admin/verifications/:userId/approve` - Approve user
- `POST /api/admin/verifications/:userId/reject` - Reject user
- `GET /api/admin/users` - List all users
- `POST /api/admin/users/:userId/deactivate` - Deactivate user
- `GET /api/admin/analytics` - Analytics data

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- JWT token expiration
- Password hashing with bcrypt
- SQL injection prevention
- XSS protection
- CORS configuration
- Input validation
- Role-based access control

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Professional color palette (Navy Blue & Gold)
- Interactive world map
- Real-time notifications
- Toast messages
- Loading states
- Error handling
- Animated counters
- Progress indicators

## 📊 Database Schema Highlights

```sql
-- Core Tables
users (id, email, password_hash, role, country, verification_status)
profiles (user_id, bio, experience_years, specialization, reputation_points)
servers (id, name, region, category, member_count)
messages (id, server_id, user_id, content, created_at)
articles (id, author_id, title, content, views, likes)
achievements (id, title, description, points_required)
user_achievements (user_id, achievement_id, earned_at)
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rahul Mishra**
- Email: rm2778643@gmail.com
- GitHub: [@rahul700raj](https://github.com/rahul700raj)

## 🙏 Acknowledgments

- React community
- PostgreSQL team
- Railway & Vercel for hosting
- All contributors

## 📞 Support

For support, email rm2778643@gmail.com or open an issue on GitHub.

---

**Built with ❤️ for the global legal and law enforcement community**
