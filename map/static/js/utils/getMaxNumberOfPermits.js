const getMaxNumberOfPermits = (currentYearMapData) => {
  let maxNumPermits = { max: 0, name: [] };

  for (let data of currentYearMapData) {
    const [key, value] = Object.entries(data)[0];

    if (value.num_permits > maxNumPermits.max) {
      maxNumPermits = {
        max: value.num_permits,
        name: [key], // reset
      };
    } else if (value.num_permits === maxNumPermits.max) {
      maxNumPermits.name.push(key); // append
    }
  }

  return maxNumPermits;
};

export default getMaxNumberOfPermits;
