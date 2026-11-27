// Single source of truth for site copy. Replace placeholders before publishing.

export const site = {
  name: 'The So Called Editor',
  role: 'Video Editor & Motion Designer',
  location: 'India',
  timezone: 'Asia/Kolkata',
  email: 'YOUR_EMAIL@example.com',
  socials: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
  ],
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const heroStats = [
  { value: '05', label: 'Creative skills' },
  { value: '05', label: 'Tools in the workflow' },
  { value: '15', label: 'Weeks of structured training' },
];

export const principles = [
  { n: '01', title: 'Story first', text: 'Every cut has a reason. Structure and intent come before effects.' },
  { n: '02', title: 'Rhythm & pace', text: 'Timing that breathes — tension, release and the beat between frames.' },
  { n: '03', title: 'Sound you feel', text: 'Layered SFX, ambience and impacts that make the picture land.' },
];

// Empty slots — swap `video`/`poster` in when real projects are uploaded.
export const projects = [
  { n: '01', category: 'Showreel', title: 'Showreel', format: '16:9', span: 'wide' },
  { n: '02', category: 'Brand Film', title: 'Project title', format: '16:9' },
  { n: '03', category: 'Motion Graphics', title: 'Project title', format: '16:9' },
  { n: '04', category: 'Short-form', title: 'Project title', format: '9:16' },
  { n: '05', category: 'Sound Design', title: 'Project title', format: '16:9' },
];

export const experience = [
  {
    period: 'Now',
    role: 'Independent Video Editor & Motion Designer',
    org: 'Self-directed practice',
    points: [
      'Editing, motion graphics and sound design across original and practice projects.',
      'Building a consistent visual language — from first assembly to final mix.',
      'Developing a showreel and portfolio of finished, end-to-end pieces.',
    ],
  },
  {
    period: 'Open',
    role: 'Your next collaboration',
    org: 'Available for select projects',
    points: ['Brand films, promos, explainers and short-form content.', 'Remote collaboration with creators, studios and teams.'],
    open: true,
  },
];

export const skills = [
  {
    n: '01',
    name: 'Editing',
    summary: 'Story structure, pacing, transitions and finishing.',
    tags: ['Story structure', 'Pacing', 'Transitions', 'Multicam', 'Finishing'],
  },
  {
    n: '02',
    name: 'Motion',
    summary: 'Kinetic typography, shape animation and 2.5D parallax.',
    tags: ['Kinetic type', 'Shape layers', 'Compositing', '2.5D parallax', 'Titles'],
  },
  {
    n: '03',
    name: 'Sound',
    summary: 'Layered effects, ambience, impacts and audio rhythm.',
    tags: ['Sound effects', 'Ambience', 'Impacts', 'Audio cleanup', 'Mixing'],
  },
  {
    n: '04',
    name: 'Colour',
    summary: 'Correction and look development that sets the mood.',
    tags: ['Correction', 'Grading', 'Look development', 'Consistency'],
  },
  {
    n: '05',
    name: 'Design',
    summary: 'Thumbnails, layouts and supporting visual assets.',
    tags: ['Thumbnails', 'Layouts', 'Visual systems', 'Assets'],
  },
];

export const tools = [
  { abbr: 'Pr', name: 'Premiere Pro', use: 'Editing', color: '#9999ff', bg: '#00005b', items: ['Assembly & rough cuts', 'Multicam editing', 'Captions & export'] },
  { abbr: 'Ae', name: 'After Effects', use: 'Motion design', color: '#d291ff', bg: '#00005b', items: ['Kinetic typography', 'Shape animation', '2.5D parallax'] },
  { abbr: 'Dr', name: 'DaVinci Resolve', use: 'Colour & finishing', color: '#ffffff', bg: '#1f1f1f', items: ['Colour correction', 'Grading & looks', 'Editing'] },
  { abbr: 'Ps', name: 'Photoshop', use: 'Image design', color: '#31a8ff', bg: '#001e36', items: ['Thumbnails', 'Compositing', 'Retouching'] },
  { abbr: 'Ai', name: 'Illustrator', use: 'Vector design', color: '#ff9a00', bg: '#330000', items: ['Vector assets', 'Logos for motion', 'Layouts'] },
];

export const journey = [
  {
    tag: 'Chapter 01',
    title: 'Pro Editor Club',
    meta: '15 weeks',
    text: 'A structured learning journey focused on professional video editing and creative skills.',
  },
  {
    tag: 'Chapter 02',
    title: 'Creative practice',
    meta: 'Now',
    text: 'Developing a stronger visual language through editing, motion design and sound.',
  },
  {
    tag: 'Chapter 03',
    title: 'The next frame',
    meta: 'Coming up',
    text: 'More original projects, a stronger showreel and collaborations with people building bold ideas.',
  },
];

export const marquee = ['Video editing', 'Motion design', 'Sound design', 'Colour', 'Storytelling', 'Short-form'];
