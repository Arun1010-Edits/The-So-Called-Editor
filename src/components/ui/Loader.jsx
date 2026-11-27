import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { ease } from '../../lib/hooks';

const toTimecode = (progress) => {
  const totalFrames = Math.round(progress * 24 * 2.4);
  const seconds = Math.floor(totalFrames / 24);
  const frames = totalFrames % 24;
  return `00:00:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
};

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const controls = animate(0, 1, {
      duration: reduced ? 0.3 : 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: setProgress,
      onComplete: () => setTimeout(onComplete, reduced ? 0 : 250),
    });
    return () => controls.stop();
  }, [onComplete]);

  const pct = Math.round(progress * 100);
  const word = 'THE SO CALLED EDITOR';

  return (
    <motion.div
      className="loader"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${pct}%`}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-top">
        <span className="mono-label">
          <span className="rec-dot" aria-hidden="true" /> REC
        </span>
        <span className="mono-label">SCE_PORTFOLIO.PRPROJ</span>
        <span className="mono-label">24 FPS</span>
      </div>

      <div className="loader-center" aria-hidden="true">
        <div className="loader-word">
          {word.split('').map((char, i) => (
            <span className="reveal-mask" key={i}>
              <motion.span
                className="reveal-word"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.03, ease }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </div>
        <div className="loader-track">
          <span className="loader-fill" style={{ transform: `scaleX(${progress})` }} />
          <span className="loader-head" style={{ left: `${progress * 100}%` }} />
        </div>
      </div>

      <div className="loader-bottom">
        <span className="loader-timecode">{toTimecode(progress)}</span>
        <span className="loader-pct">{String(pct).padStart(3, '0')}</span>
      </div>
      <motion.div
        className="loader-wipe"
        initial={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
