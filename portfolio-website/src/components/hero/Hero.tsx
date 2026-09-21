'use client'
import React from 'react'
import { Link } from 'react-scroll'
import { ArrowRight, Download, GitBranch, User, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import { personalInfo } from '@/data/constants'
import { cn } from '@/utils'

const socialLinks = [
  { href: personalInfo.social.github, label: 'GitHub', icon: GitBranch },
  { href: personalInfo.social.linkedin, label: 'LinkedIn', icon: User },
  { href: personalInfo.social.leetcode, label: 'LeetCode', icon: Code },
]

export function Hero() {
  return (
    <section id="hero" className="hero relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center max-w-4xl mx-auto px-6 py-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-badge inline-flex items-center gap-3 text-sm font-medium text-fg-secondary bg-bg-glass border border-border-secondary px-4 py-2 rounded-full mb-8 backdrop-blur-md"
        >
          <span className="hero-badge-dot w-2 h-2 bg-accent-primary rounded-full animate-pulse" aria-hidden="true" />
          <span>Available for internships, collaborations & open source</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title font-display text-5xl font-bold leading-[1.05] mb-6 tracking-tight"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="hero-title-word block"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Hi, I&apos;m
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="hero-title-word hero-title-word--highlight block bg-gradient-to-r from-fg-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.name}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="hero-title-word block"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.title}
            </motion.span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hero-description text-xl text-fg-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio.split('\n\n')[0]}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hero-stats flex flex-wrap justify-center gap-10 mb-10"
        >
          <div className="stat text-center">
            <div className="stat-number font-display text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-1">
              {personalInfo.stats.projects}+
            </div>
            <div className="stat-label text-sm text-fg-tertiary font-medium">Projects Built</div>
          </div>
          <div className="stat text-center">
            <div className="stat-number font-display text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-1">
              {personalInfo.stats.hackathons}+
            </div>
            <div className="stat-label text-sm text-fg-tertiary font-medium">Hackathons</div>
          </div>
          <div className="stat text-center">
            <div className="stat-number font-display text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-1">
              {personalInfo.stats.contributions}+
            </div>
            <div className="stat-label text-sm text-fg-tertiary font-medium">Contributions</div>
          </div>
          <div className="stat text-center">
            <div className="stat-number font-display text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-1">
              {personalInfo.stats.stars}+
            </div>
            <div className="stat-label text-sm text-fg-tertiary font-medium">GitHub Stars</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hero-actions flex flex-wrap justify-center gap-4 mb-10"
        >
          <Link
            to="projects"
            smooth={true}
            duration={500}
            offset={-80}
            className="btn btn-primary group"
            aria-label="View my projects"
          >
            <span className="btn-text">View Projects</span>
            <ArrowRight className="btn-icon w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn btn-secondary"
            aria-label="Download resume"
          >
            <Download className="w-5 h-5 mr-2" aria-hidden="true" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="hero-social flex justify-center gap-5"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-fg-tertiary text-xs font-medium uppercase tracking-widest"
        style={{ animation: 'scrollBounce 3s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <div className="hero-scroll-mouse w-[26px] h-[42px] border-2 border-fg-tertiary rounded-full flex justify-center pt-2">
          <div className="hero-scroll-wheel w-1 h-2 bg-accent-primary rounded-full" style={{ animation: 'wheelScroll 1.5s ease-in-out infinite' }} />
        </div>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="floating-elements absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="float-item absolute w-14 h-14 flex items-center justify-center bg-bg-glass border border-border-secondary rounded-xl text-fg-tertiary backdrop-blur-md" style={{ top: '20%', left: '5%', animationDelay: '0s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6M9 15h6M9 12h4" />
          </svg>
        </div>
        <div className="float-item absolute w-14 h-14 flex items-center justify-center bg-bg-glass border border-border-secondary rounded-xl text-fg-tertiary backdrop-blur-md" style={{ top: '60%', right: '5%', animationDelay: '-2s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <div className="float-item absolute w-14 h-14 flex items-center justify-center bg-bg-glass border border-border-secondary rounded-xl text-fg-tertiary backdrop-blur-md" style={{ bottom: '20%', left: '10%', animationDelay: '-4s' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
      </div>
    </section>
  )
}