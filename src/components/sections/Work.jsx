import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { projects } from '../../data/content';
import { ease } from '../../lib/hooks';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';

function ProjectCard({ project, index, total }) {
  const vertical = project.format === '9:16';
  return (
    <motion.li
      className={`project ${project.span === 'wide' ? 'project-wide' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease }}
    >
      <TiltCard as="article" className="project-card" max={4} data-cursor="Soon" aria-label={`${project.category} — project ${project.n}, coming soon`}>
        <div className="project-frame">
          <div className="project-frame-inner">
            <div className="project-noise" aria-hidden="true" />
            <div className="project-sweep" aria-hidden="true" />
            {vertical ? <div className="project-vertical" aria-hidden="true" /> : null}
            <div className="project-guides" aria-hidden="true">
              <span />
              <span />
            </div>
          </div>

          <div className="project-top">
            <span className="tag-pill">{project.category}</span>
            <span className="mono-label">
              {project.n} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="project-center" aria-hidden="true">
            <span className="project-play">
              <Play size={20} fill="currentColor" />
            </span>
          </div>

          <div className="project-bottom" aria-hidden="true">
            <span className="mono-label">00:00:00:00</span>
            <span className="mono-label">{project.format} · Upload pending</span>
          </div>
        </div>

        <div className="project-info">
          <div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-sub">Coming soon — slot reserved for a finished piece.</p>
          </div>
          <span className="project-arrow" aria-hidden="true">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </TiltCard>
    </motion.li>
  );
}

export default function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          index="02"
          label="Selected work"
          lines={['Frames with', 'something to say']}
          note={`${projects.length} slots reserved. Final cuts are being prepared and will be uploaded here soon.`}
        />
        <ul className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} total={projects.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
