import { FaVideo } from "react-icons/fa";
import type { Camera } from "../types/Camera";
import { useState } from "react";

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

    const mapCanvas = event.currentTarget.closest(".mapCanvas") as HTMLElement | null;
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
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onClick(camera);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: editMode ? "grab" : "pointer",
        zIndex: 20
      }}
    >
      {hover && !editMode && (
        <div style={{
          position: "absolute",
          left: "45px",
          top: "-20px",
          background: "#111827",
          padding: "8px",
          borderRadius: "8px",
          zIndex: 1000,
          border: "1px solid #334155"
        }}>
          <img src={camera.preview} width={180} style={{ borderRadius: "6px", display: "block" }} />
          <div style={{ color: "white", fontSize: "12px", marginTop: "6px" }}>
            {camera.name}
          </div>
        </div>
      )}

      <div style={{
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        backgroundColor: getColor(),
        animation: camera.status === "alarm" ? "pulse 1s infinite" : undefined,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: editMode ? "2px dashed white" : "2px solid white",
        boxShadow:
          camera.status === "alarm"
            ? "0 0 22px #f59e0b"
            : camera.status === "online"
            ? "0 0 14px #22c55e"
            : "0 0 10px #64748b"
      }}>
        <FaVideo color="white" />
      </div>

      <div className="markerLabel">{camera.name}</div>
    </div>
  );
}