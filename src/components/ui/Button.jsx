import Magnetic from './Magnetic';

export function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll-inner" data-text={children}>
        {children}
      </span>
    </span>
  );
}

export default function Button({ href, onClick, variant = 'red', size = 'md', icon: Icon, dot = false, children, strength = 0.3, ...rest }) {
  return (
    <Magnetic strength={strength}>
      <a href={href} onClick={onClick} className={`btn btn-${variant} btn-${size}`} {...rest}>
        {dot ? <span className="btn-dot" aria-hidden="true" /> : null}
        <RollText>{children}</RollText>
        {Icon ? (
          <span className="btn-icon" aria-hidden="true">
            <Icon size={16} />
          </span>
        ) : null}
      </a>
    </Magnetic>
  );
}
