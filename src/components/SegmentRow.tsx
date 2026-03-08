import type { Segment } from '../types';
import { QuillEditor } from './QuillEditor';

interface Props {
  segment: Segment;
  index: number;
  total: number;
  onChange: (updated: Segment) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function SegmentRow({ segment, index, total, onChange, onRemove, onMoveUp, onMoveDown }: Props) {
  const minutes = Math.floor(segment.durationSeconds / 60);
  const seconds = segment.durationSeconds % 60;

  const handleDuration = (mins: number, secs: number) => {
    const totalSecs = Math.max(1, mins * 60 + secs);
    onChange({ ...segment, durationSeconds: totalSecs });
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 80px 60px auto auto',
      gap: 8,
      alignItems: 'start',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 12,
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <input
          type="text"
          placeholder={`Segment ${index + 1}`}
          value={segment.name}
          onChange={e => onChange({ ...segment, name: e.target.value })}
          style={{ width: '100%' }}
        />
        <QuillEditor
          value={segment.notes}
          onChange={notes => onChange({ ...segment, notes })}
          placeholder="Notes (optional)"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Minutes</label>
        <input
          type="number"
          min={0}
          value={minutes}
          onChange={e => handleDuration(parseInt(e.target.value) || 0, seconds)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Seconds</label>
        <input
          type="number"
          min={0}
          max={59}
          value={seconds}
          onChange={e => handleDuration(minutes, parseInt(e.target.value) || 0)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 18 }}>
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          title="Move up"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', padding: '4px 8px' }}
        >↑</button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          title="Move down"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', padding: '4px 8px' }}
        >↓</button>
      </div>

      <div style={{ paddingTop: 18 }}>
        <button
          onClick={onRemove}
          title="Remove segment"
          style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '4px 8px' }}
        >✕</button>
      </div>
    </div>
  );
}
