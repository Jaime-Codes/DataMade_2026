const getMapAreaColor = (percentageOfPermits) => {
  const communityAreaColors = ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"];

  if (typeof percentageOfPermits !== "number") {
    return "#d3500a";
  }

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
