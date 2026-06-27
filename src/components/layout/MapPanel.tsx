import { useRef, useState } from "react";

import type { Camera } from "../../types/Camera";
import CameraMarker from "../CameraMarker";
import MapViewer from "../MapViewer";
import QuickViews from "./QuickViews";

import panelStyles from "../../styles/Panel.module.css";
import styles from "./MapPanel.module.css";

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
  const panelRef = useRef<HTMLDivElement>(null);

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
    const element = panelRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={panelRef} className={`${panelStyles.panel} ${styles.mapPanel}`}>
      <div className={styles.mapHeader}>
        <div>
          <div className={styles.mapTitle}>
            MAPA INTERACTIVO
          </div>
          <div className={styles.mapSubtitle}>
            {mapName}
          </div>
        </div>

        <div className={styles.mapControls}>
          <select
            className={styles.mapSelect}
            value={selectedMapId}
            onChange={e => onChangeMap(Number(e.target.value))}
          >
            {maps.map(map => (
              <option key={map.id} value={map.id}>
                {map.name}
              </option>
            ))}
          </select>

          <button onClick={onCreateMap}>+ Nuevo mapa</button>

          <span
            className={styles.statusLabel}
            style={{ color: editMode ? "#f59e0b" : "#22c55e" }}
          >
            ● {editMode ? "Modo edición" : "Sistema operativo"}
          </span>
        </div>
      </div>

      <div className={styles.mapBody}>
        <MapViewer>
          <div
            className={styles.mapCanvas}
            data-map-canvas
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
            <img src={plano} alt="Plano" className={styles.mapImage} />
            <div className={styles.mapDarkOverlay} />

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

        <div className={styles.mapFloatingTools}>
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
