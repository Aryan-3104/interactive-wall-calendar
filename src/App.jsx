import { useEffect, useState } from "react";
import { useCalendar } from "./hooks/useCalendar";
import { CalendarHeader } from "./components/Calendar/CalendarHeader";
import { CalendarGrid } from "./components/Calendar/CalendarGrid";
import { HeroImage } from "./components/HeroImage/HeroImage";
import { NotesPanel } from "./components/Notes/NotesPanel";
import "./App.css";

const MONTH_THEMES = [
  { wallA: "#6f7f8f", wallB: "#485868", wallC: "#2e3946", card: "#f8fbff", accent: "#7bb0d9" }, // Jan
  { wallA: "#8a96a3", wallB: "#616f7e", wallC: "#3e4b58", card: "#f8fbff", accent: "#9ab9d7" }, // Feb
  { wallA: "#8da67b", wallB: "#5f7d57", wallC: "#3e5a3f", card: "#f9fff7", accent: "#7dbb6f" }, // Mar
  { wallA: "#8aa7c5", wallB: "#5b7ea1", wallC: "#3d5f82", card: "#f7fbff", accent: "#6ca4d8" }, // Apr
  { wallA: "#90b78a", wallB: "#5f8f59", wallC: "#3f6c3e", card: "#f8fff6", accent: "#79b26f" }, // May
  { wallA: "#8fc3c8", wallB: "#5b9da6", wallC: "#3c7480", card: "#f4feff", accent: "#57a8c3" }, // Jun
  { wallA: "#d2a06f", wallB: "#a77245", wallC: "#704c2d", card: "#fff9f3", accent: "#c9884e" }, // Jul
  { wallA: "#7ea6b7", wallB: "#567f91", wallC: "#375b6b", card: "#f5fbff", accent: "#5f98b5" }, // Aug
  { wallA: "#b78e62", wallB: "#8b653f", wallC: "#5f4428", card: "#fff8f1", accent: "#bb7e43" }, // Sep
  { wallA: "#b36f4e", wallB: "#874f35", wallC: "#5c3423", card: "#fff6f1", accent: "#c0673f" }, // Oct
  { wallA: "#8f8f8a", wallB: "#676763", wallC: "#454542", card: "#fcfcfb", accent: "#8b9aa1" }, // Nov
  { wallA: "#7f8f9f", wallB: "#5a6d7e", wallC: "#3a4a57", card: "#f7fbff", accent: "#7ea7d1" }, // Dec
];

