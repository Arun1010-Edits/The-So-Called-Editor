import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Play, Plus, Clapperboard, Layers3, AudioLines, Aperture, Mail, Instagram, Linkedin, Youtube, Menu } from 'lucide-react';
import './style.css';

const projects = [
  { n:'01', type:'2.5D PARALLAX · BRAND FILM', title:'A journey in layers.', desc:'A cinematic brand story built with layered depth, atmospheric movement and a carefully paced reveal.', tag:'AFTER EFFECTS', art:'shell' },
  { n:'02', type:'MOTION DESIGN · EXPLAINER', title:'One person. The whole pipeline.', desc:'A visual explanation of the full-stack video editor — where editing, motion design and sound design work as one.', tag:'MOTION GRAPHICS', art:'stack' },
  { n:'03', type:'PROMO · CINEMATIC EDIT', title:'Make every frame count.', desc:'A high-energy promotional edit shaped around rhythm, transitions, sound and visual impact.', tag:'VIDEO EDITING', art:'film' },
];
const skills = [
  ['01','VIDEO EDITING','Story structure, pacing, transitions, colour and finishing.','Premiere Pro · DaVinci Resolve'],
  ['02','MOTION DESIGN','Kinetic typography, shape animation, compositing and 2.5D parallax.','After Effects'],
  ['03','SOUND DESIGN','Layered sound effects, ambience, impacts and audio rhythm.','Sound design · Audio finishing'],
  ['04','VISUAL DESIGN','Layouts, thumbnails, visual systems and supporting assets.','Photoshop · Illustrator'],
];
function Reveal({children, delay=0}) { return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}}>{children}</motion.div> }

function CustomCursor() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });

  React.useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="cursor-follower"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="cursor-ring" />
    </div>
  );
}

