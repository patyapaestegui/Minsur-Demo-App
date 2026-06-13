import express from "express";
import db from "../config/db.js";

const router = express.Router();

/**
 * Obtener todos los mapas
 */
router.get("/", (req, res) => {
  const maps = db
    .prepare("SELECT * FROM maps ORDER BY id")
    .all();

  res.json(maps);
});

/**
 * Obtener un mapa por ID
 */
router.get("/:id", (req, res) => {
  const map = db
    .prepare("SELECT * FROM maps WHERE id = ?")
    .get(req.params.id);

  if (!map) {
    return res.status(404).json({
      error: "Mapa no encontrado"
    });
  }

  res.json(map);
});

/**
 * Crear mapa
 */
router.post("/", (req, res) => {
  const { name, image } = req.body;

  const result = db
    .prepare(
      `
      INSERT INTO maps
      (name, image)
      VALUES (?, ?)
    `
    )
    .run(name, image);

  res.json({
    ok: true,
    id: result.lastInsertRowid,
    name,
    image
  });
});

/**
 * Actualizar mapa
 */
router.put("/:id", (req, res) => {
  const { name, image, active } = req.body;

  db.prepare(
    `
      UPDATE maps
      SET
        name = ?,
        image = ?,
        active = ?
      WHERE id = ?
    `
  ).run(
    name,
    image,
    active ?? 1,
    req.params.id
  );

  res.json({
    ok: true
  });
});

/**
 * Eliminar mapa
 */
router.delete("/:id", (req, res) => {
  db.prepare(
    `
      DELETE FROM camera_positions
      WHERE map_id = ?
    `
  ).run(req.params.id);

  db.prepare(
    `
      DELETE FROM maps
      WHERE id = ?
    `
  ).run(req.params.id);

  res.json({
    ok: true
  });
});

export default router;