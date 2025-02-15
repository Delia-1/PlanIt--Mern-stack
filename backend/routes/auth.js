import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.get("/check", (req, res) => {
  try {
    const token = req.cookies.token; // JWT stored in HTTP-only cookie
    if (!token) return res.status(401).json({ authenticated: false });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true, userId: verified.id });
  } catch (err) {
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
});


router.post("/register", async (req, res) => {
  try {
    const { username, email, password} = req.body;
    const existingUser = await User.findOne ({email});
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });


    res.json ({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post ("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });

});

export default router;
