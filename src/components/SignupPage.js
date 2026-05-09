import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // 🔥 added

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json(); // 🔥 FIX

      if (data.message === "User Registered") {
        setSuccess(true);

        // 🔥 redirect after 2 sec
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else {
        setError(data.message || "Something went wrong");
      }

    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Paper sx={{ padding: '40px', width: '100%' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
            <PersonAddIcon sx={{ fontSize: 40, color: '#059669' }} />
            <Typography variant="h4">Create Account</Typography>
          </Box>

          {/* 🔥 Success Message */}
          {success && (
            <Alert severity="success" sx={{ marginBottom: '10px' }}>
              User registered successfully! Redirecting...
            </Alert>
          )}

          {/* 🔥 Error Message */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: '10px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ marginTop: '20px' }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <Typography sx={{ marginTop: '10px' }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default SignupPage;