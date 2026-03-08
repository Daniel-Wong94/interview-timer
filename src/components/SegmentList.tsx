import type { Segment } from '../types';
import { SegmentRow } from './SegmentRow';

interface Props {
  segments: Segment[];
  onChange: (segments: Segment[]) => void;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function SegmentList({ segments, onChange }: Props) {
  const addSegment = () => {
    onChange([
      ...segments,
      { id: generateId(), name: '', durationSeconds: 300, notes: '' },
    ]);
  };

  const updateSegment = (index: number, updated: Segment) => {
    const next = [...segments];
    next[index] = updated;
    onChange(next);
  };

  const removeSegment = (index: number) => {
    onChange(segments.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...segments];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === segments.length - 1) return;
    const next = [...segments];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  return (
    <div>
      {segments.map((segment, i) => (
        <SegmentRow
          key={segment.id}
          segment={segment}
          index={i}
          total={segments.length}
          onChange={updated => updateSegment(i, updated)}
          onRemove={() => removeSegment(i)}
          onMoveUp={() => moveUp(i)}
          onMoveDown={() => moveDown(i)}
        />
      ))}
      <button
        onClick={addSegment}
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          padding: '8px 20px',
        }}
      >
        + Add Segment
      </button>
    </div>
  );
}
