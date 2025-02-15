import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // ✅ Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
