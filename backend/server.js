import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// ✅ Middleware for JSON requests
app.use(express.json());
const PORT = process.env.PORT || 5000;

// ✅ Fix CORS Issue
app.use(cors({
  origin: `https://plan-it-mern-stack-front.vercel.app`,
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `https://plan-it-mern-stack-front.vercel.app`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});


// ✅ Import Routes AFTER Middleware
import todoRoutes from './routes/todoRoutes.js';
console.log("✅ Routes todoRoutes bien chargées");
app.use('/api/todos', todoRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