function App() {
  const calendar = useCalendar();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const flipClass = calendar.isFlipping
    ? calendar.flipDirection === 'forward'
      ? 'flip-forward'
      : 'flip-backward'
    : '';

  const monthIndex = calendar.currentMonth.getMonth();
  const theme = MONTH_THEMES[monthIndex];
  const cardWidth = isMobile ? "min(94vw, 430px)" : "560px";
  const heroHeight = isMobile ? 220 : 320;
  const navSize = isMobile ? 42 : 46;
  const navIconSize = isMobile ? 18 : 20;
  const navButtonBaseStyle = {
    width: `${navSize}px`,
    height: `${navSize}px`,
    borderRadius: "50%",
    background: "color-mix(in srgb, white 14%, transparent)",
    backdropFilter: "blur(8px)",
    border: `1px solid color-mix(in srgb, ${theme.accent} 30%, white 35%)`,
    color: "rgba(255,255,255,0.88)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 250ms cubic-bezier(0.22,1,0.36,1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    flexShrink: 0,
  };

  return (
    <div style={{
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      background: `
        radial-gradient(ellipse at 50% 30%, ${theme.wallA}, ${theme.wallB} 50%, ${theme.wallC} 100%)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Subtle wall texture via noise pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Nail / Pin */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '22px' : 'calc(50% - 330px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Nail head */}
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #e0ddd8, #b0aba3 50%, #8a8580)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.4)',
          border: '1px solid rgba(0,0,0,0.15)',
          position: 'relative', zIndex: 2
        }} />
        {/* Nail shadow on wall */}
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.25)',
          filter: 'blur(3px)',
          marginTop: '-4px', zIndex: 1
        }} />
      </div>

      {/* Hanging strings */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "38px" : "calc(50% - 315px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: cardWidth,
          height: "80px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "50%",
            width: isMobile ? "115px" : "155px",
            height: "2px",
            borderRadius: "2px",
            transformOrigin: "left center",
            transform: "rotate(31deg)",
            background: "linear-gradient(to bottom, #cbc5bc, #9f988f 60%, #868077)",
            boxShadow: "0 1px 1px rgba(0,0,0,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "50%",
            width: isMobile ? "115px" : "155px",
            height: "2px",
            borderRadius: "2px",
            transformOrigin: "right center",
            transform: "rotate(-31deg)",
            background: "linear-gradient(to bottom, #cbc5bc, #9f988f 60%, #868077)",
            boxShadow: "0 1px 1px rgba(0,0,0,0.25)",
          }}
        />
      </div>

      {/* Main calendar wrapper — holds card + outside nav arrows */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? '10px' : '16px',
        padding: isMobile ? "58px 10px 14px 10px" : 0,
      }}>
        {!isMobile && (
          <button
            onClick={calendar.goToPrevMonth}
            style={navButtonBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `color-mix(in srgb, ${theme.accent} 45%, white 25%)`;
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'color-mix(in srgb, white 14%, transparent)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.88)';
            }}
            aria-label="Previous month"
          >
            <svg width={navIconSize} height={navIconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Calendar card */}
        <div className="calendar-perspective" style={{ flexShrink: 0, position: 'relative' }}>
          <div
            className={`calendar-card ${flipClass}`}
            style={{
              width: cardWidth,
              backgroundColor: theme.card,
              borderRadius: '6px',
              overflow: 'hidden',
              border: `1px solid color-mix(in srgb, ${theme.accent} 18%, #fff 72%)`,
              boxShadow: '0 24px 70px rgba(0,0,0,0.32), 0 10px 26px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "linear-gradient(to bottom right, rgba(255,255,255,0.28), transparent 40%)",
                zIndex: 3,
              }}
            />
            {/* Paper shadow overlay — darkens page surface during flip */}
            <div className="paper-shadow-overlay" />
            {/* Spiral binding */}
            <CalendarHeader />

            {/* Hero image with month/year overlay */}
            <HeroImage currentMonth={calendar.currentMonth} height={heroHeight} compact={isMobile} />

            {/* Bottom section: Notes + Grid side by side */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? "column" : "row",
              flex: 1,
              borderTop: '1px solid #e8e5e0'
            }}>
              {/* Notes area */}
              <div style={{
                width: isMobile ? '100%' : '170px',
                borderRight: isMobile ? 'none' : '1px solid #e8e5e0',
                borderBottom: isMobile ? '1px solid #e8e5e0' : 'none',
                flexShrink: 0
              }}>
                <NotesPanel
                  key={calendar.currentMonth.toISOString()}
                  currentMonth={calendar.currentMonth}
                />
              </div>

              {/* Calendar grid */}
              <div style={{ flex: 1 }}>
                <CalendarGrid
                  calendarDays={calendar.calendarDays}
                  isCurrentMonth={calendar.isCurrentMonth}
                  isToday={calendar.isToday}
                  isRangeStart={calendar.isRangeStart}
                  isRangeEnd={calendar.isRangeEnd}
                  isInRange={calendar.isInRange}
                  onDayClick={calendar.handleDayClick}
                />
              </div>
            </div>
          </div>

          {/* Ground shadow that spreads during flip */}
          <div className={`flip-ground-shadow ${calendar.isFlipping ? 'active' : ''}`} />
        </div>

        {!isMobile && (
          <button
            onClick={calendar.goToNextMonth}
            style={navButtonBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `color-mix(in srgb, ${theme.accent} 45%, white 25%)`;
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'color-mix(in srgb, white 14%, transparent)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.88)';
            }}
            aria-label="Next month"
          >
            <svg width={navIconSize} height={navIconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {isMobile && (
          <div style={{ display: "flex", gap: "12px", marginTop: "2px" }}>
            <button
              onClick={calendar.goToPrevMonth}
              style={navButtonBaseStyle}
              aria-label="Previous month"
            >
              <svg width={navIconSize} height={navIconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={calendar.goToNextMonth}
              style={navButtonBaseStyle}
              aria-label="Next month"
            >
              <svg width={navIconSize} height={navIconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Month dots indicator */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: isMobile ? 'none' : 'flex',
        gap: '6px',
        zIndex: 10
      }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === monthIndex ? '20px' : '7px',
              height: '7px',
              borderRadius: '4px',
              backgroundColor: i === monthIndex ? theme.accent : 'rgba(255,255,255,0.25)',
              transition: 'all 350ms cubic-bezier(0.22,1,0.36,1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
