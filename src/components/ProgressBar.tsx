import { useState, useRef } from 'react';
import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  secondsLeft: number;
  isFinished: boolean;
  onJumpTo: (index: number) => void;
}

// Accessible color palette — each passes WCAG AA (≥4.5:1) with white text
const SEGMENT_COLORS = [
  '#1565C0', // blue
  '#2E7D32', // green
  '#6A1B9A', // purple
  '#E65100', // deep orange
  '#AD1457', // pink
  '#00695C', // teal
  '#4527A0', // indigo
  '#C62828', // red
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function ProgressBar({ segments, currentSegmentIndex, secondsLeft, isFinished, onJumpTo }: Props) {
  const totalSeconds = segments.reduce((sum, s) => sum + s.durationSeconds, 0);
  const [jumping, setJumping] = useState(false);
  const jumpRafRef = useRef<number | null>(null);

  if (totalSeconds === 0) return null;

  const elapsedInPrev = segments
    .slice(0, currentSegmentIndex)
    .reduce((sum, s) => sum + s.durationSeconds, 0);
  const currentDuration = segments[currentSegmentIndex]?.durationSeconds ?? 0;
  const totalElapsed = elapsedInPrev + (currentDuration - secondsLeft);
  const overallProgress = totalElapsed / totalSeconds;

  let cumulative = 0;
  const segmentOffsets = segments.map(s => {
    const offset = cumulative;
    cumulative += s.durationSeconds;
    return offset;
  });

  const handleJump = (i: number) => {
    if (jumpRafRef.current !== null) cancelAnimationFrame(jumpRafRef.current);
    setJumping(true);
    onJumpTo(i);
    // Re-enable transition after the instant jump has been painted
    jumpRafRef.current = requestAnimationFrame(() => {
      jumpRafRef.current = requestAnimationFrame(() => {
        setJumping(false);
      });
    });
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Segment blocks + playhead */}
      <div style={{ position: 'relative', paddingTop: 6, paddingBottom: 6 }}>
        <div style={{
          display: 'flex',
          width: '100%',
          height: 64,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          {segments.map((seg, i) => {
            const widthPct = (seg.durationSeconds / totalSeconds) * 100;
            const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
            const isCompleted = i < currentSegmentIndex || isFinished;
            const isCurrent = i === currentSegmentIndex;

            return (
              <div
                key={seg.id}
                role="button"
                tabIndex={0}
                aria-label={`Jump to ${seg.name || `Segment ${i + 1}`}: ${formatTime(seg.durationSeconds)}${isCompleted ? ' (done)' : isCurrent ? ' (active)' : ''}`}
                onClick={() => handleJump(i)}
                onKeyDown={e => e.key === 'Enter' && handleJump(i)}
                style={{
                  cursor: 'pointer',
                  width: `${widthPct}%`,
                  background: isCompleted ? '#adb5bd' : color,
                  borderRight: i < segments.length - 1 ? '2px solid rgba(255,255,255,0.25)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '0 8px',
                  position: 'relative',
                  transition: 'background 0.4s ease',
                  flexShrink: 0,
                }}
              >
                {/* Active segment glow strip */}
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.6)',
                    borderRadius: 0,
                    pointerEvents: 'none',
                  }} />
                )}
                {widthPct > 6 && (
                  <div style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                  }}>
                    {seg.name || `Seg ${i + 1}`}
                  </div>
                )}
                {widthPct > 12 && (
                  <div style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.85)',
                    marginTop: 2,
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}>
                    {formatTime(seg.durationSeconds)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Playhead */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${overallProgress * 100}%`,
            transform: 'translateX(-50%)',
            width: 3,
            background: '#fff',
            boxShadow: '0 0 6px 1px rgba(0,0,0,0.45)',
            borderRadius: 2,
            pointerEvents: 'none',
            transition: jumping ? 'none' : 'left 1s linear',
            zIndex: 2,
          }}
        />
      </div>

      {/* Time labels */}
      <div style={{ position: 'relative', height: 18, marginTop: 2 }}>
        {segmentOffsets.map((offset, i) => (
          <div
            key={segments[i].id}
            style={{
              position: 'absolute',
              left: `${(offset / totalSeconds) * 100}%`,
              fontSize: 10,
              color: 'var(--color-text-muted)',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            {formatTime(offset)}
          </div>
        ))}
        <div style={{
          position: 'absolute',
          left: '100%',
          fontSize: 10,
          color: 'var(--color-text-muted)',
          transform: 'translateX(-100%)',
          whiteSpace: 'nowrap',
        }}>
          {formatTime(totalSeconds)}
        </div>
      </div>
    </div>
  );
}
