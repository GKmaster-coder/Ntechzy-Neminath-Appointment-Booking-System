// middlewares/error.middleware.js
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json(new ApiResponse(err.statusCode || 500, null, err.message));
  }

  // Mongoose duplicate key
  if (err.code && err.code === 11000) {
    const message = "Duplicate field value entered";
    return res.status(409).json(new ApiResponse(409, null, message));
  }

  // Validation error (from express-validator)
  if (err.array) {
    return res.status(422).json(new ApiResponse(422, null, "Validation failed"));
  }

  // default
  res.status(500).json(new ApiResponse(500, null, "Server Error"));
};

export { errorHandler };
