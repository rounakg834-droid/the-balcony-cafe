import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Coffee, Sun, Wind, ArrowRight } from 'lucide-react';
import { CAFE_IMAGES } from '../constants/images';
import { CAFE_DATA } from '../constants/cafeData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const imageGridRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Fade in & slide up text column
      gsap.fromTo(
        textColRef.current?.children || [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered reveal of image cards
      const cards = imageGridRef.current?.querySelectorAll('.about-card') || [];
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax scroll on decorative floating badge
      const floatingBadge = imageGridRef.current?.querySelector('.about-badge');
      if (floatingBadge) {
        gsap.to(floatingBadge, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Stats reveal
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 bg-[#FDFBF7] overflow-hidden border-t border-beige/40"
    >
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-caramel/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-coffee/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Eyebrow */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="editorial-badge mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>The Balcony Story</span>
          </div>
          <h2 className="editorial-heading text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
            A Sanctuary Above the Avenues of Jalandhar
          </h2>
          <div className="w-16 h-0.5 bg-caramel/50 mt-4 rounded-full" />
        </div>

        {/* 2-Column Editorial Story & Image Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Narrative */}
          <div ref={textColRef} className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl text-cafeDark leading-snug">
              Born from a quiet passion for honest coffee, warm sunlight, and unhurried afternoons.
            </h3>

            <p className="text-cafeDark/80 font-sans leading-relaxed text-sm sm:text-base">
              At <strong className="font-semibold text-cafeDark">The Balcony Cafe</strong>, we envisioned a space where the pace of Jalandhar gently softens. Perched to capture sweeping open breezes and golden terrace sunlight, our cafe is a celebration of mindful hospitality.
            </p>

            <p className="text-cafeDark/80 font-sans leading-relaxed text-sm sm:text-base">
              Every cup begins with meticulously sourced Arabica beans, expertly dialed in and pulled fresh. Whether you are finding your morning focus over a velvet flat white, sharing artisanal pastries with friends, or enjoying a tranquil golden hour above the city, The Balcony Cafe is your elevated second home.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-ivory/80 border border-beige/70 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-caramel/15 text-caramel flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-cafeDark">Open-Air Deck</h4>
                  <p className="text-xs text-cafeDark/70 mt-0.5">Balcony views and breezy seating</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-ivory/80 border border-beige/70 shadow-sm flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-coffee/15 text-coffee flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-cafeDark">Specialty Roasts</h4>
                  <p className="text-xs text-cafeDark/70 mt-0.5">Precision espresso & pour-overs</p>
                </div>
              </div>
            </div>

            {/* Action link */}
            <div className="pt-2">
              <a
                href="#visit"
                className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-coffee font-semibold hover:text-caramel transition-colors group"
              >
                <span>Plan Your Visit To The Cafe</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Layered Gallery Collage Using Local Cafe Images */}
          <div ref={imageGridRef} className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
              
              {/* Primary Large Image (Landscape) */}
              <div className="about-card col-span-12 sm:col-span-8 rounded-3xl overflow-hidden shadow-luxury border-[3px] border-white group">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={CAFE_IMAGES.aboutInterior1}
                    alt="The Balcony Cafe seating and warm ambiance"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/30 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-xs font-sans tracking-wider text-ivory/90 uppercase">
                    Interior Lounge &bull; The Balcony Cafe
                  </div>
                </div>
              </div>

              {/* Secondary Vertical Image */}
              <div className="about-card col-span-6 sm:col-span-4 rounded-2xl overflow-hidden shadow-luxury border-[3px] border-white group sm:-mt-8">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={CAFE_IMAGES.featureVertical1}
                    alt="Warm atmospheric details at The Balcony Cafe"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom Panoramic Balcony Atmosphere Image */}
              <div className="about-card col-span-12 sm:col-span-10 sm:col-start-2 rounded-2xl overflow-hidden shadow-luxury border-[3px] border-white group sm:-mt-6">
                <div className="aspect-[16/7] overflow-hidden relative">
                  <img
                    src={CAFE_IMAGES.aboutAtmosphere}
                    alt="Open-air balcony panoramic views in Jalandhar"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory">
                    <span className="text-xs font-serif italic text-white/90">
                      "Where conversation flows as effortlessly as the espresso."
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-beige font-sans hidden sm:inline">
                      Terrace Seating
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating Accolade Badge */}
            <div className="about-badge absolute -bottom-5 right-2 sm:right-6 glass-card-warm px-5 py-3 rounded-2xl shadow-luxury-lg border border-beige/90 flex items-center gap-3 z-20">
              <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel">
                <Heart className="w-5 h-5 fill-caramel/30" />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-cafeDark">Handcrafted Hospitality</p>
                <p className="text-[11px] font-sans text-cafeDark/70">Jalandhar, Punjab</p>
              </div>
            </div>

          </div>

        </div>

        {/* Cafe Value Stats Row */}
        <div
          ref={statsRef}
          className="mt-20 pt-12 border-t border-beige/70 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {CAFE_DATA.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-coffee">
                {stat.value}
              </span>
              <span className="font-sans text-xs sm:text-sm text-cafeDark/75 uppercase tracking-wider mt-2 max-w-[180px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
