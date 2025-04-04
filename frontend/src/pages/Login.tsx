import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { authService } from '../services/auth';
import { LoginCredentials } from '../types/auth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  width: '100%',
  maxWidth: 400,
  position: 'relative'
}));

const InfoIcon = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: 'rgba(255, 255, 255, 0.7)',
  cursor: 'pointer'
}));

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credentials: LoginCredentials = {
        email,
        password,
        remember: rememberMe
      };

      await authService.login(credentials);
      navigate('/documents', { replace: true });
    } catch (err: any) {
      console.error('Erro de login:', err);
      if (err.response?.data?.detail) {
        setError(typeof err.response.data.detail === 'string' 
          ? err.response.data.detail 
          : 'Erro ao fazer login. Verifique suas credenciais.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'admin' | 'user') => {
    const credentials = {
      email: type === 'admin' ? 'admin@docuguardian.com' : 'user@example.com',
      password: type === 'admin' ? 'admin123' : 'user123',
      remember: rememberMe
    };

    setEmail(credentials.email);
    setPassword(credentials.password);

    try {
      setLoading(true);
      await authService.login(credentials);
      navigate('/documents', { replace: true });
    } catch (err: any) {
      console.error('Erro de login demo:', err);
      if (err.response?.data?.detail) {
        setError(typeof err.response.data.detail === 'string' 
          ? err.response.data.detail 
          : 'Erro ao fazer login. Verifique suas credenciais.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B4965',
        padding: 3,
        backgroundImage: 'linear-gradient(135deg, #1B4965 0%, #16384d 100%)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: 'white', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ fontSize: '2rem', marginRight: '8px' }}>🌐</span>
          DocuGuardian
        </Typography>
        <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>
          Secure Document Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Enterprise-grade security for your documents
        </Typography>
      </Box>

      <StyledPaper elevation={3}>
        <InfoIcon>ⓘ</InfoIcon>
        <Typography variant="h5" component="h2" sx={{ color: 'white', mb: 3 }}>
          Sign In
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
          Enter your credentials to access your account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="name@company.com"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  },
                  '& input': {
                    color: 'white'
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  },
                  '& input': {
                    color: 'white'
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-checked': {
                      color: 'white',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Remember me
                </Typography>
              }
            />
            <Link
              href="#"
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                '&:hover': {
                  color: 'white'
                }
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#2196f3',
              color: 'white',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#1976d2'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign in securely'}
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Demo credentials:{' '}
            <Link
              component="button"
              onClick={() => handleDemoLogin('admin')}
              sx={{ color: 'white' }}
            >
              Admin
            </Link>{' '}
            |{' '}
            <Link
              component="button"
              onClick={() => handleDemoLogin('user')}
              sx={{ color: 'white' }}
            >
              User
            </Link>
          </Typography>
        </Box>
      </StyledPaper>

      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 4 }}>
        © 2023 DocuGuardian. All rights reserved.
      </Typography>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 