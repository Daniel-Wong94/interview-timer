import { useEffect } from 'react';
import type { Presentation } from '../types';
import { useTimer } from '../hooks/useTimer';
import { ProgressBar } from '../components/ProgressBar';
import { TimerDisplay } from '../components/TimerDisplay';
import { NotesPanel } from '../components/NotesPanel';

interface Props {
  presentation: Presentation;
  onBack: () => void;
}

export function TimerPage({ presentation, onBack }: Props) {
  const { segments, warningYellowSeconds, warningRedSeconds } = presentation;

  const {
    currentSegmentIndex,
    secondsLeft,
    isRunning,
    isFinished,
    warningLevel,
    start,
    pause,
    reset,
  } = useTimer({ segments, warningYellowSeconds, warningRedSeconds });

  // Keyboard shortcut: Space = play/pause
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (isRunning) pause();
        else start();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isRunning, start, pause]);

  const currentSegment = segments[currentSegmentIndex];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{ background: '#e9ecef', color: 'var(--color-text)', fontSize: 13 }}
        >
          ← Back to Setup
        </button>
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
          Segment {Math.min(currentSegmentIndex + 1, segments.length)} of {segments.length}
        </div>
      </div>

      {/* Timer display */}
      <TimerDisplay
        segment={currentSegment}
        secondsLeft={secondsLeft}
        warningLevel={warningLevel}
        isFinished={isFinished}
      />

      {/* Progress bar */}
      <ProgressBar
        segments={segments}
        currentSegmentIndex={currentSegmentIndex}
        secondsLeft={secondsLeft}
      />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        {!isFinished ? (
          isRunning ? (
            <button
              onClick={pause}
              style={{ background: '#ffc107', color: '#000', fontSize: 16, padding: '10px 28px', borderRadius: 8 }}
            >
              ⏸ Pause
            </button>
          ) : (
            <button
              onClick={start}
              style={{ background: 'var(--color-success)', color: '#fff', fontSize: 16, padding: '10px 28px', borderRadius: 8 }}
            >
              ▶ {currentSegmentIndex === 0 && secondsLeft === segments[0]?.durationSeconds ? 'Start' : 'Resume'}
            </button>
          )
        ) : (
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-success)' }}>
            Presentation complete!
          </div>
        )}
        <button
          onClick={reset}
          style={{ background: '#e9ecef', color: 'var(--color-text)', fontSize: 16, padding: '10px 28px', borderRadius: 8 }}
        >
          ↺ Reset
        </button>
      </div>

      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Press <kbd style={{ background: '#e9ecef', padding: '1px 6px', borderRadius: 3, fontSize: 11 }}>Space</kbd> to play/pause
      </div>

      {/* Notes panel */}
      <NotesPanel
        segments={segments}
        currentSegmentIndex={currentSegmentIndex}
      />
    </div>
  );
}
