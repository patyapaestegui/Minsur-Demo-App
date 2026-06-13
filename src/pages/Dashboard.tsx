import { useState } from "react";

import plano from "../assets/planta-pisco.jpeg";
import { cameras } from "../data/cameras";
import type { Camera } from "../types/Camera";

import useCameras from "../hooks/useCameras";
import usePositions from "../hooks/usePositions";
import useMaps from "../hooks/useMaps";

import TopBar from "../components/layout/TopBar";
import CameraSidebar from "../components/layout/CameraSidebar";
import MapPanel from "../components/layout/MapPanel";
import RightPanel from "../components/layout/RightPanel";
import BottomStatusBar from "../components/layout/BottomStatusBar";
import WaveSettingsModal from "../components/settings/WaveSettingsModal";

export default function Dashboard() {
  const [selectedCamera, setSelectedCamera] = useState<Camera>();
  const [editMode, setEditMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedMapId, setSelectedMapId] = useState(1);

  const [customPositions, setCustomPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const { cameras: apiCameras, loading, error } = useCameras();
  const { maps, reloadMaps } = useMaps();
  const { positions, reloadPositions } = usePositions(selectedMapId);

  const selectedMap = maps.find(map => map.id === selectedMapId);

    const handleCreateMap = async () => {
    const name = window.prompt("Nombre del nuevo mapa:");
    if (!name) return;

    const res = await fetch("http://localhost:3001/api/maps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        image: "local:planta-pisco"
      })
    });

    const data = await res.json();

    await reloadMaps();

    setSelectedMapId(Number(data.id));
    setSelectedCamera(undefined);
    setCustomPositions({});
  };

  const localCameras: Camera[] = cameras.map(localCamera => {
    const localId = String(localCamera.id);

    const apiCamera = apiCameras.find(
      api => String(api.id) === localId
    );

    const savedPosition = positions.find(
      position => position.camera_id === localId
    );

    const position = customPositions[localId] ?? savedPosition;

    return {
      ...localCamera,
      id: localId,
      name: apiCamera?.name ?? localCamera.name,
      status: apiCamera?.status ?? localCamera.status,
      x: position?.x ?? localCamera.x,
      y: position?.y ?? localCamera.y
    };
  });

    const apiOnlyCameras: Camera[] = apiCameras
    .filter(apiCamera =>
      !cameras.some(
        localCamera =>
          String(localCamera.id) === String(apiCamera.id) ||
          localCamera.name.trim().toLowerCase() ===
            apiCamera.name.trim().toLowerCase()
      )
    )
    .map(apiCamera => {
      const apiId = `api-${apiCamera.id}`;

      const savedPosition = positions.find(
        position => position.camera_id === apiId
      );

      const position = customPositions[apiId] ?? savedPosition;

      return {
        id: apiId,
        waveId: String(apiCamera.id),
        name: apiCamera.name,
        status: apiCamera.status,
        x: position?.x ?? 50,
        y: position?.y ?? 50,
        preview:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640"
      };
    });

  const mergedCameras: Camera[] = [...localCameras, ...apiOnlyCameras];

  const handleMoveCamera = async (camera: Camera, x: number, y: number) => {
    setCustomPositions(prev => ({
      ...prev,
      [String(camera.id)]: { x, y }
    }));

    setSelectedCamera({ ...camera, x, y });

    await fetch("http://localhost:3001/api/positions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mapId: selectedMapId,
        cameraId: String(camera.id),
        x,
        y
      })
    });

    await reloadPositions();
  };

    const online = mergedCameras.filter(c => c.status === "online").length;
  const offline = mergedCameras.filter(c => c.status === "offline").length;
  const alarm = mergedCameras.filter(c => c.status === "alarm").length;
  const warning = mergedCameras.filter(c => c.status === "warning").length;

  const alarms = mergedCameras.filter(c => c.status === "alarm");

  const [filter] = useState<"all" | "online" | "offline" | "alarm">("all");

  const filteredCameras =
    filter === "all"
      ? mergedCameras
      : mergedCameras.filter(c => c.status === filter);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#05070d",
        display: "grid",
        gridTemplateRows: "72px minmax(0, 1fr) 32px",
        overflow: "hidden"
      }}
    >
      <TopBar
        online={online}
        alarm={alarm}
        warning={warning}
        offline={offline}
        editMode={editMode}
        onToggleEdit={() => setEditMode(!editMode)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {loading && (
        <div style={{ position: "absolute", top: 82, left: 300, color: "#94a3b8", zIndex: 1000 }}>
          Cargando cámaras...
        </div>
      )}

      {error && (
        <div style={{ position: "absolute", top: 82, left: 300, color: "#ef4444", zIndex: 1000 }}>
          {error}
        </div>
      )}

            <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px minmax(0, 1fr) 320px",
          gap: 8,
          padding: 8,
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
          minHeight: 0
        }}
      >
        <CameraSidebar
          cameras={filteredCameras}
          selectedCamera={selectedCamera}
          onSelect={setSelectedCamera}
        />

        <MapPanel
  plano={selectedMap?.image?.startsWith("http") ? selectedMap.image : plano}
  mapName={selectedMap?.name || "Planta Pisco"}
  maps={maps}
  selectedMapId={selectedMapId}
  onChangeMap={(id) => {
    setSelectedMapId(id);
    setSelectedCamera(undefined);
    setCustomPositions({});
  }}
  onCreateMap={handleCreateMap}
  cameras={filteredCameras}
  selectedCamera={selectedCamera}
  onSelect={setSelectedCamera}
  editMode={editMode}
  onMoveCamera={handleMoveCamera}
/>

        <RightPanel alarms={alarms} selectedCamera={selectedCamera} />
      </div>

      <WaveSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <BottomStatusBar />
    </div>
  );
}