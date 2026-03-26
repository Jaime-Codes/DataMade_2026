import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapLegend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "topright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const grades = [0, 25, 50, 75];
      const colors = ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"];

      div.style.backgroundColor = "white";
      div.style.padding = "10px";
      div.style.lineHeight = "18px";
      div.style.color = "#555";

      div.innerHTML = "<h4>Yearly Permits %</h4>";

      for (let i = 0; i < grades.length; i++) {
        div.innerHTML += `
        <div style="display: flex; align-items: center; margin-bottom: 4px;">
        <div style="background: ${colors[i]}; width: 18px; height: 18px; margin-right: 8px;"></div>
        <span>${grades[i]}${grades[i + 1] ? "&ndash;" + grades[i + 1] : "+"}%</span>
        </div>
        `;
      }

      return div;
    };

    legend.addTo(map);
    return () => legend.remove();
  }, [map]);

  return null;
};

export default MapLegend;
