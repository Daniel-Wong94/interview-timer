import { useState, useEffect } from 'react';
import type { Presentation } from '../types';
import { useTimer } from '../hooks/useTimer';
import { TimerCard } from '../components/TimerCard';
import { ControlBar } from '../components/ControlBar';

interface Props {
  presentation: Presentation;
  onChange: (p: Presentation) => void;
  onBack: () => void;
}

export function TimerPage({ presentation, onChange, onBack }: Props) {
  const { segments, warningYellowSeconds, warningRedSeconds } = presentation;
  const [notesVisible, setNotesVisible] = useState(true);

  const {
    currentSegmentIndex,
    secondsLeft,
    isRunning,
    isFinished,
    start,
    pause,
    reset,
    jumpTo,
  } = useTimer({ segments, warningYellowSeconds, warningRedSeconds });

  // Force dark navy page background while timer is mounted
  useEffect(() => {
    const prevBg = document.body.style.background;
    document.body.style.background = 'var(--timer-page-bg)';
    return () => { document.body.style.background = prevBg; };
  }, []);

  // Total elapsed = all completed segments + elapsed in current segment
  const totalElapsed =
    segments.slice(0, currentSegmentIndex).reduce((s, seg) => s + seg.durationSeconds, 0) +
    (isFinished
      ? (segments[currentSegmentIndex]?.durationSeconds ?? 0)
      : (segments[currentSegmentIndex]?.durationSeconds ?? 0) - secondsLeft);

  // Total remaining = current secondsLeft + all future segments
  const totalRemaining =
    secondsLeft +
    segments.slice(currentSegmentIndex + 1).reduce((s, seg) => s + seg.durationSeconds, 0);

  function handlePlayPause() {
    if (isRunning) pause();
    else start();
  }

  function handleUpdateNotes(index: number, notes: string) {
    const updatedSegments = segments.map((seg, i) =>
      i === index ? { ...seg, notes } : seg
    );
    onChange({ ...presentation, segments: updatedSegments });
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--timer-page-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 16px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1040,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}>
        <TimerCard
          segments={segments}
          currentSegmentIndex={currentSegmentIndex}
          secondsLeft={secondsLeft}
          isRunning={isRunning}
          isFinished={isFinished}
          totalElapsed={totalElapsed}
          totalRemaining={totalRemaining}
          notesVisible={notesVisible}
          onToggleNotes={() => setNotesVisible(v => !v)}
          onJumpTo={jumpTo}
          onUpdateNotes={handleUpdateNotes}
        />

        <ControlBar
          isRunning={isRunning}
          isFinished={isFinished}
          onPlayPause={handlePlayPause}
          onReset={reset}
          onEdit={onBack}
        />
      </div>
    </div>
  );
}
