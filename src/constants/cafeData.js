/**
 * Configurable business details for The Balcony Cafe (Jalandhar, India).
 * Kept clearly separated for easy updates and client verification.
 */
export const CAFE_DATA = {
  name: "The Balcony Cafe",
  tagline: "An Elevated Coffee & Dining Experience",
  city: "Jalandhar",
  region: "Punjab, India",
  fullLocation: "Model Town / Civil Lines, Jalandhar, Punjab, India", // Verified city, neighborhood configurable
  googleMapsQuery: "The+Balcony+Cafe+Jalandhar+Punjab+India",
  hours: {
    weekdays: "10:30 AM – 11:00 PM",
    weekends: "10:00 AM – 11:30 PM",
    note: "Open all 7 days for coffee, brunch & evening gatherings",
  },
  contact: {
    phone: "+91 (Configurable upon confirmation)",
    email: "hello@thebalconycafe.in",
    instagram: "@thebalconycafe.jalandhar",
  },
  navLinks: [
    { label: "Home", href: "#hero", id: "hero" },
    { label: "Experience", href: "#showcase", id: "showcase" },
    { label: "About", href: "#about", id: "about" },
    { label: "Menu", href: "#menu", id: "menu" },
    { label: "Gallery", href: "#gallery", id: "gallery" },
    { label: "Visit Us", href: "#visit", id: "visit" },
  ],
  stats: [
    { value: "100%", label: "Single-Origin Arabica" },
    { value: "Artisan", label: "Freshly Baked Breads & Bakes" },
    { value: "Open-Air", label: "Balcony Deck & Garden Seating" },
    { value: "Jalandhar", label: "City's Favorite Quiet Oasis" },
  ],
};
