import { Asterisk } from 'lucide-react';

export default function Marquee({ items, variant = 'red' }) {
  const row = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span className="marquee-item" key={item}>
          {item}
          <Asterisk className="marquee-star" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee marquee-${variant}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
