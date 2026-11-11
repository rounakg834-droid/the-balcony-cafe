import React from 'react';

/**
 * High-fidelity 3D-styled SVG Coffee Bean with realistic gradients and depth
 */
export default function CoffeeBean3D({ className = '', style = {}, size = 28, rotate = 0 }) {
  return (
    <div
      className={`inline-block pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size * 1.35,
        transform: `rotate(${rotate}deg)`,
        filter: 'drop-shadow(0 6px 10px rgba(62, 39, 35, 0.28))',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Main bean body 3D gradient */}
          <radialGradient
            id="beanShade"
            cx="35%"
            cy="30%"
            r="70%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="45%" stopColor="#6D4C41" />
            <stop offset="85%" stopColor="#4E342E" />
            <stop offset="100%" stopColor="#2E1B15" />
          </radialGradient>

          {/* Golden highlight sheen */}
          <linearGradient id="beanSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D7CCC8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#BCAAA4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3E2723" stopOpacity="0.8" />
          </linearGradient>

          {/* Deep center crease shadow */}
          <linearGradient id="creaseDark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1D0E09" />
            <stop offset="50%" stopColor="#2D150D" />
            <stop offset="100%" stopColor="#1D0E09" />
          </linearGradient>
        </defs>

        {/* Outer Bean Silhouette */}
        <path
          d="M50 3 C22 3 3 32 3 67 C3 102 22 131 50 131 C78 131 97 102 97 67 C97 32 78 3 50 3 Z"
          fill="url(#beanShade)"
        />

        {/* Gloss Sheen Overlay */}
        <path
          d="M50 4 C24 4 6 33 6 67 C6 100 24 129 50 129 C76 129 94 100 94 67 C94 33 76 4 50 4 Z"
          fill="url(#beanSheen)"
        />

        {/* Organic S-Curve Center Crease */}
        <path
          d="M51 14 C46 32 39 48 42 67 C45 84 55 98 49 120"
          stroke="url(#creaseDark)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Crease subtle lip highlight */}
        <path
          d="M53 16 C48 34 42 49 45 67 C48 83 58 97 51 118"
          stroke="#A1887F"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
