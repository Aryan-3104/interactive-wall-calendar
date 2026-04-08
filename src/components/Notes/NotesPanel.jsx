import { useState } from "react";
import { formatYearMonth } from "../../utils/dateHelpers";

export function NotesPanel({ currentMonth }) {
  const [saveStatus, setSaveStatus] = useState("");
  const monthName = currentMonth.toLocaleString("default", { month: "long" }).toUpperCase();
  const storageKey = `month-notes-${formatYearMonth(currentMonth)}`;
  const [notes, setNotes] = useState(() => (
    localStorage.getItem(storageKey) || ""
  ));
  const headerLabel = monthName;

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(storageKey, newNotes);
    setSaveStatus("Saved");
    const t = setTimeout(() => setSaveStatus(""), 2000);
    return () => clearTimeout(t);
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white'
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 12px 6px 12px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            fontSize: '9px',
            fontWeight: '700',
            color: '#555',
            letterSpacing: '0.1em',
            margin: 0,
            fontFamily: 'var(--font-body)'
          }}>
            {headerLabel} NOTES
          </h3>
          {saveStatus && (
            <span style={{
              fontSize: '8px',
              color: '#3b9fd8',
              fontWeight: '600',
              opacity: 0,
              animation: 'fadeIn 0.2s ease forwards'
            }}>
              ✓
            </span>
          )}
        </div>
      </div>

      {/* Textarea with ruled lines */}
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Monthly notes..."
        style={{
          flex: 1,
          width: '100%',
          padding: '8px 12px',
          resize: 'none',
          backgroundColor: 'transparent',
          fontSize: '11px',
          color: '#444',
          fontFamily: "'Inter', sans-serif",
          border: 'none',
          outline: 'none',
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 21px,
              #eee 21px,
              #eee 22px
            )
          `,
          backgroundPosition: "0 4px",
          backgroundSize: "100% 22px",
          lineHeight: "22px",
          backgroundAttachment: "local",
          opacity: 1,
          cursor: "text"
        }}
      />
    </div>
  );
}
