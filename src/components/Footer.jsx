import React from 'react';
import { Coffee, MapPin, Clock, ArrowUp, Navigation, Share2, Heart } from 'lucide-react';
import { CAFE_DATA } from '../constants/cafeData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'The Balcony Cafe Jalandhar Punjab India'
  )}`;

  const instagramUrl = 'https://www.instagram.com/explore/tags/thebalconycafejalandhar/';

  return (
    <footer className="relative bg-[#F4EFE6] border-t border-beige text-cafeDark pt-20 pb-12 overflow-hidden transition-colors">
      
      {/* Massive Faint Luxury Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04]">
        <span className="font-serif font-bold text-[18vw] leading-none whitespace-nowrap tracking-tight text-cafeDark">
          THE BALCONY CAFE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-beige/90">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-coffee text-ivory flex items-center justify-center shadow-soft">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-cafeDark">
                  The Balcony Cafe
                </span>
                <span className="block text-[10px] font-sans tracking-ultra uppercase text-caramel font-semibold">
                  Jalandhar &bull; Punjab
                </span>
              </div>
            </div>

            <p className="text-sm text-cafeDark/75 max-w-sm font-sans leading-relaxed">
              An elevated sanctuary of single-origin artisanal brews, sunlit terraces, and heartwarming culinary craft in Jalandhar, India.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="editorial-badge !text-[10px]">
                Specialty Roastery &bull; Open-Air Dining
              </span>
            </div>
          </div>

          {/* Quick Links with Hover Underline */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-semibold text-cafeDark mb-4">
              Explore The Cafe
            </h4>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-wider">
              {CAFE_DATA.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cafeDark/75 hover:text-coffee transition-colors relative py-0.5 inline-block group"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-caramel group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Connect with Real Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-cafeDark mb-3">
              Visit & Connect
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-cafeDark/80">
              <MapPin className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
              <span>{CAFE_DATA.fullLocation}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-cafeDark/80">
              <Clock className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
              <span>Daily: {CAFE_DATA.hours.weekdays}</span>
            </div>

            {/* Verified Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-coffee/10 hover:bg-coffee/20 text-coffee border border-coffee/25 text-xs font-sans font-medium transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-caramel/15 hover:bg-caramel/25 text-coffee border border-caramel/30 text-xs font-sans font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cafeDark/60">
          <p>
            &copy; {new Date().getFullYear()} The Balcony Cafe, Jalandhar, Punjab. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-coffee font-semibold hover:text-caramel transition-colors group cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-ivory border border-beige flex items-center justify-center group-hover:border-caramel transition-colors shadow-sm">
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
