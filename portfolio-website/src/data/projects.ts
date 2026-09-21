export interface Project {
  id: number
  title: string
  description: string
  longDescription?: string
  category: 'systems' | 'hackathons' | 'backend' | 'opensource' | 'fullstack'
  tags: string[]
  image: string
  imageAlt: string
  links: {
    demo?: string
    code?: string
    caseStudy?: string
  }
  featured: boolean
  year: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'C Compiler',
    description: 'A complete C compiler implementation with lexer, parser, AST, and code generation targeting x86-64 assembly.',
    longDescription: 'Built from scratch in C, this compiler implements a full compilation pipeline including lexical analysis, recursive descent parsing, semantic analysis with symbol tables, intermediate representation, and x86-64 code generation. Supports a subset of C99 including functions, control flow, pointers, and structs.',
    category: 'systems',
    tags: ['C', 'Compiler Design', 'x86-64 Assembly', 'Lexer', 'Parser', 'AST'],
    image: '/projects/c-compiler.svg',
    imageAlt: 'C Compiler architecture diagram showing compilation pipeline',
    links: {
      code: 'https://github.com/ashmitaryan/c-compiler',
      caseStudy: '/blog/c-compiler-writeup',
    },
    featured: true,
    year: '2024',
  },
  {
    id: 2,
    title: 'HackIndia 2024 - MediChain',
    description: 'Blockchain-based medical record management system with zero-knowledge proofs for patient privacy.',
    longDescription: 'Developed during HackIndia 2024, this dApp allows patients to control access to their medical records using zero-knowledge proofs. Built with Rust (Solana smart contracts), React frontend, and IPFS for decentralized storage.',
    category: 'hackathons',
    tags: ['Rust', 'Solana', 'React', 'Zero-Knowledge Proofs', 'IPFS', 'Blockchain'],
    image: '/projects/medichain.svg',
    imageAlt: 'MediChain dashboard showing medical record management',
    links: {
      demo: 'https://medichain-demo.vercel.app',
      code: 'https://github.com/ashmitaryan/medichain',
    },
    featured: true,
    year: '2024',
  },
  {
    id: 3,
    title: 'HackIndia 2023 - TaskFlow',
    description: 'Real-time collaborative task management with WebSocket synchronization and offline support.',
    longDescription: 'A Trello-inspired Kanban board with real-time collaboration using WebSockets, conflict-free replicated data types (CRDTs) for offline editing, and PostgreSQL backend with FastAPI.',
    category: 'hackathons',
    tags: ['FastAPI', 'React', 'WebSockets', 'CRDTs', 'PostgreSQL', 'Redis'],
    image: '/projects/taskflow.svg',
    imageAlt: 'TaskFlow Kanban board with real-time collaboration',
    links: {
      demo: 'https://taskflow-demo.vercel.app',
      code: 'https://github.com/ashmitaryan/taskflow',
    },
    featured: true,
    year: '2023',
  },
  {
    id: 4,
    title: 'FastAPI Microservice Boilerplate',
    description: 'Production-ready FastAPI template with authentication, database migrations, testing, and CI/CD.',
    longDescription: 'A comprehensive boilerplate for building scalable APIs with FastAPI. Includes JWT authentication, SQLAlchemy 2.0 with async support, Alembic migrations, pytest test suite, Docker multi-stage builds, and GitHub Actions CI/CD.',
    category: 'backend',
    tags: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Docker', 'GitHub Actions', 'Pytest'],
    image: '/projects/fastapi-boilerplate.svg',
    imageAlt: 'FastAPI boilerplate architecture diagram',
    links: {
      code: 'https://github.com/ashmitaryan/fastapi-boilerplate',
    },
    featured: true,
    year: '2024',
  },
  {
    id: 5,
    title: 'Rust CLI Tool - DevEnv',
    description: 'Cross-platform developer environment manager written in Rust with plugin system.',
    longDescription: 'A CLI tool for managing development environments across projects. Features include language version management, dotfile synchronization, project-specific configurations, and a WASM-based plugin system for extensibility.',
    category: 'systems',
    tags: ['Rust', 'CLI', 'WASM', 'Cross-platform', 'Plugin System'],
    image: '/projects/devenv.svg',
    imageAlt: 'DevEnv CLI terminal screenshot',
    links: {
      code: 'https://github.com/ashmitaryan/devenv',
    },
    featured: false,
    year: '2024',
  },
  {
    id: 6,
    title: 'LeetCode Solutions Library',
    description: 'Curated collection of 200+ LeetCode solutions in Rust, C, and Python with explanations.',
    longDescription: 'Organized by pattern (sliding window, two pointers, DP, graphs, etc.) with time/space complexity analysis, multiple approaches, and detailed explanations. Used for interview preparation and algorithm study.',
    category: 'opensource',
    tags: ['Rust', 'C', 'Python', 'Algorithms', 'Data Structures', 'Interview Prep'],
    image: '/projects/leetcode.svg',
    imageAlt: 'LeetCode solutions library homepage',
    links: {
      code: 'https://github.com/ashmitaryan/leetcode-solutions',
      demo: 'https://leetcode-solutions.ashmitaryan.dev',
    },
    featured: false,
    year: '2024',
  },
]

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'systems', label: 'Systems' },
  { value: 'hackathons', label: 'Hackathons' },
  { value: 'backend', label: 'Backend/API' },
  { value: 'opensource', label: 'Open Source' },
  { value: 'fullstack', label: 'Full Stack' },
] as const