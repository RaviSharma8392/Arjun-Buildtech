export const createSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars, non-whitespace, non-hyphen
    .replace(/[\s_-]+/g, "-") // Replace multiple spaces/hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim hyphens from start and end
};
