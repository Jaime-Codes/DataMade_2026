import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";

import YearSelect from "./components/YearSelect";
import YearlyPermitInfo from "./components/YearlyPermitInfo";
import Loading from "./components/Loading";
import Error from "./components/Error";
import LeafletPopUp from "./components/LeafletPopUp";

import getMaxNumberOfPermits from "./utils/getMaxNumberOfPermits";
import getMapAreaColor from "./utils/getMapAreaColor";
import generateAreaIdPermitObject from "./utils/generateAreaIdPermitObject";
import getTotalPermitsPerYear from "./utils/getTotalPermitsPerYear";

import "leaflet/dist/leaflet.css";

import RAW_COMMUNITY_AREAS from "../../../data/raw/community-areas.geojson";

export default function RestaurantPermitMap() {
  const [isLoadingMap, setIsLoadingMap] = useState(true);
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
      setIsLoadingMap(true);
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
        setIsLoadingMap(false);
      }
    };

    fetchMapData();
  }, [yearlyDataEndpoint]);

  if (isLoadingMap) {
    //TODO loading component
    return <Loading />;
  }
  if (error) {
    //TODO Error component. possibly move down component
    return (
      <div>
        <YearSelect setYear={setYear} />
        <Error />
      </div>
    );
  }
  const maxNumPermits = getMaxNumberOfPermits(currentYearData);

  function setAreaInteraction(feature, layer) {
    /**
     * TODO: Use the methods below to:
     * 1) Shade each community area according to what percentage of
     * permits were issued there in the selected year
     * 2) On hover, display a popup with the community area's raw
     * permit count for the year
     */

    const communityName = feature.properties.community;
    const area_id = feature.properties.area_num_1;
    const permitPercentage = (areaIdMap[area_id] / maxNumPermits.max) * 100;

    layer.setStyle({
      fillColor: getMapAreaColor(permitPercentage),
      weight: 1,
      //TODO update color
      color: "red",
      fillOpacity: 0.8,
    });
    layer.on({
      mouseover: (e) => {
        setActiveArea({
          position: e.latlng,
          name: communityName,
          id: area_id,
        });
      },
      //TODO verify if this is wanted behavior
      // mouseout: () => setActiveArea(null),
    });
  }

  return (
    <>
      <YearSelect year={year} setYear={setYear} />

      <YearlyPermitInfo
        totalPermits={totalPermits}
        maxPermits={maxNumPermits.max}
      />
      <MapContainer id="restaurant-map" center={[41.88, -87.62]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png"
        />
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
                  year={year}
                />
              </Popup>
            )}
          </>
        ) : null}
      </MapContainer>
    </>
  );
}
