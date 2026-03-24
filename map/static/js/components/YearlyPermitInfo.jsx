const YearlyPermitInfo = ({ totalPermits, maxPermits }) => {
  <div>
    <p className="fs-4">
      Restaurant permits issued this year: ${totalPermits || "N/A"}
    </p>
    <p className="fs-4">
      Maximum number of restaurant permits in a single area:
      {maxPermits || "N/A"}
    </p>
  </div>;
};

export default YearlyPermitInfo;
