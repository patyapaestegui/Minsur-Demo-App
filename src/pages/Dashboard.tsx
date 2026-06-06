import { useState } from "react";

import plano from "../assets/planta-pisco.jpeg";

import { cameras } from "../data/cameras";

import type { Camera } from "../types/Camera";

import CameraMarker from "../components/CameraMarker";

import CameraDetail from "../components/CameraDetail";
import MapViewer from "../components/MapViewer";
import useCameras from "../hooks/useCameras";

export default function Dashboard() {

  const [selectedCamera, setSelectedCamera] =
    useState<Camera>();
  const { cameras: apiCameras } = useCameras();

  console.log("API Cameras:", apiCameras);
  const online =
    cameras.filter(
      c => c.status === "online"
    ).length

  const offline =
    cameras.filter(
      c => c.status === "offline"
    ).length

  const alarm =
    cameras.filter(
      c => c.status === "alarm"
    ).length

  const alarms =
    cameras.filter(
      c => c.status === "alarm"
    );

  const [filter, setFilter] = useState<
    "all" |
    "online" |
    "offline" |
    "alarm"
  >("all");

  const filteredCameras =
    filter === "all"
      ? cameras
      : cameras.filter(
        c => c.status === filter
      );

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr 350px",
        height: "100vh"
      }}
    >

      {/* LISTADO */}

      <div
        style={{

          borderRight: "1px solid #ddd",
          overflowY: "auto"
        }}
      >

        <h2 style={{ padding: 15 }}>
          Cámaras
        </h2>

        <div
          style={{
            padding: 15,
            background: "#111111",
            color: "white"
          }}
        >

          🟢 {online}

          🔴 {offline}

          🚨 {alarm}

        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            padding: 10
          }}
        >

          <button
            onClick={() => setFilter("all")}
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("online")}
          >
            Online
          </button>

          <button
            onClick={() => setFilter("offline")}
          >
            Offline
          </button>

          <button
            onClick={() => setFilter("alarm")}
          >
            Alarmas
          </button>

        </div>

        {filteredCameras.map(camera => (

          <div
            key={camera.id}
            onClick={() => setSelectedCamera(camera)}
            style={{
              padding: 15,
              cursor: "pointer",
              borderBottom: "1px solid #eee"
            }}
          >
            {camera.name}
          </div>

        ))}

      </div>

      {/* MAPA */}

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <MapViewer>

          <div
            style={{
              position: "relative",
              display: "inline-block"
            }}
          >

            <img
              src={plano}
              alt="Plano"
              style={{
                display: "block",
                width: "auto",
                height: "auto"
              }}
            />

            {filteredCameras.map(camera => (

              <CameraMarker
                key={camera.id}
                camera={camera}
                onClick={setSelectedCamera}
              />

            ))}

          </div>

        </MapViewer>


      </div>

      {/* DETALLE */}

      {/* DETALLE */}

      <div
        style={{
          borderLeft: "1px solid #ddd",
          padding: 10,
          overflowY: "auto"
        }}
      >

        <div
          style={{
            background: "#2a0000",
            padding: 15,
            marginBottom: 15,
            color: "white",
            borderRadius: "8px"
          }}
        >

          <h3>
            🚨 Alarmas activas
          </h3>

          {alarms.map(a => (

            <div
              key={a.id}
            >
              {a.name}
            </div>

          ))}

        </div>

        <CameraDetail
          camera={selectedCamera}
        />

      </div>

    </div>

  );
}