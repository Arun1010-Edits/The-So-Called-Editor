import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { navLinks } from '../../data/content';
import { ease, useActiveSection, useIntroDone } from '../../lib/hooks';
import { useSmoothScroll } from '../../lib/scroll';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';

const sectionIds = navLinks.map((l) => l.id);

export default function Nav() {
  const ready = useIntroDone();
  const active = useActiveSection(sectionIds);
  const { scrollTo, lock, unlock } = useSmoothScroll();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > 600 && latest > prev + 4 && !menuOpen);
    if (latest < prev - 4) setHidden(false);
  });

  useEffect(() => {
    if (menuOpen) lock();
    else unlock();
  }, [menuOpen, lock, unlock]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      unlock();
    }
    scrollTo(id);
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: hidden ? -90 : 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <a className="nav-brand" href="#top" onClick={go('top')} aria-label="The So Called Editor — back to top">
          <span>SO CALLED EDITOR</span>
          <span className="red-dot" aria-hidden="true" />
        </a>

        <nav className="nav-pill" aria-label="Primary">
          {navLinks.map((link, i) => (
            <span className="nav-pill-item" key={link.id}>
              {i > 0 ? <span className="nav-sep" aria-hidden="true" /> : null}
              <a
                href={`#${link.id}`}
                onClick={go(link.id)}
                className={active === link.id ? 'is-active' : ''}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
                {active === link.id ? (
                  <motion.span className="nav-underline" layoutId="nav-underline" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                ) : null}
              </a>
            </span>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-cta-wrap">
            <Button href="#contact" onClick={go('contact')} size="sm" dot>
              {"Let's talk"}
            </Button>
          </div>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen ? <MobileMenu active={active} onNavigate={go} /> : null}</AnimatePresence>
    </>
  );
}
