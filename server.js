import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/dbConfig/dbConfig.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';
import authRoute from './src/routes/authRoutes.js'
import contacrRoute from './src/routes/contactRoutes.js'
import dns from 'dns';

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/contacts', contacrRoute);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

