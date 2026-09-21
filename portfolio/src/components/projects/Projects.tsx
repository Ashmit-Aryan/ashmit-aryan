'use client'
import React from 'react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, FileCode, Search } from 'lucide-react'
import { projects, categories, type Project } from '@/data/projects'
import { cn } from '@/utils'

const categoryColors: Record<string, string> = {
  systems: 'border-accent-primary text-accent-primary',
  hackathons: 'border-accent-secondary text-accent-secondary',
  backend: 'border-accent-tertiary text-accent-tertiary',
  opensource: 'border-accent-warning text-accent-warning',
  fullstack: 'border-accent-primary text-accent-primary',
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<'all' | Project['category']>('all')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const visibleProjects = useMemo(() => {
    return filteredProjects.filter((p) => activeCategory === 'all' || p.featured || filteredProjects.length <= 6)
  }, [filteredProjects, activeCategory])

  return (
    <section id="projects" className="section bg-bg-primary" aria-labelledby="projects-title">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">02</span>
          <h2 id="projects-title" className="section-title">Selected Work</h2>
          <p className="section-subtitle">Projects that showcase my craft</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
          className="work-filter flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              aria-controls={`${cat.value}-panel`}
              id={`${cat.value}-tab`}
              onClick={() => setActiveCategory(cat.value as typeof activeCategory)}
              className={cn(
                'filter-btn px-5 py-2 bg-bg-glass border border-border-secondary rounded-full',
                'font-display text-sm font-medium text-fg-secondary',
                'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                'backdrop-blur-md transition-all duration-250',
                activeCategory === cat.value
                  ? 'bg-accent-primary-dim border-accent-primary text-accent-primary'
                  : ''
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div
          id={`${activeCategory}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeCategory}-tab`}
          className="work-grid grid gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  'work-card group relative bg-bg-secondary border border-border-secondary rounded-2xl overflow-hidden',
                  'transition-all duration-500',
                  'hover:-translate-y-2 hover:border-accent-primary hover:shadow-xl hover:shadow-glow'
                )}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Media */}
                <div className="work-card-media relative aspect-[16/10] overflow-hidden bg-bg-tertiary">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Search className="w-12 h-12 mx-auto mb-3 text-accent-primary/50 group-hover:text-accent-primary/80 transition-colors" aria-hidden="true" />
                      <p className="font-display text-xl font-semibold text-fg-tertiary">{project.title}</p>
                      <p className="font-mono text-xs text-fg-muted mt-1">Project Preview</p>
                    </div>
                  </div>
                  
                  {/* Overlay Links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === project.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="work-card-overlay absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-transparent to-transparent flex items-end p-6"
                  >
                    <div className="work-card-links flex gap-3 w-full">
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'work-card-link flex-1 flex items-center justify-center gap-2 px-4 py-3',
                            'bg-bg-glass border border-border-secondary rounded-lg text-fg-primary',
                            'text-sm font-medium backdrop-blur-md transition-all duration-250',
                            'hover:bg-accent-primary hover:border-accent-primary hover:text-bg-primary'
                          )}
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          Live Demo
                        </a>
                      )}
                      {project.links.code && (
                        <a
                          href={project.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'work-card-link flex-1 flex items-center justify-center gap-2 px-4 py-3',
                            'bg-bg-glass border border-border-secondary rounded-lg text-fg-primary',
                            'text-sm font-medium backdrop-blur-md transition-all duration-250',
                            'hover:bg-accent-primary hover:border-accent-primary hover:text-bg-primary'
                          )}
                          aria-label={`View source code of ${project.title}`}
                        >
                          <GitBranch className="w-4 h-4" aria-hidden="true" />
                          Source Code
                        </a>
                      )}
                      {project.links.caseStudy && (
                        <a
                          href={project.links.caseStudy}
                          className={cn(
                            'work-card-link flex-1 flex items-center justify-center gap-2 px-4 py-3',
                            'bg-bg-glass border border-border-secondary rounded-lg text-fg-primary',
                            'text-sm font-medium backdrop-blur-md transition-all duration-250',
                            'hover:bg-accent-secondary hover:border-accent-secondary hover:text-bg-primary'
                          )}
                          aria-label={`Read case study for ${project.title}`}
                        >
                          <FileCode className="w-4 h-4" aria-hidden="true" />
                          Case Study
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="work-card-content p-6">
                  {/* Tags */}
                  <div className="work-card-tags flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'work-card-tag font-mono text-xs px-3 py-1 bg-bg-tertiary rounded-full transition-all duration-200',
                          'border border-border-secondary text-fg-tertiary',
                          'group-hover:border-accent-primary group-hover:text-accent-primary'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="work-card-tag font-mono text-xs px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full text-fg-tertiary">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="work-card-title font-display text-xl font-semibold text-fg-primary mb-3 leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="work-card-description text-fg-secondary leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="work-card-meta flex items-center gap-4 pt-4 border-t border-border-secondary text-sm text-fg-tertiary">
                    <span className={cn(
                      'px-2 py-1 rounded font-medium text-xs uppercase tracking-wider',
                      categoryColors[project.category]
                    )}>
                      {categories.find((c) => c.value === project.category)?.label}
                    </span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        {activeCategory === 'all' && projects.length > visibleProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="work-cta text-center mt-12"
          >
            <button className="btn btn-ghost group">
              <span>View All Projects</span>
              <ExternalLink className="btn-icon w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}