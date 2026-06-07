import type { Camera } from "../../types/Camera";
import CameraDetail from "../CameraDetail";

interface Props {
  alarms: Camera[];
  selectedCamera?: Camera;
}

export default function RightPanel({
  alarms,
  selectedCamera
}: Props) {
  return (
    <div className="rightPanel">
      <section className="panelSection">
        <h3>ALARMAS ACTIVAS ({alarms.length})</h3>

        {alarms.map(alarm => (
          <div className="alarmCard" key={alarm.id}>
            <img src={alarm.preview} />

            <div>
              <strong>{alarm.name}</strong>
              <small>Movimiento detectado</small>
              <span>Activa</span>
            </div>
          </div>
        ))}
      </section>

      <section className="panelSection">
        <h3>CÁMARA SELECCIONADA</h3>
        <CameraDetail camera={selectedCamera} />
      </section>

      <section className="panelSection">
        <h3>EVENTOS RECIENTES</h3>

        {alarms.map(alarm => (
          <div className="eventCard" key={alarm.id}>
            <div className="eventIcon">⦿</div>

            <div>
              <div className="eventTime">10:23:41</div>
              <div className="eventText">
                Movimiento detectado
              </div>
            </div>

            <div className="eventCamera">
              {alarm.name}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}