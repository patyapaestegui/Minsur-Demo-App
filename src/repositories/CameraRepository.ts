import WaveApiService
from "../services/WaveApiService"

const wave =
new WaveApiService()

export async function
loadCameras() {

  const cameras =
    await wave.getCameras()

  console.log(
    "REPOSITORY CAMERAS:",
    cameras
  )

  return cameras

}