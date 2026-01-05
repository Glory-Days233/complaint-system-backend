require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

const authRoutes = require('./src/routes/authRoutes');
const complaintRoutes = require('./src/routes/complaintRoutes');

const app = express();

// Middleware
app.use(cors());
// Capture raw body for debugging malformed JSON requests
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      req.rawBody = buf && buf.toString();
    } catch (e) {
      req.rawBody = undefined;
    }
  },
}));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (req && req.rawBody) {
    console.error('Raw request body (for debugging):', req.rawBody);
  }
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
