import styles from "./BottomStatusBar.module.css";

export default function BottomStatusBar() {
  return (
    <div className={styles.bottomStatusBar}>
      <span>● Sistema conectado</span>
      <span>Servidor Wave: Pendiente</span>
      <span>Última actualización: hace 5 seg</span>
      <span>Modo: Operación</span>
    </div>
  );
}
