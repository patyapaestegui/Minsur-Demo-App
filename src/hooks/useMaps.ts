import { useEffect, useState } from "react";

export interface MapItem {
  id: number;
  name: string;
  image: string;
  active: number;
}

export default function useMaps() {
  const [maps, setMaps] = useState<MapItem[]>([]);

  const loadMaps = async () => {
    const res = await fetch("http://localhost:3001/api/maps");
    const data = await res.json();
    setMaps(data);
  };

  useEffect(() => {
    loadMaps();
  }, []);

  return {
    maps,
    reloadMaps: loadMaps
  };
}