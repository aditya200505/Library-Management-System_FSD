// Centralized Configuration and Constants (No Hardcoded Values)

export const APP_CONFIG = {
  TITLE: "LibVerse Library System",
  BRAND_NAME: "Library System",
  DEFAULT_CATEGORY: "programming",
  DEFAULT_BORROW_DAYS: 7,
  MIN_BORROW_DAYS: 1,
  MAX_BORROW_DAYS: 60,
  API_LIMIT: 16,
  API_BASE_URL: "https://openlibrary.org/subjects",
  COVER_BASE_URL: "https://covers.openlibrary.org/b/id"
};

export const ACADEMIC_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Postgraduate",
  "Faculty / Staff"
];

export const BOOK_CATEGORIES = [
  { id: "programming", label: "Programming & Tech" },
  { id: "fiction", label: "Fiction & Literature" },
  { id: "science", label: "Science & Innovation" },
  { id: "history", label: "History & Culture" },
  { id: "fantasy", label: "Fantasy & Sci-Fi" },
  { id: "mystery", label: "Mystery & Thriller" },
  { id: "romance", label: "Stories & Romance" },
  { id: "business", label: "Business & Finance" }
];
