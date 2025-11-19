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

app.use("/auth", authRoutes);
app.use("/api/flavors", flavorsRoutes);

// NO hacer app.listen() aquí
export default app;
