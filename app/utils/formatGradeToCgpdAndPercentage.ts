export  const formatGradeToCgpdAndPercentage = (grade: string) => {
    if (!grade) return "";

    // Auto-detect format if gradeType not provided
    const numGrade = parseFloat(grade);
    if (!isNaN(numGrade)) {
      if (numGrade <= 10 && grade.includes(".")) {
        return `CGPA: ${grade}`;
      } else if (numGrade > 10) {
        return `Percentage: ${grade}%`;
      }
    }

    // Return as is if can't determine
    return grade;
  };