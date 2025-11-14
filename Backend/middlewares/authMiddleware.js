import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");

      // Role-based check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied for this role" });
      }

      req.user = decoded; // store user info in req.user
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
