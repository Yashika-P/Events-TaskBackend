
      const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Declare cors only once
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// CORS setup for both local and production
const allowedOrigins = [
    'http://localhost:3000', // Local frontend
    'https://events-frontend-task.netlify.app/', // Replace with your Netlify URL
];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/events', require('./routes/eventRoutes')); // Event management routes
app.use('/api/payments', require('./routes/paymentRoutes')); // Payment processing routes

// Error handling middleware
app.use(notFound); // Handles unknown routes
app.use(errorHandler); // Handles application errors

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
