export interface Skill {
  name: string
  level: number // 0-100
  category: 'languages' | 'frameworks' | 'devops' | 'tools' | 'concepts'
  icon?: string
  color?: string
}

export const skills: Skill[] = [
  // Languages
  { name: 'Rust', level: 85, category: 'languages', color: '#dea584' },
  { name: 'C', level: 90, category: 'languages', color: '#A8B9CC' },
  { name: 'Python', level: 88, category: 'languages', color: '#3776AB' },
  { name: 'TypeScript', level: 85, category: 'languages', color: '#3178C6' },
  { name: 'JavaScript', level: 90, category: 'languages', color: '#F7DF1E' },
  { name: 'Go', level: 70, category: 'languages', color: '#00ADD8' },
  
  // Frameworks
  { name: 'FastAPI', level: 90, category: 'frameworks', color: '#009688' },
  { name: 'React', level: 85, category: 'frameworks', color: '#61DAFB' },
  { name: 'Next.js', level: 80, category: 'frameworks', color: '#000000' },
  { name: 'Node.js', level: 85, category: 'frameworks', color: '#339933' },
  { name: 'Actix-web', level: 70, category: 'frameworks', color: '#000000' },
  
  // DevOps & Infrastructure
  { name: 'Docker', level: 88, category: 'devops', color: '#2496ED' },
  { name: 'Kubernetes', level: 75, category: 'devops', color: '#326CE5' },
  { name: 'GitHub Actions', level: 90, category: 'devops', color: '#2088FF' },
  { name: 'Linux', level: 85, category: 'devops', color: '#FCC624' },
  { name: 'Nginx', level: 80, category: 'devops', color: '#009639' },
  { name: 'AWS', level: 70, category: 'devops', color: '#FF9900' },
  { name: 'Terraform', level: 65, category: 'devops', color: '#7B42BC' },
  { name: 'CI/CD', level: 85, category: 'devops', color: '#0078D4' },
  
  // Tools
  { name: 'Git', level: 95, category: 'tools', color: '#F05032' },
  { name: 'VS Code', level: 95, category: 'tools', color: '#007ACC' },
  { name: 'Postman', level: 85, category: 'tools', color: '#FF6C37' },
  { name: 'Figma', level: 70, category: 'tools', color: '#F24E1E' },
  { name: 'Jest/Vitest', level: 85, category: 'tools', color: '#C21325' },
  { name: 'Playwright', level: 75, category: 'tools', color: '#2EAD33' },
  
  // Concepts
  { name: 'System Programming', level: 88, category: 'concepts', color: '#FF6B6B' },
  { name: 'API Design', level: 90, category: 'concepts', color: '#4ECDC4' },
  { name: 'Data Structures & Algorithms', level: 92, category: 'concepts', color: '#45B7D1' },
  { name: 'Compiler Design', level: 80, category: 'concepts', color: '#96CEB4' },
  { name: 'Distributed Systems', level: 75, category: 'concepts', color: '#FFEAA7' },
  { name: 'Concurrency', level: 82, category: 'concepts', color: '#DDA0DD' },
]

export const skillCategories = [
  { key: 'languages', label: 'Languages', icon: 'code' },
  { key: 'frameworks', label: 'Frameworks', icon: 'box' },
  { key: 'devops', label: 'DevOps & Infra', icon: 'server' },
  { key: 'tools', label: 'Tools', icon: 'wrench' },
  { key: 'concepts', label: 'Concepts', icon: 'brain' },
] as const