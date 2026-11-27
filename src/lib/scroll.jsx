import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext({ scrollTo: () => {}, lock: () => {}, unlock: () => {} });

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    lenisRef.current = lenis;
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target) => {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    const isTop = target === 'top';
    if (lenisRef.current) {
      lenisRef.current.scrollTo(isTop ? 0 : el, { offset: isTop ? 0 : -72, force: true });
    } else if (isTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const lock = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.classList.add('scroll-locked');
  }, []);

  const unlock = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.classList.remove('scroll-locked');
  }, []);

  return <ScrollContext.Provider value={{ scrollTo, lock, unlock }}>{children}</ScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollContext);
