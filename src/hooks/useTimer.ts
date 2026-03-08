import { useState, useEffect, useRef, useCallback } from 'react';
import type { Segment } from '../types';

export type WarningLevel = 'none' | 'yellow' | 'red';

interface UseTimerProps {
  segments: Segment[];
  warningYellowSeconds: number;
  warningRedSeconds: number;
}

interface UseTimerReturn {
  currentSegmentIndex: number;
  secondsLeft: number;
  isRunning: boolean;
  isFinished: boolean;
  warningLevel: WarningLevel;
  start: () => void;
  pause: () => void;
  reset: () => void;
  jumpTo: (index: number) => void;
}

export function useTimer({
  segments,
  warningYellowSeconds,
  warningRedSeconds,
}: UseTimerProps): UseTimerReturn {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(
    segments[0]?.durationSeconds ?? 0
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Advance to next segment or finish
  const advance = useCallback(
    (fromIndex: number) => {
      const nextIndex = fromIndex + 1;
      if (nextIndex >= segments.length) {
        setIsRunning(false);
        setIsFinished(true);
        setSecondsLeft(0);
      } else {
        setCurrentSegmentIndex(nextIndex);
        setSecondsLeft(segments[nextIndex].durationSeconds);
      }
    },
    [segments]
  );

  useEffect(() => {
    if (!isRunning) {
      clearTick();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Will advance after state update via separate effect
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTick;
  }, [isRunning]);

  // Watch for secondsLeft hitting 0 to advance
  const currentSegmentIndexRef = useRef(currentSegmentIndex);
  currentSegmentIndexRef.current = currentSegmentIndex;

  useEffect(() => {
    if (isRunning && secondsLeft === 0 && !isFinished) {
      advance(currentSegmentIndexRef.current);
    }
  }, [secondsLeft, isRunning, isFinished, advance]);

  const start = useCallback(() => {
    if (isFinished || segments.length === 0) return;
    setIsRunning(true);
  }, [isFinished, segments.length]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearTick();
    setIsRunning(false);
    setIsFinished(false);
    setCurrentSegmentIndex(0);
    setSecondsLeft(segments[0]?.durationSeconds ?? 0);
  }, [segments]);

  const jumpTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= segments.length) return;
      setCurrentSegmentIndex(index);
      setSecondsLeft(segments[index].durationSeconds);
      setIsFinished(false);
    },
    [segments]
  );

  const warningLevel: WarningLevel =
    secondsLeft <= warningRedSeconds
      ? 'red'
      : secondsLeft <= warningYellowSeconds
      ? 'yellow'
      : 'none';

  return {
    currentSegmentIndex,
    secondsLeft,
    isRunning,
    isFinished,
    warningLevel,
    start,
    pause,
    reset,
    jumpTo,
  };
}
