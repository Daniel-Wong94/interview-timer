interface Props {
  isRunning: boolean;
  isFinished: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onEdit: () => void;
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g opacity="0.8">
        <path d="M28 38V10H36V38H28ZM12 38V10H20V38H12Z" fill="#121212" />
      </g>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g opacity="0.8">
        <mask id="mask0_10_513" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_10_513)">
          <path d="M16.975 42.575C14.7917 41.625 12.8917 40.3417 11.275 38.725C9.65833 37.1083 8.375 35.2083 7.425 33.025C6.475 30.8417 6 28.5 6 26H10C10 29.9 11.3583 33.2083 14.075 35.925C16.7917 38.6417 20.1 40 24 40C27.9 40 31.2083 38.6417 33.925 35.925C36.6417 33.2083 38 29.9 38 26C38 22.1 36.6417 18.7917 33.925 16.075C31.2083 13.3583 27.9 12 24 12H23.7L26.8 15.1L24 18L16 10L24 2L26.8 4.9L23.7 8H24C26.5 8 28.8417 8.475 31.025 9.425C33.2083 10.375 35.1083 11.6583 36.725 13.275C38.3417 14.8917 39.625 16.7917 40.575 18.975C41.525 21.1583 42 23.5 42 26C42 28.5 41.525 30.8417 40.575 33.025C39.625 35.2083 38.3417 37.1083 36.725 38.725C35.1083 40.3417 33.2083 41.625 31.025 42.575C28.8417 43.525 26.5 44 24 44C21.5 44 19.1583 43.525 16.975 42.575Z" fill="#1C1B1F" />
        </g>
      </g>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g opacity="0.8">
        <path d="M10 38H12.85L32.4 18.45L29.55 15.6L10 35.15V38ZM6 42V33.5L32.4 7.15C32.8 6.78333 33.2417 6.5 33.725 6.3C34.2083 6.1 34.7167 6 35.25 6C35.7833 6 36.3 6.1 36.8 6.3C37.3 6.5 37.7333 6.8 38.1 7.2L40.85 10C41.25 10.3667 41.5417 10.8 41.725 11.3C41.9083 11.8 42 12.3 42 12.8C42 13.3333 41.9083 13.8417 41.725 14.325C41.5417 14.8083 41.25 15.25 40.85 15.65L14.5 42H6ZM30.95 17.05L29.55 15.6L32.4 18.45L30.95 17.05Z" fill="#1D1B20" />
      </g>
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
