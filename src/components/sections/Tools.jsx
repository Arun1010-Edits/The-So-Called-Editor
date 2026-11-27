import { motion } from 'framer-motion';
import { tools } from '../../data/content';
import { ease } from '../../lib/hooks';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';

export default function Tools() {
  return (
    <section id="tools" className="section" aria-labelledby="tools-title">
      <div className="container">
        <SectionHeading
          id="tools-title"
          index="05"
          label="Software & tools"
          lines={['Tools in the', 'workflow']}
          note="The software behind every stage — from the first assembly to colour and final export."
        />
        <ul className="tools-grid">
          {tools.map((tool, i) => (
            <motion.li
              key={tool.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease }}
            >
              <TiltCard className="tool-card" max={6}>
                <div className="tool-top">
                  <span className="tool-badge" style={{ color: tool.color, background: tool.bg, borderColor: tool.color }} aria-hidden="true">
                    {tool.abbr}
                  </span>
                  <span className="mono-label">0{i + 1}</span>
                </div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-use">{tool.use}</p>
                <span className="tool-rule" aria-hidden="true" />
                <ul className="pill-list">
                  {tool.items.map((item) => (
                    <li className="pill pill-sm" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
