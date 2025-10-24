import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app =express({
    origin: true,
  credentials: true
});

app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

// routes
app.use("/api/auth", authRoutes);


// health
app.get("/", (req, res) => res.send("Auth API is running"));

// error handler (must be after routes)
app.use(errorHandler);

export {app};