import { useState, useEffect, useRef } from "react";

export function MonthNav({ currentMonth, onPrevMonth, onNextMonth }) {
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [animating, setAnimating] = useState(false);
  const prevMonthRef = useRef(currentMonth);

  useEffect(() => {
    if (prevMonthRef.current.getTime() !== currentMonth.getTime()) {
      setAnimating(true);
      const t = setTimeout(() => {
        setDisplayMonth(currentMonth);
        setAnimating(false);
      }, 50);
      prevMonthRef.current = currentMonth;
      return () => clearTimeout(t);
    }
  }, [currentMonth]);

  const monthName = displayMonth.toLocaleString('default', { month: 'long' });
  const year = displayMonth.getFullYear();

  return (
    <div style={{
      background: 'linear-gradient(to bottom, var(--cream-light), var(--ink-50))',
      borderBottom: '1px solid var(--ink-100)',
      padding: '10px 20px',
      position: 'relative',
      flexShrink: 0
    }}>
      {/* Decorative flourish */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--accent-light), transparent)',
        opacity: 0.5
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onPrevMonth}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ink-50), var(--ink-100))',
            color: 'var(--ink-500)', border: '1px solid var(--ink-200)',
            cursor: 'pointer', transition: 'all 250ms cubic-bezier(0.22,1,0.36,1)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-light), var(--accent))';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(194,149,107,0.3)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--ink-50), var(--ink-100))';
            e.currentTarget.style.color = 'var(--ink-500)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--ink-200)';
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          aria-label="Previous month" title="Previous month"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', minWidth: '140px' }}>
          <h2
            key={monthName}
            className={animating ? '' : 'month-name-enter'}
            style={{
              fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-display)',
              color: 'var(--ink-800)', margin: 0, letterSpacing: '-0.01em', lineHeight: '1.2'
            }}
          >
            {monthName}
          </h2>
          <p
            key={year + '-' + monthName}
            className={animating ? '' : 'month-name-enter'}
            style={{
              fontSize: '11px', fontWeight: '500', color: 'var(--ink-400)',
              margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase',
              animationDelay: '0.05s'
            }}
          >
            {year}
          </p>
        </div>

        <button
          onClick={onNextMonth}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ink-50), var(--ink-100))',
            color: 'var(--ink-500)', border: '1px solid var(--ink-200)',
            cursor: 'pointer', transition: 'all 250ms cubic-bezier(0.22,1,0.36,1)',
            boxShadow: 'var(--shadow-sm)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-light), var(--accent))';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(194,149,107,0.3)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--ink-50), var(--ink-100))';
            e.currentTarget.style.color = 'var(--ink-500)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = 'var(--ink-200)';
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          aria-label="Next month" title="Next month"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
