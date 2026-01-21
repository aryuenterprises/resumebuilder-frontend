// import React from "react";

// const monthNames = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// const MonthYearDisplay = ({ value, shortYear = false }) => {
//   if (!value) return "MM/YYYY";

//   let year, month;

//   if (value.includes("-")) {
//     // "YYYY-MM" format
//     [year, month] = value.split("-");
//     month = monthNames[parseInt(month, 10) - 1];
//     if (shortYear) year = year.slice(2); // optional: "25" instead of "2025"
//   } else {
//     // already formatted
//     return value;
//   }

//   return <>{`${month} ${year}`}</>;
// };

// export default MonthYearDisplay;




// const monthNames = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const MonthYearDisplay = ({ value, shortYear = false }) => {
//   if (!value) return "MM/YYYY";

//   let year, month;

//   if (value.includes("-")) {
//     // "YYYY-MM" format
//     [year, month] = value.split("-");
//     month = monthNames[parseInt(month, 10) - 1];

//     if (shortYear) year = year.slice(2); 
//   } else {
//     return value;
//   }

//   return <>{`${month} ${year}`}</>;
// };

// export default MonthYearDisplay;



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
