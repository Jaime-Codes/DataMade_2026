const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(2px)",
      }}
    >
      <h2>Loading Data...</h2>
      <img
        src="static/images/chicagoStars.svg"
        alt="red stars found on Chicago flag"
        width="100"
        height="100"
      />
    </div>
  );
};

export default Loading;
