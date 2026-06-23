# TPS Leave Management System - Backend Setup

## Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 12+
- Git

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tps_lm
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Database Setup

```bash
# Create database and run migrations
cd ../database
psql -U postgres -f init.sql
psql -U postgres -d tps_lm -f seeds/default-data.sql
```

### 4. Start Development Server

```bash
cd ../backend
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id` - Update user profile

### Leave Management
- `POST /api/leaves` - Create leave request
- `GET /api/leaves` - Get user's leave requests
- `GET /api/leaves/:id` - Get leave request details
- `PUT /api/leaves/:id/cancel` - Cancel leave request
- `GET /api/leaves/balance/summary` - Get leave balance

### Approvals (Manager/Admin)
- `GET /api/approvals/pending` - Get pending approvals
- `PUT /api/approvals/:id/approve` - Approve leave request
- `PUT /api/approvals/:id/reject` - Reject leave request

### Reports
- `GET /api/reports/balance` - Leave balance report
- `GET /api/reports/usage` - Leave usage report (Manager/Admin)
- `GET /api/reports/department` - Department report (Admin only)

## Testing

```bash
npm test
npm run test:watch
```

## Linting

```bash
npm run lint
npm run lint:fix
```

## Default Users (for testing)

- **Admin**: admin@tps.com / admin123
- **Manager**: manager@tps.com / manager123
- **Employee**: employee@tps.com / employee123

## Project Structure

```
backend/
├── config/           # Database and configuration
├── controllers/      # Business logic
├── middleware/       # Express middleware
├── routes/           # API routes
├── server.js         # Entry point
├── package.json      # Dependencies
└── .env.example      # Environment template
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in .env
- Verify database exists: `psql -U postgres -l`

### Port Already in Use
```bash
# Change port in .env or kill process
kill -9 $(lsof -t -i :5000)
```

### Token Expired
- Refresh token using `/api/auth/refresh-token`
- Login again if refresh token is also expired

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT_SECRET
3. Enable DB_SSL for remote databases
4. Set up environment variables on deployment platform
5. Use a process manager like PM2

```bash
npm install -g pm2
pm2 start server.js --name "tps-lm-api"
```
