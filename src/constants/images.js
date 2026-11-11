/**
 * Local verified cafe images from /assets/images/
 * Dynamic base path resolution supporting GitHub Pages and local development.
 */
const BASE = import.meta.env.BASE_URL || '/';

export const getAssetUrl = (path) => {
  if (!path) return '';
  // If already absolute or external, return as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${cleanBase}${cleanPath}`;
};

export const CAFE_IMAGES = {
  heroMain: getAssetUrl('assets/images/unnamed.webp'), // Landscape 1360x1020
  heroAccent1: getAssetUrl('assets/images/unnamed (1).webp'), // Portrait 765x1020
  heroAccent2: getAssetUrl('assets/images/unnamed (4).webp'), // Portrait 765x1020
  aboutInterior1: getAssetUrl('assets/images/unnamed (2).webp'), // Landscape 1360x1020
  aboutInterior2: getAssetUrl('assets/images/unnamed (3).webp'), // Landscape 1360x1020
  aboutAtmosphere: getAssetUrl('assets/images/unnamed (5).webp'), // Panoramic landscape 1360x765
  featureVertical1: getAssetUrl('assets/images/unnamed (6).webp'), // Vertical 574x1020
  featureVertical2: getAssetUrl('assets/images/unnamed (7).webp'), // Vertical 550x1020
  featureVertical3: getAssetUrl('assets/images/unnamed (8).webp'), // Vertical 574x1020
  terraceView: getAssetUrl('assets/images/unnamed (9).webp'), // Landscape 1360x1020
  delight1: getAssetUrl('assets/images/unnamed (10).webp'), // Portrait 765x1020
  delight2: getAssetUrl('assets/images/unnamed (11).webp'), // Portrait 765x1020
  delight3: getAssetUrl('assets/images/unnamed (12).webp'), // Portrait 765x1020
};

export const GALLERY_PREVIEW = [
  { id: '1', src: CAFE_IMAGES.aboutInterior1, title: 'Artisanal Seating', tag: 'Interior' },
  { id: '2', src: CAFE_IMAGES.aboutAtmosphere, title: 'Balcony Vistas', tag: 'Outdoor' },
  { id: '3', src: CAFE_IMAGES.delight1, title: 'Specialty Brews', tag: 'Beverages' },
  { id: '4', src: CAFE_IMAGES.featureVertical1, title: 'Warm Light Corners', tag: 'Ambiance' },
  { id: '5', src: CAFE_IMAGES.terraceView, title: 'The Terrace Deck', tag: 'Spaces' },
  { id: '6', src: CAFE_IMAGES.heroMain, title: 'The Heart of the Cafe', tag: 'Heritage' },
];
