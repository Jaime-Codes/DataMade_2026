const getMapAreaColor = (percentageOfPermits) => {
  if (typeof percentageOfPermits !== "number") {
    //TODO verify data type. Will it always be a num or are we passing in string
    return "#f4722d";
  }
  const communityAreaColors = ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"];
  let fillColor;

  if (percentageOfPermits < 25) {
    fillColor = communityAreaColors[0];
  } else if (percentageOfPermits >= 25 && percentageOfPermits < 50) {
    fillColor = communityAreaColors[1];
  } else if (percentageOfPermits >= 50 && percentageOfPermits < 75) {
    fillColor = communityAreaColors[2];
  } else {
    fillColor = communityAreaColors[3];
  }

  return fillColor;
};

export default getMapAreaColor;
