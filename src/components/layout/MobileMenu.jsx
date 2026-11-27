import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { navLinks, site } from '../../data/content';
import { ease } from '../../lib/hooks';

const panel = {
  hidden: { clipPath: 'circle(0% at calc(100% - 44px) 36px)' },
  show: { clipPath: 'circle(150% at calc(100% - 44px) 36px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { clipPath: 'circle(0% at calc(100% - 44px) 36px)', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
};

const list = { show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } }, exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } } };
const item = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.7, ease } },
  exit: { y: '110%', transition: { duration: 0.35, ease } },
};

export default function MobileMenu({ active, onNavigate }) {
  return (
    <motion.div id="mobile-menu" className="mobile-menu" variants={panel} initial="hidden" animate="show" exit="exit">
      <div className="mobile-menu-grid" aria-hidden="true" />
      <motion.nav className="mobile-menu-nav" variants={list} initial="hidden" animate="show" exit="exit" aria-label="Mobile">
        {navLinks.map((link, i) => (
          <span className="reveal-mask" key={link.id}>
            <motion.a
              variants={item}
              href={`#${link.id}`}
              onClick={onNavigate(link.id)}
              className={`mobile-menu-link ${active === link.id ? 'is-active' : ''}`}
            >
              <span className="mobile-menu-index">0{i + 1}</span>
              {link.label}
            </motion.a>
          </span>
        ))}
      </motion.nav>
      <motion.div
        className="mobile-menu-foot"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6, ease } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <span className="mono-label">Say hello</span>
        <a href={`mailto:${site.email}`} className="mobile-menu-email">
          {site.email} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <div className="mobile-menu-socials">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} className="mono-label">
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
