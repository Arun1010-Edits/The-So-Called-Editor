import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '../../lib/hooks';

export default function Cursor() {
  const enabled = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 170, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 170, damping: 20, mass: 0.5 });
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e) => {
      const target = e.target.closest?.('a, button, [data-cursor], summary, input, textarea');
      setHover(Boolean(target));
      setLabel(target?.dataset?.cursor || '');
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hover ? 62 : 36;

  return (
    <div className="cursor-layer" aria-hidden="true">
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          scale: pressed ? 0.85 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        data-label={label ? 'true' : 'false'}
      >
        <motion.span
          className="cursor-label"
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.div>
      <motion.div
        className="cursor-dot"
        style={{ x, y }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: hover ? 0.4 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
