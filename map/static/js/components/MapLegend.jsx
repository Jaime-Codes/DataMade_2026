import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapLegend = () => {
  const map = useMap();
  const [container, setContainer] = useState(null);
  const grades = [0, 25, 50, 75];
  const colors = ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"];

  useEffect(() => {
    const legend = L.control({ position: "topright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      setContainer(div);
      return div;
    };

    legend.addTo(map);
    return () => legend.remove();
  }, [map]);

  return container
    ? createPortal(
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0" }}>Permits (%)</h4>
          {grades?.map((grade, i) => (
            <div
              key={grade}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  background: colors[i],
                  width: "18px",
                  height: "18px",
                  marginRight: "8px",
                }}
              />
              <span>
                {grade}
                {grades[i + 1] ? `-${grades[i + 1]}%` : "+%"}
              </span>
            </div>
          ))}
        </div>,
        container,
      )
    : null;
};

export default MapLegend;
