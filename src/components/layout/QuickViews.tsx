import { cameras } from "../../data/cameras";

export default function QuickViews() {
  return (
    <div className="quickViews">
      <div className="quickViewsHeader">
        VISTAS RÁPIDAS
      </div>

      <div className="quickViewsGrid">
        {cameras.slice(0, 4).map(camera => (
          <div
            key={camera.id}
            className="quickCard"
          >
            <img
              src={camera.preview}
              alt={camera.name}
            />

            <div className="quickCardFooter">
              <div
                className={`quickStatus ${camera.status}`}
              />

              <span>{camera.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}