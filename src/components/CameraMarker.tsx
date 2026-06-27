import { FaVideo } from "react-icons/fa";
import type { Camera } from "../types/Camera";
import { useState } from "react";

import styles from "./CameraMarker.module.css";

interface Props {
  camera: Camera;
  onClick: (camera: Camera) => void;
  editMode: boolean;
  onMove: (camera: Camera, x: number, y: number) => void;
}

export default function CameraMarker({ camera, onClick, editMode, onMove }: Props) {
  const [hover, setHover] = useState(false);
  const [tempPosition, setTempPosition] = useState<{ x: number; y: number } | null>(null);

  const position = tempPosition ?? { x: camera.x, y: camera.y };

  const getColor = () => {
    switch (camera.status) {
      case "online": return "#16a34a";
      case "offline": return "#dc2626";
      case "alarm": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) return;

    event.preventDefault();
    event.stopPropagation();

    const mapCanvas = event.currentTarget.closest("[data-map-canvas]") as HTMLElement | null;
    if (!mapCanvas) return;

    let finalX = camera.x;
    let finalY = camera.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = mapCanvas.getBoundingClientRect();

      const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;

      finalX = Math.max(0, Math.min(100, x));
      finalY = Math.max(0, Math.min(100, y));

      setTempPosition({ x: finalX, y: finalY });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      onMove(camera, finalX, finalY);

      setTimeout(() => {
        setTempPosition(null);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={styles.markerRoot}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onClick(camera);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        cursor: editMode ? "grab" : "pointer"
      }}
    >
      {hover && !editMode && (
        <div className={styles.hoverPreview}>
          <img
            className={styles.previewImage}
            src={camera.preview}
            width={180}
          />
          <div className={styles.previewName}>
            {camera.name}
          </div>
        </div>
      )}

      <div
        className={`${styles.markerIcon} ${camera.status === "alarm" ? styles.alarm : ""}`}
        style={{
        backgroundColor: getColor(),
        border: editMode ? "2px dashed white" : "2px solid white",
        boxShadow:
          camera.status === "alarm"
            ? "0 0 22px #f59e0b"
            : camera.status === "online"
            ? "0 0 14px #22c55e"
            : "0 0 10px #64748b"
        }}
      >
        <FaVideo color="white" />
      </div>

      <div className={styles.markerLabel}>{camera.name}</div>
    </div>
  );
}
