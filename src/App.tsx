import { useState } from 'react';
import { usePresentation } from './hooks/usePresentation';
import { SetupPage } from './pages/SetupPage';
import { TimerPage } from './pages/TimerPage';

type View = 'setup' | 'timer';

export function App() {
  const [view, setView] = useState<View>('setup');
  const [presentation, setPresentation] = usePresentation();

  return (
    <>
      {view === 'setup' ? (
        <SetupPage
          presentation={presentation}
          onChange={setPresentation}
          onStart={() => setView('timer')}
        />
      ) : (
        <TimerPage
          presentation={presentation}
          onChange={setPresentation}
          onBack={() => setView('setup')}
        />
      )}
    </>
  );
}
