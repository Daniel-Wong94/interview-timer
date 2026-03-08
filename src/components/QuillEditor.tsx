import { useEffect, useRef } from 'react';
import Quill from 'quill';
import QuillResize from 'quill-resize-module';
import TableUI from 'quill-table-ui';
import 'quill/dist/quill.snow.css';
import 'quill-resize-module/dist/resize.css';
import 'quill-table-ui/dist/index.css';

Quill.register('modules/resize', QuillResize, true);
Quill.register('modules/tableUI', TableUI, true);

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const TOOLBAR = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['image', 'table'],
  ['clean'],
];

export function QuillEditor({ value, onChange, placeholder }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    const quill = new Quill(containerRef.current, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: {
          container: TOOLBAR,
          handlers: {
            table: () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (quill.getModule('table') as any)?.insertTable(3, 3);
            },
          },
        },
        table: true,
        tableUI: true,
        resize: {
          locale: {},
        },
      },
    });

    quill.on('text-change', () => {
      onChangeRef.current(quill.getSemanticHTML());
    });

    quillRef.current = quill;
  }, [placeholder]);

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
