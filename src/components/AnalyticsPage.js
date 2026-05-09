import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

function AnalyticsPage() {

  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalRentals: 0,
    revenueByVehicle: [],
    monthlyTrend: []
  });

  // ✅ FETCH DATA
  const fetchAnalytics = async () => {
    const res = await fetch("http://localhost:5000/analytics");
    const data = await res.json();

    setAnalytics({
      totalRevenue: Number(data.totalRevenue) || 0,
      totalRentals: Number(data.totalRentals) || 0,
      revenueByVehicle: data.revenueByVehicle || [],
      monthlyTrend: data.monthlyTrend || []
    });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const vehicleData = analytics.revenueByVehicle || [];
  const monthlyData = analytics.monthlyTrend || [];

  const avgPrice =
    analytics.totalRentals > 0
      ? Math.round(analytics.totalRevenue / analytics.totalRentals)
      : 0;

  // CHARTS
  const barOptions = {
    xaxis: {
      categories: vehicleData.map(v => v?.vehicleType || "Other")
    }
  };

  const barSeries = [
    {
      name: "Revenue",
      data: vehicleData.map(v => Number(v?.revenue) || 0)
    }
  ];

  const pieOptions = {
    labels: vehicleData.map(v => v?.vehicleType || "Other")
  };

  const pieSeries = vehicleData.map(v => v?.count || 0);

  const lineOptions = {
    xaxis: {
      categories: monthlyData.map(m => m?.month || "")
    }
  };

  const lineSeries = [
    {
      name: "Revenue",
      data: monthlyData.map(m => Number(m?.revenue) || 0)
    }
  ];

  return (
    <Box sx={{ background: "#f5f7fb", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">

        {/* HEADER */}
        <Typography variant="h4" fontWeight="bold" mb={4}>
          📊 Analytics Dashboard
        </Typography>

        {/* CARDS */}
        <Grid container spacing={3} mb={4}>

          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: "#009688", color: "white" }}>
              <CardContent>
                <Typography>Total Revenue</Typography>
                <Typography variant="h5">₹{analytics.totalRevenue}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: "#4CAF50", color: "white" }}>
              <CardContent>
                <Typography>Total Rentals</Typography>
                <Typography variant="h5">{analytics.totalRentals}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: "#FF9800", color: "white" }}>
              <CardContent>
                <Typography>Avg Price</Typography>
                <Typography variant="h5">₹{avgPrice}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: "#2196F3", color: "white" }}>
              <CardContent>
                <Typography>Avg/Month</Typography>
                <Typography variant="h5">{monthlyData.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* CHARTS */}
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography mb={2}>Revenue by Vehicle</Typography>
                <Chart options={barOptions} series={barSeries} type="bar" height={300} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography mb={2}>Rental Distribution</Typography>
                <Chart options={pieOptions} series={pieSeries} type="donut" height={300} />
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* LINE CHART */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography mb={2}>Monthly Revenue Trend</Typography>
            <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography mb={2}>Vehicle Performance</Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vehicle Type</TableCell>
                    <TableCell>Rentals</TableCell>
                    <TableCell>Revenue</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {vehicleData.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Chip label={v?.vehicleType || "Other"} />
                      </TableCell>
                      <TableCell>{v?.count || 0}</TableCell>
                      <TableCell>₹{Number(v?.revenue) || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

export default AnalyticsPage;