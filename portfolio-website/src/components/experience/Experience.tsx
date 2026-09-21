'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, Users, Code2, Target } from 'lucide-react'
import { experiences, leadershipExperiences, educationExperiences } from '@/data/experience'
import { cn } from '@/utils'

export function Experience() {
  return (
    <section id="experience" className="section bg-bg-primary" aria-labelledby="experience-title">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">04</span>
          <h2 id="experience-title" className="section-title">Experience & Leadership</h2>
          <p className="section-subtitle">My professional journey and community impact</p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border-secondary" aria-hidden="true" />
          
          {/* Leadership Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mb-16"
          >
            <h3 className="font-display text-xl font-semibold text-fg-primary mb-8 flex items-center gap-3">
              <Users className="w-6 h-6 text-accent-primary" aria-hidden="true" />
              Leadership & Community
            </h3>
            
            <div className="space-y-8">
              {leadershipExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={cn(
                    'timeline-item relative flex',
                    index % 2 === 0 ? 'justify-end pr-[calc(50%+2rem)]' : 'justify-start pl-[calc(50%+2rem)]'
                  )}
                >
                  {/* Marker */}
                  <div className="timeline-marker absolute left-1/2 top-0 w-4 h-4 bg-bg-primary border-3 border-accent-primary rounded-full -translate-x-1/2 z-10 shadow-glow" aria-hidden="true" />
                  
                  {/* Content */}
                  <div className="timeline-content w-full max-w-md bg-bg-glass border border-border-secondary rounded-xl p-6 backdrop-blur-md transition-all duration-250 hover:border-accent-primary hover:shadow-glow">
                    <div className="timeline-meta flex items-center gap-3 mb-3 flex-wrap">
                      <span className="timeline-company font-display text-lg font-semibold text-fg-primary">{exp.company}</span>
                      <span className="timeline-period font-mono text-sm text-accent-primary bg-accent-primary-dim px-3 py-1 rounded-full">
                        <Calendar className="w-3 h-3 inline mr-1" aria-hidden="true" />
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="timeline-role text-base font-medium text-accent-primary mb-3">{exp.role}</h4>
                    <p className="timeline-description text-fg-secondary leading-relaxed mb-4">{exp.description}</p>
                    
                    <div className="timeline-tech flex flex-wrap gap-2">
                      {exp.tech.map((t: string, i: number) => (
                        <span key={i} className="font-mono text-xs px-2 py-1 bg-bg-tertiary border border-border-secondary rounded text-fg-tertiary">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    {/* Achievements */}
                    <div className="mt-4 space-y-2">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 text-sm text-fg-secondary"
                        >
                          <Target className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 className="font-display text-xl font-semibold text-fg-primary mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-accent-secondary" aria-hidden="true" />
              Education
            </h3>
            
            <div className="space-y-8">
              {educationExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={cn(
                    'timeline-item relative flex',
                    index % 2 === 0 ? 'justify-end pr-[calc(50%+2rem)]' : 'justify-start pl-[calc(50%+2rem)]'
                  )}
                >
                  <div className="timeline-marker absolute left-1/2 top-0 w-4 h-4 bg-bg-primary border-3 border-accent-secondary rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(99,102,241,0.3)]" aria-hidden="true" />
                  
                  <div className="timeline-content w-full max-w-md bg-bg-glass border border-border-secondary rounded-xl p-6 backdrop-blur-md transition-all duration-250 hover:border-accent-secondary hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                    <div className="timeline-meta flex items-center gap-3 mb-3 flex-wrap">
                      <span className="timeline-company font-display text-lg font-semibold text-fg-primary">{exp.company}</span>
                      <span className="timeline-period font-mono text-sm text-accent-secondary bg-accent-secondary-dim px-3 py-1 rounded-full">
                        <Calendar className="w-3 h-3 inline mr-1" aria-hidden="true" />
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="timeline-role text-base font-medium text-accent-secondary mb-3">{exp.role}</h4>
                    <p className="timeline-description text-fg-secondary leading-relaxed mb-4">{exp.description}</p>
                    
                    <div className="timeline-tech flex flex-wrap gap-2">
                      {exp.tech.map((t: string, i: number) => (
                        <span key={i} className="font-mono text-xs px-2 py-1 bg-bg-tertiary border border-border-secondary rounded text-fg-tertiary">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-2 text-sm text-fg-secondary"
                        >
                          <Award className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}