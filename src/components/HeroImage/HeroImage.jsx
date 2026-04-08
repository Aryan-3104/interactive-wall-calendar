import { formatMonthYear } from "../../utils/dateHelpers";
import { useState, useEffect, useRef } from "react";

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1200&h=800&fit=crop",  // Jan — snowy forest
  "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=1200&h=800&fit=crop",  // Feb — winter trees
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&h=800&fit=crop",  // Mar — wildflowers
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&h=800&fit=crop",  // Apr — sunrise sky
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&h=800&fit=crop",  // May — green hills
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",  // Jun — tropical beach
  "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&h=800&fit=crop",  // Jul — summer field
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&h=800&fit=crop",  // Aug — mountain lake
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&h=800&fit=crop",  // Sep — autumn path
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",  // Oct — fall colors
  "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=1200&h=800&fit=crop",  // Nov — misty morning
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&h=800&fit=crop",  // Dec — frosty scene
];

export function HeroImage({ currentMonth }) {
  const monthIndex = currentMonth.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];
  const year = currentMonth.getFullYear();
  const monthYear = formatMonthYear(currentMonth);
  const monthName = currentMonth.toLocaleString("default", { month: "long" }).toUpperCase();

  // Crossfade
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [prevImage, setPrevImage] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  const prevUrlRef = useRef(imageUrl);

  useEffect(() => {
    if (prevUrlRef.current !== imageUrl) {
      setPrevImage(prevUrlRef.current);
      setCurrentImage(imageUrl);
      setImageKey((k) => k + 1);
      prevUrlRef.current = imageUrl;
      const t = setTimeout(() => setPrevImage(null), 900);
      return () => clearTimeout(t);
    }
  }, [imageUrl]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '320px',
      overflow: 'hidden',
      backgroundColor: '#333'
    }}>
      {prevImage && (
        <img
          src={prevImage}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            animation: 'fadeOut 0.8s ease-out forwards', zIndex: 1
          }}
        />
      )}

      <img
        key={imageKey}
        src={currentImage}
        alt={monthYear}
        className="hero-image-enter"
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          opacity: 0, zIndex: 2, position: 'relative'
        }}
      />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
        zIndex: 3
      }} />

      {/* Year + Month overlay — bottom-right */}
      <div style={{
        position: 'absolute',
        bottom: '16px', right: '20px',
        zIndex: 10, textAlign: 'right'
      }}>
        <div style={{
          fontSize: '16px', fontWeight: '500',
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '0.15em',
          fontFamily: 'var(--font-body)',
          marginBottom: '2px'
        }}>
          {year}
        </div>
        <div style={{
          fontSize: '32px', fontWeight: '800',
          fontFamily: 'var(--font-display)',
          color: 'white',
          letterSpacing: '0.06em',
          lineHeight: 1,
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          {monthName}
        </div>
      </div>

      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
