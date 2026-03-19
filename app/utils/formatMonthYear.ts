// Helper function to format month/year (mirroring MonthYearDisplay logic)
export const formatMonthYear = (value: string | number | null | undefined, shortYear: boolean = true): string => {
  if (!value) return "";

  // Convert to string if number
  const valueStr = value.toString();

  // Case 1: Handle YYYY-MM format (month picker)
  if (valueStr.includes("-")) {
    const [year, month] = valueStr.split("-");
    const monthIndex = parseInt(month, 10) - 1;
    
    if (monthIndex >= 0 && monthIndex < 12) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedYear = shortYear ? `'${year.slice(2)}` : year;
      return `${monthNames[monthIndex]} ${formattedYear}`;
    }
  }
  
  // Case 2: Handle YYYY format (year picker - 4 digits)
  else if (/^\d{4}$/.test(valueStr)) {
    return valueStr;
  }
  
  // Case 3: Handle "Month YYYY" format (e.g., "January 2023")
  else {
    const fullMonthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 0; i < fullMonthNames.length; i++) {
      if (valueStr.includes(fullMonthNames[i])) {
        const year = valueStr.replace(fullMonthNames[i], "").trim();
        if (year && /^\d{4}$/.test(year)) {
          const formattedYear = shortYear ? `'${year.slice(2)}` : year;
          return `${monthNames[i]} ${formattedYear}`;
        }
      }
    }
  }

  // Return original if no format matches
  return valueStr;
};