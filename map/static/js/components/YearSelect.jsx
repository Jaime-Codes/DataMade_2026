const YearSelect = ({ setYear }) => {
  const startYear = 2026;
  const years = [...Array(11).keys()].map((increment) => {
    return startYear - increment;
  });
  const options = years.map((year) => {
    return (
      <option value={year} key={year}>
        {year}
      </option>
    );
  });

  return (
    <>
      <label htmlFor="yearSelect" className="fs-3">
        Filter by year:{" "}
      </label>
      <select
        id="yearSelect"
        className="form-select form-select-lg mb-3"
        onChange={(e) => setYear(e.target.value)}
      >
        {options}
      </select>
    </>
  );
};

export default YearSelect;
