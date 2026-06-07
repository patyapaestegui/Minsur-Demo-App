import { Layers, Map } from "lucide-react";
import type { Camera } from "../../types/Camera";
import CameraMarker from "../CameraMarker";
import MapViewer from "../MapViewer";
import QuickViews from "./QuickViews";

interface Props {
  plano: string;
  cameras: Camera[];
  onSelect: (camera: Camera) => void;
}

export default function MapPanel({
  plano,
  cameras,
  onSelect
}: Props) {
  return (
    <div className="mapPanel">
      <div className="mapHeader">

        <strong>MAPA INTERACTIVO</strong>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="mapButton">
            <Layers size={15} /> Capas
          </button>

          <button className="mapButton">
            <Map size={15} /> Leyenda
          </button>
        </div>
      </div>

      <div className="mapOverlay" />

      <div className="mapBody">
        <MapViewer>



          <div className="mapCanvas">
            <img
              src={plano}
              alt="Plano"
              className="mapImage"
            />
            <div className="mapDarkOverlay" />

            {cameras.map(camera => (
              <CameraMarker
                key={camera.id}
                camera={camera}
                onClick={onSelect}
              />
            ))}
          </div>
        </MapViewer>
        <div className="mapFloatingTools">
          <button>+</button>
          <button>−</button>
          <button>⛶</button>
          <button>◎</button>
        </div>


      </div>
      <QuickViews />
    </div>
  );
}