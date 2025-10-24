// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) return next(new ApiError(401, "Not authorized, token missing"));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach to request
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return next(new ApiError(401, "Not authorized, token invalid or expired"));
  }
};

export { protect };
