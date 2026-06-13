import express from "express";
import { getCameras } from "../services/waveService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cameras = await getCameras();
    res.json(cameras);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo cámaras",
      error: error.message
    });
  }
});

export default router;