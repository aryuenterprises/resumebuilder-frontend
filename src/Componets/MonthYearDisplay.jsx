const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthYearDisplay = ({ value }) => {
  if (!value) return "";

  let year, month;

  if (value.includes("-")) {
    // "YYYY-MM" format
    [year, month] = value.split("-");
    month = monthNames[parseInt(month, 10) - 1];

    //  Do NOT shorten the year
  } else {
    return value;
  }

  return <>{`${month} ${year}`}</>;
};

export default MonthYearDisplay;
