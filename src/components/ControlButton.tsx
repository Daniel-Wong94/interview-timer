interface Props {
  label: string;
  icon: string;
  color: 'pause' | 'reset' | 'edit';
  onClick: () => void;
  disabled?: boolean;
}

const COLOR_MAP = {
  pause: { background: 'var(--control-pause)', color: '#fff' },
  reset: { background: 'var(--control-reset)', color: '#1a1b3a' },
  edit:  { background: 'var(--control-edit)',  color: '#1a1b3a' },
};

export function ControlButton({ label, icon, color, onClick, disabled }: Props) {
  const { background, color: textColor } = COLOR_MAP[color];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background,
        color: textColor,
        border: 'none',
        borderRadius: 12,
        padding: '14px 32px',
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </button>
  );
}
