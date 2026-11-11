import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MapPin, Clock, Compass, ArrowDown, Coffee } from 'lucide-react';
import { CAFE_IMAGES } from '../constants/images';
import CoffeeBean3D from './CoffeeBean3D';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const mainImageWrapperRef = useRef(null);
  const mainImageRef = useRef(null);
  const floatingCard1Ref = useRef(null);
  const floatingCard2Ref = useRef(null);
  const decorativePillRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            badgeRef.current,
            headlineRef.current,
            descRef.current,
            ctaGroupRef.current,
            mainImageWrapperRef.current,
            floatingCard1Ref.current,
            floatingCard2Ref.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // Master Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, delay: 0.15 }
      );

      // Split-line / word masked reveal on headline
      const words = headlineRef.current?.querySelectorAll('.hero-mask-word');
      if (words && words.length) {
        tl.fromTo(
          words,
          { y: '120%', opacity: 0, rotateX: 18 },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.05,
            ease: 'power4.out',
          },
          '-=0.6'
        );
      }

      // Editorial description fade-up
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.7'
      );

      // CTA Group
      tl.fromTo(
        ctaGroupRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      );

      // Main image frame reveal with clip-path & smooth scale
      tl.fromTo(
        mainImageWrapperRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: 40,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'expo.out',
        },
        '-=1.0'
      );

      // Floating accent cards stagger entrance
      tl.fromTo(
        [floatingCard1Ref.current, floatingCard2Ref.current],
        { opacity: 0, y: 45, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: 'back.out(1.5)',
        },
        '-=0.8'
      );

      // Decorative pill badge
      tl.fromTo(
        decorativePillRef.current,
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      );

      // Scroll indicator reveal
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // Floating gentle animation for accent cards
      gsap.to(floatingCard1Ref.current, {
        y: '-=12',
        rotation: '-=1.5',
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(floatingCard2Ref.current, {
        y: '+=10',
        rotation: '+=1.5',
        duration: 4.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6,
      });

      // Scroll-triggered layered parallax on hero elements
      gsap.to(mainImageWrapperRef.current, {
        y: 70,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to([floatingCard1Ref.current, floatingCard2Ref.current], {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.6,
        },
      });
    }, heroRef);

    // Mouse-following 3D Parallax on Desktop
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      if (floatingCard1Ref.current) {
        gsap.to(floatingCard1Ref.current, {
          x: moveX * -20,
          y: moveY * -20,
          rotate: moveX * 2.5,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      if (floatingCard2Ref.current) {
        gsap.to(floatingCard2Ref.current, {
          x: moveX * 22,
          y: moveY * 22,
          rotate: moveX * -2.5,
          duration: 1.4,
          ease: 'power2.out',
        });
      }
      if (mainImageWrapperRef.current) {
        gsap.to(mainImageWrapperRef.current, {
          rotateY: moveX * 4,
          rotateX: -moveY * 4,
          duration: 1.6,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  // Magnetic button hover effect
  const handleBtnMouseMove = (e, btnRef) => {
    if (window.innerWidth < 1024 || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
  };

  const handleBtnMouseLeave = (btnRef) => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate3d(0, 0, 0)';
    btnRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 flex flex-col justify-center bg-ambient-warmth overflow-hidden"
    >
      {/* Decorative Warm Ambient Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4">
          <div className="border-r border-beige/40 h-full col-span-2 lg:col-span-3 hidden sm:block"></div>
          <div className="border-r border-beige/40 h-full col-span-2 lg:col-span-6"></div>
          <div className="border-r border-beige/40 h-full col-span-2 lg:col-span-3 hidden sm:block"></div>
        </div>
      </div>

      {/* Floating 3D Coffee Beans in Hero Atmosphere */}
      <div className="absolute top-28 right-16 opacity-30 pointer-events-none hidden lg:block">
        <CoffeeBean3D size={34} rotate={35} />
      </div>
      <div className="absolute bottom-28 left-14 opacity-25 pointer-events-none hidden lg:block">
        <CoffeeBean3D size={42} rotate={-45} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline with Split-Word Masks */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            
            {/* Pill Badge */}
            <div ref={badgeRef} className="mb-5 sm:mb-6 flex items-center">
              <span className="editorial-badge">
                <Sparkles className="w-3.5 h-3.5 text-caramel" />
                <span>The Balcony Cafe &bull; Jalandhar</span>
              </span>
            </div>

            {/* Split-Word Editorial Headline */}
            <h1
              ref={headlineRef}
              className="editorial-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-medium leading-[1.08] text-cafeDark"
            >
              <span className="block overflow-hidden py-0.5">
                <span className="hero-mask-word inline-block mr-3">Where</span>
                <span className="hero-mask-word inline-block mr-3">Warm</span>
                <span className="hero-mask-word inline-block">Light</span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-mask-word inline-block mr-3 italic font-light text-coffee font-serif">
                  Meets
                </span>
                <span className="hero-mask-word inline-block mr-3 italic font-light text-coffee font-serif">
                  The
                </span>
                <span className="hero-mask-word inline-block italic font-light text-coffee font-serif">
                  Art
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span className="hero-mask-word inline-block mr-3">Of</span>
                <span className="hero-mask-word inline-block mr-3">Specialty</span>
                <span className="hero-mask-word inline-block">Coffee.</span>
              </span>
            </h1>

            {/* Editorial Description */}
            <p
              ref={descRef}
              className="mt-6 text-base sm:text-lg text-cafeDark/75 font-sans font-normal max-w-xl leading-relaxed"
            >
              Perched above the vibrant avenues of Jalandhar, The Balcony Cafe invites you into sun-dappled terraces, artisanal roasts, and unhurried conversations crafted for discerning palates.
            </p>

            {/* Magnetic CTA Group */}
            <div
              ref={ctaGroupRef}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <a
                ref={primaryBtnRef}
                href="#showcase"
                onMouseMove={(e) => handleBtnMouseMove(e, primaryBtnRef)}
                onMouseLeave={() => handleBtnMouseLeave(primaryBtnRef)}
                className="btn-primary group will-change-transform"
              >
                <span>Explore Cafe</span>
                <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>

              <a
                ref={secondaryBtnRef}
                href="#menu"
                onMouseMove={(e) => handleBtnMouseMove(e, secondaryBtnRef)}
                onMouseLeave={() => handleBtnMouseLeave(secondaryBtnRef)}
                className="btn-outline group will-change-transform"
              >
                <span>View Menu</span>
                <Sparkles className="w-4 h-4 text-caramel transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>

            {/* Feature Ticker */}
            <div className="mt-12 pt-8 border-t border-beige/80 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-coffee">100%</p>
                <p className="text-xs uppercase tracking-wider text-cafeDark/70 font-sans mt-0.5">Artisanal Arabica</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-semibold text-coffee">Open-Air</p>
                <p className="text-xs uppercase tracking-wider text-cafeDark/70 font-sans mt-0.5">Panoramic Balcony</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-serif text-xl sm:text-2xl font-semibold text-coffee">Fresh Daily</p>
                <p className="text-xs uppercase tracking-wider text-cafeDark/70 font-sans mt-0.5">Handmade Bakes</p>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Visual Composition with Real Cafe Imagery */}
          <div className="lg:col-span-6 xl:col-span-6 relative mt-6 lg:mt-0 flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Showcase Image Frame with 3D Depth */}
              <div
                ref={mainImageWrapperRef}
                className="relative z-10 rounded-3xl p-3 sm:p-3.5 glass-card-warm border-[3px] border-white/90 shadow-luxury-lg group will-change-transform"
                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-beige/30">
                  <img
                    ref={mainImageRef}
                    src={CAFE_IMAGES.heroMain}
                    alt="The Balcony Cafe atmospheric dining space in Jalandhar"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-108 will-change-transform"
                    loading="eager"
                  />
                  {/* Subtle Light Editorial Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/45 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  
                  {/* Live Status Pill on Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
                    <div className="glass-card !bg-white/85 !border-white/70 px-3.5 py-1.5 rounded-full text-cafeDark flex items-center gap-2 shadow-soft">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] font-sans font-semibold tracking-wider uppercase">
                        Welcoming Guests Today
                      </span>
                    </div>
                    <span className="text-xs font-sans tracking-widest uppercase text-ivory drop-shadow-md">
                      Jalandhar, PB
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card 1: Top-Left / Offset */}
              <div
                ref={floatingCard1Ref}
                className="absolute -top-6 -left-4 sm:-top-10 sm:-left-8 z-20 w-36 sm:w-44 rounded-2xl p-2 glass-card-warm shadow-luxury border border-beige/80 transition-transform hidden xs:block will-change-transform"
              >
                <div className="rounded-xl overflow-hidden aspect-[3/4] mb-2 bg-beige/30">
                  <img
                    src={CAFE_IMAGES.heroAccent1}
                    alt="Signature Balcony Cafe Brew"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-1 py-0.5">
                  <p className="text-[10px] font-sans uppercase tracking-ultra text-caramel font-semibold">Morning Brew</p>
                  <p className="font-serif text-xs font-semibold text-cafeDark truncate">Fresh Pour-Over</p>
                </div>
              </div>

              {/* Floating Accent Card 2: Bottom-Right / Offset */}
              <div
                ref={floatingCard2Ref}
                className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-8 z-20 w-40 sm:w-52 rounded-2xl p-2.5 glass-card-warm shadow-luxury-lg border border-beige/80 hidden xs:block will-change-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-beige bg-beige/30">
                    <img
                      src={CAFE_IMAGES.heroAccent2}
                      alt="The Balcony Cafe terrace corner"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-caramel text-[10px] uppercase tracking-wider font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>Golden Hour</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm font-semibold text-cafeDark truncate mt-0.5">
                      Terrace Vistas
                    </p>
                    <p className="text-[10px] text-cafeDark/60 truncate">Open-air comfort</p>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Pill */}
              <div
                ref={decorativePillRef}
                className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 glass-card px-4 py-2 rounded-full shadow-soft border border-beige hidden md:flex items-center gap-2 text-cafeDark"
              >
                <span className="text-coffee font-serif italic text-sm">Elevated</span>
                <span className="text-xs font-sans tracking-widest uppercase text-caramel">&bull; Experience</span>
              </div>

            </div>
          </div>

        </div>

        {/* Polished Scroll Down Indicator with Magnetic Click */}
        <div
          ref={scrollIndicatorRef}
          className="mt-16 sm:mt-20 flex flex-col items-center justify-center text-center cursor-pointer group"
          onClick={() => {
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection) showcaseSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-ultra text-coffee/80 group-hover:text-caramel transition-colors">
            Scroll To Discover
          </span>
          <div className="mt-2.5 w-5 h-9 rounded-full border border-coffee/35 flex items-start justify-center p-1.5 group-hover:border-caramel transition-colors">
            <span className="w-1 h-2.5 rounded-full bg-caramel animate-bounce"></span>
          </div>
        </div>

      </div>
    </section>
  );
}
