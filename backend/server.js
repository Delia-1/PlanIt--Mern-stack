import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// ✅ Middleware for JSON requests
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
// app.use(cors())


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


// origin: `http://localhost:5173`,
// res.header("Access-Control-Allow-Origin", `http://localhost:5173`);

// origin: `https://plan-it-mern-stack-front.vercel.app`,
// res.header("Access-Control-Allow-Origin", `https://plan-it-mern-stack-front.vercel.app`);



// ✅ Import Routes AFTER Middleware
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/auth.js';


app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

// ✅ Debug: Log all routes
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✅ Route available: ${r.route.path}`);
  }
});

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
