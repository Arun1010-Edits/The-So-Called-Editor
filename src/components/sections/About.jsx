import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { principles, site } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';
import { Reveal } from '../ui/Reveal';

const statement =
  "I'm a video editor and motion designer focused on building a complete visual language — from the first cut to the final sound hit. I believe every frame should have a reason to exist.";

function ScrubWord({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="scrub-word" style={{ opacity }}>
      {word}{' '}
    </motion.span>
  );
}

function ScrubParagraph({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="scrub-paragraph" aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <ScrubWord key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}

const facts = [
  { k: 'Based in', v: site.location },
  { k: 'Focus', v: 'Editing · Motion · Sound' },
  { k: 'Training', v: 'Pro Editor Club — 15 weeks' },
  { k: 'Status', v: 'Open to select projects', live: true },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="01"
          label="About me"
          lines={['More than', 'a timeline']}
          note="Not just cuts. Craft — a full pipeline of editing, motion and sound working as one."
        />

        <div className="about-grid">
          <Reveal className="about-media-col">
            <TiltCard className="about-media" max={6} data-cursor="Hello">
              <div className="about-media-inner">
                <img src="/images/studio.webp" alt="A dark editing workstation lit in red, with a video timeline on screen" width="1000" height="1250" loading="lazy" decoding="async" />
              </div>
              <span className="crop crop-tl" aria-hidden="true" />
              <span className="crop crop-tr" aria-hidden="true" />
              <span className="crop crop-bl" aria-hidden="true" />
              <span className="crop crop-br" aria-hidden="true" />
              <div className="about-media-meta" aria-hidden="true">
                <span>CAM A · 24 FPS</span>
                <span>ISO 800</span>
              </div>
            </TiltCard>
          </Reveal>

          <div className="about-copy">
            <ScrubParagraph text={statement} />
            <dl className="about-facts">
              {facts.map((f, i) => (
                <Reveal key={f.k} className="about-fact" delay={i * 0.06} y={16}>
                  <dt className="mono-label">{f.k}</dt>
                  <dd>
                    {f.live ? <span className="live-dot" aria-hidden="true" /> : null}
                    {f.v}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <div className="principles">
          {principles.map((p, i) => (
            <Reveal key={p.n} className="principle" delay={i * 0.1}>
              <span className="principle-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
