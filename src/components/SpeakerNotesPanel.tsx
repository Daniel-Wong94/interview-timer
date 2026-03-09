import { QuillEditor } from './QuillEditor';
import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  onUpdateNotes: (index: number, notes: string) => void;
}

export function SpeakerNotesPanel({ segments, currentSegmentIndex, onUpdateNotes }: Props) {
  const currentSegment = segments[currentSegmentIndex];

  return (
    <div style={{
      background: '#f0effc',
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      <p style={{
        fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
        fontWeight: 700,
        fontSize: 24,
        color: '#121212',
        opacity: 0.8,
        margin: 0,
        textShadow: '0 0 16px rgba(255,255,255,0.25)',
      }}>
        Speaker Notes
      </p>
      <div style={{
        background: '#fbfbfb',
        border: '2px solid rgba(113,105,234,0.2)',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {currentSegment ? (
          <QuillEditor
            value={currentSegment.notes ?? ''}
            onChange={(html) => onUpdateNotes(currentSegmentIndex, html)}
            placeholder="Add speaker notes…"
          />
        ) : (
          <div style={{ padding: '16px 24px', color: '#888', fontSize: 14, fontStyle: 'italic' }}>
            No segment selected.
          </div>
        )}
      </div>
    </div>
  );
}
