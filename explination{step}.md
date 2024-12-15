# Frontend Architecture and Workflow Explanation

## 1. CI/CD Pipeline Flow

```mermaid
graph TD
    A[Push/PR] --> B[Build & Test Job]
    B --> C{Tests Pass?}
    C -->|Yes| D[Security Scan]
    C -->|No| E[Fail Build]
    D --> F{PR?}
    F -->|Yes| G[Deploy Preview]
    F -->|No| H[Skip Preview]
    
    subgraph "Build & Test Process"
    I[Install Deps] --> J[Type Check]
    J --> K[Lint]
    K --> L[Test]
    L --> M[Build]
    M --> N[Cache Build]
    end
```

## 2. Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Client
    participant B as Backend
    
    U->>F: Login Request
    F->>A: Call login()
    A->>B: POST /auth/login
    B->>A: Return JWT + CSRF
    A->>F: Store Tokens
    F->>U: Redirect to App
    
    Note over A,B: Token Refresh Flow
    A->>B: API Request
    B->>A: 401 Unauthorized
    A->>B: POST /auth/refresh
    B->>A: New JWT
    A->>B: Retry Original Request
```

## 3. API Client Architecture

```mermaid
classDiagram
    class APIClient {
        -AxiosInstance client
        -static APIClient instance
        +getInstance() APIClient
        -setupInterceptors()
        -handleError()
        -handleAuthError()
        -refreshAuth()
        +login()
        +register()
    }
    
    class APIError {
        +string error
        +number code
        +object details
        +string requestId
    }
    
    class JWTClaims {
        +string uid
        +string email
        +string[] roles
        +string[] driveIds
        +number exp
    }
    
    APIClient ..> APIError
    APIClient ..> JWTClaims
```

## Current Status and Next Steps

### What Works:
1. ✅ Basic CI/CD pipeline structure
2. ✅ Type-safe API client implementation
3. ✅ Authentication flow design

### What Needs Testing:
1. 🧪 Token refresh mechanism
2. 🧪 Error handling scenarios
3. 🧪 CSRF token management
4. 🧪 Rate limiting behavior

### Issues Found:
1. ❌ Missing Vercel deployment configuration
   ```yaml
   # Current Error:
   Missing required input 'zeit-token'
   ```

### Next 3 Steps (Priority Order):

```mermaid
graph LR
    A[1. Setup Auth Context] --> B[2. Implement WebSocket Manager] --> C[3. Create Core Components]
    
    subgraph "Step 1: Auth Context"
        D[Create Context] --> E[Add Providers]
        E --> F[Implement Hooks]
    end
    
    subgraph "Step 2: WebSocket"
        G[Setup Manager] --> H[Handle Events]
        H --> I[Reconnection Logic]
    end
    
    subgraph "Step 3: Components"
        J[Create Base] --> K[Add State]
        K --> L[Connect API]
    end
```

## Best Practices Implementation

### 1. Authentication Context (Next Step)
```typescript
// Recommended Structure
interface AuthContextType {
  user: JWTClaims | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}
```

### 2. WebSocket Manager (Following Step)
```typescript
// Recommended Pattern
class WSManager {
  private static instance: WSManager;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  // Implementation details to follow
}
```

### 3. Core Components (Final Step)
```typescript
// Component Architecture
interface VisualizationProps {
  data: VisualizationData;
  settings: VisualizationSettings;
  onUpdate: (data: VisualizationData) => void;
}
```

## Testing Strategy

```mermaid
graph TD
    A[Unit Tests] --> B[Component Tests]
    B --> C[Integration Tests]
    C --> D[E2E Tests]
    
    subgraph "Test Coverage"
    E[Auth Flow] --> F[API Integration]
    F --> G[WebSocket]
    G --> H[Visualization]
    end
```

## Immediate Actions Required:
1. Fix Vercel deployment configuration
2. Set up environment variables
3. Create initial auth context implementation
