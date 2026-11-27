import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { IntroContext } from './lib/hooks';
import { ScrollProvider, useSmoothScroll } from './lib/scroll';
import Cursor from './components/ui/Cursor';
import Loader from './components/ui/Loader';
import ScrollProgress from './components/ui/ScrollProgress';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Work from './components/sections/Work';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Tools from './components/sections/Tools';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';

function Site() {
  const [loading, setLoading] = useState(true);
  const { lock, unlock } = useSmoothScroll();

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loading) lock();
    else unlock();
  }, [loading, lock, unlock]);

  const finish = useCallback(() => setLoading(false), []);

  return (
    <IntroContext.Provider value={!loading}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnimatePresence>{loading ? <Loader key="loader" onComplete={finish} /> : null}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Tools />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </IntroContext.Provider>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProvider>
        <Site />
      </ScrollProvider>
    </MotionConfig>
  );
}
