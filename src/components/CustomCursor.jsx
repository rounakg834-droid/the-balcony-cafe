import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Fast quickSetter for instant response without layout thrashing
    const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
    const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
    const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorX(mouseX);
      setCursorY(mouseY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth physics loop for follower ring
    let animationFrameId;
    const render = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      setFollowerX(followerX);
      setFollowerY(followerY);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    // Interactive element hover detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // Touch screen early exit
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden lg:block`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-caramel pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-sm will-change-transform"
      />

      {/* Trailing Luxury Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full border border-caramel/60 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-12 h-12 bg-caramel/15 border-caramel scale-110 shadow-gold-glow'
            : 'w-7 h-7 bg-transparent scale-100'
        }`}
      />
    </div>
  );
}