function Header(){return <header className="nav"><a className="brand" href="#top"><span className="brand-mark">SC.</span><span>THE SO CALLED<br/>EDITOR</span></a><nav><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#skills">CAPABILITIES</a><a href="#contact">CONTACT</a></nav><a className="nav-cta" href="#contact">LET'S TALK <ArrowUpRight size={14}/></a><a className="mobile-menu" href="#contact"><Menu/></a></header>}
function App(){return <><Header/><main id="top">
<section className="hero wrap"><div className="hero-meta"><span><i className="live-dot"/> AVAILABLE FOR SELECT PROJECTS</span><span>VIDEO EDITOR / MOTION DESIGNER</span></div><div className="hero-main"><Reveal><p className="eyebrow">NOT JUST CUTS. CRAFT.</p><h1>THE SO<br/><em>CALLED</em><br/>EDITOR<span className="period">.</span></h1></Reveal><Reveal delay={.12}><div className="hero-side"><div className="hero-orbit"><div className="orbit-ring r1"/><div className="orbit-ring r2"/><div className="orbit-core"><Clapperboard size={35}/></div><span className="orbit-label">FRAME<br/>BY FRAME</span></div><p>I turn raw footage into visual experiences — combining editing, motion design and sound to make stories stay with you.</p><a className="round-link" href="#work">EXPLORE WORK <ArrowDownRight size={17}/></a></div></Reveal></div><div className="hero-bottom"><span>INDEPENDENT CREATIVE / INDIA</span><span>SCROLL TO EXPLORE ↓</span><span>EST. IN EVERY FRAME</span></div></section>
<section className="ticker"><div className="ticker-track">VIDEO EDITING ✳ MOTION DESIGN ✳ SOUND DESIGN ✳ STORYTELLING ✳ VIDEO EDITING ✳ MOTION DESIGN ✳ SOUND DESIGN ✳ STORYTELLING ✳</div></section>
<section className="section wrap" id="work"><div className="section-head"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Frames with<br/><em>something to say.</em></h2></div><p className="section-note">A selection of creative directions, experiments and visual stories. Replace these preview panels with your final project videos.</p></div><div className="projects">{projects.map((p,i)=><Reveal key={p.n} delay={i*.08}><article className="project"><div className={'project-art '+p.art}><div className="art-top"><span>{p.n} / 03</span><span>{p.type}</span></div>{p.art==='shell'?<><div className="sun"/><div className="horizon"/><div className="road"/><div className="shell-word">SHELL<span>®</span></div><div className="art-caption">A WORLD IN MOTION</div></>:p.art==='stack'?<><div className="stack-card c1">EDIT</div><div className="stack-card c2">MOTION</div><div className="stack-card c3">SOUND</div><div className="stack-cross">×</div></>:<><div className="film-frame"><div className="film-light"/><div className="film-title">FEEL<br/><i>THE</i><br/>MOMENT.</div><div className="film-play"><Play fill="currentColor" size={22}/></div></div></>}<div className="art-bottom"><span>THE SO CALLED EDITOR</span><span>↗</span></div></div><div className="project-info"><div><p className="eyebrow">{p.tag}</p><h3>{p.title}</h3><p>{p.desc}</p></div><span className="project-arrow"><ArrowUpRight/></span></div></article></Reveal>)}</div></section>
<section className="manifesto" id="about"><div className="wrap manifesto-inner"><Reveal><p className="eyebrow">02 / THE APPROACH</p><h2>Good editing gets<br/>attention. <em>Great craft</em><br/><em>makes it matter.</em></h2></Reveal><Reveal delay={.1}><div className="manifesto-copy"><span className="big-quote">“</span><p>I'm a video editor and motion graphics learner focused on building a complete visual language — from the first cut to the final sound hit. I believe every frame should have a reason to exist.</p><div className="signature">THE SO CALLED EDITOR <span>✳</span></div></div></Reveal></div></section>
<section className="section wrap" id="skills"><div className="section-head"><div><p className="eyebrow">03 / WHAT I BRING</p><h2>More than<br/><em>a timeline.</em></h2></div><p className="section-note">A connected creative toolkit for shaping the story, designing the movement and finishing the feeling.</p></div><div className="skill-list">{skills.map((s,i)=><Reveal key={s[0]} delay={i*.05}><div className="skill-row"><span className="skill-no">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><span className="skill-tools">{s[3]}</span><Plus className="skill-plus"/></div></Reveal>)}</div><div className="software"><span>TOOLS IN THE WORKFLOW</span><div><b>Premiere Pro</b><b>After Effects</b><b>DaVinci Resolve</b><b>Photoshop</b></div></div></section>
<section className="journey"><div className="wrap journey-grid"><div><p className="eyebrow">04 / THE JOURNEY</p><h2>Always in<br/><em>progress.</em></h2><p className="journey-intro">Learning by doing. Building through experiments, feedback and real creative challenges.</p></div><div className="journey-items"><div><span>NOW</span><h3>Creative practice</h3><p>Developing a stronger visual language through editing, motion design and sound.</p></div><div><span>15 WEEKS</span><h3>Pro Editor Club</h3><p>Structured learning journey focused on professional video editing and creative skills.</p></div><div><span>NEXT FRAME</span><h3>What's coming</h3><p>More original projects, stronger showreels and collaborations with people building bold ideas.</p></div></div></div></section>
<section className="contact wrap" id="contact"><Reveal><p className="eyebrow">05 / HAVE A STORY?</p><h2>Let's make<br/><em>it move.</em></h2><p className="contact-sub">Have a project, a collaboration idea or just want to talk creative? My inbox is open.</p><a className="contact-link" href="mailto:YOUR_EMAIL@example.com">YOUR_EMAIL@EXAMPLE.COM <ArrowUpRight/></a></Reveal><div className="contact-bottom"><span>THE SO CALLED EDITOR © 2026</span><div className="socials"><a href="#contact" aria-label="Instagram"><Instagram/></a><a href="#contact" aria-label="LinkedIn"><Linkedin/></a><a href="#contact" aria-label="YouTube"><Youtube/></a></div><a href="#top">BACK TO TOP ↑</a></div></section>
</main></>}

createRoot(document.getElementById('root')).render(<App/>);
