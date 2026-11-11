/**
 * Local verified cafe images from /assets/images/
 * ONLY existing local assets are used.
 */
export const CAFE_IMAGES = {
  heroMain: '/assets/images/unnamed.webp', // Landscape 1360x1020
  heroAccent1: '/assets/images/unnamed (1).webp', // Portrait 765x1020
  heroAccent2: '/assets/images/unnamed (4).webp', // Portrait 765x1020
  aboutInterior1: '/assets/images/unnamed (2).webp', // Landscape 1360x1020
  aboutInterior2: '/assets/images/unnamed (3).webp', // Landscape 1360x1020
  aboutAtmosphere: '/assets/images/unnamed (5).webp', // Panoramic landscape 1360x765
  featureVertical1: '/assets/images/unnamed (6).webp', // Vertical 574x1020
  featureVertical2: '/assets/images/unnamed (7).webp', // Vertical 550x1020
  featureVertical3: '/assets/images/unnamed (8).webp', // Vertical 574x1020
  terraceView: '/assets/images/unnamed (9).webp', // Landscape 1360x1020
  delight1: '/assets/images/unnamed (10).webp', // Portrait 765x1020
  delight2: '/assets/images/unnamed (11).webp', // Portrait 765x1020
  delight3: '/assets/images/unnamed (12).webp', // Portrait 765x1020
};

export const GALLERY_PREVIEW = [
  { id: '1', src: CAFE_IMAGES.aboutInterior1, title: 'Artisanal Seating', tag: 'Interior' },
  { id: '2', src: CAFE_IMAGES.aboutAtmosphere, title: 'Balcony Vistas', tag: 'Outdoor' },
  { id: '3', src: CAFE_IMAGES.delight1, title: 'Specialty Brews', tag: 'Beverages' },
  { id: '4', src: CAFE_IMAGES.featureVertical1, title: 'Warm Light Corners', tag: 'Ambiance' },
  { id: '5', src: CAFE_IMAGES.terraceView, title: 'The Terrace Deck', tag: 'Spaces' },
  { id: '6', src: CAFE_IMAGES.heroMain, title: 'The Heart of the Cafe', tag: 'Heritage' },
];
