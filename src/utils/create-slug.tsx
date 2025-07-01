export function createSlug(username: string): string {
  return username
    .normalize("NFD") // Normalize to decompose characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .toLowerCase() // Convert to lowercase
    .trim(); // Trim leading and trailing whitespace
}