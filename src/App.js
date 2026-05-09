import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CartProvider } from './context/CartContext';
import { VehicleProvider } from './context/VehicleContext';
import Navbar from './components/Navbar';

import HomePage from './components/HomePage';
import ViewDataPage from './components/ViewDataPage';
import AnalyticsPage from './components/AnalyticsPage';
import BrowseRentalsPage from './components/BrowseRentalsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';

const theme = createTheme({
  palette: {
    primary: { main: '#059669' },
    secondary: { main: '#0891b2' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// 🔥 Protected Route
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <LoginPage />;
};

function AppContent() {
  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-rentals" element={<BrowseRentalsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* PROTECTED */}
          <Route
            path="/view-data"
            element={
              <ProtectedRoute>
                <ViewDataPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Container>
    </>
  );
}

import CartPage from './components/CartPage';

<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  }
/>

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <VehicleProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </VehicleProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;