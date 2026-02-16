export const sanitizeText = (value: string): string => {
  return value.replace(/[^a-zA-Z\s]/g, "");
};

export const sanitizeTextWithDot = (value: string): string => {
  return value.replace(/[^a-zA-Z.\s]/g, "")
};

export const sanitizeTextWithComma = (value: string): string => {
  return value.replace(/[^a-zA-Z,\s]/g, "")

};

export const sanitizeTextWithCommaHyphen = (value: string): string => {
  return value.replace(/[^a-zA-Z,\-\s]/g, "")

};

export const sanitizeNumber = (value: string): string => {
  return value
    .replace(/[^\d+\-\s()]/g, "") // allow digits, +, -, space, ()
    .replace(/(?!^)\+/g, "");     // allow + only at beginning
};

