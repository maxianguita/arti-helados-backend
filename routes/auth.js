import express from "express";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📩 RECIBIDO DESDE POSTMAN:", email, password);

    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const result = await pool.query(query, [email, password]);

    console.log("📦 RESULTADO DE LA DB:", result.rows);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = result.rows[0];

    console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("🔥 ERROR LOGIN:", error);
    res.status(500).json({ error: "Error en el login" });
  }
});

export default router;
