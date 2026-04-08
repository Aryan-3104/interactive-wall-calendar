export function CalendarHeader() {
  const spiralRings = Array.from({ length: 22 });

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #ece7e0, #f9f6f1)',
      borderBottom: '1px solid #ddd6cc',
      padding: '8px 12px 7px 12px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Cast shadow below spirals */}
      <div style={{
        position: 'absolute',
        bottom: '-2px',
        left: '8%', right: '8%',
        height: '4px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.06), transparent)',
        borderRadius: '0 0 50% 50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        position: "relative",
        zIndex: 2,
      }}>
        {spiralRings.map((_, index) => (
          <div
            key={index}
            style={{
              width: "13px",
              height: "11px",
              borderTop: "2px solid #98928b",
              borderLeft: "2px solid #98928b",
              borderRight: "2px solid #98928b",
              borderBottom: "none",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), 0 1px 1px rgba(0,0,0,0.14)",
              position: "relative",
              flexShrink: 0,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.26), rgba(255,255,255,0.03))",
            }}
          >
            {/* subtle metallic shine across each loop */}
            <div
              style={{
                position: "absolute",
                top: "1px",
                left: "1px",
                right: "1px",
                height: "2px",
                borderRadius: "2px",
                background: "rgba(255,255,255,0.35)",
              }}
            />
            <div style={{
              position: "absolute",
              left: "50%",
              top: "10px",
              transform: "translateX(-50%)",
              width: "2px",
              height: "5px",
              background: "linear-gradient(to bottom, #a8a39a, #8d8780)",
              borderRadius: "2px",
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
