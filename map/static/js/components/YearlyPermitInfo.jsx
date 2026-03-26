const YearlyPermitInfo = ({ totalPermits, maxPermits }) => {
  const { max, name } = maxPermits;
  return (
    <div>
      <p className="fs-4">
        Restaurant permits issued this year: {totalPermits || "N/A"}
      </p>
      <p className="fs-4">
        Maximum number of restaurant permits in a single area:{" "}
        {`${max} (${name})` || "N/A"}
      </p>
    </div>
  );
};

export default YearlyPermitInfo;
