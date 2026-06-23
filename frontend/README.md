# TPS Leave Management System - Frontend Setup

## Prerequisites

- Node.js 18+ and npm 9+
- Git

## Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=TPS Leave Management System
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Start Development Server

```bash
npm run dev
```

App runs on `http://localhost:3000`

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and fix code
npm run lint

# Run tests
npm test
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/           # Vue page components
│   │   ├── auth/        # Login/Register pages
│   │   ├── DashboardPage.vue
│   │   ├── LeavesPage.vue
│   │   ├── ApprovalsPage.vue
│   │   └── HomePage.vue
│   ├── components/      # Reusable components
│   ├── stores/          # Pinia state management
│   ├── services/        # API services
│   ├── router/          # Vue Router configuration
│   ├── assets/          # Styles and assets
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── .env.example         # Environment template
```

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Automatic token refresh
- Role-based access control (RBAC)
- Session persistence with cookies

### Leave Management
- View leave balance
- Submit leave requests
- Track request status
- Cancel pending requests

### Manager Dashboard
- View pending leave approvals
- Approve/Reject requests
- Add approval comments

### Responsive Design
- Mobile-friendly UI
- Bootstrap 5 styling
- Adaptive layout

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`

### Authentication Flow
1. User logs in → receives access & refresh tokens
2. Tokens stored in cookies
3. All API requests include `Authorization: Bearer <token>`
4. If token expires, refresh token automatically fetches new one
5. If refresh fails, user redirected to login

### State Management (Pinia)

Auth store manages:
- User authentication state
- Token storage and refresh
- User profile and role

## Testing

```bash
# Login credentials (development)
Email: employee@tps.com
Password: employee123

# Manager account
Email: manager@tps.com
Password: manager123

# Admin account
Email: admin@tps.com
Password: admin123
```

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env
- Verify backend CORS configuration

### API Connection Failed
- Check network tab in browser DevTools
- Ensure backend server is running
- Verify API URL is correct

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Build

```bash
# Build optimized version
npm run build

# Output in dist/ directory
# Deploy dist/ folder to static hosting
```

## Deployment Options

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Docker
See root level `docker-compose.yml` for containerized deployment

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance
- Code splitting for faster initial load
- Lazy loading of page components
- Optimized production build
- CSS and JS minification
