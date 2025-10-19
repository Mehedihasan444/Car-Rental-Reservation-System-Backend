import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// Parsers - Body parser and cookie parser
app.use(express.json({ limit: "10mb" })); // Add payload size limit for security
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://car-rental-reservation-system-frontend-tau.vercel.app",
      "https://car-rental-reservation-system-frontend-mbc2bxvua.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Car Rental Reservation System API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", router);

// Global error handler
app.use(globalErrorHandler);

// 404 Not Found handler (must be last)
app.use(notFound);

export default app;
