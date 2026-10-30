/** Public reference data used by forms. */

export const ghanaRegions = [
  "Ahafo",
  "Ashanti",
  "Bono",
  "Bono East",
  "Central",
  "Eastern",
  "Greater Accra",
  "North East",
  "Northern",
  "Oti",
  "Savannah",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
  "Outside Ghana",
] as const;

export const schoolCompletionYears = Array.from(
  { length: 14 },
  (_, index) => String(new Date().getFullYear() + 1 - index),
);
