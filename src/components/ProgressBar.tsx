import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  secondsLeft: number;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function ProgressBar({ segments, currentSegmentIndex, secondsLeft }: Props) {
  const totalSeconds = segments.reduce((sum, s) => sum + s.durationSeconds, 0);
  if (totalSeconds === 0) return null;

  // Compute elapsed seconds
  const elapsedInPrevSegments = segments
    .slice(0, currentSegmentIndex)
    .reduce((sum, s) => sum + s.durationSeconds, 0);
  const currentSegmentDuration = segments[currentSegmentIndex]?.durationSeconds ?? 0;
  const elapsedInCurrent = currentSegmentDuration - secondsLeft;
  const totalElapsed = elapsedInPrevSegments + elapsedInCurrent;
  const overallProgress = totalElapsed / totalSeconds;

  // Cumulative start times for markers
  let cumulative = 0;
  const segmentOffsets = segments.map(s => {
    const offset = cumulative;
    cumulative += s.durationSeconds;
    return offset;
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Segment blocks */}
      <div style={{ display: 'flex', width: '100%', height: 36, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
        {segments.map((seg, i) => {
          const widthPct = (seg.durationSeconds / totalSeconds) * 100;
          const isCompleted = i < currentSegmentIndex;
          const isCurrent = i === currentSegmentIndex;
          return (
            <div
              key={seg.id}
              title={`${seg.name || `Segment ${i + 1}`}: ${formatTime(seg.durationSeconds)}`}
              style={{
                width: `${widthPct}%`,
                background: isCompleted ? '#adb5bd' : isCurrent ? '#0d6efd' : '#e9ecef',
                borderRight: i < segments.length - 1 ? '1px solid #dee2e6' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                fontSize: 11,
                fontWeight: 500,
                color: isCurrent ? '#fff' : isCompleted ? '#fff' : '#6c757d',
                transition: 'background 0.3s',
                whiteSpace: 'nowrap',
                padding: '0 4px',
              }}
            >
              {widthPct > 8 ? (seg.name || `Seg ${i + 1}`) : ''}
            </div>
          );
        })}
      </div>

      {/* Overall progress fill */}
      <div style={{ position: 'relative', marginTop: 6, height: 6, background: '#e9ecef', borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${overallProgress * 100}%`,
            background: 'var(--color-primary)',
            borderRadius: 3,
            transition: 'width 0.5s linear',
          }}
        />
      </div>

      {/* Time labels */}
      <div style={{ display: 'flex', width: '100%', marginTop: 4, position: 'relative', height: 16 }}>
        {segmentOffsets.map((offset, i) => (
          <div
            key={segments[i].id}
            style={{
              position: 'absolute',
              left: `${(offset / totalSeconds) * 100}%`,
              fontSize: 10,
              color: 'var(--color-text-muted)',
              transform: 'translateX(-50%)',
            }}
          >
            {formatTime(offset)}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            left: '100%',
            fontSize: 10,
            color: 'var(--color-text-muted)',
            transform: 'translateX(-100%)',
          }}
        >
          {formatTime(totalSeconds)}
        </div>
      </div>
    </div>
  );
}
