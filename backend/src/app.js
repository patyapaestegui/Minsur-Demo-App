import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import camerasRouter from "./routes/cameras.js";
import mapsRouter from "./routes/maps.js";
import positionsRouter from "./routes/positions.js";
import settingsRouter from "./routes/settings.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Backend activo" });
});

app.use("/api/cameras", camerasRouter);
app.use("/api/maps", mapsRouter);
app.use("/api/positions", positionsRouter);
app.use("/api/settings", settingsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});