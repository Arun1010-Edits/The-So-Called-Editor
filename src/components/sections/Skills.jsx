import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { skills } from '../../data/content';
import { ease, useFinePointer } from '../../lib/hooks';
import SectionHeading from '../ui/SectionHeading';

function SkillRow({ skill, open, onToggle, onHover }) {
  const panelId = `skill-panel-${skill.n}`;
  return (
    <motion.li
      className={`skill-row ${open ? 'is-open' : ''}`}
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease }}
    >
      <button type="button" className="skill-trigger" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span className="skill-n">{skill.n}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-summary">{skill.summary}</span>
        <motion.span className="skill-plus" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4, ease }} aria-hidden="true">
          <Plus size={26} strokeWidth={1.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            className="skill-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="skill-panel-inner">
              <p className="skill-summary-mobile">{skill.summary}</p>
              <ul className="pill-list">
                {skill.tags.map((t, i) => (
                  <motion.li
                    key={t}
                    className="pill"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease }}
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Skills() {
  const [open, setOpen] = useState('01');
  const fine = useFinePointer();
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="04"
          label="Creative skills"
          lines={['What I do', 'best']}
          note="Hover a row (or tap it) to see what's behind it."
        />
      </div>
      <ul className="skill-list">
        {skills.map((s) => (
          <SkillRow
            key={s.n}
            skill={s}
            open={open === s.n}
            onToggle={() => setOpen((cur) => (cur === s.n ? '' : s.n))}
            onHover={() => fine && setOpen(s.n)}
          />
        ))}
      </ul>
    </section>
  );
}
