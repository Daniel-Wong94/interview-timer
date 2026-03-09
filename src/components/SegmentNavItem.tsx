interface Props {
  role: 'previous' | 'current' | 'next';
  name: string;
  onClick?: () => void;
}

const MONO_BOLD: React.CSSProperties = {
  fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
  fontWeight: 700,
};

export function SegmentNavItem({ role, name, onClick }: Props) {
  const isPrev = role === 'previous';
  const isCurrent = role === 'current';
  const isNext = role === 'next';
  const label = isPrev ? 'Previous' : isCurrent ? 'Current' : 'Up Next';

  return (
    <div
      onClick={onClick}
      style={{
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: isPrev ? 'flex-start' : isCurrent ? 'center' : 'flex-end',
        opacity: isPrev ? 0.2 : 1,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <span style={{
        ...MONO_BOLD,
        fontSize: 16,
        color: '#fff',
        textTransform: 'uppercase',
        opacity: 0.8,
        whiteSpace: 'nowrap',
        textShadow: '0 0 16px rgba(255,255,255,0.25)',
      }}>
        {label}
      </span>
      <span style={{
        ...MONO_BOLD,
        fontSize: isCurrent ? 40 : 24,
        color: '#fff',
        opacity: 0.8,
        textAlign: isCurrent ? 'center' : isNext ? 'right' : 'left',
        textShadow: '0 0 16px rgba(255,255,255,0.25)',
        wordBreak: 'break-word',
        minWidth: 0,
      }}>
        {name || '—'}
      </span>
    </div>
  );
}
