const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, getDbStatus } = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB (or fallback gracefully to In-Memory resilient store)
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Health Check & System Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'UNFAZED Therapist Practice Management Platform',
    version: '1.0.0',
    database: getDbStatus(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` UNFAZED Backend API Server running on port ${PORT}`);
  console.log(` Health check: http://127.0.0.1:${PORT}/api/health`);
  console.log(`=======================================================`);
});
