import { useEffect, useState } from "react";

export interface CameraPosition {
  camera_id: string;
  x: number;
  y: number;
}

export default function usePositions(mapId: number) {
  const [positions, setPositions] = useState<CameraPosition[]>([]);

  async function loadPositions() {
    try {
      const res = await fetch(`http://localhost:3001/api/positions/${mapId}`);
      const data = await res.json();

      setPositions(data);
    } catch (error) {
      console.error("Error cargando posiciones:", error);
    }
  }

  useEffect(() => {
    loadPositions();
  }, [mapId]);

  return {
    positions,
    reloadPositions: loadPositions
  };
}