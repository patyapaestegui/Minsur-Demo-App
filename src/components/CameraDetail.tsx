import { Camera, Maximize2 } from "lucide-react";
import type { Camera as CameraType } from "../types/Camera";

import styles from "./CameraDetail.module.css";

interface Props {
  camera?: CameraType;
}

export default function CameraDetail({ camera }: Props) {
  if (!camera) {
    return (
      <div className={styles.cameraDetailEmpty}>
        Seleccione una cámara
      </div>
    );
  }

  return (
    <div className={styles.cameraDetailCard}>
      <h2>{camera.name}</h2>
      <span className={styles.cameraStatusText}>
        {camera.status.toUpperCase()}
      </span>

      <div className={styles.videoFrame}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          controls
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className={styles.cameraSelectedFooter}>
        <div className={styles.selectedCameraName}>
          <span className={styles.greenDot} />
          {camera.name}
        </div>

        <div className={styles.streamControls}>
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
