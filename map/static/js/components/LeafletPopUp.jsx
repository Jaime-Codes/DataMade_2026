const LeafletPopUp = ({ communityName, year, permits }) => {
  //TODO verify if button is needed
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h3>{communityName}</h3>
      <p>{`Permits for ${year}: ${permits}`}</p>
      {/* TODO Verify */}
      <button onClick={handleClick}>Learn more</button>
    </div>
  );
};

export default LeafletPopUp;
