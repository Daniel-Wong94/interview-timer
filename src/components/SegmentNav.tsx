import { SegmentNavItem } from './SegmentNavItem';
import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  onJumpTo: (index: number) => void;
}

export function SegmentNav({ segments, currentSegmentIndex, onJumpTo }: Props) {
  const prev = segments[currentSegmentIndex - 1];
  const curr = segments[currentSegmentIndex];
  const next = segments[currentSegmentIndex + 1];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '0 48px',
      fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
    }}>
      <SegmentNavItem
        role="previous"
        name={prev?.name ?? '—'}
        onClick={prev ? () => onJumpTo(currentSegmentIndex - 1) : undefined}
      />
      <SegmentNavItem
        role="current"
        name={curr?.name ?? '—'}
      />
      <SegmentNavItem
        role="next"
        name={next?.name ?? '—'}
        onClick={next ? () => onJumpTo(currentSegmentIndex + 1) : undefined}
      />
    </div>
  );
}
