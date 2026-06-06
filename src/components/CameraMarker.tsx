import { FaVideo } from "react-icons/fa";
import type { Camera } from "../types/Camera";


interface Props {
  camera: Camera;
  onClick: (camera: Camera) => void;
}

export default function CameraMarker({
  camera,
  onClick
}: Props) {

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
    title={camera.name}
      onClick={() => onClick(camera)}
      style={{
        position: "absolute",
        left: `${camera.x}%`,
        top: `${camera.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 10
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          backgroundColor: getColor(),
          animation:
camera.status==="alarm"
? "pulse 1s infinite"
: undefined,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid white",
          boxShadow: "0 0 8px rgba(0,0,0,0.4)"
        }}
      >
        <FaVideo color="white" />
      </div>
      <div
style={{
position:"absolute",
top:"-40px",
left:"50%",
transform:"translateX(-50%)",
background:"#111",
color:"white",
padding:"4px 8px",
borderRadius:"4px",
fontSize:"12px",
whiteSpace:"nowrap"
}}
>
{camera.name}
</div>
    </div>
  );
}