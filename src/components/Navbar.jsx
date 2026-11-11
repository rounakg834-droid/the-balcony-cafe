import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Coffee, MapPin, ArrowRight, Compass } from 'lucide-react';
import { CAFE_DATA } from '../constants/cafeData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const ctaBtnRef = useRef(null);

  // Scroll detection & active section spy
  useEffect(() => {
    const sectionIds = CAFE_DATA.navLinks.map((l) => l.id);

    const handleScroll = () => {
      // Navbar frosted glass trigger
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll spy: identify current section
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Magnetic CTA button effect for desktop
  const handleCtaMouseMove = (e) => {
    if (window.innerWidth < 1024 || !ctaBtnRef.current) return;
    const rect = ctaBtnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ctaBtnRef.current.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
  };

  const handleCtaMouseLeave = () => {
    if (!ctaBtnRef.current) return;
    ctaBtnRef.current.style.transform = 'translate3d(0, 0, 0)';
    ctaBtnRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const scrollTo = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-sm'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo / Branding */}
            <a
              href="#hero"
              onClick={(e) => scrollTo(e, '#hero')}
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-xl py-1 px-1.5 -ml-1.5 transition-colors"
              aria-label="The Balcony Cafe Home"
            >
              <div className="w-10 h-10 rounded-full bg-coffee/10 border border-beige/80 flex items-center justify-center text-coffee group-hover:bg-coffee group-hover:text-ivory transition-all duration-300 shadow-sm">
                <Coffee className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cafeDark leading-none">
                  The Balcony Cafe
                </span>
                <span className="font-sans text-[10px] tracking-ultra uppercase text-caramel font-semibold mt-1">
                  Jalandhar &bull; Punjab
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with Active Spy & Underline Animation */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main navigation">
              {CAFE_DATA.navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className={`font-sans text-xs tracking-widest uppercase transition-colors relative py-1 group ${
                      isActive
                        ? 'text-coffee font-semibold'
                        : 'text-cafeDark/75 hover:text-coffee font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-caramel transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Magnetic CTA Button */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                ref={ctaBtnRef}
                href="#visit"
                onClick={(e) => scrollTo(e, '#visit')}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                className="btn-primary text-xs !py-2.5 !px-5 transition-transform will-change-transform flex items-center gap-2 shadow-sm"
              >
                <span>Visit Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="#visit"
                onClick={(e) => scrollTo(e, '#visit')}
                className="text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full bg-coffee/10 text-coffee border border-beige"
              >
                Visit
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full bg-ivory/90 border border-beige text-cafeDark hover:bg-beige/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer / Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-cafeDark/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[84%] max-w-sm z-50 bg-[#FAF7F0] border-l border-beige shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-transform duration-400 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-beige">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-coffee/10 flex items-center justify-center text-caramel">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold text-cafeDark">The Balcony Cafe</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-beige/40 text-cafeDark transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="mt-8 flex flex-col gap-4">
            {CAFE_DATA.navLinks.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`font-serif text-2xl py-1.5 flex items-center justify-between border-b border-beige/40 transition-colors ${
                    isActive ? 'text-caramel font-semibold' : 'text-cafeDark hover:text-caramel'
                  }`}
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  <span className="flex items-center gap-2.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-caramel" />}
                    <span>{item.label}</span>
                  </span>
                  <span className="text-xs font-sans tracking-widest text-caramel/60 uppercase">
                    0{index + 1}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="pt-6 border-t border-beige/80 space-y-4">
          <div className="flex items-start gap-2.5 text-xs text-cafeDark/80">
            <MapPin className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-cafeDark">The Balcony Cafe</p>
              <p className="text-cafeDark/70">{CAFE_DATA.fullLocation}</p>
            </div>
          </div>
          <a
            href="#visit"
            onClick={(e) => scrollTo(e, '#visit')}
            className="btn-primary w-full text-center py-3 text-xs"
          >
            Explore & Visit Cafe
          </a>
        </div>
      </div>
    </>
  );
}
