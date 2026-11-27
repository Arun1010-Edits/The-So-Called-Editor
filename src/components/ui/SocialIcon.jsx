import { Instagram, Linkedin, Youtube, Link } from 'lucide-react';

const icons = { instagram: Instagram, linkedin: Linkedin, youtube: Youtube };

export default function SocialIcon({ name, size = 18 }) {
  const Icon = icons[name] || Link;
  return <Icon size={size} aria-hidden="true" />;
}
