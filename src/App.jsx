import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicShowcase from './components/CinematicShowcase';
import AboutSection from './components/AboutSection';
import InteractiveMenu from './components/InteractiveMenu';
import PhotoGallery from './components/PhotoGallery';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll restoration handling
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      {/* Cinematic Initial Loading Experience */}
      <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />

      {/* Desktop Luxury Custom Cursor */}
      <CustomCursor />

      {/* Real-time Top Scroll Progress Indicator */}
      <ScrollProgress />

      <div className="min-h-screen bg-ivory text-cafeDark font-sans selection:bg-caramel/25 selection:text-cafeDark relative overflow-x-clip">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Showcase */}
        <main id="main-content" tabIndex={-1}>
          {/* Fullscreen Cinematic Hero */}
          <Hero />

          {/* Fullscreen Pinned Cinematic Scroll Animation */}
          <CinematicShowcase />

          {/* Editorial About Section ("More Than Just Coffee") */}
          <AboutSection />

          {/* Interactive Animated Menu (5 Categories) */}
          <InteractiveMenu />

          {/* Immersive Cinematic Photo Gallery with Masonry & Lightbox */}
          <PhotoGallery />

          {/* Final Call to Action: Visit Section ("Your Table Is Waiting") */}
          <VisitSection />
        </main>

        {/* Premium Editorial Footer */}
        <Footer />
      </div>
    </>
  );
}
