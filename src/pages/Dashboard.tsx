import { useState } from "react";

import plano from "../assets/planta-pisco.jpeg";

import { cameras } from "../data/cameras";

import type { Camera } from "../types/Camera";

import CameraMarker from "../components/CameraMarker";

import CameraDetail from "../components/CameraDetail";
import MapViewer from "../components/MapViewer";

export default function Dashboard() {

  const [selectedCamera, setSelectedCamera] =
    useState<Camera>();
const online =
cameras.filter(
c=>c.status==="online"
).length

const offline =
cameras.filter(
c=>c.status==="offline"
).length

const alarm =
cameras.filter(
c=>c.status==="alarm"
).length
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
padding:15,
background:"#111",
color:"white"
}}
>

🟢 {online}

🔴 {offline}

🚨 {alarm}

</div>
        {cameras.map(camera => (

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

    {cameras.map(camera => (

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

      <div
        style={{
          borderLeft: "1px solid #ddd"
        }}
      >

        <CameraDetail
          camera={selectedCamera}
        />

      </div>

    </div>

  );
}