import axios from 'axios';
import { LoginCredentials, AuthResponse } from '../types/auth';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
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
      formData.append('grant_type', 'password');

      const response = await api.post<AuthResponse>('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (credentials.remember) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem('token', response.data.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
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