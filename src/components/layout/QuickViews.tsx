import { cameras } from "../../data/cameras";

import styles from "./QuickViews.module.css";

export default function QuickViews() {
  return (
    <div className={styles.quickViews}>
      <div className={styles.quickViewsHeader}>VISTAS RÁPIDAS</div>

      <div className={styles.quickViewsGrid}>
        {cameras.slice(0, 4).map(camera => (
          <div key={camera.id} className={styles.quickCard}>
            <img src={camera.preview} alt={camera.name} />

            <div className={styles.quickCardFooter}>
              <div className={`${styles.quickStatus} ${styles[camera.status]}`} />
              <span>{camera.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
