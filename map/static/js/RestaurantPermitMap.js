import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";

import YearSelect from "./components/YearSelect";
import YearlyPermitInfo from "./components/YearlyPermitInfo";
import Loading from "./components/Loading";
import Error from "./components/Error";
import LeafletPopUp from "./components/LeafletPopUp";
import Legend from "./components/MapLegend";

import getMaxNumberOfPermits from "./utils/getMaxNumberOfPermits";
import getMapAreaColor from "./utils/getMapAreaColor";
import generateAreaIdPermitObject from "./utils/generateAreaIdPermitObject";
import getTotalPermitsPerYear from "./utils/getTotalPermitsPerYear";

import "leaflet/dist/leaflet.css";

import RAW_COMMUNITY_AREAS from "../../../data/raw/community-areas.geojson";

export default function RestaurantPermitMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(false);
  const [activeArea, setActiveArea] = useState();
  const [totalPermits, setTotalPermits] = useState(0);
  const [currentYearData, setCurrentYearData] = useState([]);
  const [areaIdMap, setAreaIdMap] = useState({});
  const [year, setYear] = useState(2026);

  const yearlyDataEndpoint = `/map-data/?year=${year}`;

  useEffect(() => {
    const fetchMapData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(yearlyDataEndpoint);

        if (!response.ok) {
          throw new Error("Network response was NOT ok");
        }

        const data = await response.json();
        const areaIdObject = generateAreaIdPermitObject(data);
        const totalPermitsForTheYear = getTotalPermitsPerYear(data);
        setCurrentYearData(data);
        setAreaIdMap(areaIdObject);
        setTotalPermits(totalPermitsForTheYear);
      } catch (err) {
        console.error("Error details:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, [year]);

  if (error) {
    return <Error />;
  }

  const maxNumPermits = getMaxNumberOfPermits(currentYearData);

  function setAreaInteraction(feature, layer) {
    const communityName = feature.properties.community;
    const area_id = feature.properties.area_num_1;
    const permitPercentage = (areaIdMap[area_id] / maxNumPermits.max) * 100;
    const defaultStyle = {
      fillColor: getMapAreaColor(permitPercentage),
      weight: 1,
      color: "red",
      fillOpacity: 0.8,
    };

    const hoverStyle = {
      ...defaultStyle,
      color: "green",
      fillOpacity: 1,
    };

    layer.setStyle(defaultStyle);
    layer.on({
      mouseover: (e) => {
        layer.setStyle(hoverStyle);
        setActiveArea({
          position: e.latlng,
          name: communityName,
          id: area_id,
          color: "green",
        });
      },
      mouseout: () => {
        layer.setStyle(defaultStyle);
      },
    });
  }

  return (
    <>
      <h1>Chicago Restaurant Permits</h1>
      <YearSelect year={year} setYear={setYear} />

      <YearlyPermitInfo
        totalPermits={totalPermits}
        maxPermits={maxNumPermits}
      />
      <MapContainer id="restaurant-map" center={[41.88, -87.62]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
        />
        {isLoading && <Loading />}

        {currentYearData.length > 0 ? (
          <>
            <GeoJSON
              data={RAW_COMMUNITY_AREAS}
              onEachFeature={setAreaInteraction}
              key={maxNumPermits.max}
            />
            {activeArea && (
              <Popup
                position={activeArea?.position}
                offset={[-0, -10]}
                onClose={() => setActiveArea(null)}
              >
                <LeafletPopUp
                  communityName={activeArea.name}
                  permits={areaIdMap[activeArea.id]}
                />
              </Popup>
            )}
            <Legend />
          </>
        ) : null}
      </MapContainer>
    </>
  );
}
