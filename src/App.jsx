import { useCalendar } from "./hooks/useCalendar";
import { CalendarHeader } from "./components/Calendar/CalendarHeader";
import { CalendarGrid } from "./components/Calendar/CalendarGrid";
import { HeroImage } from "./components/HeroImage/HeroImage";
import { NotesPanel } from "./components/Notes/NotesPanel";
import "./App.css";

function App() {
  const calendar = useCalendar();

  const flipClass = calendar.isFlipping
    ? calendar.flipDirection === 'forward'
      ? 'flip-forward'
      : 'flip-backward'
    : '';

  const monthIndex = calendar.currentMonth.getMonth();

  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      background: `
        radial-gradient(ellipse at 50% 30%, #5a5a5a, #3a3a3a 50%, #2a2a2a 100%)
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
        top: 'calc(50% - 330px)',
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

      {/* Main calendar wrapper — holds card + outside nav arrows */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Left nav arrow */}
        <button
          onClick={calendar.goToPrevMonth}
          style={{
            width: '46px', height: '46px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 250ms cubic-bezier(0.22,1,0.36,1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          }}
          aria-label="Previous month"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Calendar card */}
        <div className="calendar-perspective" style={{ flexShrink: 0 }}>
          <div
            className={`calendar-card ${flipClass}`}
            style={{
              width: '560px',
              backgroundColor: 'white',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Spiral binding */}
            <CalendarHeader />

            {/* Hero image with month/year overlay */}
            <HeroImage currentMonth={calendar.currentMonth} />

            {/* Bottom section: Notes + Grid side by side */}
            <div style={{
              display: 'flex',
              flex: 1,
              borderTop: '1px solid #e8e5e0'
            }}>
              {/* Notes area */}
              <div style={{
                width: '170px',
                borderRight: '1px solid #e8e5e0',
                flexShrink: 0
              }}>
                <NotesPanel currentMonth={calendar.currentMonth} />
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
        </div>

        {/* Right nav arrow */}
        <button
          onClick={calendar.goToNextMonth}
          style={{
            width: '46px', height: '46px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 250ms cubic-bezier(0.22,1,0.36,1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          }}
          aria-label="Next month"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Month dots indicator */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
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
              backgroundColor: i === monthIndex ? '#3b9fd8' : 'rgba(255,255,255,0.25)',
              transition: 'all 350ms cubic-bezier(0.22,1,0.36,1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
