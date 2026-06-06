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

      <img
        src={camera.preview}
        alt={camera.name}
        style={{
          width: "100%",
          borderRadius: "8px"
        }}
      />

    </div>
  );
}
