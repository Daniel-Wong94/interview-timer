import type { Presentation } from '../types';
import { SegmentList } from '../components/SegmentList';
import { WarningSettings } from '../components/WarningSettings';

interface Props {
  presentation: Presentation;
  onChange: (p: Presentation) => void;
  onStart: () => void;
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function SetupPage({ presentation, onChange, onStart }: Props) {
  const totalSeconds = presentation.segments.reduce((sum, s) => sum + s.durationSeconds, 0);
  const canStart = presentation.segments.length > 0;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Presentation Timer</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 32 }}>
        Configure your segments, then start the timer.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Segments</h2>
        <SegmentList
          segments={presentation.segments}
          onChange={segments => onChange({ ...presentation, segments })}
        />
        {totalSeconds > 0 && (
          <div style={{ marginTop: 12, fontSize: 14, color: 'var(--color-text-muted)' }}>
            Total duration: <strong style={{ color: 'var(--color-text)' }}>{formatDuration(totalSeconds)}</strong>
          </div>
        )}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Warning Thresholds</h2>
        <WarningSettings
          yellowSeconds={presentation.warningYellowSeconds}
          redSeconds={presentation.warningRedSeconds}
          onChange={(yellow, red) => onChange({
            ...presentation,
            warningYellowSeconds: yellow,
            warningRedSeconds: red,
          })}
        />
      </section>

      <button
        onClick={onStart}
        disabled={!canStart}
        style={{
          background: canStart ? 'var(--color-primary)' : '#adb5bd',
          color: '#fff',
          fontSize: 16,
          padding: '12px 32px',
          borderRadius: 8,
        }}
      >
        Start Presentation →
      </button>

      {!canStart && (
        <p style={{ marginTop: 8, fontSize: 13, color: 'var(--color-text-muted)' }}>
          Add at least one segment to start.
        </p>
      )}
    </div>
  );
}
