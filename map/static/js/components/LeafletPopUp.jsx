const LeafletPopUp = ({ communityName, year, permits }) => {
  return (
    <div>
      <h3 className="fs-5">{communityName}</h3>
      <p>{`Permits this year: ${permits}`}</p>
    </div>
  );
};

export default LeafletPopUp;
