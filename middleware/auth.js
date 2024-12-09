const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or user does not exist" });
    }
    req.user = {
      id: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
