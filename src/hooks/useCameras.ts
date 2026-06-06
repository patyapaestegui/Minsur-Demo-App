import { useEffect, useState } from "react";

import { loadCameras }
from "../repositories/CameraRepository";

import type { WaveCamera }
from "../services/WaveApiService";

export default function useCameras() {

  const [cameras, setCameras] =
    useState<WaveCamera[]>([]);


 useEffect(() => {

  async function init() {

    const data =
      await loadCameras();

    setCameras(data);

  }

  init();

}, []);

  return {
    cameras
  };

}