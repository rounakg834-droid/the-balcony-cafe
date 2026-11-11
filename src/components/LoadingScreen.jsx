import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Coffee } from 'lucide-react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(false);
      if (onLoadingComplete) onLoadingComplete();
      return;
    }

    // Only show loader once per session
    const hasLoaded = sessionStorage.getItem('balcony_cafe_loaded');
    if (hasLoaded) {
      setIsVisible(false);
      if (onLoadingComplete) onLoadingComplete();
      return;
    }

    // Progress bar animation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        // Sequence exit animation
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsVisible(false);
              sessionStorage.setItem('balcony_cafe_loaded', 'true');
              if (onLoadingComplete) onLoadingComplete();
            },
          });

          tl.to('.loader-brand', {
            y: -30,
            opacity: 0,
            duration: 0.65,
            ease: 'power3.in',
          })
            .to(
              '.loader-progress-wrap',
              {
                opacity: 0,
                duration: 0.35,
              },
              '-=0.4'
            )
            .to(
              '.loader-overlay',
              {
                yPercent: -100,
                duration: 0.9,
                ease: 'expo.inOut',
              },
              '-=0.2'
            );
        }, 250);
      }
      setProgress(currentProgress);
    }, 70);

    // Timeout safety fallback
    const fallbackTimer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsVisible(false);
      sessionStorage.setItem('balcony_cafe_loaded', 'true');
      if (onLoadingComplete) onLoadingComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="loader-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF7F0] text-cafeDark overflow-hidden select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading The Balcony Cafe"
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-caramel/10 blur-[100px] pointer-events-none" />

      {/* Centered Brand Signature */}
      <div className="loader-brand relative z-10 flex flex-col items-center text-center px-4">
        
        {/* Animated Coffee Cup Emblem */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full bg-coffee/10 border border-beige flex items-center justify-center text-coffee shadow-sm animate-pulse">
            <Coffee className="w-8 h-8 text-coffee" />
          </div>
          
          {/* Subtle rising steam waves */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
            <span className="w-1 h-3 rounded-full bg-caramel/40 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-4 rounded-full bg-caramel/40 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-3 rounded-full bg-caramel/40 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* Large Centered "THE BALCONY" */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cafeDark leading-none">
          THE BALCONY
        </h1>

        {/* "CAFE & GRILL" Subtitle matching real signage */}
        <p className="font-sans text-xs sm:text-sm tracking-ultra uppercase text-caramel font-semibold mt-3">
          CAFE &bull; GRILL &bull; JALANDHAR
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="loader-progress-wrap relative z-10 mt-10 w-48 sm:w-60">
        <div className="w-full h-[2.5px] bg-beige/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-coffee via-caramel to-coffee rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-sans tracking-widest uppercase text-cafeDark/50">
          <span>Artisanal Moments</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
