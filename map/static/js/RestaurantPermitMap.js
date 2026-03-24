import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import YearSelect from "./components/YearSelect";
import YearlyPermitInfo from "./components/YearlyPermitInfo";
import getMaxNumberOfPermits from "./utils/getMaxNumberOfPermits";

import "leaflet/dist/leaflet.css";

import RAW_COMMUNITY_AREAS from "../../../data/raw/community-areas.geojson";

export default function RestaurantPermitMap() {
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [error, setIsError] = useState(false);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [year, setYear] = useState(2026);

  const yearlyDataEndpoint = `/map-data/?year=${year}`;

  useEffect(() => {
    const fetchMapData = async () => {
      setIsError(false);
      setIsLoadingMap(true);
      try {
        const response = await fetch(yearlyDataEndpoint);
        if (!response.ok) {
          throw new Error("Network response was NOT ok");
        }
        const data = await response.json();
        setCurrentYearData(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoadingMap(false);
      }
    };

    fetchMapData();
  }, [yearlyDataEndpoint]);

  if (isLoadingMap) {
    //TODO loading component
    return <div>Loading.. </div>;
  }
  if (error) {
    //TODO Error component
    return (
      <div>
        <YearSelect setYear={setYear} />
        <p>Error</p>{" "}
      </div>
    );
  }
  const maxNumPermits = getMaxNumberOfPermits(currentYearData);
  // console.log(" this is the maxNum permits", maxNumPermits);
  function setAreaInteraction(feature, layer) {
    /**
     * TODO: Use the methods below to:
     * 1) Shade each community area according to what percentage of
     * permits were issued there in the selected year
     * 2) On hover, display a popup with the community area's raw
     * permit count for the year
     */
    layer.setStyle();
    layer.on("", () => {
      layer.bindPopup("");
      layer.openPopup();
    });
  }

  return (
    <>
      <YearSelect setYear={setYear} />
      {/* TODO  create func to calculate permits*/}
      <YearlyPermitInfo totalPermits={10} maxPermits={maxNumPermits.max} />
      <MapContainer id="restaurant-map" center={[41.88, -87.62]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
        />
        {currentYearData.length > 0 ? (
          <GeoJSON
            data={RAW_COMMUNITY_AREAS}
            onEachFeature={setAreaInteraction}
            key={maxNumPermits.max}
          />
        ) : null}
      </MapContainer>
    </>
  );
}
