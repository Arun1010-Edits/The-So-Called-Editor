import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { navLinks, site } from '../../data/content';
import { ease, useClock } from '../../lib/hooks';
import { useSmoothScroll } from '../../lib/scroll';
import Magnetic from '../ui/Magnetic';
import SocialIcon from '../ui/SocialIcon';

export default function Footer() {
  const { scrollTo } = useSmoothScroll();
  const time = useClock(site.timezone);

  const go = (id) => (e) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
          <motion.p
            className="footer-signature"
            variants={{
              hidden: { clipPath: 'inset(0 100% 0 0)' },
              show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.6, ease } },
            }}
          >
            The So Called Editor
          </motion.p>
        </motion.div>

        <div className="footer-grid">
          <div className="footer-col">
            <span className="mono-label">Navigate</span>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={go(l.id)} className="footer-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <span className="mono-label">Elsewhere</span>
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="footer-link">
                    <SocialIcon name={s.icon} size={15} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <span className="mono-label">Local time</span>
            <p className="footer-time">
              <span className="live-dot" aria-hidden="true" />
              {time} <span>IST · {site.location}</span>
            </p>
            <a href={`mailto:${site.email}`} className="footer-link">
              {site.email}
            </a>
          </div>
          <div className="footer-col footer-top-col">
            <Magnetic strength={0.5}>
              <a href="#top" onClick={go('top')} className="back-top" aria-label="Back to top" data-cursor="Top">
                <ArrowUp size={22} aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The So Called Editor</span>
          <span>Crafted frame by frame</span>
          <span>{site.role}</span>
        </div>
      </div>
    </footer>
  );
}
