import { useState, useEffect } from 'react';
import type { Presentation } from '../types';

const STORAGE_KEY = 'presentation-timer';

const defaultPresentation: Presentation = {
  segments: [],
  warningYellowSeconds: 120,
  warningRedSeconds: 30,
};

export function usePresentation(): [Presentation, (p: Presentation) => void] {
  const [presentation, setPresentation] = useState<Presentation>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return defaultPresentation;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presentation));
  }, [presentation]);

  return [presentation, setPresentation];
}
