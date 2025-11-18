import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET — obtener todos los sabores activos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM flavors WHERE active = TRUE ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo sabores" });
  }
});

// POST — agregar un nuevo sabor
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Nombre requerido" });

  try {
    const result = await pool.query(
      "INSERT INTO flavors (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error agregando sabor" });
  }
});

// DELETE — eliminar un sabor
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM flavors WHERE id = $1", [req.params.id]);
    res.json({ message: "Sabor eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando sabor" });
  }
});

export default router;
