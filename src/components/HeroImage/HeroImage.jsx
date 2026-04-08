import { formatMonthYear } from "../../utils/dateHelpers";
import { useState, useEffect, useRef } from "react";

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1676404904527-ebc6733dac05?w=1200&auto=format&fit=crop",  // Jan — snowy forest
  "https://images.unsplash.com/photo-1643971585868-a6a1eaa66419?w=1200&auto=format&fit=crop",  // Feb — winter trees
  "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=1200&auto=format&fit=crop",  // Mar — wildflowers
  "https://images.unsplash.com/photo-1621242051392-5046cc3f58e7?w=1200&auto=format&fit=crop",  // Apr — sunrise sky
  "https://images.unsplash.com/photo-1533254012848-644c18f39289?w=1200&auto=format&fit=crop",  // May — green hills
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",  // Jun — tropical beach
  "https://images.unsplash.com/photo-1692269726060-9c604e06f63b?w=1200&auto=format&fit=crop",  // Jul — summer field
  "https://images.unsplash.com/photo-1620385019253-b051a26048ce?w=1200&auto=format&fit=crop",  // Aug — mountain lake
  "https://images.unsplash.com/photo-1504783124764-46ceed8f15be?w=1200&h=800&fit=crop",  // Sep — autumn path
  "https://images.unsplash.com/photo-1664650868086-0f7b9afffe3a?w=1200&auto=format&fit=crop",  // Oct — fall colors
  "https://images.unsplash.com/photo-1577083753695-e010191bacb5?w=1200&auto=format&fit=crop",  // Nov — misty morning
  "https://images.unsplash.com/photo-1605571201949-b8b7ac7cadc7?w=1200&auto=format&fit=crop",  // Dec — frosty scene
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
