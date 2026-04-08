export function CalendarHeader() {
  const spiralRings = Array.from({ length: 20 });

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #f0ece6, #faf8f5)',
      borderBottom: '1px solid #e0dcd5',
      padding: '5px 12px',
      position: 'relative'
    }}>
      {/* Cast shadow below spirals */}
      <div style={{
        position: 'absolute',
        bottom: '-3px',
        left: '8%', right: '8%',
        height: '3px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), transparent)',
        borderRadius: '0 0 50% 50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px'
      }}>
        {spiralRings.map((_, index) => (
          <div
            key={index}
            style={{
              width: '14px', height: '14px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #ddd8d0, #b5aea5 45%, #9a948c 75%, #b0aaa2)',
              border: '1px solid rgba(140,134,126,0.4)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.45), inset 0 -1px 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.08)',
              position: 'relative', flexShrink: 0
            }}
          >
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4px', height: '4px', borderRadius: '50%',
              background: 'linear-gradient(to bottom, #e8e4de, #d5d0c8)',
              border: '0.5px solid rgba(140,134,126,0.3)',
              boxShadow: 'inset 0 0.5px 1px rgba(0,0,0,0.08)'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
