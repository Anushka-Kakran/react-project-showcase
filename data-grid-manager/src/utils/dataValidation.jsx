export const validateField = (key, value) => {
  if (key === "email" && !value.includes("@")) {
    return "Must be a valid email format.";
  }
  // Age must be a number [cite: 30]
  if (key === "age") {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0 || !Number.isInteger(numValue)) {
      return "Age must be a positive integer.";
    }
  }
  // Basic required field check
  if (!value && typeof value !== "number") {
    return "This field is required.";
  }
  return null; // No error
};
