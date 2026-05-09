import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {

  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // 🔥 TOTAL CALCULATION
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const days =
        (new Date(item.endDate) - new Date(item.startDate)) /
        (1000 * 60 * 60 * 24);

      return total + item.pricePerDay * days;
    }, 0);
  };

  // 🔥 EMPTY CART UI
  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          🛒 Your Cart is Empty
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Browse vehicles and add them to your cart
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/browse-rentals")}
        >
          Browse Vehicles
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #059669, #10b981)",
        p: 4,
        color: "white"
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Typography variant="h4" fontWeight="bold" mb={4}>
          🛒 Your Cart
        </Typography>

        <Grid container spacing={3}>

          {/* CART ITEMS */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => {

              const days =
                (new Date(item.endDate) - new Date(item.startDate)) /
                (1000 * 60 * 60 * 24);

              return (
                <Paper key={index} sx={glassCard}>

                  <Box display="flex" justifyContent="space-between">

                    <Box>
                      <Typography variant="h6">
                        {item.vehicle.name}
                      </Typography>

                      <Typography variant="body2" color="gray">
                        {item.variant.name}
                      </Typography>

                      <Typography mt={1}>
                        📅 {item.startDate} → {item.endDate}
                      </Typography>

                      <Typography mt={1}>
                        💰 ₹{item.pricePerDay} × {days} days
                      </Typography>
                    </Box>

                    <Box textAlign="right">
                      <Typography variant="h6">
                        ₹{item.pricePerDay * days}
                      </Typography>

                      <Button
                        color="error"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </Button>
                    </Box>

                  </Box>

                </Paper>
              );
            })}
          </Grid>

          {/* SUMMARY */}
          <Grid item xs={12} md={4}>
            <Paper sx={glassCard}>

              <Typography variant="h6" mb={2}>
                💳 Order Summary
              </Typography>

              <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

              <Typography>
                Items: {cartItems.length}
              </Typography>

              <Typography variant="h5" mt={2} fontWeight="bold">
                Total: ₹{getTotal()}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Button
                fullWidth
                color="error"
                sx={{ mt: 2 }}
                onClick={clearCart}
              >
                Clear Cart
              </Button>

            </Paper>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}

/* 🔥 SAME GLASS STYLE */
const glassCard = {
  p: 3,
  borderRadius: 4,
  mb: 2,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.1)"
};

export default CartPage;