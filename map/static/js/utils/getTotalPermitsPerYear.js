const getTotalPermitsPerYear = (mapData) => {
  
  return mapData.reduce((sum, areaObj) => {
    const area = Object.values(areaObj)[0];
    return sum + area.num_permits;
  }, 0);
};

export default getTotalPermitsPerYear;
