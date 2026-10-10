export function getLocalizedField(record, field, language) {
  if (!record) return undefined;

  const value = record[field];
  const explicitValue = language === "hi" ? record[`${field}Hi`] : null;

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return explicitValue || value[language] || value.en || value.hi;
  }

  return explicitValue || value;
}