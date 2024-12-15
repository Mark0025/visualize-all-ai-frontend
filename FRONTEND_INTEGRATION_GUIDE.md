# Visualize-All-AI Backend Integration Guide

## Overview
This document provides comprehensive information about the backend architecture and integration points for the Visualize-All-AI application. The backend is built with Go and uses MongoDB as the primary database.

## Base URL
```
Development: http://localhost:8080/api/v1
Production: [TO BE CONFIGURED]
```

## Authentication
We use JWT (JSON Web Token) based authentication.

### Authentication Endpoints
```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

#### Register Request
```json
{
  "email": "string",
  "password": "string",
  "username": "string"
}
```

#### Login Request
```json
{
  "email": "string",
  "password": "string"
}
```

#### Success Response
```json
{
  "token": "string",
  "refreshToken": "string",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "role": "string"
  }
}
```

## API Endpoints

### User Management
```
GET    /users/me           - Get current user profile
PUT    /users/me          - Update user profile
DELETE /users/me          - Delete user account
GET    /users/{id}        - Get user by ID (Admin only)
```

### AI Visualization
```
POST   /visualizations           - Create new visualization
GET    /visualizations          - List all visualizations
GET    /visualizations/{id}     - Get visualization by ID
PUT    /visualizations/{id}     - Update visualization
DELETE /visualizations/{id}     - Delete visualization
```

#### Visualization Object Structure
```json
{
  "id": "string",
  "userId": "string",
  "title": "string",
  "description": "string",
  "type": "string",
  "data": {
    "nodes": [],
    "edges": [],
    "metadata": {}
  },
  "settings": {
    "layout": "string",
    "theme": "string",
    "customOptions": {}
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Data Models

### User Schema
```go
type User struct {
    ID           primitive.ObjectID `bson:"_id,omitempty"`
    Email        string            `bson:"email"`
    Username     string            `bson:"username"`
    Password     string            `bson:"password"`
    Role         string            `bson:"role"`
    CreatedAt    time.Time         `bson:"created_at"`
    UpdatedAt    time.Time         `bson:"updated_at"`
}
```

### Visualization Schema
```go
type Visualization struct {
    ID          primitive.ObjectID `bson:"_id,omitempty"`
    UserID      primitive.ObjectID `bson:"user_id"`
    Title       string            `bson:"title"`
    Description string            `bson:"description"`
    Type        string            `bson:"type"`
    Data        VisualizationData `bson:"data"`
    Settings    Settings          `bson:"settings"`
    CreatedAt   time.Time         `bson:"created_at"`
    UpdatedAt   time.Time         `bson:"updated_at"`
}
```

## Error Handling
All API errors follow this structure:
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security
- All endpoints except /auth/login and /auth/register require JWT authentication
- JWT tokens expire after 24 hours
- Refresh tokens are valid for 7 days
- CORS is enabled for frontend domains
- Rate limiting: 100 requests per minute per IP

## WebSocket Integration
WebSocket endpoint: `ws://localhost:8080/ws`

Connected clients receive real-time updates for:
- Visualization changes
- Collaboration events
- System notifications

## Environment Variables Required for Frontend
```env
REACT_APP_API_URL=http://localhost:8080/api/v1
REACT_APP_WS_URL=ws://localhost:8080/ws
REACT_APP_ENV=development
```

## Pagination
All list endpoints support pagination with these query parameters:
```
page: number (default: 1)
limit: number (default: 10)
sort: string (default: "created_at")
order: string (default: "desc")
```

## Caching
- Frontend should implement caching for visualization data
- Cache invalidation on update/delete operations
- Recommended cache duration: 5 minutes

## Frontend Implementation Recommendations

### State Management
- Use Redux or React Query for global state management
- Implement optimistic updates for better UX
- Handle offline capabilities for visualization editing

### Type Definitions
Create TypeScript interfaces matching the backend models:
```typescript
interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Visualization {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  data: {
    nodes: any[];
    edges: any[];
    metadata: Record<string, any>;
  };
  settings: {
    layout: string;
    theme: string;
    customOptions: Record<string, any>;
  };
  createdAt: string;
  updatedAt: string;
}
```

### API Integration
- Use Axios or fetch with interceptors for API calls
- Implement retry logic for failed requests
- Handle token refresh automatically

### Real-time Updates
- Implement WebSocket connection management
- Handle reconnection logic
- Update local state based on WebSocket events

### Error Handling
- Implement global error boundary
- Show appropriate error messages to users
- Handle network errors gracefully

### Performance Optimization
- Implement lazy loading for visualizations
- Use virtualization for large lists
- Optimize bundle size

## Next Steps for Frontend Team
1. Set up project with TypeScript and React
2. Implement authentication flow
3. Create base API service
4. Set up WebSocket connection
5. Implement core visualization components
6. Add state management
7. Create user interface components
8. Implement error handling
9. Add real-time updates
10. Optimize performance

## Support
For backend-related questions or issues, please contact the backend team through:
- GitHub Issues
- Team Slack Channel: #backend-support 



