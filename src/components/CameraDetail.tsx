import type { Camera } from "../types/Camera";

interface Props {
  camera?: Camera;
}

export default function CameraDetail({
  camera
}: Props) {

  if (!camera) {
    return (
      <div style={{ padding: 20 }}>
        Seleccione una cámara
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>

      <h2>{camera.name}</h2>

      <p>
        Estado: {camera.status}
      </p>

      <video // Esto simula el streaming de video, se cambiará mas adelante por la conexion RTSP al WAVE
        autoPlay
        muted
        loop
        controls
        width="100%"
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
      </video>

    </div>
  );
}
