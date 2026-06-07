import { useState } from "react";

import plano from "../assets/planta-pisco.jpeg";
import { cameras } from "../data/cameras";
import type { Camera } from "../types/Camera";

import useCameras from "../hooks/useCameras";
import TopBar from "../components/layout/TopBar";
import CameraSidebar from "../components/layout/CameraSidebar";
import MapPanel from "../components/layout/MapPanel";
import RightPanel from "../components/layout/RightPanel";
import BottomStatusBar from "../components/layout/BottomStatusBar.tsx";

export default function Dashboard() {
  const [selectedCamera, setSelectedCamera] = useState<Camera>();

  const { cameras: apiCameras } = useCameras();
  console.log("API Cameras:", apiCameras);

  const online = cameras.filter(c => c.status === "online").length;
  const offline = cameras.filter(c => c.status === "offline").length;
  const alarm = cameras.filter(c => c.status === "alarm").length;
  const warning = cameras.filter(c => c.status === "warning").length;

  const alarms = cameras.filter(c => c.status === "alarm");

  const [filter] =
    useState<"all" | "online" | "offline" | "alarm">("all");

  const filteredCameras =
    filter === "all"
      ? cameras
      : cameras.filter(c => c.status === filter);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#05070d",
        display: "grid",
        gridTemplateRows: "72px 1fr 32px",
        overflow: "hidden"
      }}
    >
      <TopBar
        online={online}
        alarm={alarm}
        warning={warning}
        offline={offline}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 320px",
          gap: 8,
          padding: 8,
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        <CameraSidebar
          cameras={filteredCameras}
          selectedCamera={selectedCamera}
          onSelect={setSelectedCamera}
        />

        <MapPanel
          plano={plano}
          cameras={filteredCameras}
          onSelect={setSelectedCamera}
        />

        <RightPanel
          alarms={alarms}
          selectedCamera={selectedCamera}
        />
      </div>

      <BottomStatusBar />
    </div>
  );
}