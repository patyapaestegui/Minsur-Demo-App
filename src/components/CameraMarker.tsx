import { FaVideo } from "react-icons/fa";
import type { Camera } from "../types/Camera";
import { useState } from "react";

interface Props {
  camera: Camera;
  onClick: (camera: Camera) => void;
}

export default function CameraMarker({ camera, onClick }: Props) {
  const [hover, setHover] = useState(false);

  const getColor = () => {
    switch (camera.status) {
      case "online":
        return "#16a34a";
      case "offline":
        return "#dc2626";
      case "alarm":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${camera.x}%`,
        top: `${camera.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 10
      }}
      onClick={() => onClick(camera)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div
          style={{
            position: "absolute",
            left: "45px",
            top: "-20px",
            background: "#111827",
            padding: "8px",
            borderRadius: "8px",
            zIndex: 1000,
            border: "1px solid #334155"
          }}
        >
          <img
            src={camera.preview}
            width={180}
            style={{
              borderRadius: "6px",
              display: "block"
            }}
          />

          <div
            style={{
              color: "white",
              fontSize: "12px",
              marginTop: "6px"
            }}
          >
            {camera.name}
          </div>
        </div>
      )}

      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          backgroundColor: getColor(),
          animation:
            camera.status === "alarm"
              ? "pulse 1s infinite"
              : undefined,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid white",
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

      <div className="markerLabel">
        {camera.name}
      </div>
    </div>
  );
}