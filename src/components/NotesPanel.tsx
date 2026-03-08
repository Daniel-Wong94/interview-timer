import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
}

export function NotesPanel({ segments, currentSegmentIndex }: Props) {
  const currentSegment = segments[currentSegmentIndex];
  const hasNotes = currentSegment?.notes && currentSegment.notes !== '<p><br></p>';

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
      {hasNotes ? (
        <div
          className="ql-snow"
          style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-text)' }}
        >
          <div
            className="ql-editor"
            style={{ padding: 0 }}
            dangerouslySetInnerHTML={{ __html: currentSegment.notes }}
          />
        </div>
      ) : (
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14, fontStyle: 'italic' }}>
          No notes for this segment.
        </div>
      )}
    </div>
  );
}
