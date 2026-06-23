# TPS Leave Management System

A comprehensive Leave Management System for managing employee leave requests, approvals, and leave balances with role-based access control.

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/khushboosingh-coder/TPS.LM.git
cd TPS.LM

# Start all services
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

### Local Development

See [SETUP.md](./SETUP.md) for detailed local setup instructions.

## 📋 Features

### Employee Features
- 👤 User registration and authentication
- 📝 Submit leave requests
- 📊 View leave balance and history
- ❌ Cancel pending requests
- 🔔 Request status notifications

### Manager Features
- ✅ View pending leave approvals
- 👍 Approve/Reject requests with comments
- 📈 View team's leave usage
- 📅 Track department leave

### Admin Features
- 🔐 Full system access
- 👥 User management
- 🏷️ Leave type configuration
- 📊 System-wide reports
- 🔍 Audit logs

## 🛠️ Tech Stack

### Backend
- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT + Passport.js
- **Authorization:** Role-Based Access Control (RBAC)
- **Security:** bcryptjs, helmet, CORS

### Frontend
- **Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite
- **State Management:** Pinia
- **Styling:** Bootstrap 5
- **HTTP Client:** Axios
- **Routing:** Vue Router

### DevOps
- **Containerization:** Docker & Docker Compose
- **Version Control:** Git
- **Package Management:** npm

## 📁 Project Structure

```
TPS.LM/
├── backend/              # Express.js API
│   ├── config/          # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Authentication & validation
│   ├── routes/          # API endpoints
│   ├── server.js        # Entry point
│   └── README.md        # Backend docs
│
├── frontend/             # Vue.js SPA
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── stores/      # Pinia stores
│   │   ├── services/    # API services
│   │   ├── router/      # Route configuration
│   │   └── assets/      # Styles & images
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Build config
│   └── README.md        # Frontend docs
│
├── database/             # PostgreSQL
│   ├── init.sql         # Schema & initial data
│   ├── migrations/      # Migration scripts
│   ├── seeds/           # Seed data
│   └── README.md        # Database docs
│
├── docs/                 # Documentation
│   ├── ARCHITECTURE.md   # System design
│   ├── AUTHENTICATION.md # Auth guide
│   └── SETUP_GUIDE.md    # Setup instructions
│
├── docker-compose.yml    # Container orchestration
├── SETUP.md              # Complete setup guide
├── CONTRIBUTING.md       # Contribution guidelines
└── README.md             # This file
```

## 🔐 Authentication

### JWT Authentication
- Stateless token-based authentication
- Access tokens (7 days) + Refresh tokens (30 days)
- Automatic token refresh
- HTTP-only cookie storage

### OAuth 2.0 (Google)
- Single sign-on capability
- Seamless user registration
- Secure credential handling

See [docs/AUTHENTICATION.md](./docs/AUTHENTICATION.md) for detailed information.

## 🗄️ Database Schema

### Main Tables
- **users** - User accounts and profiles
- **leave_types** - Leave categories (Casual, Sick, Annual, etc.)
- **leave_balance** - User leave balance tracking
- **leave_requests** - Leave request records
- **audit_logs** - Compliance audit trail
- **notifications** - User notifications

See [database/README.md](./database/README.md) for schema details.

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Key Endpoints

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/refresh-token` - Refresh access token

**Leave Management**
- `GET /leaves/balance/summary` - Get leave balance
- `POST /leaves` - Create leave request
- `GET /leaves` - Get user's requests

**Approvals (Manager/Admin)**
- `GET /approvals/pending` - Pending requests
- `PUT /approvals/:id/approve` - Approve request
- `PUT /approvals/:id/reject` - Reject request

See [backend/README.md](./backend/README.md) for complete API documentation.

## 🧪 Testing

### Default Test Accounts

```
Admin:    admin@tps.com / admin123
Manager:  manager@tps.com / manager123
Employee: employee@tps.com / employee123
```

## 🚀 Deployment

### Docker Deployment
```bash
# Production build
docker-compose -f docker-compose.prod.yml build

# Push to registry
docker tag tps-lm-backend myregistry/tps-lm-backend:v1
docker push myregistry/tps-lm-backend:v1
```

### Cloud Deployment
- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Backend:** Heroku, Railway, DigitalOcean, AWS EC2
- **Database:** AWS RDS, Heroku Postgres, Railway

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 📖 Documentation

- [SETUP.md](./SETUP.md) - Complete setup and deployment guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture
- [docs/AUTHENTICATION.md](./docs/AUTHENTICATION.md) - Auth implementation
- [backend/README.md](./backend/README.md) - Backend documentation
- [frontend/README.md](./frontend/README.md) - Frontend documentation
- [database/README.md](./database/README.md) - Database documentation

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
lsof -ti:5000 | xargs kill -9    # Kill port 5000
lsof -ti:3000 | xargs kill -9    # Kill port 3000
```

**Database Connection Error**
- Verify PostgreSQL is running
- Check database credentials
- Ensure database exists

**CORS Errors**
- Verify backend is running
- Check VITE_API_URL in frontend .env
- Ensure CORS is enabled in backend

See [SETUP.md](./SETUP.md) for more troubleshooting tips.

## 📋 Project Branches

- `main` - Production-ready code
- `setup/backend-express` - Backend setup branch
- `setup/frontend-vue` - Frontend setup branch
- `setup/database` - Database schema branch
- `develop` - Development branch
- `feature/*` - Feature branches

## 📊 System Requirements

### Development
- Node.js 18+
- npm 9+
- PostgreSQL 12+
- Git
- Docker & Docker Compose (optional)

### Production
- Node.js 18+ LTS
- PostgreSQL 12+
- 2GB RAM minimum
- 10GB storage minimum
- HTTPS/SSL certificate

## 📝 License

ISC License - See LICENSE file for details

## 👥 Team

**Development Team:** TPS
**Contact:** support@tps.com

## 🙏 Acknowledgments

- Express.js community
- Vue.js team
- PostgreSQL documentation
- Open source contributors

## 📞 Support

For issues, questions, or suggestions:

1. **GitHub Issues** - Report bugs or request features
2. **Discussions** - Ask questions and share ideas
3. **Documentation** - Check docs for detailed guides
4. **Email** - Contact support@tps.com

## 🔄 Changelog

### v1.0.0 (2024-06-23)
- Initial project setup
- Backend API with Express.js
- Frontend with Vue.js
- PostgreSQL database schema
- JWT authentication
- Docker containerization
- Complete documentation

---

**Made with ❤️ by TPS Development Team**
