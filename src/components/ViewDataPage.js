import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid
} from '@mui/material';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ViewDataPage({ customers = [], rentals = [] }) {

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === parseInt(customerId));
    return customer ? customer.name : 'Unknown';
  };

  const totalRevenue = (rentals || []).reduce(
    (sum, r) => sum + (r.pricePerDay || 0),
    0
  );

  return (
    <Container maxWidth="lg">

      <Box sx={{ mt: 4 }}>

        {/* 🔥 HEADER */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          📂 Data Overview
        </Typography>

        {/* 🔥 SUMMARY CARDS */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#eef2ff", borderRadius: 3 }}>
              <CardContent>
                <Typography>Total Customers</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {customers?.length || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#ecfdf5", borderRadius: 3 }}>
              <CardContent>
                <Typography>Total Rentals</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {rentals?.length || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "#fff7ed", borderRadius: 3 }}>
              <CardContent>
                <Typography>Total Revenue</Typography>
                <Typography variant="h4" fontWeight="bold">
                  ₹{totalRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* 🔥 TABS */}
        <Paper sx={{ borderRadius: 3 }}>

          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={`Customers (${customers?.length || 0})`} />
            <Tab label={`Rentals (${rentals?.length || 0})`} />
          </Tabs>

          {/* 👤 CUSTOMERS */}
          <TabPanel value={tabValue} index={0}>
            {customers?.length === 0 ? (
              <Typography>No customers found</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers.map((c) => (
                      <TableRow key={c.id} hover>
                        <TableCell>{c.id}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.phone}</TableCell>
                        <TableCell>{c.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* 🚗 RENTALS */}
          <TabPanel value={tabValue} index={1}>
            {rentals?.length === 0 ? (
              <Typography>No rentals found</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Vehicle</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Start</TableCell>
                      <TableCell>End</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rentals.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell>{r.id}</TableCell>
                        <TableCell>{getCustomerName(r.customerId)}</TableCell>
                        <TableCell>{r.vehicleName}</TableCell>
                        <TableCell>{r.vehicleType}</TableCell>
                        <TableCell>
                          {new Date(r.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(r.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>₹{r.pricePerDay}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

        </Paper>

      </Box>
    </Container>
  );
}

export default ViewDataPage;