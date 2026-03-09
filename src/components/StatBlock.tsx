interface Props {
  label: string;
  value: string;
}

export function StatBlock({ label, value }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.6 }}>
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
        fontSize: 40,
        fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
        fontWeight: 700,
        color: '#fef7ff',
        opacity: 0.8,
        lineHeight: 1,
      }}>
        {value}
      </span>
    </div>
  );
}
