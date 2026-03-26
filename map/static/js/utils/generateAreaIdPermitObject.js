const generateAreaIdPermitObject = (mapData) => {
  const map = {};

  for (let res of mapData) {
    const [_, value] = Object.entries(res)[0];
    map[value.area_id] = value.num_permits;
  }

  return map;
};

export default generateAreaIdPermitObject;
