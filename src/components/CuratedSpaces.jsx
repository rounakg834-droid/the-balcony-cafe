import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Eye, MapPin, Sparkles, Layers } from 'lucide-react';
import { CAFE_IMAGES } from '../constants/images';

gsap.registerPlugin(ScrollTrigger);

const SPACES = [
  {
    title: 'The Open-Air Balcony',
    subtitle: 'Panoramic Terrace Vistas',
    description: 'Bask in gentle afternoon breezes and golden hour skies overlooking the city from our signature balcony deck.',
    image: CAFE_IMAGES.terraceView,
    tag: 'Signature Space',
  },
  {
    title: 'The Slow Coffee Bar',
    subtitle: 'Artisanal Extraction',
    description: 'Watch our baristas dial in exquisite single-origin Arabica roasts through manual pour-overs and silky espressos.',
    image: CAFE_IMAGES.delight1,
    tag: 'Craft & Brew',
  },
  {
    title: 'The Intimate Alcoves',
    subtitle: 'Cozy Corners & Natural Light',
    description: 'Designed for quiet reading, relaxed work sessions, and intimate conversations with handcrafted cafe delicacies.',
    image: CAFE_IMAGES.featureVertical2,
    tag: 'Quiet Comfort',
  },
];

export default function CuratedSpaces() {
  const containerRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.space-card') || [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={containerRef} className="py-24 sm:py-32 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="editorial-badge mb-3.5">
              <Layers className="w-3.5 h-3.5 text-caramel" />
              <span>Spaces & Atmosphere</span>
            </div>
            <h2 className="editorial-heading text-3xl sm:text-4xl md:text-5xl font-serif">
              Crafted Corners for Every Mood
            </h2>
          </div>
          <p className="text-cafeDark/70 max-w-sm text-sm sm:text-base font-sans">
            Every table at The Balcony Cafe is bathed in warm natural light, designed to foster lingering conversations and mindful coffee moments.
          </p>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPACES.map((space, index) => (
            <div
              key={index}
              className="space-card group rounded-3xl overflow-hidden glass-card-warm border border-beige/80 transition-all duration-500 hover:shadow-luxury-lg hover:-translate-y-1.5 flex flex-col"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-beige/30">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/50 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="glass-card !bg-white/85 text-[10px] uppercase font-sans font-semibold tracking-ultra text-coffee px-3 py-1 rounded-full border border-white">
                    {space.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-sans tracking-widest uppercase text-caramel font-semibold mb-1">
                    {space.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-cafeDark mb-3">
                    {space.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cafeDark/75 font-sans leading-relaxed">
                    {space.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-beige/60 flex items-center justify-between text-xs font-sans">
                  <span className="text-cafeDark/60 uppercase tracking-wider">Jalandhar, India</span>
                  <a
                    href="#visit"
                    className="text-coffee font-semibold group-hover:text-caramel transition-colors flex items-center gap-1"
                  >
                    <span>Experience Space</span>
                    <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
