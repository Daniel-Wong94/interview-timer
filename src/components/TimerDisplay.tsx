import type { WarningLevel } from '../hooks/useTimer';
import type { Segment } from '../types';

interface Props {
  segment: Segment | undefined;
  secondsLeft: number;
  warningLevel: WarningLevel;
  isFinished: boolean;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const bgVars: Record<WarningLevel, string> = {
  none: 'var(--timer-normal-bg)',
  yellow: 'var(--timer-yellow-bg)',
  red: 'var(--timer-red-bg)',
};

const textVars: Record<WarningLevel, string> = {
  none: 'var(--timer-normal-text)',
  yellow: 'var(--timer-yellow-text)',
  red: 'var(--timer-red-text)',
};

export function TimerDisplay({ segment, secondsLeft, warningLevel, isFinished }: Props) {
  return (
    <div
      style={{
        background: isFinished ? 'var(--timer-finished-bg)' : bgVars[warningLevel],
        color: isFinished ? 'var(--timer-finished-text)' : textVars[warningLevel],
        borderRadius: 12,
        padding: '32px 48px',
        textAlign: 'center',
        transition: 'background-color 0.5s ease, color 0.5s ease',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 600, color: 'inherit', opacity: 0.7, marginBottom: 8 }}>
        {segment?.name || 'No segment'}
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: 4,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
        }}
      >
        {isFinished ? 'Done!' : formatTime(secondsLeft)}
      </div>
    </div>
  );
}
