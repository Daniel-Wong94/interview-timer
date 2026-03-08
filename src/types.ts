export interface Segment {
  id: string;
  name: string;
  durationSeconds: number;
  notes: string;
}

export interface Presentation {
  segments: Segment[];
  warningYellowSeconds: number;
  warningRedSeconds: number;
}
