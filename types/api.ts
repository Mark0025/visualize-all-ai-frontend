// Authentication Types
export interface JWTClaims {
  uid: string;
  email: string;
  roles: string[];
  driveIds: string[];
  exp: number;
}

export interface RateLimitConfig {
  loginAttempts: number;
  windowDuration: number;
  blockDuration: number;
}

// WebSocket Types
export interface WSMessage<T = unknown> {
  type: 'drive_update' | 'auth_refresh' | string;
  payload: T;
  time: string;
}

// API Response Types
export interface APIError {
  error: string;
  code: number;
  details: Record<string, unknown>;
  requestId: string;
}

// API Headers Type
export interface APIHeaders {
  Authorization: string;
  'X-CSRF-Token': string;
  'Content-Type': 'application/json';
}

// Version Headers
export interface VersionHeaders {
  'X-API-Deprecated'?: boolean;
  'X-API-Sunset-Date'?: string;
  'X-API-Alternative'?: string;
}

// Utility types for API responses
export type APIResponse<T> = T | APIError;

// Authentication state type
export interface AuthState {
  token: string | null;
  csrfToken: string | null;
  user: JWTClaims | null;
  isAuthenticated: boolean;
} 