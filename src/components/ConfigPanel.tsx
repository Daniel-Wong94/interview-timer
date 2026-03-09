import { SegmentList } from './SegmentList';
import { WarningSettings } from './WarningSettings';
import type { Presentation } from '../types';

interface Props {
  presentation: Presentation;
  onChange: (p: Presentation) => void;
  onDone: () => void;
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function ConfigPanel({ presentation, onChange, onDone }: Props) {
  const totalSeconds = presentation.segments.reduce((sum, s) => sum + s.durationSeconds, 0);
  const canStart = presentation.segments.length > 0;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: '2px solid rgba(255,255,255,0.15)',
      borderRadius: 24,
      padding: '40px 48px',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{
          fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
          fontWeight: 700,
          fontSize: 24,
          color: '#fff',
          opacity: 0.9,
          margin: 0,
        }}>
          Configure Timer
        </h2>
        {totalSeconds > 0 && (
          <span style={{
            fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
          }}>
            Total: {formatDuration(totalSeconds)}
          </span>
        )}
      </div>

      <div>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
          Segments
        </p>
        <SegmentList
          segments={presentation.segments}
          onChange={segments => onChange({ ...presentation, segments })}
        />
      </div>

      <div>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
          Warning Thresholds
        </p>
        <WarningSettings
          yellowSeconds={presentation.warningYellowSeconds}
          redSeconds={presentation.warningRedSeconds}
          onChange={(yellow, red) => onChange({
            ...presentation,
            warningYellowSeconds: yellow,
            warningRedSeconds: red,
          })}
        />
      </div>

      <button
        onClick={onDone}
        disabled={!canStart}
        style={{
          alignSelf: 'flex-start',
          background: canStart
            ? 'linear-gradient(11deg, rgb(244,118,45) 13.8%, rgb(255,215,138) 104.2%)'
            : 'rgba(255,255,255,0.15)',
          color: canStart ? '#fff' : 'rgba(255,255,255,0.4)',
          border: 'none',
          borderRadius: 12,
          padding: '14px 40px',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "'SF Mono', 'Fira Mono', 'Consolas', monospace",
          letterSpacing: '0.05em',
          cursor: canStart ? 'pointer' : 'not-allowed',
        }}
      >
        {canStart ? 'Start Timer →' : 'Add a segment to start'}
      </button>
    </div>
  );
}
