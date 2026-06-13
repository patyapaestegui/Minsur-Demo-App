import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/:mapId", (req, res) => {
  const positions = db
    .prepare("SELECT * FROM camera_positions WHERE map_id = ?")
    .all(req.params.mapId);

  res.json(positions);
});

router.post("/", (req, res) => {
  const { mapId, cameraId, x, y } = req.body;

  db.prepare(`
    INSERT INTO camera_positions (map_id, camera_id, x, y)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(map_id, camera_id)
    DO UPDATE SET x = excluded.x, y = excluded.y
  `).run(mapId, cameraId, x, y);

  res.json({ ok: true });
});

export default router;