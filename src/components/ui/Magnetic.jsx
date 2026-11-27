import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const spring = { stiffness: 220, damping: 16, mass: 0.4 };

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const innerX = useSpring(0, spring);
  const innerY = useSpring(0, spring);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    innerX.set(dx * strength * 0.4);
    innerY.set(dy * strength * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div className="magnetic-inner" style={{ x: innerX, y: innerY }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
