import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.message === "Login Success") {

        // 🔥 backend से role already आएगा
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        setError(data.message);
      }

    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Paper sx={{ padding: '40px', width: '100%' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '32px' }}>
            <LockIcon sx={{ fontSize: 48, color: '#059669' }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#059669' }}>
              Welcome Back
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ marginBottom: '16px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ marginTop: '24px' }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* 🔥 Signup only for users (admin will ignore this anyway) */}
          <Typography sx={{ textAlign: 'center', marginTop: '16px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#059669', fontWeight: 'bold' }}>
              Sign Up Here
            </Link>
          </Typography>

        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;