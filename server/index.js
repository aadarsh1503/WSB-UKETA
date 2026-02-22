import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();

// Middleware
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
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