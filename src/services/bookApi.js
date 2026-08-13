import { APP_CONFIG } from "../config/constants";

// Helper function to generate an inline SVG cover image (100% reliable fallback)
export function getFallbackCover(title, category) {
  const safeTitle = title ? title.slice(0, 28) : "Book Cover";
  const gradients = [
    ["#3498db", "#2980b9"],
    ["#9b59b6", "#8e44ad"],
    ["#e67e22", "#d35400"],
    ["#2ecc71", "#27ae60"],
    ["#e74c3c", "#c0392b"],
    ["#16a085", "#1abc9c"]
  ];
  const pair = gradients[(title ? title.length : 0) % gradients.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280">
    <rect width="100%" height="100%" fill="${pair[0]}"/>
    <circle cx="100" cy="90" r="45" fill="#ffffff" opacity="0.15"/>
    <text x="100" 
    y="100" fill="#ffffff" 
    font-family="sans-serif" 
    font-size="38" 
    text-anchor="middle">📖</text>
    <text x="100" 
    y="185" 
    fill="#ffffff" 
    font-family="sans-serif" 
    font-size="14" 
    font-weight="bold" 
    text-anchor="middle">${safeTitle.replace(/&/g, '&amp;')}</text>
    <text x="100" 
    y="215" fill="#ffffff" 
    opacity="0.8" 
    font-family="sans-serif" 
    font-size="11" 
    text-anchor="middle">${(category || "Book").toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Fetch books dynamically from Open Library API with robust cover fallback
export async function getBooksFromApi(category = APP_CONFIG.DEFAULT_CATEGORY, limit = APP_CONFIG.API_LIMIT) {
  try {
    const url = `${APP_CONFIG.API_BASE_URL}/${category}.json?limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.works || !Array.isArray(data.works)) {
      return [];
    }

    return data.works.map((book) => {
      const coverId = book.cover_id || book.cover_i;
      const title = book.title || "Untitled Book";
      const author = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown Author";

      const cover = coverId
        ? `${APP_CONFIG.COVER_BASE_URL}/${coverId}-M.jpg`
        : getFallbackCover(title, category);

      return {
        id: book.key,
        title,
        author,
        cover,
        category: category.toUpperCase()
      };
    });
  } catch (error) {
    console.error("Failed to load books. Cool mat bn bahi:", error);
    return [];
  }
}
