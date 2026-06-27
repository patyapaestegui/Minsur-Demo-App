import { Search, SlidersHorizontal, Star } from "lucide-react";
import type { Camera } from "../../types/Camera";

import panelStyles from "../../styles/Panel.module.css";
import styles from "./CameraSidebar.module.css";

interface Props {
  cameras: Camera[];
  selectedCamera?: Camera;
  onSelect: (camera: Camera) => void;
}

export default function CameraSidebar({
  cameras,
  selectedCamera,
  onSelect
}: Props) {
  const getStatusColor = (status: Camera["status"]) => {
    if (status === "online") return "#22c55e";
    if (status === "alarm") return "#ef4444";
    if (status === "warning") return "#facc15";
    return "#64748b";
  };

  const getStatusText = (status: Camera["status"]) => {
    if (status === "online") return "Online";
    if (status === "alarm") return "Alarma";
    if (status === "warning") return "Advertencia";
    return "Offline";
  };

  return (
    <div className={`${panelStyles.panel} ${styles.sidePanel}`}>
      <div className={styles.panelHeader}>
        <span>CÁMARAS</span>
        <span>×</span>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <span>Buscar cámara...</span>
        </div>

        <button className={styles.iconButtonSmall}>
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <div>
        {cameras.map((camera, index) => (
          <div
            key={camera.id}
            onClick={() => onSelect(camera)}
            className={
              selectedCamera?.id === camera.id
                ? `${styles.cameraRow} ${styles.selected}`
                : camera.status === "alarm"
                  ? `${styles.cameraRow} ${styles.alarmRow}`
                  : styles.cameraRow
            }
          >
            <div className={styles.cameraNumber}>{index + 1}</div>

            <div
              className={styles.statusDot}
              style={{ background: getStatusColor(camera.status) }}
            />

            <div className={styles.cameraInfo}>
              <div>{camera.name}</div>
              <small style={{ color: getStatusColor(camera.status) }}>
                {getStatusText(camera.status)}
              </small>
            </div>

            <Star size={17} color={camera.status === "alarm" ? "#ef4444" : "#94a3b8"} />
          </div>
        ))}
      </div>

      <div className={styles.sidebarFooter}>
        Total cámaras <strong>{cameras.length}</strong>
      </div>
    </div>
  );
}
