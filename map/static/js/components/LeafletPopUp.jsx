const LeafletPopUp = ({ communityName, permits }) => {
  return (
    <div>
      <h2 className="fs-5">{communityName || "Name not available"}</h2>
      <p>{`Permits this year: ${permits ?? "not available"}`}</p>
    </div>
  );
};

export default LeafletPopUp;
