// "use client";

// import React from "react";

// interface MonthYearDisplayProps {
//   value?: string | null | undefined;
//   shortYear?: boolean;
// }

// const monthNames = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// const MonthYearDisplay: React.FC<MonthYearDisplayProps> = ({ value, shortYear = false }) => {
//   if (!value) return null;

//   // Handle YYYY-MM format
//   if (value.includes("-")) {
//     const [year, month] = value.split("-");
//     const monthIndex = parseInt(month, 10) - 1;
    
//     if (monthIndex >= 0 && monthIndex < 12) {
//       const formattedYear = shortYear ? `'${year.slice(2)}` : year;
//       return <>{`${monthNames[monthIndex]} ${formattedYear}`}</>;
//     }
//   }

//   // Return original if not YYYY-MM format
//   return <>{value}</>;
// };

// export default MonthYearDisplay;


"use client";

import React from "react";

interface MonthYearDisplayProps {
  value?: string | number | null | undefined;
  shortYear?: boolean;
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const fullMonthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthYearDisplay: React.FC<MonthYearDisplayProps> = ({ value, shortYear = false }) => {
  if (!value) return null;

  // Convert to string if number
  const valueStr = value.toString();

  // Case 1: Handle YYYY-MM format (month picker)
  if (valueStr.includes("-")) {
    const [year, month] = valueStr.split("-");
    const monthIndex = parseInt(month, 10) - 1;
    
    if (monthIndex >= 0 && monthIndex < 12) {
      const formattedYear = shortYear ? `'${year.slice(2)}` : year;
      return <>{`${monthNames[monthIndex]} ${formattedYear}`}</>;
    }
  }
  
  // Case 2: Handle YYYY format (year picker - 4 digits)
  else if (/^\d{4}$/.test(valueStr)) {
    // const formattedYear = shortYear ? `${valueStr.slice(2)}` : valueStr;
    const formattedYear =  valueStr;
    return <>{formattedYear}</>;
  }
  
  // Case 3: Handle "Month YYYY" format (e.g., "January 2023")
  else {
    for (let i = 0; i < fullMonthNames.length; i++) {
      if (valueStr.includes(fullMonthNames[i])) {
        const year = valueStr.replace(fullMonthNames[i], "").trim();
        if (year && /^\d{4}$/.test(year)) {
          const formattedYear = shortYear ? `'${year.slice(2)}` : year;
          const shortMonth = monthNames[i];
          return <>{`${shortMonth} ${formattedYear}`}</>;
        }
      }
    }
  }

  // Return original if no format matches
  return <>{valueStr}</>;
};

export default MonthYearDisplay;