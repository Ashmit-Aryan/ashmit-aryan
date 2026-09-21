'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Palette, Shield, Cloud, Code, Server, Database, Terminal, Brain } from 'lucide-react'
import { personalInfo } from '@/data/constants'
import { skills, skillCategories } from '@/data/skills'
import { cn } from '@/utils'

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code,
  frameworks: Server,
  devops: Cloud,
  tools: Terminal,
  concepts: Brain,
}

const highlights = [
  {
    icon: Zap,
    title: 'Systems Programming',
    description: 'Building compilers, CLIs & low-level tools',
  },
  {
    icon: Shield,
    title: 'API Development',
    description: 'Designing scalable REST & GraphQL APIs',
  },
  {
    icon: Database,
    title: 'DevOps & Infrastructure',
    description: 'Docker, K8s, CI/CD & cloud deployments',
  },
]

const techPills = [
  'Rust', 'C', 'FastAPI', 'React', 'Next.js',
  'Docker', 'Kubernetes', 'GitHub Actions',
  'Linux', 'PostgreSQL', 'Redis', 'GraphQL',
  'WebAssembly', 'Compiler Design', 'Distributed Systems'
]

export function About() {
  return (
    <section id="about" className="section bg-bg-secondary" aria-labelledby="about-title">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">01</span>
          <h2 id="about-title" className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know the person behind the code</p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left: Visual / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Glow */}
              <div
                className="absolute inset-[-40px] bg-gradient-to-r from-accent-primary/20 via-transparent to-accent-secondary/20 rounded-full blur-[60px] opacity-50 animate-pulse-slow"
                aria-hidden="true"
              />
              
              {/* Avatar */}
              <div className="relative w-80 h-80 mx-auto rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-center">
                <div className="absolute inset-[-4px] border-2 border-accent-primary/30 rounded-full animate-spin-slow" aria-hidden="true" />
                <div className="absolute inset-[-12px] border-2 border-accent-secondary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} aria-hidden="true" />
                
                <div className="relative z-10 w-70 h-70 rounded-full bg-bg-primary flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary animate-spin-slow opacity-10"
                    style={{ animationDuration: '8s' }}
                    aria-hidden="true"
                  />
                  <Code className="w-20 h-20 text-accent-primary relative z-10" aria-hidden="true" />
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="badge absolute top-[-10px] right-[20%] animate-float" style={{ animationDelay: '0s' }}>
                  <span className="flex items-center gap-2 px-4 py-2 bg-bg-glass border border-border-secondary rounded-full text-sm font-medium text-fg-secondary backdrop-blur-md">
                    <Zap className="w-4 h-4 text-accent-primary" aria-hidden="true" />
                    Performance
                  </span>
                </div>
                <div className="badge absolute top-[30%] right-[-30px] animate-float" style={{ animationDelay: '-1s' }}>
                  <span className="flex items-center gap-2 px-4 py-2 bg-bg-glass border border-border-secondary rounded-full text-sm font-medium text-fg-secondary backdrop-blur-md">
                    <Palette className="w-4 h-4 text-accent-secondary" aria-hidden="true" />
                    API Design
                  </span>
                </div>
                <div className="badge absolute bottom-[30%] left-[-30px] animate-float" style={{ animationDelay: '-2s' }}>
                  <span className="flex items-center gap-2 px-4 py-2 bg-bg-glass border border-border-secondary rounded-full text-sm font-medium text-fg-secondary backdrop-blur-md">
                    <Shield className="w-4 h-4 text-accent-tertiary" aria-hidden="true" />
                    Security
                  </span>
                </div>
                <div className="badge absolute bottom-[-10px] left-[20%] animate-float" style={{ animationDelay: '-3s' }}>
                  <span className="flex items-center gap-2 px-4 py-2 bg-bg-glass border border-border-secondary rounded-full text-sm font-medium text-fg-secondary backdrop-blur-md">
                    <Cloud className="w-4 h-4 text-accent-warning" aria-hidden="true" />
                    Cloud Native
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Bio */}
            <div className="about-text space-y-6 mb-10">
              <p className="about-paragraph text-lg text-fg-secondary leading-relaxed">
                {personalInfo.bio.split('\n\n')[0]}
              </p>
              <p className="about-paragraph text-lg text-fg-secondary leading-relaxed">
                {personalInfo.bio.split('\n\n')[1]}
              </p>
            </div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="about-highlights grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 pt-8 border-t border-border-secondary"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'highlight flex items-start gap-3 p-4 bg-bg-glass border border-border-secondary rounded-xl backdrop-blur-md transition-all duration-250',
                    'hover:border-accent-primary hover:-translate-y-1 hover:shadow-glow'
                  )}
                >
                  <div className="highlight-icon w-10 h-10 flex items-center justify-center bg-accent-primary-dim rounded-lg text-accent-primary flex-shrink-0">
                    <highlight.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="highlight-info">
                    <h3 className="font-semibold text-fg-primary mb-1">{highlight.title}</h3>
                    <p className="text-sm text-fg-tertiary">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <h3 className="text-lg font-semibold text-fg-primary mb-4">Currently Exploring</h3>
              <div className="tech-pills flex flex-wrap gap-3">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      'tech-pill px-4 py-2 bg-bg-glass border border-border-secondary rounded-full',
                      'text-sm font-medium text-fg-secondary font-mono',
                      'hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary-dim',
                      'transition-all duration-250 cursor-default'
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Skill Matrix Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="mt-10 pt-8 border-t border-border-secondary"
            >
              <h3 className="text-lg font-semibold text-fg-primary mb-4">Core Competencies</h3>
              <div className="space-y-6">
                {skillCategories.map((category) => {
                  const categorySkills = skills.filter((s) => s.category === category.key)
                  const Icon = skillIcons[category.key]
                  return (
                    <div key={category.key} className="skill-category-summary">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-accent-primary-dim rounded-lg text-accent-primary">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <h4 className="font-display text-lg font-semibold text-fg-primary">{category.label}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-13">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill.name}
                            className={cn(
                              'px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full',
                              'text-sm font-medium text-fg-secondary font-mono',
                              'hover:border-accent-primary hover:text-accent-primary',
                              'transition-all duration-200'
                            )}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}