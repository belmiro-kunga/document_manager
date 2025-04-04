import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { Layout } from './components/Layout';
import { Documents } from './pages/Documents';
import { Categories } from './pages/Categories';
import { Shared } from './pages/Shared';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { authService } from './services/auth';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route
              path="/login"
              element={
                authService.isAuthenticated() ? (
                  <Navigate to="/documents" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/documents" replace />} />
                      <Route path="/documents" element={<Documents />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/shared" element={<Shared />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
