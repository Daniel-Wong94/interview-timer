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

const bgColors: Record<WarningLevel, string> = {
  none: '#ffffff',
  yellow: '#FFF3CD',
  red: '#F8D7DA',
};

const textColors: Record<WarningLevel, string> = {
  none: '#212529',
  yellow: '#856404',
  red: '#842029',
};

export function TimerDisplay({ segment, secondsLeft, warningLevel, isFinished }: Props) {
  return (
    <div
      style={{
        background: bgColors[warningLevel],
        color: textColors[warningLevel],
        borderRadius: 12,
        padding: '32px 48px',
        textAlign: 'center',
        transition: 'background-color 0.5s ease, color 0.5s ease',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: 'inherit', opacity: 0.7, marginBottom: 8 }}>
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
      {warningLevel !== 'none' && !isFinished && (
        <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600 }}>
          {warningLevel === 'red' ? 'Time almost up!' : 'Wrapping up soon'}
        </div>
      )}
    </div>
  );
}
