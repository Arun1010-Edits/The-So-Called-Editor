import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { marquee, site } from '../../data/content';
import { ease } from '../../lib/hooks';
import { Reveal, RevealText } from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';
import Marquee from '../ui/Marquee';
import SocialIcon from '../ui/SocialIcon';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <motion.div
          className="contact-sun"
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
      </div>

      <div className="container contact-inner">
        <Reveal className="eyebrow eyebrow-center" y={12}>
          <span className="eyebrow-line" aria-hidden="true" />
          <span className="eyebrow-index">07</span>
          <span>Have a story?</span>
          <span className="eyebrow-line" aria-hidden="true" />
        </Reveal>

        <RevealText as="h2" id="contact-title" lines={["Let's make", { text: 'it move', className: 'text-red' }]} className="display-xl" dot />

        <Reveal className="contact-sub" delay={0.15}>
          Have a project, a collaboration idea or just want to talk creative? My inbox is open.
        </Reveal>

        <Reveal className="contact-mail-row" delay={0.25}>
          <Magnetic strength={0.2}>
            <a className="contact-mail" href={`mailto:${site.email}`} data-cursor="Write">
              <span>{site.email}</span>
              <ArrowUpRight className="contact-mail-icon" aria-hidden="true" />
            </a>
          </Magnetic>
          <button type="button" className="copy-btn" onClick={copy} aria-label="Copy email address">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'done' : 'copy'}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="copy-btn-inner"
              >
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
              </motion.span>
            </AnimatePresence>
          </button>
        </Reveal>

        <Reveal className="contact-socials" delay={0.35}>
          {site.socials.map((s) => (
            <Magnetic key={s.label} strength={0.5}>
              <a href={s.href} className="social-btn" aria-label={s.label}>
                <SocialIcon name={s.icon} />
              </a>
            </Magnetic>
          ))}
        </Reveal>
      </div>

      <Marquee items={marquee} />
    </section>
  );
}
