const YearSelect = ({ year, setYear }) => {
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
      <label htmlFor="yearSelect" className="fs-4">
        Filter by year:{" "}
      </label>
      <select
        id="yearSelect"
        className="form-select form-select-md mb-2"
        onChange={(e) => setYear(e.target.value)}
        value={year}
      >
        {options}
      </select>
    </>
  );
};

export default YearSelect;
