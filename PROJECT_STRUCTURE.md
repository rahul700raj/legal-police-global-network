# 📁 Project Structure

Complete file structure for Legal & Police Global Network

```
legal-police-global-network/
│
├── backend/                          # Node.js Backend
│   ├── config/
│   │   └── database.js              # PostgreSQL connection config
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   │
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes (register, login)
│   │   ├── users.js                 # User management routes
│   │   ├── servers.js               # Server/channel routes
│   │   ├── messages.js              # Messaging routes
│   │   ├── articles.js              # Article/resource routes
│   │   ├── achievements.js          # Achievement system routes
│   │   └── admin.js                 # Admin panel routes
│   │
│   ├── migrations/
│   │   └── schema.sql               # Complete database schema
│   │
│   ├── server.js                    # Main Express server
│   ├── websocket.js                 # WebSocket server for real-time
│   ├── package.json                 # Backend dependencies
│   └── .env.example                 # Environment variables template
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   ├── index.html               # HTML template
│   │   ├── manifest.json            # PWA manifest
│   │   └── favicon.ico              # Favicon
│   │
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.js            # Navigation bar with animated logo
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.js            # Footer component
│   │   │   ├── Footer.css
│   │   │   ├── ServerCard.js        # Server display card
│   │   │   ├── UserCard.js          # User profile card
│   │   │   ├── ArticleCard.js       # Article preview card
│   │   │   ├── AchievementBadge.js  # Achievement badge component
│   │   │   ├── WorldMap.js          # Interactive world map
│   │   │   ├── ChatMessage.js       # Chat message component
│   │   │   └── LoadingSpinner.js    # Loading indicator
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.js              # Landing page
│   │   │   ├── Home.css
│   │   │   ├── About.js             # About page
│   │   │   ├── Login.js             # Login page
│   │   │   ├── Register.js          # Registration page
│   │   │   ├── Dashboard.js         # User dashboard
│   │   │   ├── GlobalNetwork.js     # Global network view with map
│   │   │   ├── Servers.js           # Server list page
│   │   │   ├── ServerChat.js        # Server chat room
│   │   │   ├── Resources.js         # Articles/resources page
│   │   │   ├── ArticleView.js       # Single article view
│   │   │   ├── Achievements.js      # Achievements & leaderboard
│   │   │   ├── Profile.js           # User profile page
│   │   │   ├── AdminPanel.js        # Admin dashboard
│   │   │   └── Contact.js           # Contact page
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js       # Authentication context
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js               # API helper functions
│   │   │   ├── websocket.js         # WebSocket client
│   │   │   └── helpers.js           # Utility functions
│   │   │
│   │   ├── App.js                   # Main App component with routing
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles
│   │
│   └── package.json                 # Frontend dependencies
│
├── docs/                            # Documentation
│   ├── API.md                       # API documentation
│   ├── DATABASE.md                  # Database schema docs
│   └── FEATURES.md                  # Feature documentation
│
├── README.md                        # Main documentation
├── DEPLOYMENT.md                    # Deployment guide
├── PROJECT_STRUCTURE.md             # This file
├── LICENSE                          # MIT License
└── .gitignore                       # Git ignore rules
```

## 🔑 Key Files Explained

### Backend

#### `server.js`
Main Express server with:
- Middleware setup (CORS, Helmet, Rate Limiting)
- Route mounting
- Error handling
- Health check endpoint

#### `websocket.js`
WebSocket server for:
- Real-time messaging
- User presence
- Typing indicators
- Server join/leave events

#### `config/database.js`
PostgreSQL connection pool with:
- Connection management
- Query helper functions
- Error handling
- Connection testing

#### `middleware/auth.js`
Authentication middleware:
- JWT token verification
- Role-based authorization
- Verification status checks

#### Routes (`routes/`)
- **auth.js**: Register, login, email verification
- **users.js**: Profile management, user search, statistics
- **servers.js**: Server CRUD, join/leave, member management
- **messages.js**: Send, edit, delete messages
- **articles.js**: Article CRUD, comments, likes
- **achievements.js**: Achievement system, leaderboard
- **admin.js**: User verification, moderation, analytics

#### `migrations/schema.sql`
Complete database schema with:
- All tables with proper relationships
- Indexes for performance
- Triggers for auto-updates
- Default data (achievements, servers)

### Frontend

#### `App.js`
Main application with:
- React Router setup
- Protected routes
- Authentication flow
- Toast notifications

