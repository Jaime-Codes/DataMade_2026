const Error = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

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
      <h1>Oh no, something went wrong</h1>
      <button
        onClick={handleRefresh}
        style={{
          width: "fit-content",
          borderRadius: "8px",
          background: "#41B6E6",
          color: "white",
        }}
      >
        Refresh page
      </button>
    </div>
  );
};

export default Error;
