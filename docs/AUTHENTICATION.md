# JWT Authentication & OAuth Integration Guide

## JWT (JSON Web Tokens)

### Overview
JWT is a stateless authentication mechanism using digitally signed tokens.

### How It Works

1. **User Login**
   ```
   User → POST /auth/login → Server
   Server validates credentials → generates JWT
   Server → access_token + refresh_token → Client
   ```

2. **Token Structure**
   ```
   Header.Payload.Signature
   
   Header: { "alg": "HS256", "typ": "JWT" }
   Payload: { "userId": 1, "role": "employee", "iat": ..., "exp": ... }
   Signature: HMACSHA256(Header.Payload, SECRET)
   ```

3. **Using Token**
   - Store in secure HTTP-only cookie
   - Send in Authorization header: `Bearer <token>`
   - Server verifies signature and expiration

### Token Configuration

**In `.env` (Backend):**
```env
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRY=7d              # Access token expiry
REFRESH_TOKEN_EXPIRY=30d   # Refresh token expiry
```

### Security Best Practices

1. **Secret Management**
   - Use strong, random JWT_SECRET (minimum 32 characters)
   - Store securely (never commit to git)
   - Rotate in production regularly

2. **Token Expiry**
   - Short-lived access tokens (7 days)
   - Longer-lived refresh tokens (30 days)
   - Auto-refresh before expiry

3. **Storage**
   - Store in HTTP-only cookies (prevents XSS)
   - Never store in localStorage
   - Set Secure flag for HTTPS

4. **Validation**
   - Always verify signature
   - Check token expiration
   - Validate claims (userId, role)

## OAuth 2.0 (Google)

### Setup Google OAuth

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable Google+ API

2. **Create OAuth Credentials**
   - Go to Credentials → Create OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     http://localhost:5000/auth/google/callback
     https://yourdomain.com/auth/google/callback
     ```
   - Copy Client ID and Client Secret

3. **Configure Backend**
   ```env
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
   ```

### Frontend OAuth Integration

```vue
<template>
  <button @click="loginWithGoogle">
    <i class="fab fa-google"></i> Login with Google
  </button>
</template>

<script>
import { useAuthStore } from '../stores/auth.js';

export default {
  setup() {
    const authStore = useAuthStore();

    const loginWithGoogle = () => {
      // Redirect to backend OAuth endpoint
      window.location.href = 'http://localhost:5000/auth/google';
    };

    return { loginWithGoogle };
  },
};
</script>
```

### OAuth Flow

```
1. User clicks "Login with Google"
   ↓
2. Redirects to Google login page
   ↓
3. User authenticates with Google
   ↓
4. Google redirects to callback URL with auth code
   ↓
5. Backend exchanges code for tokens
   ↓
6. Backend creates/updates user in database
   ↓
7. Backend generates JWT tokens
   ↓
8. Redirects to frontend with tokens
   ↓
9. Frontend stores tokens and loads dashboard
```

## Token Refresh Flow

```javascript
// Client: API request interceptor
if (response.status === 401) {
  try {
    // Try to refresh token
    const newToken = await api.post('/auth/refresh-token', {
      refreshToken: store.refreshToken
    });
    
    // Update access token
    store.accessToken = newToken;
    
    // Retry original request
    return api(originalRequest);
  } catch (error) {
    // Refresh failed, user must login again
    window.location.href = '/login';
  }
}
```

## Role-Based Access Control (RBAC)

### Roles

| Role | Permissions |
|------|-------------|
| **employee** | View own leaves, submit requests |
| **manager** | Approve leaves, view team's leaves |
| **admin** | Full access, user management |

### Middleware Protection

```javascript
// Backend: Protected route
router.get('/approvals/pending',
  authenticateToken,           // Verify JWT
  authorizeRole('manager', 'admin'),  // Check role
  handler
);

// Frontend: Protected route
router.beforeEach((to, from, next) => {
  if (to.meta.roles && !to.meta.roles.includes(user.role)) {
    next('/'); // Redirect unauthorized
  } else {
    next();
  }
});
```

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Tokens stored in HTTP-only cookies
- [ ] Refresh tokens validated server-side
- [ ] Token expiry set appropriately
- [ ] HTTPS enabled in production
- [ ] OAuth credentials kept secret
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Rate limiting on auth endpoints
- [ ] Audit logging for auth events

## Troubleshooting

### "Invalid token" Error
- Token may have expired
- JWT_SECRET mismatch between sessions
- Token tampered with

### "Token not found" Error
- Cookies not persisting (check browser settings)
- Request not including Authorization header
- CORS blocking credentials

### OAuth Redirect URI Mismatch
- Ensure exact match in Google Console
- Include protocol and port
- No trailing slashes

## References

- [JWT.io](https://jwt.io/) - JWT Debugger
- [OAuth 2.0 Flow](https://tools.ietf.org/html/rfc6749)
- [OWASP Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
