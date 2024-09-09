import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://car-rental-reservation-system-frontend-tau.vercel.app",
      "https://car-rental-reservation-system-frontend-mbc2bxvua.vercel.app",
    ],
    credentials: true,
  })
);

// application routes
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Car rental reservation system is running");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
