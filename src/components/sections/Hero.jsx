import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, AudioLines, Layers, Mail, MousePointer2, Play, Scissors, Type } from 'lucide-react';
import { heroStats } from '../../data/content';
import { ease, useIntroDone, useMediaQuery } from '../../lib/hooks';
import { useSmoothScroll } from '../../lib/scroll';
import { RevealText } from '../ui/Reveal';
import Button from '../ui/Button';
import Magnetic from '../ui/Magnetic';

function LiveTimecode() {
  const ref = useRef(null);
  useEffect(() => {
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const total = Math.floor(((now - start) / 1000) * 24);
      const f = total % 24;
      const s = Math.floor(total / 24) % 60;
      const m = Math.floor(total / 1440) % 60;
      if (ref.current) ref.current.textContent = `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <span ref={ref} className="tabular">00:00:00:00</span>;
}

function CountUp({ value, start }) {
  const [display, setDisplay] = useState('00');
  useEffect(() => {
    if (!start) return undefined;
    const target = Number(value);
    const controls = animate(0, target, {
      duration: 1.4,
      delay: 0.6,
      ease,
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(2, '0')),
    });
    return () => controls.stop();
  }, [start, value]);
  return <span className="tabular">{display}</span>;
}

const collaborators = [
  { label: 'Cut', tone: 'red', pos: 'c1' },
  { label: 'Grade', tone: 'teal', pos: 'c2' },
  { label: 'SFX', tone: 'violet', pos: 'c3' },
  { label: 'Motion', tone: 'amber', pos: 'c4' },
];

const toolbarTools = [
  { icon: MousePointer2, label: 'Selection' },
  { icon: Scissors, label: 'Razor' },
  { icon: Type, label: 'Type' },
  { icon: Layers, label: 'Layers' },
  { icon: AudioLines, label: 'Audio' },
];

export default function Hero() {
  const ready = useIntroDone();
  const compact = useMediaQuery('(max-width: 760px)');
  const { scrollTo } = useSmoothScroll();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const wordsY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const monitorY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const wordsX = useTransform(smx, (v) => v * -18);
  const monitorRotY = useTransform(smx, (v) => v * 5);
  const monitorRotX = useTransform(smy, (v) => v * -4);
  const floatX = useTransform(smx, (v) => v * 22);
  const floatY = useTransform(smy, (v) => v * 16);

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  const go = (id) => (e) => {
    e.preventDefault();
    scrollTo(id);
  };

  const enter = (delay = 0, y = 30) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section id="top" className="hero" ref={ref} onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div className="hero-glow" />
        <div className="ruler ruler-top" />
        <div className="ruler ruler-left" />
      </div>

      <motion.div className="hero-words" style={{ y: wordsY, x: wordsX }} aria-hidden="true">
        <span className="reveal-mask">
          <motion.span
            className="hero-word hero-word-outline"
            initial={{ y: '105%' }}
            animate={ready ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 1.2, ease }}
          >
            Video
          </motion.span>
        </span>
        <span className="reveal-mask">
          <motion.span
            className="hero-word hero-word-fill"
            initial={{ y: '105%' }}
            animate={ready ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 1.2, delay: 0.12, ease }}
          >
            Editor
          </motion.span>
        </span>
      </motion.div>

      <motion.div className="hero-collab" style={{ x: floatX, y: floatY }} aria-hidden="true" {...enter(1.1, 0)}>
        {collaborators.map((c) => (
          <span key={c.label} className={`collab collab-${c.pos} tone-${c.tone}`}>
            <MousePointer2 size={16} fill="currentColor" />
            <span className="collab-tag">{c.label}</span>
          </span>
        ))}
      </motion.div>

      <motion.div className="hero-layout" style={{ opacity: compact ? 1 : contentOpacity }}>
        <div className="hero-intro">
          <motion.p className="script-hello" {...enter(0.35, 16)}>
            {"Hi, I'm the"}
          </motion.p>
          <RevealText
            as="h1"
            id="hero-title"
            lines={['The so called', { text: 'Editor', className: 'text-red' }]}
            className="hero-title"
            dot
            trigger={ready}
            delay={0.4}
          />
          <motion.p className="hero-disciplines" {...enter(0.7, 16)}>
            Video editing <span>|</span> Motion design <span>|</span> Sound design
          </motion.p>
          <motion.span
            className="hero-bar"
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            aria-hidden="true"
          />
          <motion.p className="hero-tagline" {...enter(0.9, 16)}>
            I turn raw footage into visual experiences — combining editing, motion design and sound to make stories stay with you.
          </motion.p>
          <motion.div className="hero-actions" {...enter(1, 16)}>
            <Button href="#work" onClick={go('work')} icon={ArrowDownRight}>
              See the work
            </Button>
            <Button href="#contact" onClick={go('contact')} variant="ghost" icon={Mail}>
              Get in touch
            </Button>
          </motion.div>
        </div>

        <motion.div className="hero-monitor-wrap" style={{ y: monitorY }}>
          <motion.div
            className="hero-monitor"
            style={{ rotateY: monitorRotY, rotateX: monitorRotX, transformPerspective: 1200 }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 1.3, delay: 0.2, ease }}
          >
            <div className="monitor-bar">
              <span className="monitor-rec">
                <span className="rec-dot" aria-hidden="true" /> Program · Showreel_v01
              </span>
              <LiveTimecode />
            </div>
            <div className="monitor-screen" data-cursor="Soon">
              <img src="/images/hero-still.webp" alt="" width="1600" height="900" fetchpriority="high" decoding="async" />
              <div className="monitor-safe" aria-hidden="true" />
              <div className="monitor-center">
                <Magnetic strength={0.45}>
                  <span className="monitor-play" aria-hidden="true">
                    <Play size={22} fill="currentColor" />
                  </span>
                </Magnetic>
                <span className="mono-label">Showreel — coming soon</span>
              </div>
            </div>
            <div className="monitor-scrub" aria-hidden="true">
              <span className="monitor-scrub-fill" />
              <span className="monitor-scrub-head" />
            </div>
          </motion.div>

          <motion.div className="float-card float-wave" style={{ x: floatX, y: floatY }} {...enter(1.2, 20)} aria-hidden="true">
            <div className="float-head">
              <span>Audio · A1</span>
              <span className="float-dot" />
            </div>
            <div className="waveform">
              {Array.from({ length: 22 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${(i % 7) * -0.17}s`, height: `${30 + ((i * 37) % 70)}%` }} />
              ))}
            </div>
          </motion.div>

          <motion.div className="float-card float-curve" style={{ x: floatX, y: floatY }} {...enter(1.35, 20)} aria-hidden="true">
            <div className="float-head">
              <span>Grade · Curves</span>
              <span className="float-dot" />
            </div>
            <svg viewBox="0 0 160 90" className="curve-svg">
              <path d="M0 89 L160 1" className="curve-guide" />
              <motion.path
                d="M0 88 C 40 84, 52 62, 80 46 S 130 10, 160 4"
                className="curve-path"
                initial={{ pathLength: 0 }}
                animate={ready ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.6, delay: 1.5, ease }}
              />
            </svg>
          </motion.div>
        </motion.div>

        <div className="hero-stats">
          {heroStats.map((stat, i) => (
            <motion.div className="stat-card" key={stat.label} {...enter(0.9 + i * 0.12, 24)}>
              <span className="stat-value">
                <CountUp value={stat.value} start={ready} />
                <span className="red-dot" aria-hidden="true" />
              </span>
              <span className="stat-label">{stat.label}</span>
              <svg viewBox="0 0 80 16" className="stat-spark" aria-hidden="true">
                <path d="M0 14 L14 11 L24 12 L38 8 L50 9 L62 4 L80 2" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="hero-toolbar" {...enter(1.3, 20)}>
        <div className="toolbar-tools">
          {toolbarTools.map(({ icon: Icon, label }, i) => (
            <span key={label} className={`toolbar-btn ${i === 1 ? 'is-active' : ''}`} title={label}>
              <Icon size={15} aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>
        <span className="toolbar-sep" aria-hidden="true" />
        <div className="toolbar-avatars" aria-hidden="true">
          {collaborators.map((c) => (
            <span key={c.label} className={`avatar tone-${c.tone}`}>
              {c.label[0]}
            </span>
          ))}
        </div>
        <span className="toolbar-file">
          SCE_Portfolio.prproj <span>· 9 sequences</span>
        </span>
      </motion.div>
    </section>
  );
}
