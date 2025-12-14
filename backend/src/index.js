require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const salesRoutes = require('./routes/salesRoutes');

const PORT = process.env.PORT || 4000;

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

//  Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: 'MongoDB Atlas' });
});

//  Routes
app.use('/api/sales', salesRoutes);

//  Error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Start Server first, then connect to DB
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
  // Connect to MongoDB Atlas after server starts
  connectDB().catch(err => {
    console.error('MongoDB connection failed, but server is still running:', err.message);
  });
});
