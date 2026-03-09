interface Props {
  isRunning: boolean;
  isFinished: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onEdit: () => void;
}

function PauseIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
      <rect x="13" y="12" width="8" height="24" rx="2" fill="white" />
      <rect x="27" y="12" width="8" height="24" rx="2" fill="white" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
      <path d="M16 12L36 24L16 36V12Z" fill="white" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 20.134 36.418 16.634 33.9 14.1" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33.9 10V14.1H29.8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
      <path d="M33.5 13.5L34.5 12.5C35.88 11.12 38.12 11.12 39.5 12.5C40.88 13.88 40.88 16.12 39.5 17.5L38.5 18.5M33.5 13.5L16 31L14 34L17 32L34.5 14.5M33.5 13.5L34.5 14.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ControlBar({ isRunning, isFinished, onPlayPause, onReset, onEdit }: Props) {
  return (
    <div style={{
      display: 'flex',
      border: '2px solid rgba(255,255,255,0.2)',
      borderRadius: 24,
      overflow: 'hidden',
      height: 111,
      isolation: 'isolate',
    }}>
      {/* Pause / Play */}
      <button
        onClick={onPlayPause}
        disabled={isFinished}
        style={{
          flex: '1 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(11deg, rgb(244,118,45) 13.8%, rgb(255,215,138) 104.2%)',
          border: 'none',
          cursor: isFinished ? 'not-allowed' : 'pointer',
          opacity: isFinished ? 0.5 : 1,
          borderRadius: 0,
        }}
      >
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        style={{
          flex: '1 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(24.89deg, rgb(221,180,246) 31.2%, rgb(141,208,252) 151.1%)',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 0,
        }}
      >
        <ReplayIcon />
      </button>

      {/* Edit */}
      <button
        onClick={onEdit}
        style={{
          flex: '1 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(29.19deg, rgb(177,144,186) 24.8%, rgb(247,192,236) 134.1%)',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 0,
        }}
      >
        <EditIcon />
      </button>
    </div>
  );
}
