export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
    updated_at?: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthResponse['user'] | null;
  token: string | null;
} 