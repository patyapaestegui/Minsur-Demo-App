import { useEffect, useState } from "react";

export interface WaveCamera {
  id: string;
  name: string;
  status: "online" | "offline" | "alarm" | "warning";
}

export default function useCameras() {
  const [cameras, setCameras] = useState<WaveCamera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCameras() {
    try {
      const response = await fetch("http://localhost:3001/api/cameras");

      if (!response.ok) {
        throw new Error("Error al obtener cámaras");
      }

      const data = await response.json();
      setCameras(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCameras();

    const interval = setInterval(() => {
      loadCameras();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    cameras,
    loading,
    error
  };
}