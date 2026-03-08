import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
}

export function NotesPanel({ segments, currentSegmentIndex }: Props) {
  const currentSegment = segments[currentSegmentIndex];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      padding: 16,
      minHeight: 120,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Notes{currentSegment?.name ? ` — ${currentSegment.name}` : ''}
      </div>
      {currentSegment?.notes ? (
        <pre style={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'inherit',
          fontSize: 14,
          lineHeight: 1.6,
          color: 'var(--color-text)',
          margin: 0,
        }}>
          {currentSegment.notes}
        </pre>
      ) : (
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14, fontStyle: 'italic' }}>
          No notes for this segment.
        </div>
      )}
    </div>
  );
}
