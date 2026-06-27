import type { Camera } from "../../types/Camera";
import CameraDetail from "../CameraDetail";

import panelStyles from "../../styles/Panel.module.css";
import styles from "./RightPanel.module.css";

interface Props {
  alarms: Camera[];
  selectedCamera?: Camera;
}

export default function RightPanel({
  alarms,
  selectedCamera
}: Props) {
  return (
    <div className={`${panelStyles.panel} ${styles.rightPanel}`}>
      <section className={styles.panelSection}>
        <h3>ALARMAS ACTIVAS ({alarms.length})</h3>

        {alarms.map(alarm => (
          <div className={styles.alarmCard} key={alarm.id}>
            <img src={alarm.preview} />

            <div>
              <strong>{alarm.name}</strong>
              <small>Movimiento detectado</small>
              <span>Activa</span>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.panelSection}>
        <h3>CÁMARA SELECCIONADA</h3>
        <CameraDetail camera={selectedCamera} />
      </section>

      <section className={styles.panelSection}>
        <h3>EVENTOS RECIENTES</h3>

        {alarms.map(alarm => (
          <div className={styles.eventCard} key={alarm.id}>
            <div className={styles.eventIcon}>⦿</div>

            <div>
              <div className={styles.eventTime}>10:23:41</div>
              <div className={styles.eventText}>
                Movimiento detectado
              </div>
            </div>

            <div className={styles.eventCamera}>
              {alarm.name}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
