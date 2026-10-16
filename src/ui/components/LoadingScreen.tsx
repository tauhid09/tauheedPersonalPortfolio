import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

const BOOT_LOGS = [
  'KERNEL: INIT_SWISS_GRID_SYSTEM [OK]',
  'LOCALE: EN_US // TIMEZONE: ASIA/KOLKATA (IST)',
  'CONFIG: SALESFORCE_SPRING_26_METRICS [LOADED]',
  'APEX_SECURITY: WITH_SHARING_STRICT [ENFORCED]',
  'LWC_SHADOW_DOM: RENDERING_ENGINE [READY]',
  'PROFILE: MOHD_TAUHEED_ANSARI // CANDIDATE_LOADED',
];

export function LoadingScreen({ onComplete, minDuration = 1800 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let animFrame: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      
      // Swiss typographic progression curve (snappy acceleration into final 100%)
      const curvedProgress = Math.min(
        100,
        Math.floor(Math.pow(rawProgress / 100, 0.88) * 100)
      );

      setProgress(curvedProgress);

      const logIdx = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((curvedProgress / 100) * BOOT_LOGS.length)
      );
      setCurrentLogIndex(logIdx);

      if (elapsed < minDuration) {
        animFrame = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setCurrentLogIndex(BOOT_LOGS.length - 1);
        
        // Start graceful fade out
        setTimeout(() => {
          setIsFadingOut(true);
        }, 150);

        // Remove from DOM after fade completes
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 550);
      }
    };

    animFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrame);
  }, [minDuration, onComplete]);

  if (isComplete) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-opacity duration-300 pointer-events-auto select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header Row with Swiss Grid Identifiers */}
      <div className="flex items-start justify-between border-b border-[var(--border-hairline)] pb-4 font-mono text-xs tracking-wider">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-[var(--accent)]" />
          <span className="font-semibold text-[var(--text-primary)]">
            SYSTEM BOOT
          </span>
          <span className="hidden sm:inline text-[var(--text-muted)]">
            / SYS_ID: MTA-2026.SF
          </span>
        </div>

        <div className="flex items-center gap-6 text-[var(--text-secondary)]">
          <span className="hidden md:inline font-mono">
            BUILD 26.4.1
          </span>
          <span className="font-mono text-[var(--text-primary)]">
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>

      {/* Central Hero Block: Monumental Swiss Typography */}
      <div className="my-auto py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest">
            Portfolio & Systems Architecture
          </p>

          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display leading-none">
              MOHD TAUHEED
              <span className="block text-[var(--text-muted)]">ANSARI</span>
            </h1>

            {/* Monumental Progress Numeral */}
            <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-light text-[var(--text-primary)] tabular-nums">
              {progress < 100 ? `${progress}` : '100'}
              <span className="text-xl sm:text-2xl text-[var(--accent)] ml-1">
                %
              </span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>Salesforce Associate Developer</span>
            <span className="hidden sm:inline">Certified AI Associate & Agentforce Specialist</span>
          </div>

          {/* Strict 1px hairline progress bar */}
          <div className="w-full h-[2px] bg-[var(--border-hairline)] overflow-hidden mt-6">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Console Log */}
      <div className="border-t border-[var(--border-hairline)] pt-4 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)] animate-pulse">▶</span>
          <span className="text-[var(--text-secondary)] truncate max-w-[320px] sm:max-w-md">
            {BOOT_LOGS[currentLogIndex]}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          <span>Grid: 12-Col Modular</span>
          <span>•</span>
          <span>Type: Inter + JetBrains</span>
        </div>
      </div>
    </div>
  );
}
