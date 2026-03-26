const LeafletPopUp = ({ communityName, year, permits }) => {
  return (
    <div>
      <h3>{communityName}</h3>
      <p>{`Permits this year: ${permits}`}</p>
    </div>
  );
};

export default LeafletPopUp;
