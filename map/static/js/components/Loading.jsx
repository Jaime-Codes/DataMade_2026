const Loading = () => {
  return (
    <div
      style={{
        margin: "5rem 0",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h2>Loading Data...</h2>
      <img
        src="static/images/chicagoStars.svg"
        alt="Description of your image"
        width="100"
        height="100"
      />
    </div>
  );
};

export default Loading;
