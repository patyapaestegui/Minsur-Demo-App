import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WaveSettingsModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    wave_ip: "",
    wave_port: "7001",
    wave_user: "",
    wave_password: ""
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!open) return;

    fetch("http://localhost:3001/api/settings")
      .then(res => res.json())
      .then(data => {
        setForm({
          wave_ip: data.wave_ip ?? "",
          wave_port: data.wave_port ?? "7001",
          wave_user: data.wave_user ?? "",
          wave_password: data.wave_password ?? ""
        });
      });
  }, [open]);

  if (!open) return null;

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    await fetch("http://localhost:3001/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setStatus("Configuración guardada correctamente");
  };

  const testConnection = async () => {
    const res = await fetch("http://localhost:3001/api/settings/test-wave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setStatus(data.message);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
    boxSizing: "border-box" as const
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      zIndex: 5000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: 460,
        background: "#0f172a",
        color: "white",
        borderRadius: 16,
        padding: 24,
        border: "1px solid #334155"
      }}>
        <h2
  style={{
    marginTop: 0,
    marginBottom: 20,
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: 600
  }}
>
  Configuración Wave
</h2>





        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label>IP / Host</label>
            <input style={inputStyle} value={form.wave_ip} onChange={e => update("wave_ip", e.target.value)} />
          </div>

          <div>
            <label>Puerto</label>
            <input style={inputStyle} value={form.wave_port} onChange={e => update("wave_port", e.target.value)} />
          </div>

          <div>
            <label>Usuario</label>
            <input style={inputStyle} value={form.wave_user} onChange={e => update("wave_user", e.target.value)} />
          </div>

          <div>
            <label>Contraseña</label>
            <input style={inputStyle} type="password" value={form.wave_password} onChange={e => update("wave_password", e.target.value)} />
          </div>
        </div>

        {status && (
          <p style={{ color: "#93c5fd" }}>{status}</p>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button onClick={testConnection}>Probar</button>
          <button onClick={save}>Guardar</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}