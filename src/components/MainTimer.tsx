interface Props {
  value: string;
  label?: string;
}

export function MainTimer({ value, label = 'TIME REMAINING' }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontSize: 16,
        fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
        fontWeight: 700,
        color: '#fff',
        textTransform: 'uppercase',
        opacity: 0.8,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 96,
        fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
        fontWeight: 700,
        color: '#fff',
        opacity: 0.8,
        lineHeight: 1,
        textShadow: '0 0 16px rgba(255,255,255,0.25)',
      }}>
        {value}
      </span>
    </div>
  );
}
