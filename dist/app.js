"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "https://car-rental-reservation-system-frontend-mbc2bxvua.vercel.app"], credentials: true }));
// application routes
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Car rental reservation system is running");
});
app.use(globalErrorhandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
