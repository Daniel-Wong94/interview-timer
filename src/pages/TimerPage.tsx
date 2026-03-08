import type { Presentation } from '../types';
import { useTimer } from '../hooks/useTimer';
import { useTheme } from '../hooks/useTheme';
import { ProgressBar } from '../components/ProgressBar';
import { TimerDisplay } from '../components/TimerDisplay';
import { NotesPanel } from '../components/NotesPanel';

interface Props {
  presentation: Presentation;
  onBack: () => void;
}

export function TimerPage({ presentation, onBack }: Props) {
  const { segments, warningYellowSeconds, warningRedSeconds } = presentation;
  const { darkMode, toggle } = useTheme();

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

  const currentSegment = segments[currentSegmentIndex];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', fontSize: 13 }}
        >
          ← Back to Setup
        </button>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!isFinished ? (
            isRunning ? (
              <button
                onClick={pause}
                style={{ background: '#ffc107', color: '#000', fontSize: 14, padding: '6px 18px', borderRadius: 8 }}
              >
                ⏸ Pause
              </button>
            ) : (
              <button
                onClick={start}
                style={{ background: 'var(--color-success)', color: '#fff', fontSize: 14, padding: '6px 18px', borderRadius: 8 }}
              >
                ▶ {currentSegmentIndex === 0 && secondsLeft === segments[0]?.durationSeconds ? 'Start' : 'Resume'}
              </button>
            )
          ) : (
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-success)' }}>
              Complete!
            </span>
          )}
          <button
            onClick={reset}
            style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', fontSize: 14, padding: '6px 18px', borderRadius: 8 }}
          >
            ↺ Reset
          </button>
          <button
            onClick={toggle}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', fontSize: 16, padding: '6px 10px', borderRadius: 8 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
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
        isFinished={isFinished}
      />

      {/* Notes panel */}
      <NotesPanel
        segments={segments}
        currentSegmentIndex={currentSegmentIndex}
      />
    </div>
  );
}
