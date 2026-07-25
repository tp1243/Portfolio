import projectOneImage from '../assets/project1.jpeg'
import projectTwoImage from '../assets/project2.jpeg'
import projectThreeImage from '../assets/project3.jpeg'

export const projects = [
  {
    id: 'smart-police-complaint-system',
    title: 'Smart Police Complaint System',
    image: projectOneImage,
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.18)',
    summary: [
      'Developed a full-stack Smart Police Complaint System using React.js, TypeScript, Node.js, Express.js, and MongoDB to streamline digital complaint registration and case management.',
      'Implemented AI-based complaint classification using Naive Bayes and NLP techniques to categorize complaints, determine urgency, and automate case prioritization.',
      'Built a real-time notification and tracking system using Socket.IO, enabling citizens and police officers to receive instant updates on complaint status.',
      'Integrated JWT authentication, OAuth, REST APIs, and analytics dashboards to ensure secure access, role-based authorization, and data-driven monitoring.',
    ],
    techStack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.IO',
      'JWT',
      'OAuth',
    ],
    githubLink: 'https://github.com/tp1243/Smart-Police-Complaint-System',
  },
  {
    id: 'employee-management-system',
    title: 'Employee Management System',
    image: projectTwoImage,
    accent: '#4ade80',
    glow: 'rgba(74, 222, 128, 0.18)',
    summary: [
      'Developed a full-stack Employee Management System using ASP.NET Core MVC to manage employee records, roles, and departments.',
      'Implemented CRUD operations for employee data with a structured and user-friendly interface.',
      'Designed and integrated RESTful APIs using ASP.NET Core for efficient data handling.',
      'Used Entity Framework Core with SQL Server for database management and optimized queries using LINQ.',
    ],
    techStack: [
      'ASP.NET Core MVC',
      'Entity Framework Core',
      'SQL Server',
      'REST API',
      'LINQ',
      'C#',
    ],
    githubLink: 'https://github.com/tp1243/Employee-Management-System',
  },
  {
    id: 'advanced-chatbot',
    title: 'Advanced Chatbot',
    image: projectThreeImage,
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.18)',
    summary: [
      'Developed an AI-powered chatbot with real-time conversations, day/date-wise chat history, and conversation management.',
      'Integrated Hugging Face models for AI text generation and image generation capabilities.',
      'Implemented AI-based image identification to analyze and describe uploaded images.',
      'Built a responsive modern UI with secure authentication, Markdown support, syntax-highlighted code blocks, and dark/light mode.',
    ],
    techStack: [
      'Hugging Face',
      'AI/NLP',
      'Markdown',
      'Syntax Highlighting',
      'Auth',
      'Dark/Light Mode',
    ],
    githubLink: '#',
  },
]
