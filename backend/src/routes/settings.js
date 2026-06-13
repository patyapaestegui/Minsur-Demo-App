import express from "express";
import db from "../config/db.js";

const router = express.Router();

/**
 * Obtener configuración
 */
router.get("/", (req, res) => {
  const row = db
    .prepare("SELECT * FROM app_settings WHERE id = 1")
    .get();

  if (!row) {
    return res.json({
      id: 1,
      wave_ip: "",
      wave_port: "7001",
      wave_user: "",
      wave_password: ""
    });
  }

  res.json(row);
});

/**
 * Guardar configuración
 */
router.post("/", (req, res) => {
  const {
    wave_ip,
    wave_port,
    wave_user,
    wave_password
  } = req.body;

  db.prepare(`
    INSERT INTO app_settings
      (id, wave_ip, wave_port, wave_user, wave_password, updated_at)
    VALUES
      (1, ?, ?, ?, ?, CURRENT_TIMESTAMP)

    ON CONFLICT(id)
    DO UPDATE SET
      wave_ip = excluded.wave_ip,
      wave_port = excluded.wave_port,
      wave_user = excluded.wave_user,
      wave_password = excluded.wave_password,
      updated_at = CURRENT_TIMESTAMP
  `).run(
    wave_ip,
    wave_port,
    wave_user,
    wave_password
  );

  res.json({
    ok: true
  });
});

/**
 * Probar conexión (placeholder)
 */
router.post("/test-wave", async (req, res) => {
  const {
    wave_ip,
    wave_port
  } = req.body;

  // Por ahora solo valida que haya datos.
  // Luego aquí conectaremos realmente a Wave.

  if (!wave_ip) {
    return res.status(400).json({
      ok: false,
      message: "Debe indicar una IP"
    });
  }

  res.json({
    ok: true,
    message: `Configuración válida (${wave_ip}:${wave_port})`
  });
});

export default router;