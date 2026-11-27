import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { journey } from '../../data/content';
import { ease } from '../../lib/hooks';
import SectionHeading from '../ui/SectionHeading';

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading
          id="journey-title"
          index="06"
          label="Learning journey"
          lines={['Always in', 'progress']}
          note="Learning by doing — building through experiments, feedback and real creative challenges."
        />
        <div className="journey" ref={ref}>
          <div className="journey-track" aria-hidden="true">
            <motion.span className="journey-fill" style={{ scaleX: progress }} />
          </div>
          <ol className="journey-list">
            {journey.map((step, i) => (
              <motion.li
                key={step.title}
                className="journey-step"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                <span className="journey-node" aria-hidden="true" />
                <span className="mono-label">{step.tag}</span>
                <p className="journey-meta">{step.meta}</p>
                <h3>{step.title}</h3>
                <p className="journey-text">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
