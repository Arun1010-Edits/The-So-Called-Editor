import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '../../data/content';
import { ease } from '../../lib/hooks';
import SectionHeading from '../ui/SectionHeading';

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Professional experience"
          lines={['The working', 'timeline']}
          note="Where the craft is being put to work — and the space for what comes next."
        />

        <ol className="timeline" ref={listRef}>
          <span className="timeline-track" aria-hidden="true">
            <motion.span className="timeline-fill" style={{ scaleY }} />
          </span>
          {experience.map((job, i) => (
            <motion.li
              key={job.role}
              className={`timeline-item ${job.open ? 'is-open' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease }}
            >
              <span className="timeline-node" aria-hidden="true" />
              <div className="timeline-period">{job.period}</div>
              <div className="timeline-body">
                <h3>{job.role}</h3>
                <p className="timeline-org">{job.org}</p>
                <ul className="timeline-points">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
