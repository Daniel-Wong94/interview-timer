import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import type { Segment } from '../types';

interface Props {
  segments: Segment[];
  currentSegmentIndex: number;
}

function ReadOnlyQuill({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;
    quillRef.current = new Quill(containerRef.current, {
      theme: 'snow',
      readOnly: true,
      modules: { toolbar: false },
    });
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    quill.clipboard.dangerouslyPasteHTML(html ?? '');
  }, [html]);

  return <div ref={containerRef} />;
}

export function NotesPanel({ segments, currentSegmentIndex }: Props) {
  const currentSegment = segments[currentSegmentIndex];
  const hasNotes = currentSegment?.notes && currentSegment.notes !== '<p><br></p>';

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      padding: 16,
      minHeight: 120,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Notes{currentSegment?.name ? ` — ${currentSegment.name}` : ''}
      </div>
      {hasNotes ? (
        <ReadOnlyQuill html={currentSegment.notes} />
      ) : (
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14, fontStyle: 'italic' }}>
          No notes for this segment.
        </div>
      )}
    </div>
  );
}
