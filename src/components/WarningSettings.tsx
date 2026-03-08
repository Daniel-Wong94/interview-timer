interface Props {
  yellowSeconds: number;
  redSeconds: number;
  onChange: (yellow: number, red: number) => void;
}

export function WarningSettings({ yellowSeconds, redSeconds, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 13, fontWeight: 500 }}>
          Yellow warning (seconds remaining)
        </label>
        <input
          type="number"
          min={1}
          value={yellowSeconds}
          onChange={e => onChange(Math.max(1, parseInt(e.target.value) || 0), redSeconds)}
          style={{ width: 100 }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 13, fontWeight: 500 }}>
          Red warning (seconds remaining)
        </label>
        <input
          type="number"
          min={1}
          value={redSeconds}
          onChange={e => onChange(yellowSeconds, Math.max(1, parseInt(e.target.value) || 0))}
          style={{ width: 100 }}
        />
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>
        <span style={{ background: 'var(--timer-yellow-bg)', color: 'var(--timer-yellow-text)', padding: '2px 6px', borderRadius: 3 }}>Yellow</span>{' '}
        at ≤{yellowSeconds}s &nbsp;
        <span style={{ background: 'var(--timer-red-bg)', color: 'var(--timer-red-text)', padding: '2px 6px', borderRadius: 3 }}>Red</span>{' '}
        at ≤{redSeconds}s
      </div>
    </div>
  );
}
