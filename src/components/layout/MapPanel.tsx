import { useRef, useState } from "react";

import type { Camera } from "../../types/Camera";
import CameraMarker from "../CameraMarker";
import MapViewer from "../MapViewer";
import QuickViews from "./QuickViews";

interface MapItem {
  id: number;
  name: string;
}

interface Props {
  plano: string;
  cameras: Camera[];
  selectedCamera?: Camera;
  mapName?: string;
  maps: MapItem[];
  selectedMapId: number;
  onChangeMap: (id: number) => void;
  onCreateMap: () => void;
  onSelect: (camera: Camera) => void;
  editMode: boolean;
  onMoveCamera: (camera: Camera, x: number, y: number) => void;
}

export default function MapPanel({
  plano,
  cameras,
  selectedCamera,
  mapName = "Planta Pisco",
  maps,
  selectedMapId,
  onChangeMap,
  onCreateMap,
  onSelect,
  editMode,
  onMoveCamera
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const movedRef = useRef(false);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    if (!editMode || !selectedCamera) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    onMoveCamera(selectedCamera, x, y);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    setZoom(prev => {
      const next = event.deltaY < 0 ? prev + 0.1 : prev - 0.1;
      return Math.max(0.5, Math.min(3, next));
    });
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;

    event.preventDefault();
    setDragging(true);

    let lastX = event.clientX;
    let lastY = event.clientY;

    const handleMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - lastX;
      const dy = moveEvent.clientY - lastY;

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        movedRef.current = true;
      }

      setPan(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));

      lastX = moveEvent.clientX;
      lastY = moveEvent.clientY;
    };

    const handleUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    const element = document.querySelector(".mapPanel") as HTMLElement | null;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="mapPanel">
      <div className="mapHeader">
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            MAPA INTERACTIVO
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
            {mapName}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={selectedMapId}
            onChange={e => onChangeMap(Number(e.target.value))}
            style={{
              background: "#020617",
              color: "white",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "6px 10px"
            }}
          >
            {maps.map(map => (
              <option key={map.id} value={map.id}>
                {map.name}
              </option>
            ))}
          </select>

          <button onClick={onCreateMap}>+ Nuevo mapa</button>

          <span style={{ color: editMode ? "#f59e0b" : "#22c55e", fontSize: 13 }}>
            ● {editMode ? "Modo edición" : "Sistema operativo"}
          </span>
        </div>
      </div>

      <div className="mapBody">
        <MapViewer>
          <div
            className="mapCanvas"
            onClick={handleMapClick}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default",
              transition: dragging ? "none" : "transform 0.08s ease",
              margin: "auto"
            }}
          >
            <img src={plano} alt="Plano" className="mapImage" />
            <div className="mapDarkOverlay" />

            {cameras.map(camera => (
              <CameraMarker
                key={`${camera.id}-${camera.name}`}
                camera={camera}
                onClick={onSelect}
                editMode={editMode}
                onMove={onMoveCamera}
              />
            ))}
          </div>
        </MapViewer>

        <div className="mapFloatingTools">
          <button onClick={e => { e.stopPropagation(); setZoom(z => Math.min(z + 0.1, 3)); }}>+</button>
          <button onClick={e => { e.stopPropagation(); setZoom(z => Math.max(z - 0.1, 0.5)); }}>−</button>
          <button onClick={e => { e.stopPropagation(); toggleFullscreen(); }}>⛶</button>
          <button onClick={e => { e.stopPropagation(); resetView(); }}>◎</button>
        </div>
      </div>

      <QuickViews />
    </div>
  );
}