#### `context/AuthContext.js`
Global authentication state:
- User data management
- Login/logout functions
- Token handling
- Axios configuration

#### Components (`components/`)
Reusable UI components:
- **Navbar**: Animated logo, responsive menu
- **Footer**: Links, social media, branding
- **ServerCard**: Server preview with stats
- **UserCard**: User profile display
- **ArticleCard**: Article preview
- **AchievementBadge**: Badge display
- **WorldMap**: Interactive global map
- **ChatMessage**: Message bubble
- **LoadingSpinner**: Loading indicator

#### Pages (`pages/`)
Full page components:
- **Home**: Hero, features, CTA
- **About**: Platform information
- **Login/Register**: Authentication forms
- **Dashboard**: User overview, stats
- **GlobalNetwork**: World map, user distribution
- **Servers**: Server list, filters
- **ServerChat**: Real-time chat interface
- **Resources**: Article list, search
- **ArticleView**: Full article with comments
- **Achievements**: Badges, leaderboard
- **Profile**: User profile, achievements
- **AdminPanel**: Verification, moderation
- **Contact**: Contact form

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "Web framework",
  "pg": "PostgreSQL client",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT authentication",
  "cors": "CORS middleware",
  "dotenv": "Environment variables",
  "ws": "WebSocket server",
  "multer": "File uploads",
  "nodemailer": "Email sending",
  "express-validator": "Input validation",
  "helmet": "Security headers",
  "express-rate-limit": "Rate limiting"
}
```

### Frontend Dependencies
```json
{
  "react": "UI library",
  "react-dom": "React DOM",
  "react-router-dom": "Routing",
  "framer-motion": "Animations",
  "axios": "HTTP client",
  "react-icons": "Icon library",
  "recharts": "Charts",
  "react-leaflet": "Maps",
  "leaflet": "Map library",
  "react-toastify": "Notifications",
  "react-markdown": "Markdown rendering",
  "date-fns": "Date utilities",
  "jwt-decode": "JWT decoding"
}
```

## 🎨 Styling Architecture

### CSS Variables (index.css)
- Primary colors (Navy Blue, Gold)
- Neutral colors (Gray scale)
- Semantic colors (Success, Error, Warning)
- Shadows, Border radius, Transitions

### Component Styles
Each component has its own CSS file for:
- Scoped styling
- Easy maintenance
- Better organization

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 968px, 1280px
- Flexible grid layouts
- Responsive typography

## 🔐 Security Features

1. **Authentication**
   - JWT tokens with expiration
   - Secure password hashing (bcrypt)
   - Email verification

2. **Authorization**
   - Role-based access control
   - Protected routes
   - Verification requirements

3. **API Security**
   - Helmet.js security headers
   - Rate limiting
   - CORS configuration
   - Input validation

4. **Database Security**
   - Parameterized queries
   - SQL injection prevention
   - Connection pooling

## 🚀 Development Workflow

1. **Setup**
   ```bash
   # Clone repository
   git clone <repo-url>
   
   # Install backend
   cd backend && npm install
   
   # Install frontend
   cd ../frontend && npm install
   ```

2. **Database**
   ```bash
   # Create database
   createdb legal_police_network
   
   # Run migrations
   psql -d legal_police_network -f backend/migrations/schema.sql
   ```

3. **Environment**
   ```bash
   # Backend .env
   cp backend/.env.example backend/.env
   # Edit with your values
   
   # Frontend .env
   echo "REACT_APP_API_URL=http://localhost:5000/api" > frontend/.env
   ```

4. **Run**
   ```bash
   # Backend (Terminal 1)
   cd backend && npm run dev
   
   # Frontend (Terminal 2)
   cd frontend && npm start
   ```

## 📊 Database Tables

1. **users** - User accounts
2. **profiles** - Extended user info
3. **servers** - Discussion channels
4. **server_members** - Server membership
5. **messages** - Chat messages
6. **articles** - Knowledge base
7. **comments** - Article comments
8. **achievements** - Achievement definitions
9. **user_achievements** - Earned achievements
10. **notifications** - User notifications
11. **activity_logs** - Audit trail

## 🎯 Feature Modules

1. **Authentication** - Register, login, verify
2. **User Management** - Profiles, search, stats
3. **Servers** - Channels, membership, chat
4. **Messaging** - Real-time, edit, delete
5. **Resources** - Articles, comments, likes
6. **Achievements** - Badges, points, leaderboard
7. **Admin** - Verification, moderation, analytics

---

**For detailed API documentation, see [API.md](docs/API.md)**
**For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**
