import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Badge, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  // 🔥 user localStorage से लो
  const user = JSON.parse(localStorage.getItem("user"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // 🔥 logout fix
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(90deg, #059669 0%, #0891b2 100%)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <AnalyticsIcon sx={{ marginRight: '12px', fontSize: '28px' }} />
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
        >
          RentalHub
        </Typography>

        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/browse-rentals">
            Browse Vehicles
          </Button>

          {/* 🔥 Protected routes */}
          {user && (
            <>
              <Button color="inherit" component={Link} to="/analytics">
                Analytics
              </Button>
            </>
          )}

          {/* Cart */}
          <IconButton color="inherit" component={Link} to="/checkout">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* 🔥 User Menu */}
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled sx={{ fontWeight: 'bold', color: '#059669' }}>
                  {user.name}
                </MenuItem>
                <MenuItem disabled sx={{ fontSize: '12px', color: '#666' }}>
                  {user.email}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/signup"
                sx={{ backgroundColor: 'white', color: '#059669' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;