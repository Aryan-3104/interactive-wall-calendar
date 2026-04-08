import { useMemo, useRef, useState } from "react";
import { DayCell } from "./DayCell";
import { formatDateKey } from "../../utils/dateHelpers";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function CalendarGrid({
  calendarDays,
  isCurrentMonth,
  isToday,
  isSelected,
  onDayClick,
}) {
  const containerRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isPopoverHovered, setIsPopoverHovered] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ left: 0, top: 0 });
  const [dateNote, setDateNote] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [notesVersion, setNotesVersion] = useState(0);

  const dateStorageKey = useMemo(() => {
    return hoveredDate ? `date-notes-${formatDateKey(hoveredDate)}` : null;
  }, [hoveredDate]);

  const handleDayHover = (date, targetElement) => {
    if (!containerRef.current || !targetElement) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const noteKey = `date-notes-${formatDateKey(date)}`;

    setHoveredDate(date);
    setDateNote(localStorage.getItem(noteKey) || "");
    setSaveStatus("");
    setPopoverPos({
      left: targetRect.left - containerRect.left + targetRect.width / 2,
      top: targetRect.top - containerRect.top - 12,
    });
  };

  const closePopover = () => {
    if (!isPopoverHovered) {
      setHoveredDate(null);
      setSaveStatus("");
    }
  };

  const handleDayHoverLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(closePopover, 140);
  };

  const handleDateNoteChange = (e) => {
    if (!dateStorageKey) return;
    const next = e.target.value;
    setDateNote(next);
    localStorage.setItem(dateStorageKey, next);
    setNotesVersion((v) => v + 1);
    setSaveStatus("Saved");
    setTimeout(() => setSaveStatus(""), 1200);
  };

  const hasDateNote = (date) => {
    void notesVersion;
    const key = `date-notes-${formatDateKey(date)}`;
    return Boolean((localStorage.getItem(key) || "").trim());
  };

  return (
    <div ref={containerRef} style={{ padding: '8px 10px 10px 10px', position: "relative" }}>
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
            hasDateNote={hasDateNote(date)}
            columnIndex={index % 7}
            dayIndex={index}
            onDayClick={onDayClick}
            onDayHover={handleDayHover}
            onDayHoverLeave={handleDayHoverLeave}
          />
        ))}
      </div>

      {hoveredDate && (
        <div
          onMouseEnter={() => {
            setIsPopoverHovered(true);
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            setIsPopoverHovered(false);
            handleDayHoverLeave();
          }}
          style={{
            position: "absolute",
            left: `${popoverPos.left}px`,
            top: `${popoverPos.top}px`,
            transform: "translate(-50%, -100%)",
            width: "190px",
            padding: "8px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.98)",
            border: "1px solid #ded9d2",
            boxShadow: "0 10px 26px rgba(0,0,0,0.16)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#666",
              marginBottom: "6px",
            }}
          >
            {hoveredDate.toLocaleDateString("default", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).toUpperCase()} NOTE
          </div>
          <textarea
            value={dateNote}
            onChange={handleDateNoteChange}
            placeholder="Add note..."
            style={{
              width: "100%",
              minHeight: "68px",
              resize: "none",
              border: "1px solid #ebe6df",
              borderRadius: "7px",
              padding: "6px 7px",
              fontSize: "11px",
              color: "#444",
              outline: "none",
              fontFamily: "var(--font-body)",
              background: "#fffefc",
            }}
          />
          {saveStatus && (
            <div style={{ fontSize: "9px", color: "#5c9d69", marginTop: "4px", fontWeight: 600 }}>
              {saveStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
