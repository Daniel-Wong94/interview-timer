interface Props {
  count: number;
}

export function SegmentBadge({ count }: Props) {
  return (
    <div style={{
      background: 'var(--badge-bg)',
      borderRadius: 'var(--badge-radius)',
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      color: '#fff',
      flexShrink: 0,
    }}>
      {count}
    </div>
  );
}
