import express from "express";
import cors from "cors";
import flavorsRoutes from "./routes/flavors.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/api/flavors", flavorsRoutes);

// Servidor
app.listen(4000, () => {
  console.log("Backend funcionando en http://localhost:4000");
});
