import React, { useState, useMemo } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
} from '@mui/material';

import { useCart } from '../context/CartContext';
import { useVehicles } from '../context/VehicleContext';
import { useNavigate } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function BrowseRentalsPage() {

  const navigate = useNavigate();

  const { addToCart } = useCart();
  const {
    getFilteredVehicles,
    getVariantsForVehicle,
    getVehicleTypes,
    getBrands,
    getFuelTypes,
    getColorsForType,
    filters,
    setFilters,
  } = useVehicles();

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });
  const [expandFilters, setExpandFilters] = useState(false);

  const filteredVehicles = getFilteredVehicles();
  const vehicleTypes = getVehicleTypes();
  const brands = getBrands();
  const fuelTypes = getFuelTypes();
  const availableColors = getColorsForType(filters.type);

  const handleOpenDialog = (vehicle) => {
    const variants = getVariantsForVehicle(vehicle.id);
    setSelectedVehicle(vehicle);
    setSelectedVariant(variants.length > 0 ? variants[0] : null);
    setDates({ startDate: '', endDate: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVehicle(null);
    setSelectedVariant(null);
  };

  // 🔥 UPDATED ADD TO CART (LOGIN CHECK ADDED)
  const handleAddToCart = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    // 🚨 LOGIN REQUIRED
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!dates.startDate || !dates.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    if (new Date(dates.endDate) <= new Date(dates.startDate)) {
      alert('End date must be after start date');
      return;
    }

    if (!selectedVariant) {
      alert('Please select a vehicle variant');
      return;
    }

    addToCart(selectedVehicle, selectedVariant, dates.startDate, dates.endDate);

    alert(`${selectedVehicle.name} added to cart!`);
    handleCloseDialog();
  };

  // Calculate rental days and price
  const rentalDays = useMemo(() => {
    if (!dates.startDate || !dates.endDate) return 0;
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [dates]);

  const totalPrice = useMemo(() => {
    if (!selectedVariant || rentalDays === 0) return 0;
    return selectedVariant.pricePerDay * rentalDays;
  }, [selectedVariant, rentalDays]);

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const clearFilters = () => {
    setFilters({ type: '', brand: '', fuelType: '', color: '' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
            sx={{ color: '#1a1a1a' }}
          >
            🚗 Browse Our Vehicle Fleet
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Choose from our wide selection of quality vehicles for your rental needs
          </Typography>
        </Box>

        {/* VEHICLES GRID */}
        <Grid container spacing={3}>
          {filteredVehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Vehicle Image */}
                <Box
                  component="img"
                  src={vehicle.image}
                  alt={vehicle.name}
                  sx={{
                    height: 220,
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />

                <CardContent sx={{ pb: 1 }}>
                  {/* Category Badge */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip
                      label={vehicle.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>

                  {/* Vehicle Name */}
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {vehicle.name}
                  </Typography>

                  {/* Brand */}
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {vehicle.brand}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  {/* Price */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Base Price
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: '#059669' }}
                      >
                        ₹{Math.round(vehicle.basePricePerDay)}/day
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                {/* Action Button */}
                <Box sx={{ p: 2, pt: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleOpenDialog(vehicle)}
                    sx={{
                      background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #047857 0%, #0e7490 100%)',
                      },
                      borderRadius: '8px',
                      py: 1.2,
                      fontWeight: 'bold',
                    }}
                  >
                    Reserve
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* RESERVE DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)',
          },
        }}
      >
        {selectedVehicle && (
          <>
            {/* Dialog Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                color: 'white',
                p: 3,
              }}
            >
              <DialogTitle
                sx={{
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: '1.5rem',
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 32 }} />
                Reserve {selectedVehicle.name}
              </DialogTitle>
            </Box>

            <DialogContent sx={{ pt: 3 }}>
              {/* Vehicle Details Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#1a1a1a' }}>
                  Vehicle Details
                </Typography>

                {/* Brand, Type, Category Grid */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1.5, background: '#f5f5f5', borderRadius: '8px' }}>
                      <Typography variant="caption" color="textSecondary">
                        Brand
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {selectedVehicle.brand}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1.5, background: '#f5f5f5', borderRadius: '8px' }}>
                      <Typography variant="caption" color="textSecondary">
                        Type
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {selectedVehicle.type}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} sx={{ p: 1.5, background: '#f5f5f5', borderRadius: '8px' }}>
                      <Typography variant="caption" color="textSecondary">
                        Category
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {selectedVehicle.category}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Variant Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#1a1a1a' }}>
                  Select Variant
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={selectedVariant?.name || ''}
                    onChange={(e) => {
                      const variant = getVariantsForVehicle(selectedVehicle.id).find(
                        (v) => v.name === e.target.value
                      );
                      setSelectedVariant(variant);
                    }}
                    sx={{
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  >
                    {getVariantsForVehicle(selectedVehicle.id).map((variant) => (
                      <MenuItem key={variant.name} value={variant.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                          <span>{variant.name}</span>
                          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                            <Chip label={`₹${variant.pricePerDay}/day`} size="small" color="primary" variant="outlined" />
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Variant Details */}
                {selectedVariant && (
                  <Box sx={{ mt: 2, p: 2, background: '#f0fdf4', borderRadius: '8px', border: '1px solid #86efac' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocalGasStationIcon sx={{ color: '#059669' }} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Fuel Type
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {selectedVariant.fuelType}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ColorLensIcon sx={{ color: '#059669' }} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Color
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {selectedVariant.color}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Rental Dates */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: '#1a1a1a' }}>
                  Rental Dates
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarTodayIcon sx={{ color: '#059669' }} />
                  <Typography variant="body2" color="textSecondary">
                    Start Date
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  type="date"
                  value={dates.startDate}
                  onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
                  }}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarTodayIcon sx={{ color: '#0891b2' }} />
                  <Typography variant="body2" color="textSecondary">
                    End Date
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  type="date"
                  value={dates.endDate}
                  onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: dates.startDate || new Date().toISOString().split('T')[0],
                  }}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Price Breakdown */}
              {rentalDays > 0 && selectedVariant && (
                <Box sx={{ mb: 3, p: 2, background: '#fef3c7', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="body2">
                        ₹{selectedVariant.pricePerDay} × {rentalDays} days
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight="bold">
                        ₹{selectedVariant.pricePerDay * rentalDays}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#059669' }}>
                        Total
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#059669' }}>
                        ₹{totalPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </DialogContent>

            {/* Dialog Footer */}
            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  borderRadius: '8px',
                  px: 3,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  background: 'linear-gradient(135deg, #059669 0%, #0891b2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #047857 0%, #0e7490 100%)',
                  },
                  borderRadius: '8px',
                  px: 3,
                  fontWeight: 'bold',
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default BrowseRentalsPage;