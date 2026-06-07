import {
  Menu,
  MapPin,
  Sun,
  UserCircle
} from "lucide-react";

interface Props {
  online: number;
  alarm: number;
  warning: number;
  offline: number;
}

export default function TopBar({
  online,
  alarm,
  warning,
  offline
}: Props) {
  return (
    <div
      style={{
        height: 72,
        background: "#05070d",
        color: "white",
        display: "grid",
        gridTemplateColumns: "360px 1fr 300px",
        alignItems: "center",
        borderBottom: "1px solid #1e293b",
        padding: "0 16px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button className="iconButton">
          <Menu size={22} />
        </button>

        <div className="logoCircle">
          <MapPin size={26} />
        </div>

        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            PLANTA PISCO
          </div>

          <div style={{ color: "#94a3b8", fontSize: 13 }}>
            Centro de Monitoreo VMS
          </div>
        </div>
      </div>

      <div className="kpiRow">
        <div className="kpiCard online">
          <span>Online</span>
          <strong>{online}</strong>
          <small>cámaras</small>
        </div>

        <div className="kpiCard alarm">
          <span>Alarmas</span>
          <strong>{alarm}</strong>
          <small>activas</small>
        </div>

        <div className="kpiCard warning">
          <span>Advertencias</span>
          <strong>{warning}</strong>
          <small>cámara</small>
        </div>

        <div className="kpiCard offline">
          <span>Offline</span>
          <strong>{offline}</strong>
          <small>cámaras</small>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 20 }}>
        <div style={{ textAlign: "right" }}>
          <div>10:24:35</div>
          <small style={{ color: "#94a3b8" }}>23/05/2026</small>
        </div>

        <Sun size={22} />

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <UserCircle />
          <div>
            <div>Operador</div>
            <small style={{ color: "#94a3b8" }}>operador1</small>
          </div>
        </div>
      </div>
    </div>
  );
}