# TPS Leave Management System - Quick Reference

## 🎯 Getting Started in 5 Minutes

### Option 1: Docker (Easiest)

```bash
git clone https://github.com/khushboosingh-coder/TPS.LM.git
cd TPS.LM
docker-compose up
```

✅ Visit http://localhost:3000

### Option 2: Local Development

```bash
# Terminal 1: Database
psql -U postgres -d tps_lm -f database/init.sql

# Terminal 2: Backend
cd backend
npm install && npm run dev

# Terminal 3: Frontend
cd frontend
npm install && npm run dev
```

✅ Visit http://localhost:3000

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Employee | employee@tps.com | employee123 |
| Manager | manager@tps.com | manager123 |
| Admin | admin@tps.com | admin123 |

## 📁 Key Files & Directories

### Backend
- `backend/server.js` - Main server file
- `backend/controllers/auth.controller.js` - Authentication logic
- `backend/routes/` - API endpoints
- `backend/.env.example` - Environment template

### Frontend
- `frontend/src/main.js` - Entry point
- `frontend/src/stores/auth.js` - Auth state management
- `frontend/src/pages/` - Page components
- `frontend/src/services/api.js` - API client

### Database
- `database/init.sql` - Schema & initial data
- `database/seeds/default-data.sql` - Test data

## 🔗 Important URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Database:** localhost:5432
- **Health Check:** http://localhost:5000/health

## 📝 Common Commands

### Docker
```bash
docker-compose up              # Start all services
docker-compose down            # Stop all services
docker-compose logs -f         # View logs
docker-compose exec backend npm test  # Run backend tests
```

### Backend
```bash
cd backend
npm install                    # Install dependencies
npm run dev                    # Start dev server
npm test                       # Run tests
npm run lint                   # Run linter
```

### Frontend
```bash
cd frontend
npm install                    # Install dependencies
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run lint                   # Run linter
```

### Database
```bash
psql -U postgres               # Connect to PostgreSQL
\c tps_lm                      # Connect to database
\dt                            # List tables
\d users                       # Describe table
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000
# Kill process
kill -9 <PID>
```

### Clear Cache
```bash
# Backend
rm -rf backend/node_modules backend/package-lock.json
npm install

# Frontend
rm -rf frontend/node_modules frontend/package-lock.json
npm install
```

### Database Issues
```bash
# Reset database
psql -U postgres -d postgres -c "DROP DATABASE tps_lm;"
psql -U postgres -f database/init.sql
```

## 📚 Documentation Structure

```
docs/
├── ARCHITECTURE.md       # System design
├── AUTHENTICATION.md     # Auth setup
└── SETUP_GUIDE.md       # Detailed setup

backend/README.md        # Backend docs
frontend/README.md       # Frontend docs
database/README.md       # Database docs
SETUP.md                 # Complete guide
CONTRIBUTING.md         # Contribution guide
```

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Set HTTPS/SSL in production
- [ ] Use strong database passwords
- [ ] Enable CORS properly
- [ ] Keep dependencies updated
- [ ] Use environment variables
- [ ] Enable audit logging
- [ ] Regular backups

## 🚀 Next Steps

1. Read [SETUP.md](./SETUP.md) for complete setup
2. Check [backend/README.md](./backend/README.md) for API
3. Review [frontend/README.md](./frontend/README.md) for UI
4. Follow [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## 📞 Need Help?

- Check documentation in `docs/` folder
- Review README files in each directory
- Open GitHub issue for bugs
- Contact: support@tps.com

## 🎉 You're All Set!

Start developing and managing leave requests with TPS Leave Management System.
