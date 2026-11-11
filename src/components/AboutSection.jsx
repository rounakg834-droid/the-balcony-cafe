import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Coffee, Sun, Wind, ArrowRight, Compass } from 'lucide-react';
import CoffeeBean3D from './CoffeeBean3D';
import { CAFE_DATA } from '../constants/cafeData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const imageFrameRef = useRef(null);
  const mainImageRef = useRef(null);
  const floatingBadgeRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Staggered text reveal on scroll
      gsap.fromTo(
        textColRef.current?.children || [],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Clip-path expanding reveal for the primary cafe photo
      gsap.fromTo(
        imageFrameRef.current,
        {
          clipPath: 'inset(14% 0% 14% 0% round 24px)',
          scale: 0.94,
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Smooth scroll parallax on main cafe image
      gsap.to(mainImageRef.current, {
        y: 45,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      // Floating badge parallax
      gsap.to(floatingBadgeRef.current, {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#FDFBF7] overflow-hidden border-t border-beige/60"
    >
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-caramel/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-coffee/10 blur-3xl pointer-events-none" />

      {/* Floating 3D Coffee Beans in Background */}
      <div className="absolute top-20 right-16 opacity-35 pointer-events-none hidden lg:block">
        <CoffeeBean3D size={34} rotate={-35} />
      </div>
      <div className="absolute bottom-24 left-10 opacity-30 pointer-events-none hidden lg:block">
        <CoffeeBean3D size={40} rotate={60} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two-Column Editorial Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Real Cafe Photograph with Parallax and Premium Clip-Path Frame */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageFrameRef}
              className="relative rounded-3xl p-3 sm:p-4 glass-card-warm border-2 border-white/90 shadow-luxury-lg overflow-hidden group will-change-transform"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/12] rounded-2xl overflow-hidden bg-beige/30">
                <img
                  ref={mainImageRef}
                  src="/assets/images/unnamed (2).webp"
                  alt="The Balcony Cafe warm wooden cabin dining room in Jalandhar"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-108 will-change-transform"
                  loading="lazy"
                />

                {/* Light Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/50 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Image Live Location Stamp */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
                  <span className="glass-card !bg-white/90 !text-cafeDark text-[11px] font-sans font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-beige shadow-sm">
                    Lounge &bull; Interior
                  </span>
                  <span className="text-xs font-sans tracking-widest uppercase text-ivory drop-shadow-md">
                    The Balcony Cafe
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Decorative Glass Badge */}
            <div
              ref={floatingBadgeRef}
              className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:right-6 glass-card-warm p-4 sm:p-5 rounded-2xl shadow-luxury-lg border border-beige/90 flex items-center gap-3.5 z-20 will-change-transform"
            >
              <div className="w-11 h-11 rounded-xl bg-caramel/20 flex items-center justify-center text-caramel">
                <Heart className="w-5 h-5 fill-caramel/40" />
              </div>
              <div>
                <p className="font-serif text-sm sm:text-base font-bold text-cafeDark">
                  A Quiet Oasis
                </p>
                <p className="text-[11px] font-sans text-cafeDark/70 tracking-wide">
                  Jalandhar, Punjab
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Typography & Promotional Narrative */}
          <div ref={textColRef} className="lg:col-span-6 space-y-6 text-left">
            
            {/* Pill Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="editorial-badge">
                <Sparkles className="w-3.5 h-3.5 text-caramel" />
                <span>The Atmosphere &bull; Jalandhar</span>
              </span>
            </div>

            {/* Requested Exact Large Headline */}
            <h2 className="editorial-heading text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-[1.1] text-cafeDark">
              More Than Just Coffee
            </h2>

            {/* Decorative Divider */}
            <div className="w-20 h-0.5 bg-caramel/60 rounded-full" />

            {/* Staggered Narrative Paragraphs */}
            <p className="text-cafeDark/80 font-sans text-base sm:text-lg leading-relaxed pt-2">
              Perched above the bustling energy of Jalandhar, <strong className="font-semibold text-cafeDark">The Balcony Cafe</strong> is designed as a peaceful retreat where time slows down. Natural light streams through wooden alcoves, the aroma of freshly ground Arabica fills the air, and breezy balcony seating offers panoramic street vistas.
            </p>

            <p className="text-cafeDark/75 font-sans text-sm sm:text-base leading-relaxed">
              Whether you are settling in with a morning pour-over, unwinding over wood-fired stone pizzas, or gathering for laughter at dusk under fairy-lit railings, every corner is curated to bring comfort and warmth to your daily rhythm.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-ivory/90 border border-beige/80 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-caramel/15 text-caramel flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-cafeDark">Sunlit Balcony</h4>
                  <p className="text-xs text-cafeDark/70 mt-0.5">Open-air deck with natural light & breezes</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-ivory/90 border border-beige/80 shadow-sm flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-coffee/15 text-coffee flex items-center justify-center shrink-0">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-cafeDark">Artisanal Brews</h4>
                  <p className="text-xs text-cafeDark/70 mt-0.5">Single-origin beans & slow extractions</p>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#gallery"
                className="btn-primary group"
              >
                <span>View Photo Gallery</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#visit"
                className="btn-outline"
              >
                <span>Plan Your Visit</span>
              </a>
            </div>

          </div>

        </div>

        {/* Cafe Value Stats Row */}
        <div className="mt-20 pt-12 border-t border-beige/80 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
