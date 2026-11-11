import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Utensils, ArrowUpRight, Flame, Coffee, Compass } from 'lucide-react';
import CoffeeBean3D from './CoffeeBean3D';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    id: 'mezze',
    number: '01',
    bgWordTop: 'ARTISANAL',
    bgWordBottom: 'MEZZE',
    tag: 'Signature Plates',
    title: 'The Mediterranean Mezze Platter',
    description: 'Velvety house-blended chickpea hummus, warm stone-baked pita breads, golden herb falafel, sliced avocado, and sun-ripened tomatoes.',
    image: '/assets/images/unnamed.webp',
    accentNote: 'Fresh Daily &bull; Sharing Plate',
    bgColor: '#FAF7F0',
  },
  {
    id: 'pizza',
    number: '02',
    bgWordTop: 'WOOD-FIRED',
    bgWordBottom: 'CRISP',
    tag: 'Oven Classics',
    title: 'Farmhouse Hearth Pizza & Fries',
    description: 'Hand-stretched thin crust baked to bubbling perfection with bell peppers, mushrooms, kalamata olives, melted mozzarella, and crisp golden fries.',
    image: '/assets/images/unnamed (7).webp',
    accentNote: 'Stone Baked &bull; Crisp Crust',
    bgColor: '#F6EFE6',
  },
  {
    id: 'pasta',
    number: '03',
    bgWordTop: 'GOURMET',
    bgWordBottom: 'AGLIO OLIO',
    tag: 'Culinary Mains',
    title: 'Herb-Crusted Cutlet & Aglio Olio',
    description: 'Pan-seared herb-dusted cutlet served alongside twirled garlic spaghetti aglio e olio, accompanied by velvety house dipping sauce.',
    image: '/assets/images/unnamed (3).webp',
    accentNote: 'Chef Selection &bull; Slow Braised',
    bgColor: '#F2ECE0',
  },
  {
    id: 'coffee',
    number: '04',
    bgWordTop: 'ESPRESSO',
    bgWordBottom: 'SANCTUARY',
    tag: 'The Roastery',
    title: 'The Artisan Coffee House Bar',
    description: 'Our illuminated warm timber bar where baristas pull single-origin espressos, prepare silky pour-overs, and present freshly baked pastries.',
    image: '/assets/images/unnamed (10).webp',
    accentNote: '100% Arabica &bull; Handcrafted',
    bgColor: '#F8F3EA',
  },
];

