import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  onJumpTo: (index: number) => void;
}

export function NotesPanel({ segments, currentSegmentIndex, onJumpTo }: Props) {
  const currentSegment = segments[currentSegmentIndex];

  return (
    <div style={{ display: 'flex', gap: 16, height: '100%' }}>
      {/* Segment list sidebar */}
      <div style={{
        width: 180,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Segments
        </div>
        {segments.map((seg, i) => {
          const isCompleted = i < currentSegmentIndex;
          const isCurrent = i === currentSegmentIndex;
          return (
            <button
              key={seg.id}
              onClick={() => onJumpTo(i)}
              style={{
                textAlign: 'left',
                padding: '6px 10px',
                borderRadius: 4,
                fontSize: 13,
                background: isCurrent ? '#0d6efd' : isCompleted ? '#e9ecef' : 'transparent',
                color: isCurrent ? '#fff' : isCompleted ? '#adb5bd' : 'var(--color-text)',
                border: isCurrent ? 'none' : '1px solid transparent',
                fontWeight: isCurrent ? 600 : 400,
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {seg.name || `Segment ${i + 1}`}
            </button>
          );
        })}
      </div>

      {/* Notes area */}
      <div style={{
        flex: 1,
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        padding: 16,
        overflow: 'auto',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Notes
        </div>
        {currentSegment?.notes ? (
          <pre style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--color-text)',
          }}>
            {currentSegment.notes}
          </pre>
        ) : (
          <div style={{ color: 'var(--color-text-muted)', fontSize: 14, fontStyle: 'italic' }}>
            No notes for this segment.
          </div>
        )}
      </div>
    </div>
  );
}
