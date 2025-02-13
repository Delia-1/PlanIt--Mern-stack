import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Import `todoRoutes` **before** using it
import todoRoutes from './routes/todoRoutes.js';

// ✅ Middleware
app.use(express.json());

// ✅ Fix CORS: Allow Local & Deployed Frontend
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://plan-it-mern-stack-front.vercel.app" // Deployed frontend
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

// ✅ Fix CSP Issue: Allow API Calls
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' https://plan-it-mern-stack-front.vercel.app https://plan-it-mern-stack-back.vercel.app; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});


// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// ✅ Routes (AFTER all middleware)
app.use('/api/todos', todoRoutes);

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
