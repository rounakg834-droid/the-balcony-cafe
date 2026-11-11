import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Camera, Eye } from 'lucide-react';
import { getAssetUrl } from '../constants/images';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  {
    id: 'g1',
    src: getAssetUrl('assets/images/unnamed (4).webp'),
    title: 'The Two-Storey Balcony & Courtyard',
    category: 'Balcony & Outdoors',
    description: 'Sunlit daytime view of the 2-storey wooden facade, outdoor deck, and garden dining tables.',
    span: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
    aspect: 'aspect-[4/3] sm:aspect-[16/11]',
  },
  {
    id: 'g2',
    src: getAssetUrl('assets/images/unnamed (7).webp'),
    title: 'Stone-Baked Farmhouse Pizza',
    category: 'Culinary & Bakes',
    description: 'Thin crust loaded with peppers, mushrooms, and olives, paired with crispy fries.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g3',
    src: getAssetUrl('assets/images/unnamed (10).webp'),
    title: 'The Handcrafted Coffee Bar',
    category: 'Ambiance & Spaces',
    description: 'Warm timber counter, espresso grinder, cloche cakes, and glowing backlit shelving.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g4',
    src: getAssetUrl('assets/images/unnamed.webp'),
    title: 'Mediterranean Mezze Platter',
    category: 'Culinary & Bakes',
    description: 'Velvety hummus, golden falafel, warm pita breads, sliced avocado, and feta.',
    span: 'col-span-1 sm:col-span-2',
    aspect: 'aspect-[4/3] sm:aspect-[16/10]',
  },
  {
    id: 'g5',
    src: getAssetUrl('assets/images/unnamed (11).webp'),
    title: 'The Balcony Cafe at Night',
    category: 'Balcony & Outdoors',
    description: 'Illuminated evening facade under palm trees, showing the glowing rooftop and deck signs.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g6',
    src: getAssetUrl('assets/images/unnamed (2).webp'),
    title: 'Wooden Cabin Dining Lounge',
    category: 'Ambiance & Spaces',
    description: 'Spacious timber cabin dining with private booths, wood beam ceiling, and coffee bar.',
    span: 'col-span-1 sm:col-span-2',
    aspect: 'aspect-[4/3] sm:aspect-[16/10]',
  },
  {
    id: 'g7',
    src: getAssetUrl('assets/images/unnamed (12).webp'),
    title: 'Sunlit Garden & Birdcage Floral Patio',
    category: 'Balcony & Outdoors',
    description: 'Garden dining with sunshine, pastel yellow tablecloths, and suspended floral installations.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g8',
    src: getAssetUrl('assets/images/unnamed (3).webp'),
    title: 'Herb-Crusted Cutlet & Aglio Olio',
    category: 'Culinary & Bakes',
    description: 'Pan-seared seasoned cutlet with garlic-infused spaghetti and velvety dipping cream.',
    span: 'col-span-1 sm:col-span-2',
    aspect: 'aspect-[4/3] sm:aspect-[16/10]',
  },
  {
    id: 'g9',
    src: getAssetUrl('assets/images/unnamed (1).webp'),
    title: 'Evening Lamp Table & Fairy Lights',
    category: 'Balcony & Outdoors',
    description: 'Cozy garden nook with glowing lamp, wooden fence, fairy lights, and street views.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g10',
    src: getAssetUrl('assets/images/unnamed (8).webp'),
    title: 'Timber Mezzanine Alcove',
    category: 'Ambiance & Spaces',
    description: 'Intimate dining corner with checkered bar stools, bookshelf, and warm ceiling fixtures.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g11',
    src: getAssetUrl('assets/images/unnamed (9).webp'),
    title: 'Entrance Gate & Cafe Signboard',
    category: 'Balcony & Outdoors',
    description: 'Welcoming front gateway framed by palms with the official Balcony Cafe & Grill emblem.',
    span: 'col-span-1 sm:col-span-2',
    aspect: 'aspect-[4/3] sm:aspect-[16/10]',
  },
  {
    id: 'g12',
    src: getAssetUrl('assets/images/unnamed (6).webp'),
    title: 'Private Table Place Settings',
    category: 'Ambiance & Spaces',
    description: 'Artfully laid dining tables with fine cutlery, floral wall accents, and warm timber panels.',
    span: 'col-span-1',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g13',
    src: getAssetUrl('assets/images/unnamed (5).webp'),
    title: 'Sun-Drenched Window Booths',
    category: 'Ambiance & Spaces',
    description: 'Comfortable booth seating facing the balcony door with afternoon light flooding the room.',
    span: 'col-span-1 sm:col-span-2',
    aspect: 'aspect-[16/9]',
  },
];

const CATEGORIES = ['All', 'Ambiance & Spaces', 'Culinary & Bakes', 'Balcony & Outdoors'];

export default function PhotoGallery() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Scroll reveal animation
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.gallery-card') || [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  // Lightbox keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filteredItems.length]);

  // Desktop 3D Tilt handler
  const handleMouseMove = (e, cardEl) => {
    if (window.innerWidth < 1024) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (cardEl) => {
    if (window.innerWidth < 1024) return;
    cardEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#FDFBF7] relative overflow-hidden border-t border-beige/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="editorial-badge mb-3.5">
              <Camera className="w-3.5 h-3.5 text-caramel" />
              <span>Cinematic Visuals</span>
            </div>
            <h2 className="editorial-heading text-3xl sm:text-4xl md:text-5xl font-serif">
              Life on The Balcony
            </h2>
            <p className="mt-3 text-cafeDark/75 font-sans text-sm sm:text-base leading-relaxed">
              Real moments captured across our sunlit terraces, warm wooden cabin lounge, and specialty artisan kitchen in Jalandhar.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-coffee text-ivory shadow-md'
                    : 'bg-ivory/80 text-cafeDark/75 hover:bg-beige/40 border border-beige/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Irregular Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-card ${item.span} group relative rounded-3xl overflow-hidden glass-card-warm border border-beige/80 shadow-luxury transition-all duration-500 cursor-pointer`}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              onClick={() => setLightboxIndex(index)}
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
              }}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-beige/30`}>
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108 will-change-transform"
                  loading="lazy"
                />

                {/* Subtle Editorial Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/80 via-cafeDark/20 to-transparent opacity-40 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="glass-card !bg-white/90 text-cafeDark text-[10px] uppercase font-sans font-semibold tracking-wider px-3 py-1 rounded-full border border-beige shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ivory/85 text-cafeDark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-md">
                  <Maximize2 className="w-4 h-4 text-coffee" />
                </div>

                {/* Bottom Caption Reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-ivory transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold leading-snug drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-xs text-beige/90 font-sans mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-14 pt-8 border-t border-beige/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cafeDark/70">
          <p>
            Showing {filteredItems.length} authentic photos captured at The Balcony Cafe, Jalandhar.
          </p>
          <a
            href="#visit"
            className="text-coffee font-semibold hover:text-caramel transition-colors flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>Visit Us In Person</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-cafeDark/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar with Counter and Close Button */}
          <div
            className="absolute top-5 left-6 right-6 flex items-center justify-between text-ivory z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-beige">
              <span>{lightboxIndex + 1} / {filteredItems.length}</span>
              <span>&bull;</span>
              <span>{filteredItems[lightboxIndex].category}</span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-ivory transition-colors border border-white/20"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-ivory transition-all border border-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Lightbox Media Frame */}
          <div
            className="relative max-w-4xl max-h-[82vh] w-full flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/40">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center text-ivory max-w-2xl px-4">
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-beige/85 font-sans mt-1">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-ivory transition-all border border-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
