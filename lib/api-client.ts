import axios, { AxiosInstance, AxiosError } from 'axios';
import { APIError, APIHeaders, JWTClaims } from '../types/api';

class APIClient {
  private client: AxiosInstance;
  private static instance: APIClient;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        const csrfToken = localStorage.getItem('csrfToken');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<APIError>) => {
        if (error.response?.status === 401) {
          // Handle token refresh
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await this.refreshAuth(refreshToken);
              if (response.token) {
                localStorage.setItem('token', response.token);
                // Retry original request
                return this.client(error.config!);
              }
            }
          } catch (refreshError) {
            // Handle refresh failure
            this.handleAuthError();
          }
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError<APIError>): APIError {
    return {
      error: error.response?.data?.error || 'Unknown error occurred',
      code: error.response?.status || 500,
      details: error.response?.data?.details || {},
      requestId: error.response?.data?.requestId || '',
    };
  }

  private handleAuthError() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  private async refreshAuth(refreshToken: string) {
    try {
      const response = await this.client.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // API Methods
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(email: string, password: string, username: string) {
    const response = await this.client.post('/auth/register', {
      email,
      password,
      username,
    });
    return response.data;
  }

  // Add more API methods as needed...
}

export const apiClient = APIClient.getInstance(); 