import React from 'react';

const StarBackground: React.FC = () => {
  // Generate static random positions for stars to avoid re-render jitter
  const stars = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
