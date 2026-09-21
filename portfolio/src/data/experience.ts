export interface Experience {
  id: number
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  tech: string[]
  type: 'leadership' | 'education' | 'work'
  logo?: string
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'TechStars Technical Society',
    role: 'Secretary',
    period: '2023 — Present',
    description: 'Leading the premier technical society at KCC ITM with 200+ members. Responsible for organizing workshops, hackathons, coding competitions, and technical talks. Manages a core team of 15 coordinators across domains including Web Development, AI/ML, Competitive Programming, and Systems.',
    achievements: [
      'Organized HackKCC 2024: 300+ participants, 50+ project submissions',
      'Launched "CodeWeek" weekly coding sessions with 50+ regular attendees',
      'Secured sponsorships worth ₹2L+ from tech companies',
      'Mentored 100+ students in DSA, Web Dev, and Open Source',
      'Established partnership with MLH for hackathon support',
    ],
    tech: ['Leadership', 'Event Management', 'Community Building', 'Mentorship', 'Sponsorship'],
    type: 'leadership',
  },
  {
    id: 2,
    company: 'I.I.M.U.N. (India\'s International Movement to Unite Nations)',
    role: 'Chair / Moderator',
    period: '2022 — 2023',
    description: 'Served as Chair and Moderator for Model United Nations conferences, facilitating debate and diplomacy simulations for 500+ delegates. Responsible for committee management, resolution drafting guidance, and maintaining parliamentary procedure.',
    achievements: [
      'Chaired UNSC committee with 50 delegates at IIMUN Championship 2023',
      'Moderated 5+ conferences across India with 2000+ total delegates',
      'Trained 100+ new delegates in MUN procedure and diplomacy',
      'Drafted background guides for 3 international committees',
      'Awarded "Best Chair" at IIMUN Delhi Chapter 2022',
    ],
    tech: ['Public Speaking', 'Diplomacy', 'Conflict Resolution', 'Parliamentary Procedure', 'Mentoring'],
    type: 'leadership',
  },
  {
    id: 3,
    company: 'KCC Institute of Technology and Management',
    role: 'B.Tech Computer Science & Engineering',
    period: '2021 — 2025',
    description: 'Pursuing Bachelor of Technology in Computer Science Engineering. Focus areas: Systems Programming, Compiler Design, Operating Systems, Computer Networks, and Algorithm Design. Active in competitive programming and open source contributions.',
    achievements: [
      'CGPA: 8.9/10 (Dean\'s List)',
      'Ranked Top 5% in CodeChef Starters rated contests',
      'Published 2 technical articles on compiler internals',
      'Contributed to 3 open source projects (Rust, CLI tools)',
      'Teaching Assistant for Data Structures & Algorithms course',
    ],
    tech: ['C', 'C++', 'Python', 'Operating Systems', 'Computer Networks', 'DBMS', 'Compiler Design', 'DSA'],
    type: 'education',
  },
]

export const leadershipExperiences = experiences.filter(e => e.type === 'leadership')
export const educationExperiences = experiences.filter(e => e.type === 'education')