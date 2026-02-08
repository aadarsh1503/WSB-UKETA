import express from 'express';
import dotenv from 'dotenv';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/applications', applicationRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('UK EETA Email Service is Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});