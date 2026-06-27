import {
  Menu,
  MapPin,
  Sun,
  UserCircle,
  Settings,
  Edit3
} from "lucide-react";

import styles from "./TopBar.module.css";

interface Props {
  online: number;
  alarm: number;
  warning: number;
  offline: number;
  editMode: boolean;
  onToggleEdit: () => void;
  onOpenSettings: () => void;
}

export default function TopBar({
  online,
  alarm,
  warning,
  offline,
  editMode,
  onToggleEdit,
  onOpenSettings
}: Props) {
  return (
    <div className={styles.topBar}>
      <div className={styles.brandGroup}>
        <button className={styles.iconButton}>
          <Menu size={22} />
        </button>

        <div className={styles.logoCircle}>
          <MapPin size={26} />
        </div>

        <div>
          <div className={styles.brandTitle}>PLANTA PISCO</div>
          <div className={styles.brandSubtitle}>
            Centro de Monitoreo VMS
          </div>
        </div>
      </div>

      <div className={styles.kpiRow}>
        <div className={`${styles.kpiCard} ${styles.online}`}><span>Online</span><strong>{online}</strong><small>cámaras</small></div>
        <div className={`${styles.kpiCard} ${styles.alarm}`}><span>Alarmas</span><strong>{alarm}</strong><small>activas</small></div>
        <div className={`${styles.kpiCard} ${styles.warning}`}><span>Advertencias</span><strong>{warning}</strong><small>cámara</small></div>
        <div className={`${styles.kpiCard} ${styles.offline}`}><span>Offline</span><strong>{offline}</strong><small>cámaras</small></div>
      </div>

      <div className={styles.actions}>
        <button className={styles.mapButton} onClick={onToggleEdit}>
          <Edit3 size={15} />
          {editMode ? "Salir edición" : "Editar"}
        </button>

        <button className={styles.mapButton} onClick={onOpenSettings}>
          <Settings size={15} />
          Configuración
        </button>

        <Sun size={22} />

        <div className={styles.operator}>
          <UserCircle />
          <div>
            <div>Operador</div>
            <small className={styles.operatorName}>operador1</small>
          </div>
        </div>
      </div>
    </div>
  );
}