export default function CinematicShowcase() {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const bgLayerRef = useRef(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Mouse tilt refs for active 3D card
  const activeDishRefs = useRef([]);
  const ctaBtnRefs = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const scenes = containerRef.current.querySelectorAll('.showcase-slide');
      const bgWordsTop = containerRef.current.querySelectorAll('.bg-word-top');
      const bgWordsBottom = containerRef.current.querySelectorAll('.bg-word-bottom');
      const dishFrames = containerRef.current.querySelectorAll('.dish-3d-frame');
      const contentBlocks = containerRef.current.querySelectorAll('.slide-content');
      const fastBeans = containerRef.current.querySelectorAll('.scroll-bean-fast');
      const slowBeans = containerRef.current.querySelectorAll('.scroll-bean-slow');

      // Pin master timeline
      const totalScenes = SCENES.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinWrapRef.current,
          start: 'top top',
          end: `+=${totalScenes * 115}%`,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              totalScenes - 1,
              Math.floor(self.progress * totalScenes)
            );
            setActiveSceneIndex(index);
          },
        },
      });

      // Layered multi-speed parallax on floating coffee beans
      gsap.to(fastBeans, {
        y: '+=380',
        rotation: '+=420',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScenes * 115}%`,
          scrub: 1.8,
        },
      });

      gsap.to(slowBeans, {
        y: '+=180',
        rotation: '-=240',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScenes * 115}%`,
          scrub: 2.4,
        },
      });

      // Chain scene transitions with 3D perspective and dynamic scale
      SCENES.forEach((scene, i) => {
        if (i === 0) {
          gsap.set(scenes[0], { opacity: 1, visibility: 'visible' });
          gsap.set(dishFrames[0], { scale: 1, opacity: 1, rotateY: 0, rotateX: 0 });
          return;
        }

        const prevIndex = i - 1;

        // Transition: Previous scene leaves with 3D rotation, current scene enters
        tl.to(
          dishFrames[prevIndex],
          {
            scale: 0.82,
            opacity: 0,
            y: -75,
            rotateX: 16,
            rotateY: -8,
            duration: 1.25,
            ease: 'power2.inOut',
          },
          `scene-${i}`
        )
          .to(
            contentBlocks[prevIndex],
            {
              opacity: 0,
              y: -45,
              duration: 0.95,
              ease: 'power2.inOut',
            },
            `scene-${i}`
          )
          .to(
            bgWordsTop[prevIndex],
            { x: -180, opacity: 0, duration: 1.2, ease: 'power2.inOut' },
            `scene-${i}`
          )
          .to(
            bgWordsBottom[prevIndex],
            { x: 180, opacity: 0, duration: 1.2, ease: 'power2.inOut' },
            `scene-${i}`
          )
          // Background color morph
          .to(
            bgLayerRef.current,
            {
              backgroundColor: scene.bgColor,
              duration: 1.2,
              ease: 'power2.out',
            },
            `scene-${i}`
          )
          // New scene appears
          .fromTo(
            scenes[i],
            { opacity: 0, visibility: 'hidden' },
            { opacity: 1, visibility: 'visible', duration: 0.25 },
            `scene-${i}+=0.3`
          )
          .fromTo(
            dishFrames[i],
            {
              scale: 1.18,
              opacity: 0,
              y: 90,
              rotateX: -14,
              rotateY: 12,
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 1.35,
              ease: 'power3.out',
            },
            `scene-${i}+=0.3`
          )
          .fromTo(
            contentBlocks[i],
            { opacity: 0, y: 55 },
            { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
            `scene-${i}+=0.4`
          )
          .fromTo(
            bgWordsTop[i],
            { x: 180, opacity: 0 },
            { x: 0, opacity: 0.18, duration: 1.4, ease: 'power2.out' },
            `scene-${i}+=0.2`
          )
          .fromTo(
            bgWordsBottom[i],
            { x: -180, opacity: 0 },
            { x: 0, opacity: 0.18, duration: 1.4, ease: 'power2.out' },
            `scene-${i}+=0.2`
          );
      });
    }, containerRef);

    // Mouse-following 3D tilt on desktop
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const tiltX = (clientY - centerY) / centerY;
      const tiltY = (clientX - centerX) / centerX;

      const currentDish = activeDishRefs.current[activeSceneIndex];
      if (currentDish) {
        gsap.to(currentDish, {
          rotateX: -tiltX * 12,
          rotateY: tiltY * 12,
          transformPerspective: 1100,
          boxShadow: `${-tiltY * 28}px ${tiltX * 28 + 25}px 50px -15px rgba(62, 39, 35, 0.24)`,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, [activeSceneIndex]);

  // Magnetic button hover handler
  const handleBtnMouseMove = (e, idx) => {
    const btn = ctaBtnRefs.current[idx];
    if (window.innerWidth < 1024 || !btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;
  };

  const handleBtnMouseLeave = (idx) => {
    const btn = ctaBtnRefs.current[idx];
    if (!btn) return;
    btn.style.transform = 'translate3d(0, 0, 0)';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative w-full bg-ivory overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen min-h-[700px] max-h-[1100px] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Color Layer */}
        <div
          ref={bgLayerRef}
          className="absolute inset-0 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: SCENES[0].bgColor }}
        />

        {/* Ambient Warm Vignette */}
        <div className="absolute inset-0 bg-ambient-warmth opacity-60 pointer-events-none" />

        {/* Multi-Layer Speed Parallax 3D Coffee Beans in Background */}
        <div className="absolute top-16 left-12 scroll-bean-fast hidden sm:block">
          <CoffeeBean3D size={32} rotate={-25} />
        </div>
        <div className="absolute top-1/3 right-16 scroll-bean-slow hidden md:block">
          <CoffeeBean3D size={44} rotate={45} />
        </div>
        <div className="absolute bottom-24 left-24 scroll-bean-fast hidden sm:block">
          <CoffeeBean3D size={28} rotate={75} />
        </div>
        <div className="absolute bottom-1/4 right-32 scroll-bean-slow hidden lg:block">
          <CoffeeBean3D size={38} rotate={-55} />
        </div>

        {/* Sticky Header / Section Eyebrow */}
        <div className="absolute top-6 sm:top-8 left-0 right-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="editorial-badge pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-caramel" />
              <span>Cinematic Culinary Moments</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-coffee font-medium">
              <span>Scroll to Transition</span>
              <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-ping"></span>
            </div>
          </div>
        </div>

        {/* Progress Tracker (Right Side) */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              className="flex items-center gap-2.5 cursor-pointer group p-1"
              onClick={() => {
                const trigger = ScrollTrigger.getById(containerRef.current);
                if (trigger) {
                  const targetScroll =
                    trigger.start +
                    (trigger.end - trigger.start) * (idx / (SCENES.length - 1));
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
              }}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  activeSceneIndex === idx
                    ? 'w-8 h-2 bg-coffee shadow-sm'
                    : 'w-2 h-2 bg-coffee/25 group-hover:bg-caramel'
                }`}
              />
              <span
                className={`text-[10px] font-sans font-semibold tracking-wider transition-colors hidden md:block ${
                  activeSceneIndex === idx
                    ? 'text-coffee opacity-100 font-bold'
                    : 'text-coffee/40 opacity-0 group-hover:opacity-100'
                }`}
              >
                {scene.number}
              </span>
            </div>
          ))}
        </div>

        {/* Scene Slides Staging Area */}
        <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {SCENES.map((scene, index) => (
            <div
              key={scene.id}
              className={`showcase-slide absolute inset-0 flex items-center justify-center pointer-events-none ${
                index === 0 ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              style={{ zIndex: 10 + index }}
            >
              {/* Massive Typographic Letters Behind Food with Horizontal Parallax */}
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden opacity-20 sm:opacity-25">
                <span className="bg-word-top font-serif font-bold text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] leading-none tracking-tighter text-coffee/70 whitespace-nowrap will-change-transform">
                  {scene.bgWordTop}
                </span>
                <span className="bg-word-bottom font-serif italic font-light text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] leading-none tracking-tight text-caramel/80 whitespace-nowrap -mt-4 sm:-mt-8 will-change-transform">
                  {scene.bgWordBottom}
                </span>
              </div>

              {/* Main Content Grid: Dish Centerpiece + Editorial Narrative */}
              <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pointer-events-auto">
                
                {/* Left Side: 3D Layered Framed Food Presentation */}
                <div className="lg:col-span-7 flex justify-center items-center order-2 lg:order-1">
                  <div
                    ref={(el) => (activeDishRefs.current[index] = el)}
                    className="dish-3d-frame relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-[4/3] rounded-3xl p-3 sm:p-4 bg-white/70 backdrop-blur-xl border-2 border-white/90 shadow-luxury-lg transition-transform will-change-transform"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1100,
                    }}
                  >
                    {/* Inner Picture Container with Luxury Border */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-beige/40 shadow-inner group">
                      <img
                        src={scene.image}
                        alt={scene.title}
                        className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-108 will-change-transform"
                        loading="eager"
                      />

                      {/* Subtle Edge Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cafeDark/50 via-transparent to-transparent opacity-60 pointer-events-none" />

                      {/* Corner Live Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="glass-card !bg-white/90 px-3.5 py-1.5 rounded-full text-cafeDark font-sans text-[11px] font-semibold tracking-wider uppercase border border-beige flex items-center gap-1.5 shadow-sm">
                          <Utensils className="w-3.5 h-3.5 text-caramel" />
                          <span>The Balcony Kitchen</span>
                        </span>
                      </div>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-ivory">
                        <span
                          className="text-xs font-serif italic text-white drop-shadow"
                          dangerouslySetInnerHTML={{ __html: scene.accentNote }}
                        />
                        <span className="text-[10px] font-sans tracking-ultra uppercase text-beige font-semibold">
                          Jalandhar, PB
                        </span>
                      </div>
                    </div>

                    {/* Floating 3D Accent Badge */}
                    <div
                      className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-4 glass-card-warm p-3 sm:p-4 rounded-2xl shadow-luxury border border-beige flex items-center gap-3 z-30"
                      style={{ transform: 'translateZ(35px)' }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-caramel/20 flex items-center justify-center text-caramel font-serif font-bold text-sm">
                        {scene.number}
                      </div>
                      <div>
                        <p className="text-[10px] font-sans uppercase tracking-widest text-caramel font-semibold">
                          Crafted Special
                        </p>
                        <p className="font-serif text-xs sm:text-sm font-semibold text-cafeDark truncate">
                          {scene.tag}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Editorial Narrative & Description */}
                <div className="slide-content lg:col-span-5 flex flex-col justify-center text-left order-1 lg:order-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1.5px] bg-caramel" />
                    <span className="text-xs font-sans tracking-widest uppercase text-coffee font-semibold">
                      {scene.tag}
                    </span>
                  </div>

                  <h3 className="editorial-heading text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-cafeDark">
                    {scene.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-cafeDark/80 font-sans leading-relaxed">
                    {scene.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-beige/80 flex items-center gap-5">
                    <a
                      ref={(el) => (ctaBtnRefs.current[index] = el)}
                      href="#menu"
                      onMouseMove={(e) => handleBtnMouseMove(e, index)}
                      onMouseLeave={() => handleBtnMouseLeave(index)}
                      className="btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2 will-change-transform shadow-sm"
                    >
                      <span>Explore Menu</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#visit"
                      className="text-xs font-sans uppercase tracking-wider font-semibold text-cafeDark/80 hover:text-coffee transition-colors"
                    >
                      Taste At The Balcony &rarr;
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
