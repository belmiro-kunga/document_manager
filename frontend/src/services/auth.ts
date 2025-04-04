import axios from 'axios';
import { LoginCredentials, AuthResponse } from '../types/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Convertendo para o formato que o FastAPI espera
      const formData = new URLSearchParams();
      formData.append('username', credentials.email); // FastAPI OAuth2 espera 'username'
      formData.append('password', credentials.password);

      const response = await api.post<AuthResponse>('/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Buscar informações do usuário
      const userResponse = await api.get('/users/me', {
        headers: {
          'Authorization': `Bearer ${response.data.access_token}`
        }
      });

      const authResponse: AuthResponse = {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        user: userResponse.data
      };

      if (credentials.remember) {
        localStorage.setItem('token', authResponse.access_token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
      } else {
        sessionStorage.setItem('token', authResponse.access_token);
        sessionStorage.setItem('user', JSON.stringify(authResponse.user));
      }
      return authResponse;
    } catch (error: any) {
      console.error('Erro no login:', error.response?.data);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  },

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },

  getUser() {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
}; 