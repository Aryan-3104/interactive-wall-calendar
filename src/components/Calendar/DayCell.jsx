export function DayCell({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  columnIndex,
  dayIndex,
  onDayClick,
}) {
  const dayNum = date.getDate();
  const isSaturday = columnIndex === 5;
  const isSunday = columnIndex === 6;

  const getTextColor = () => {
    if (!isCurrentMonth) return '#ccc';
    if (isToday || isSelected) return 'white';
    if (isSaturday) return '#d45d5d';
    if (isSunday) return '#3b9fd8';
    return '#333';
  };

  const getBackgroundStyle = () => {
    if (isToday) return 'linear-gradient(135deg, #3b9fd8, #2d8bc9)';
    if (isSelected) return 'linear-gradient(135deg, #c2956b, #a67b55)';
    return 'transparent';
  };

  const isHighlighted = isToday || isSelected;

  const row = Math.floor(dayIndex / 7);
  const col = dayIndex % 7;
  const staggerDelay = (row * 0.025 + col * 0.015);

  return (
    <button
      onClick={() => onDayClick(date)}
      disabled={!isCurrentMonth}
      className={`day-cell-enter ${isToday && isCurrentMonth ? 'day-today' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30px',
        borderRadius: isHighlighted ? '50%' : '4px',
        fontWeight: isToday ? '700' : '500',
        fontSize: '12px',
        transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        outline: 'none',
        border: 'none',
        cursor: isCurrentMonth ? 'pointer' : 'default',
        color: getTextColor(),
        background: getBackgroundStyle(),
        opacity: !isCurrentMonth ? 0.3 : 1,
        animationDelay: `${staggerDelay}s`,
        fontFamily: 'var(--font-body)',
        padding: 0,
        width: '30px',
        margin: '0 auto',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (isCurrentMonth && !isHighlighted) {
          e.currentTarget.style.backgroundColor = '#f0f0f0';
          e.currentTarget.style.transform = 'scale(1.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isHighlighted) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseDown={(e) => { if (isCurrentMonth) e.currentTarget.style.transform = 'scale(0.9)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      aria-label={`${date.toDateString()}${isToday ? ' (Today)' : ''}`}
      title={date.toDateString()}
    >
      {dayNum}
    </button>
  );
}
