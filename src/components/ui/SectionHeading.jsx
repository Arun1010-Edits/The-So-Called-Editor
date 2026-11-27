import { motion } from 'framer-motion';
import { RevealText, Reveal } from './Reveal';
import { ease } from '../../lib/hooks';

export default function SectionHeading({ index, label, lines, note, id }) {
  return (
    <header className="section-heading">
      <motion.span
        className="section-rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.2, ease }}
        aria-hidden="true"
      />
      <div className="section-heading-main">
        <Reveal className="eyebrow" y={12}>
          <span className="eyebrow-line" aria-hidden="true" />
          <span className="eyebrow-index">{index}</span>
          <span>{label}</span>
        </Reveal>
        <RevealText as="h2" id={id} lines={lines} className="display-lg" dot />
      </div>
      {note ? (
        <Reveal className="section-note" delay={0.2}>
          {note}
        </Reveal>
      ) : null}
    </header>
  );
}
