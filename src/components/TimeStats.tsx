import { StatBlock } from './StatBlock';
import { MainTimer } from './MainTimer';

interface Props {
  totalElapsed: number;
  secondsLeft: number;
  totalRemaining: number;
}

function fmt(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function TimeStats({ totalElapsed, secondsLeft, totalRemaining }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 48px',
      fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
      whiteSpace: 'nowrap',
      textShadow: '0 0 16px rgba(255,255,255,0.25)',
    }}>
      <StatBlock label="Total Time Elapsed" value={fmt(totalElapsed)} />
      <MainTimer value={fmt(secondsLeft)} />
      <StatBlock label="total Time Remaining" value={fmt(totalRemaining)} />
    </div>
  );
}
