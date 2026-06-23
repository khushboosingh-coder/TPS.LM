# TPS Leave Management System - Complete Setup Guide

## Project Overview

TPS Leave Management System is a full-stack web application for managing employee leave requests, approvals, and leave balances.

**Tech Stack:**
- **Backend:** Node.js + Express.js
- **Frontend:** Vue.js 3 + Vite
- **Database:** PostgreSQL
- **Authentication:** JWT + OAuth 2.0 (Google)
- **Containerization:** Docker & Docker Compose

## Quick Start (Docker)

### Prerequisites
- Docker and Docker Compose installed

### Start Everything

```bash
# Clone repository
git clone https://github.com/khushboosingh-coder/TPS.LM.git
cd TPS.LM

# Start all services
docker-compose up

# In another terminal, seed the database
docker-compose exec backend npm run seed
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Database: localhost:5432

### Stop Services

```bash
docker-compose down

# Remove volumes (database data)
docker-compose down -v
```

## Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm 9+

### Step 1: Setup Database

```bash
# Create database
psql -U postgres

# In psql:
CREATE DATABASE tps_lm;
\q

# Run migrations and seeds
psql -U postgres -d tps_lm -f database/init.sql
psql -U postgres -d tps_lm -f database/seeds/default-data.sql
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# nano .env

# Start server
npm run dev
```

Backend runs on: `http://localhost:5000`

### Step 3: Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Testing the Application

### Default Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@tps.com | admin123 |
| Manager | manager@tps.com | manager123 |
| Employee | employee@tps.com | employee123 |

### Test Workflow

1. **Login as Employee**
   - Go to http://localhost:3000
   - Login with employee@tps.com / employee123
   - View dashboard and leave balance
   - Submit a leave request

2. **Approve as Manager**
   - Logout and login as manager@tps.com / manager123
   - Go to Approvals page
   - Review and approve/reject requests

3. **Admin Functions**
   - Login as admin@tps.com / admin123
   - Full access to all features

## Project Structure

```
TPS.LM/
├── backend/                  # Express.js API
│   ├── config/              # Database & config
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & validation
│   ├── routes/              # API endpoints
│   ├── server.js            # Entry point
│   ├── package.json         # Dependencies
│   ├── .env.example         # Environment template
│   ├── Dockerfile           # Backend container
│   └── README.md            # Backend documentation
│
├── frontend/                 # Vue.js app
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── stores/         # Pinia state
│   │   ├── services/       # API clients
│   │   ├── router/         # Vue Router
│   │   ├── assets/         # Styles & images
│   │   └── main.js         # Entry point
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite config
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment template
│   ├── Dockerfile          # Frontend container
│   └── README.md           # Frontend documentation
│
├── database/                 # PostgreSQL
│   ├── init.sql            # Schema & initial data
│   ├── migrations/         # Migration scripts
│   ├── seeds/              # Seed data
│   └── README.md           # Database documentation
│
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md      # System design
│   └── SETUP_GUIDE.md       # Setup instructions
│
├── docker-compose.yml       # Container orchestration
├── .gitignore              # Git ignore rules
├── README.md               # Project overview
└── CONTRIBUTING.md         # Contribution guidelines
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "message": "User registered successfully",
  "user": { "id": 1, "email": "user@example.com", "role": "employee" },
  "accessToken": "...",
  "refreshToken": "..."
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "user": { "id": 1, "email": "user@example.com", "role": "employee" },
  "accessToken": "...",
  "refreshToken": "..."
}
```

#### Refresh Token
```
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "..."
}

Response:
{
  "accessToken": "..."
}
```

### Leave Endpoints

#### Get Leave Balance
```
GET /leaves/balance/summary
Authorization: Bearer <token>

Response:
{
  "totalBalance": 20,
  "used": 5,
  "pending": 2,
  "available": 13
}
```

#### Create Leave Request
```
POST /leaves
Authorization: Bearer <token>
Content-Type: application/json

{
  "leaveTypeId": 1,
  "startDate": "2024-12-20",
  "endDate": "2024-12-22",
  "reason": "Family event"
}

Response:
{
  "id": 1,
  "status": "pending",
  "startDate": "2024-12-20",
  "endDate": "2024-12-22",
  "numberOfDays": 3
}
```

## Common Issues & Solutions

### Port Already in Use
```bash
# Find and kill process using port
lsof -ti:5000 | xargs kill -9    # Backend
lsof -ti:3000 | xargs kill -9    # Frontend
lsof -ti:5432 | xargs kill -9    # Database
```

### Database Connection Error
- Verify PostgreSQL is running
- Check credentials in .env files
- Ensure database `tps_lm` exists

### CORS Errors
- Ensure FRONTEND_URL is set correctly in backend .env
- Check VITE_API_URL in frontend .env
- Verify backend is running on correct port

### Token Expired
- The app automatically refreshes tokens
- If refresh fails, you'll be logged out
- Login again to get new tokens

## Development Workflow

### Creating a New Feature

1. Create feature branch
   ```bash
   git checkout -b feature/leave-report
   ```

2. Implement backend
   - Add route in `backend/routes/`
   - Create controller in `backend/controllers/`
   - Add database queries

3. Implement frontend
   - Create Vue component
   - Update store if needed
   - Add routing

4. Test thoroughly
   ```bash
   cd backend && npm test
   cd frontend && npm test
   ```

5. Commit and push
   ```bash
   git add .
   git commit -m "feat: add leave report feature"
   git push origin feature/leave-report
   ```

6. Create Pull Request on GitHub

## Deployment

### Deploy with Docker

1. Build production images
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. Push to registry
   ```bash
   docker tag tps-lm-backend myregistry/tps-lm-backend:v1
   docker push myregistry/tps-lm-backend:v1
   ```

3. Deploy to production
   - Update environment variables
   - Use production docker-compose file
   - Set secure JWT_SECRET
   - Configure database backups

### Manual Deployment

**Backend:**
```bash
npm run build
PM2 start server.js --name "tps-lm"
```

**Frontend:**
```bash
npm run build
# Deploy dist/ to CDN or static hosting
```

## Support & Troubleshooting

For issues and questions:
1. Check [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Review [docs/](./docs/) folder
3. Open GitHub issue
4. Check logs: `docker-compose logs -f`

## License

ISC

## Authors

TPS Development Team
