import { TimeStats } from './TimeStats';
import { SegmentProgressBar } from './SegmentProgressBar';
import { SegmentNav } from './SegmentNav';
import { SpeakerNotesPanel } from './SpeakerNotesPanel';
import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
  secondsLeft: number;
  isRunning: boolean;
  isFinished: boolean;
  totalElapsed: number;
  totalRemaining: number;
  notesVisible: boolean;
  onToggleNotes: () => void;
  onJumpTo: (index: number) => void;
  onUpdateNotes: (index: number, notes: string) => void;
}

// Chevron Up SVG
function ChevronUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12.5L10 7.5L15 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Chevron Down SVG
function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TIMER_GRADIENT = 'linear-gradient(10.97deg, rgb(49,46,129) 4.4%, rgb(113,105,234) 126.2%)';

export function TimerCard({
  segments,
  currentSegmentIndex,
  secondsLeft,
  isRunning,
  isFinished,
  totalElapsed,
  totalRemaining,
  notesVisible,
  onToggleNotes,
  onJumpTo,
  onUpdateNotes,
}: Props) {
  return (
    <div style={{
      background: TIMER_GRADIENT,
      borderRadius: 24,
      border: '2px solid rgba(255,255,255,0.2)',
      boxShadow: '0 0 16px rgba(49,46,129,0.25)',
      overflow: 'hidden',
      isolation: 'isolate',
    }}>
      {/* Inner container — clips rounded corners */}
      <div style={{ background: '#f0effc', borderRadius: 24, overflow: 'hidden' }}>
        {/* Timer section with gradient */}
        <div style={{
          background: TIMER_GRADIENT,
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 0 16px rgba(49,46,129,0.25)',
          padding: '56px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          alignItems: 'stretch',
          overflow: 'hidden',
        }}>
          <TimeStats
            totalElapsed={totalElapsed}
            secondsLeft={secondsLeft}
            totalRemaining={totalRemaining}
          />
          <SegmentProgressBar
            segments={segments}
            currentSegmentIndex={currentSegmentIndex}
            secondsLeft={secondsLeft}
            isRunning={isRunning}
            isFinished={isFinished}
          />
          <SegmentNav
            segments={segments}
            currentSegmentIndex={currentSegmentIndex}
            onJumpTo={onJumpTo}
          />
        </div>

        {/* Speaker notes section */}
        {notesVisible && (
          <SpeakerNotesPanel
            segments={segments}
            currentSegmentIndex={currentSegmentIndex}
            onUpdateNotes={onUpdateNotes}
          />
        )}
      </div>

      {/* Toggle bar — shows the outer purple gradient as background */}
      <button
        onClick={onToggleNotes}
        style={{
          width: '100%',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          borderRadius: 0,
        }}
      >
        <span style={{
          fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
          fontWeight: 700,
          fontSize: 16,
          color: '#fff',
          opacity: 0.8,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textShadow: '0 0 16px rgba(255,255,255,0.25)',
        }}>
          {notesVisible ? 'Hide Speaker notes' : 'Show Speaker notes'}
        </span>
        {notesVisible ? <ChevronUp /> : <ChevronDown />}
      </button>
    </div>
  );
}
