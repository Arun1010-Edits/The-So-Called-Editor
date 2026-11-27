import { motion } from 'framer-motion';
import { ease } from '../../lib/hooks';

const wordVariants = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } },
};

/**
 * Masked word-by-word headline reveal.
 * lines: array of strings or { text, className } objects; each entry renders on its own line.
 */
export function RevealText({ as = 'h2', id, lines, className = '', dot = false, trigger, delay = 0, stagger = 0.06 }) {
  const Tag = motion[as];
  const controlled = trigger !== undefined;
  const parts = lines.map((line) => (typeof line === 'string' ? { text: line } : line));
  const label = parts.map((p) => p.text).join(' ');

  return (
    <Tag
      id={id}
      className={`reveal-text ${className}`}
      aria-label={label}
      initial="hidden"
      {...(controlled
        ? { animate: trigger ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {parts.map((part, li) => {
        const words = part.text.split(' ');
        const isLast = li === parts.length - 1;
        return (
          <span className={`reveal-line ${part.className || ''}`} key={li} aria-hidden="true">
            {words.map((word, wi) => (
              <span className="reveal-mask" key={wi}>
                <motion.span className="reveal-word" variants={wordVariants}>
                  {word}
                  {dot && isLast && wi === words.length - 1 ? <span className="red-dot" /> : null}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', trigger }) {
  const Tag = motion[as];
  const controlled = trigger !== undefined;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      {...(controlled
        ? { animate: trigger ? { opacity: 1, y: 0 } : { opacity: 0, y } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}
