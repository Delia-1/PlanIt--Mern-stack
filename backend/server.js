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

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

// ✅ Fix CSP Issue: Allow API Calls
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:5173 https://plan-it-mern-stack-front.vercel.app https://plan-it-mern-stack-back.vercel.app; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
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
