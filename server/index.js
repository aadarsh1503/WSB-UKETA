import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Configure this to your frontend URL in production
app.use(express.json());

// Routes
app.use('/api/applications', applicationRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('UK ETA Email Service is Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});