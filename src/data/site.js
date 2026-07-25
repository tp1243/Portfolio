import {
  BriefcaseBusiness,
  Code2,
  FileDown,
  Github,
  Home,
  Linkedin,
  Mail,
  Sparkles,
  UserRound,
} from 'lucide-react'
import btechImage from '../assets/Btech.jpeg'
import hscImage from '../assets/HSC.avif'
import sscImage from '../assets/SSC.jpg'
import resumePdf from '../assets/Tushar-mple-ai.pdf'

export const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Sparkles },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/repos?q=owner%3A%40me', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tushar-patil-0926a5369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', icon: Linkedin },
  { label: 'Email', href: 'mailto:hello@example.com', icon: Mail },
]

export const heroContent = {
  eyebrow: 'Creative developer portfolio',
  name: 'Tushar Patil',
  roles: [
    'Fullstack Developer',
    'Java Developer',
    '.NET Developer',
  ],
  summary:
    'I build scalable fullstack applications with strong experience in Java, .NET, JavaScript, SQL, MongoDB, MySQL, Node.js, and Express.js, focusing on reliable backend systems and clean, responsive user experiences.',
  primaryCta: {
    label: 'Download Resume',
    href: resumePdf,
    download: 'Tushar-Resume.pdf',
    icon: FileDown,
  },
  secondaryCta: {
    label: 'Contact Me',
    href: '#contact',
    icon: Mail,
  },
}

export const aboutContent = {
  eyebrow: 'About me',
  title: 'Building dependable products with backend depth and modern UI polish',
  bio: 'I am Tushar Patil, a fullstack developer focused on building practical, scalable applications across Java, .NET, JavaScript, SQL, Node.js, Express.js, MongoDB, and MySQL. I enjoy turning requirements into clean systems with solid backend logic, responsive interfaces, and thoughtful user experience.',
  interests: [
    'Java application development',
    '.NET backend systems',
    'REST API design',
    'Database-driven applications',
    'Responsive frontend interfaces',
  ],
  stats: [
    { label: 'Qualifications', value: 3, suffix: '+' },
    { label: 'Core Skills', value: 10, suffix: '+' },
    { label: 'Top CGPA', value: 9.6, suffix: '' },
  ],
}

export const educationItems = [
  {
    id: 'ssc',
    label: 'SSC (10th)',
    institution: 'New Bombay City School',
    location: 'Ghansoli, Navi Mumbai - 400701',
    scoreLabel: 'Percentage',
    score: '80.40%',
    image: sscImage,
  },
  {
    id: 'hsc',
    label: 'HSC (12th)',
    institution: 'Karmaveer Bhaurao Patil College, Vashi',
    location: 'Vashi, Navi Mumbai - 400703',
    scoreLabel: 'Percentage',
    score: '55%',
    image: hscImage,
  },
  {
    id: 'btech',
    label: 'B.Tech (Graduation)',
    institution: 'Bharati Vidyapeeth Deemed to be University',
    location: 'Kharghar, Navi Mumbai - 410614',
    scoreLabel: 'CGPA',
    score: '9.6',
    image: btechImage,
  },
]

export const upcomingSections = [
  {
    id: 'about',
    eyebrow: 'Next section',
    title: 'About',
    description:
      'Short bio, education, interests, and animated stat cards will live here in the next milestone.',
  },
  {
    id: 'skills',
    eyebrow: 'Next section',
    title: 'Skills',
    description:
      'Grouped skill categories with hover depth, progress motion, and icon-led storytelling are planned here.',
  },
  {
    id: 'projects',
    eyebrow: 'Next section',
    title: 'Projects',
    description:
      'Featured project cards, motion reveals, media previews, and modal details will expand this section.',
  },
  {
    id: 'experience',
    eyebrow: 'Next section',
    title: 'Experience',
    description:
      'An animated timeline with alternating desktop layout and mobile-friendly flow will be built next.',
  },
  {
    id: 'contact',
    eyebrow: 'Next section',
    title: 'Contact',
    description:
      'This final section will add the validated form, success states, and social call-to-action cluster.',
  },
]
