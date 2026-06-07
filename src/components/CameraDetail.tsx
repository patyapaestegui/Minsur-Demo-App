import { Camera, Maximize2 } from "lucide-react";
import type { Camera as CameraType } from "../types/Camera";

interface Props {
  camera?: CameraType;
}

export default function CameraDetail({ camera }: Props) {
  if (!camera) {
    return (
      <div className="cameraDetailEmpty">
        Seleccione una cámara
      </div>
    );
  }

  return (
    <div className="cameraDetailCard">
      <h2>{camera.name}</h2>
      <span className="cameraStatusText">
        {camera.status.toUpperCase()}
      </span>

      <div className="videoFrame">
        <video
          autoPlay
          muted
          loop
          controls
          style={{
            width: "100%",
            height: "170px",
            objectFit: "cover",
            display: "block"
          }}
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="cameraSelectedFooter">
        <div className="selectedCameraName">
          <span className="greenDot" />
          {camera.name}
        </div>

        <div className="streamControls">
          <select>
            <option>Stream principal (WebRTC)</option>
            <option>Stream secundario</option>
          </select>

          <button>
            <Maximize2 size={16} />
          </button>

          <button>
            <Camera size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}