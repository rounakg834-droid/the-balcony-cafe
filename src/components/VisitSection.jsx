import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Compass, Navigation, Share2, CheckCircle2, ArrowRight, Utensils } from 'lucide-react';
import { CAFE_DATA } from '../constants/cafeData';
import CoffeeBean3D from './CoffeeBean3D';
import { getAssetUrl } from '../constants/images';

gsap.registerPlugin(ScrollTrigger);

export default function VisitSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const parallaxImageRef = useRef(null);
  const floatingPinRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // Header smooth reveal
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Card entrance
      gsap.fromTo(
        cardRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Floating location icon animation
      gsap.to(floatingPinRef.current, {
        y: -14,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll-based parallax on image
      gsap.to(parallaxImageRef.current, {
        y: 45,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'The Balcony Cafe Jalandhar Punjab India'
  )}`;

  const instagramUrl = 'https://www.instagram.com/explore/tags/thebalconycafejalandhar/';

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#FAF7F0] border-t border-beige/60 relative overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-caramel/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 rounded-full bg-coffee/10 blur-3xl pointer-events-none" />

      {/* Floating 3D Coffee Bean */}
      <div className="absolute top-16 right-20 opacity-30 pointer-events-none hidden lg:block">
        <CoffeeBean3D size={36} rotate={-20} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="editorial-badge mb-3.5 inline-flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-caramel" />
            <span>Welcome to The Balcony</span>
          </div>

          {/* Client Requested Exact Heading */}
          <h2 className="editorial-heading text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight text-cafeDark">
            Your Table Is Waiting
          </h2>

          {/* Client Requested Exact Subtitle */}
          <p className="mt-4 text-cafeDark/75 font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Step inside, slow down, and enjoy the moment.
          </p>

          <div className="w-16 h-0.5 bg-caramel/50 mx-auto mt-5 rounded-full" />
        </div>

        {/* 2-Column Full-Width Card Grid */}
        <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: Location, Hours, Actions */}
          <div className="lg:col-span-7 glass-card-warm rounded-3xl p-8 sm:p-11 border border-beige/80 shadow-luxury flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Location Header with Floating Pin */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div
                  ref={floatingPinRef}
                  className="w-14 h-14 rounded-2xl bg-caramel/15 border border-caramel/30 flex items-center justify-center text-coffee shrink-0 shadow-soft"
                >
                  <MapPin className="w-7 h-7 text-caramel" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-caramel font-semibold">
                    Address &bull; Jalandhar
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-cafeDark mt-1">
                    The Balcony Cafe
                  </h3>
                  <p className="text-cafeDark/80 text-sm sm:text-base mt-1.5 leading-relaxed">
                    {CAFE_DATA.fullLocation}
                  </p>
                  <span className="inline-block mt-2.5 text-[11px] font-sans uppercase tracking-wider text-coffee font-semibold bg-coffee/10 px-3 py-1 rounded-full border border-coffee/20">
                    Model Town &bull; Central Jalandhar
                  </span>
                </div>
              </div>

              {/* Service Hours */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-coffee/15 border border-coffee/25 flex items-center justify-center text-coffee shrink-0 shadow-soft">
                  <Clock className="w-7 h-7 text-coffee" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-caramel font-semibold">
                    Operating Hours
                  </p>
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3.5 rounded-2xl bg-ivory/90 border border-beige/80">
                      <p className="font-medium text-cafeDark text-xs uppercase tracking-wider">Monday – Friday</p>
                      <p className="text-coffee font-semibold mt-1 text-sm">{CAFE_DATA.hours.weekdays}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-ivory/90 border border-beige/80">
                      <p className="font-medium text-cafeDark text-xs uppercase tracking-wider">Saturday – Sunday</p>
                      <p className="text-coffee font-semibold mt-1 text-sm">{CAFE_DATA.hours.weekends}</p>
                    </div>
                  </div>
                  <p className="text-xs text-cafeDark/65 mt-2 italic font-sans">
                    {CAFE_DATA.hours.note}
                  </p>
                </div>
              </div>

              {/* Features / Amenities Checkmarks */}
              <div>
                <p className="text-xs uppercase tracking-widest text-caramel font-semibold mb-3">
                  Visitor Amenities
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-cafeDark/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Open-Air Balcony</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Wooden Cabin Lounge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free High-Speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Air-Conditioned Hall</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ample Parking Space</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Walk-Ins Warmly Welcomed</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons: Get Directions, Explore Menu, Instagram */}
            <div className="mt-10 pt-6 border-t border-beige/80 flex flex-wrap items-center gap-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                <Navigation className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>Get Directions</span>
              </a>

              <a
                href="#menu"
                className="btn-outline group flex items-center gap-2"
              >
                <Utensils className="w-4 h-4 text-caramel" />
                <span>Explore Menu</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-caramel transition-transform group-hover:scale-110" />
                <span>Instagram</span>
              </a>

              <span className="text-[11px] text-cafeDark/60 italic w-full sm:w-auto">
                No reservation required &bull; Walk-ins warmly welcomed
              </span>
            </div>
          </div>

          {/* Card 2: Visual Parallax Framing with Real Local Cafe Night/Outdoor Photo */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-luxury border-[3px] border-white relative min-h-[420px] lg:min-h-full group bg-beige/30">
            <img
              ref={parallaxImageRef}
              src={getAssetUrl('assets/images/unnamed (11).webp')}
              alt="The Balcony Cafe night exterior and facade in Jalandhar"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 will-change-transform"
              loading="lazy"
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/85 via-cafeDark/30 to-transparent" />

            {/* Float Badge */}
            <div className="absolute top-5 left-5">
              <span className="glass-card !bg-white/90 text-[10px] uppercase font-sans font-semibold tracking-wider text-cafeDark px-3 py-1 rounded-full border border-white">
                Night Ambiance
              </span>
            </div>

            {/* Quote Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-ivory">
              <span className="editorial-badge !bg-white/20 !text-white !border-white/30 backdrop-blur-md mb-2 inline-block">
                Jalandhar's Elevated Terrace
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-medium leading-snug">
                "Under warm golden lights, every evening feels like a celebration."
              </h4>
              <p className="text-xs text-beige font-sans mt-2">
                Open every day for morning brews, brunch, and tranquil nights.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
