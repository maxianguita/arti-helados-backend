// server.js
import express from "express";
import cors from "cors";
import flavorsRoutes from "./routes/flavors.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Todas las rutas dentro de /api
app.use("/api/auth", authRoutes);
app.use("/api/flavors", flavorsRoutes);

export default app;
