import { FaJava } from 'react-icons/fa6'
import { DiDatabase } from 'react-icons/di'
import { Monitor, ServerCog } from 'lucide-react'
import { SiCss, SiDotnet, SiExpress, SiFirebase, SiHtml5, SiJavascript, SiMongodb, SiMysql, SiNodedotjs, SiOpenjdk, SiReact } from 'react-icons/si'
import { TbBrandCSharp, TbSql } from 'react-icons/tb'

export const skillOrbitItems = [
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Java', icon: FaJava, color: '#f89820' },
  { name: 'SQL', icon: TbSql, color: '#60a5fa' },
  { name: 'HTML', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS', icon: SiCss, color: '#1572b6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e' },
  { name: 'Express.js', icon: SiExpress, color: '#d4d4d8' },
]

export const skillGroups = {
  frontend: [
    { name: 'React.js', icon: SiReact, color: '#61dafb' },
    { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
    { name: 'CSS3', icon: SiCss, color: '#1572b6' },
    { name: 'JavaScript (ES6)', icon: SiJavascript, color: '#f7df1e' },
  ],
  backend: [
    { name: 'Java', icon: SiOpenjdk, color: '#ea580c' },
    { name: 'C#', icon: TbBrandCSharp, color: '#9333ea' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e' },
    { name: 'ASP.NET Core', icon: SiDotnet, color: '#8b5cf6' },
    { name: 'Express.js', icon: SiExpress, color: '#d4d4d8' },
  ],
  database: [
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
    { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
  ],
}

export const skillCategoryMeta = {
  frontend: {
    id: 'frontend',
    title: 'Frontend',
    accent: '#60a5fa',
    glow: 'rgba(96, 165, 250, 0.24)',
    titleIcon: Monitor,
  },
  backend: {
    id: 'backend',
    title: 'Backend',
    accent: '#4ade80',
    glow: 'rgba(74, 222, 128, 0.24)',
    titleIcon: ServerCog,
  },
  database: {
    id: 'database',
    title: 'Database',
    accent: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.24)',
    titleIcon: DiDatabase,
  },
}

export const skillCategories = Object.entries(skillGroups).map(([key, items]) => ({
  ...skillCategoryMeta[key],
  items,
}))
