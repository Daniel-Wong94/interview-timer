import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  secondsLeft: number;
  isFinished: boolean;
}

const SEGMENT_COLORS = [
  { from: '#6fe3e1', to: 'rgba(111,227,225,0)' },
  { from: '#f9cdc3', to: 'rgba(249,205,195,0)' },
  { from: '#f68080', to: 'rgba(246,128,128,0)' },
  { from: '#9d80cb', to: 'rgba(157,128,203,0)' },
  { from: '#80d4f6', to: 'rgba(128,212,246,0)' },
  { from: '#f6d080', to: 'rgba(246,208,128,0)' },
];

export function SegmentProgressBar({ segments, currentSegmentIndex, secondsLeft, isFinished }: Props) {
  const totalDuration = segments.reduce((sum, s) => sum + s.durationSeconds, 0);
  const completedDuration = segments.slice(0, currentSegmentIndex).reduce((sum, s) => sum + s.durationSeconds, 0);
  const currentElapsed = isFinished
    ? (segments[currentSegmentIndex]?.durationSeconds ?? 0)
    : (segments[currentSegmentIndex]?.durationSeconds ?? 0) - secondsLeft;
  const elapsed = completedDuration + currentElapsed;
  const progress = totalDuration > 0 ? Math.min(elapsed / totalDuration, 1) : 0;

  return (
    <div style={{ width: '100%', padding: '0 48px' }}>
      <div
        style={{
          position: 'relative',
          height: 124,
          borderRadius: 24,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* Track background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 24,
        }} />

        {/* Segment fills */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', borderRadius: 24, overflow: 'hidden' }}>
          {segments.map((seg, i) => {
            const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
            const widthPct = totalDuration > 0 ? (seg.durationSeconds / totalDuration) * 100 : 0;
            const isPast = i < currentSegmentIndex;
            return (
              <div
                key={seg.id}
                style={{
                  flex: `0 0 ${widthPct}%`,
                  height: '100%',
                  background: `linear-gradient(to right, ${color.from}, ${color.to} 90%)`,
                  borderRadius: 24,
                  opacity: isPast ? 0.2 : 1,
                  transition: 'opacity 0.4s',
                }}
              />
            );
          })}
        </div>

        {/* Scrubber (vertical white bar) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${progress * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: 16,
            height: 140,
            background: '#ffffff',
            borderRadius: 16,
            boxShadow: '0 0 16px rgba(49,46,129,0.25)',
            transition: 'left 0.8s linear',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}
