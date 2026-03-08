import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const TOOLBAR = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
];

export function QuillEditor({ value, onChange, placeholder }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  // Keep a ref to the latest onChange so the event handler never goes stale
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const quill = new Quill(containerRef.current, {
      theme: 'snow',
      placeholder,
      modules: { toolbar: TOOLBAR },
    });

    quill.on('text-change', () => {
      onChangeRef.current(quill.getSemanticHTML());
    });

    quillRef.current = quill;
  }, [placeholder]);

  // Sync value in when it changes externally (e.g. loading from localStorage)
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const current = quill.getSemanticHTML();
    if (value !== current) {
      quill.clipboard.dangerouslyPasteHTML(value ?? '');
    }
  }, [value]);

  return <div ref={containerRef} />;
}
