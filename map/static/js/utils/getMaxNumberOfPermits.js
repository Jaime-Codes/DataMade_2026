const getMaxNumberOfPermits = (currentYearMapData) => {
  if (typeof currentYearMapData !== "object") {
    return null;
  }
  let maxNumPermits = { max: 0, name: "" };

  for (let data of currentYearMapData) {
    const [key, value] = Object.entries(data)[0];

    if (value.num_permits > maxNumPermits.max) {
      maxNumPermits = { max: value.num_permits, name: key };
    }
  }

  return maxNumPermits;
};

export default getMaxNumberOfPermits;
