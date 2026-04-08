import { DayCell } from "./DayCell";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function CalendarGrid({
  calendarDays,
  isCurrentMonth,
  isToday,
  isSelected,
  onDayClick,
}) {
  return (
    <div style={{ padding: '8px 10px 10px 10px' }}>
      {/* Day headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 0,
        marginBottom: '4px'
      }}>
        {DAY_HEADERS.map((day, index) => {
          const isSaturday = index === 5;
          const isSunday = index === 6;

          return (
            <div
              key={day}
              style={{
                padding: '4px 2px',
                textAlign: 'center',
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                color: isSaturday
                  ? '#d45d5d'
                  : isSunday
                    ? '#3b9fd8'
                    : '#666',
                fontFamily: 'var(--font-body)'
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Calendar days */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px'
      }}>
        {calendarDays.map((date, index) => (
          <DayCell
            key={date.toISOString()}
            date={date}
            isCurrentMonth={isCurrentMonth(date)}
            isToday={isToday(date)}
            isSelected={isSelected(date)}
            columnIndex={index % 7}
            dayIndex={index}
            onDayClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}
