# Authentication Flow Explanation

## 1. OAuth 2.0 Flow with Google

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend (NextAuth)
    participant G as Google OAuth
    participant B as Backend API
    
    U->>F: Click "Sign in with Google"
    F->>G: Redirect to Google OAuth
    Note over G: User logs in to Google
    G->>F: Return auth code
    F->>G: Exchange code for tokens
    G->>F: Return access & refresh tokens
    F->>F: Store tokens in session
    F->>B: API requests with token
    B->>G: Validate token
    G->>B: Token valid
    B->>F: Return data
```

## 2. Token Management Architecture

```mermaid
graph TD
    A[NextAuth.js] -->|Manages| B[JWT Session]
    B -->|Contains| C[Access Token]
    B -->|Contains| D[Refresh Token]
    B -->|Contains| E[User Info]
    
    F[Frontend API Calls] -->|Uses| C
    G[Backend API] -->|Validates| C
    
    H[Token Expiry] -->|Triggers| I[Token Refresh]
    I -->|Uses| D
    I -->|Gets New| C
```

## 3. System Architecture

```mermaid
graph LR
    A[Browser] -->|1. User visits| B[Next.js Frontend]
    B -->|2. Auth Request| C[NextAuth.js]
    C -->|3. OAuth Flow| D[Google OAuth]
    D -->|4. Tokens| C
    C -->|5. Session| B
    B -->|6. API Calls| E[Backend API]
    E -->|7. Data| F[MongoDB]
    E -->|8. Validate Tokens| D
```

## How It Works

1. **Frontend (NextAuth.js)**:
   - Handles OAuth flow with Google
   - Manages user sessions
   - Stores tokens securely
   - Provides authentication state

2. **Google OAuth**:
   - Provides secure authentication
   - Issues access & refresh tokens
   - Validates tokens
   - Grants API permissions

3. **Backend API**:
   - Validates tokens with Google
   - Handles business logic
   - Manages data access
   - Provides API endpoints

4. **Token Types**:
   ```typescript
   interface Tokens {
     accessToken: string;   // Short-lived (1 hour)
     refreshToken: string;  // Long-lived (can be permanent)
     idToken: string;      // User identity information
   }
   ```

## Environment Setup

```env
# Frontend (.env.local)
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Backend Environment
JWT_SECRET=same_as_NEXTAUTH_SECRET
GOOGLE_APPLICATION_CREDENTIALS=path_to_service_account.json
```

## Security Flow

```mermaid
graph TD
    A[User Login] -->|1| B[Google OAuth]
    B -->|2| C[Tokens Generated]
    C -->|3| D[NextAuth Session]
    D -->|4| E[JWT Created]
    E -->|5| F[Secure Cookie]
    
    G[API Request] -->|6| H[Extract Token]
    H -->|7| I[Validate Token]
    I -->|8| J[Grant Access]
```

## Why Tokens?

1. **Access Token**:
   - Short-lived (1 hour)
   - Used for API access
   - Prevents unauthorized access
   - Can be revoked

2. **Refresh Token**:
   - Long-lived
   - Used to get new access tokens
   - Stored securely
   - Enables persistent sessions

3. **ID Token**:
   - Contains user information
   - Verified by Google
   - Used for authentication
   - Stateless verification

## Integration Points

1. **Frontend to Google**:
   - OAuth flow
   - Token management
   - User authentication

2. **Frontend to Backend**:
   - API requests with tokens
   - Data fetching
   - Real-time updates

3. **Backend to Google**:
   - Token validation
   - API access
   - User verification