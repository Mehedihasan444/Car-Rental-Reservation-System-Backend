import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

// Database connection and server startup
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log("✅ Database connected successfully");

    // Start Express server
    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

// Initialize server
main();

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: Error) => {
  console.error("❌ Unhandled Rejection detected:", reason);
  console.log("🔄 Shutting down server gracefully...");
  
  if (server) {
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  console.error("❌ Uncaught Exception detected:", error);
  console.log("⚠️ Shutting down immediately...");
  process.exit(1);
});

// Graceful shutdown on SIGTERM (for production deployments)
process.on("SIGTERM", () => {
  console.log("⚠️ SIGTERM signal received");
  console.log("🔄 Closing server gracefully...");
  
  if (server) {
    server.close(() => {
      console.log("✅ Server closed");
      mongoose.connection.close(false).then(() => {
        console.log("✅ Database connection closed");
        process.exit(0);
      });
    });
  }
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("\n⚠️ SIGINT signal received (Ctrl+C)");
  console.log("🔄 Closing server gracefully...");
  
  if (server) {
    server.close(() => {
      console.log("✅ Server closed");
      mongoose.connection.close(false).then(() => {
        console.log("✅ Database connection closed");
        process.exit(0);
      });
    });
  } else {
    mongoose.connection.close(false).then(() => {
      console.log("✅ Database connection closed");
      process.exit(0);
    });
  }
});
