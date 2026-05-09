import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../context/CartContext';

function UpdatedNavbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    handleCloseMenu();
    navigate('/login');
  };

  // 🔥 NOT LOGGED IN
  if (!user) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            RentalHub
          </Typography>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>

          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>

        {/* LOGO */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          RentalHub
        </Typography>

        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

          {/* ✅ COMMON (ALL USERS) */}
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/browse-rentals">
            Browse Vehicles
          </Button>

          <Button color="inherit" component={Link} to="/analytics">
            <AnalyticsIcon sx={{ mr: 0.5 }} />
            Analytics
          </Button>

          {/* 🔥 ADMIN ONLY */}
          {user.role === "admin" && (
            <>
              <Button color="inherit" component={Link} to="/add-customer">
                Add Customer
              </Button>

              <Button color="inherit" component={Link} to="/add-rental">
                New Rental
              </Button>

              <Button color="inherit" component={Link} to="/view-data">
                Records
              </Button>
            </>
          )}

          {/* 🔥 USER ONLY */}
          {user.role === "user" && (
            <Button color="inherit" component={Link} to="/checkout">
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Button>
          )}

          {/* 👤 USER MENU */}
          <Button
            color="inherit"
            onClick={handleOpenMenu}
            startIcon={<AccountCircleIcon />}
          >
            {user.name}
          </Button>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
          >
            <MenuItem disabled>
              {user.email}
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default UpdatedNavbar;