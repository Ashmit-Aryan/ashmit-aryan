'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Menu, X, GitBranch, User, Code } from 'lucide-react'
import { personalInfo } from '@/data/constants'
import { cn } from '@/utils'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-sticky transition-all duration-250',
        'h-[72px]',
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-secondary shadow-md'
          : 'bg-bg-primary/80 backdrop-blur-md border-b border-border-secondary'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="flex items-center gap-2 text-decoration-none text-fg-primary"
          aria-label="Go to top"
        >
          <span className="font-display text-xl font-bold bg-gradient-to-r from-fg-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
            AA
          </span>
          <span className="relative">
            <span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-500 ease-spring w-0 group-hover:w-full" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="menubar">
          {navLinks.map((link, index) => (
            <li key={link.href} role="none">
              <Link
                to={link.href.replace('#', '')}
                smooth={true}
                duration={500}
                offset={-80}
                className={cn(
                  'relative text-fg-secondary text-sm font-medium',
                  'hover:text-fg-primary transition-colors duration-150',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary after:rounded-full after:transition-all after:duration-500 after:ease-spring after:w-0',
                  'group-hover:after:w-full focus:after:w-full'
                )}
                role="menuitem"
                spy={true}
                activeClass="text-fg-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={cn(
              'w-6 h-[2px] bg-fg-primary rounded-full transition-all duration-250',
              mobileOpen && 'rotate-45 translate-y-[6px]'
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              'w-6 h-[2px] bg-fg-primary rounded-full transition-all duration-250',
              mobileOpen && 'opacity-0'
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              'w-6 h-[2px] bg-fg-primary rounded-full transition-all duration-250',
              mobileOpen && '-rotate-45 -translate-y-[6px]'
            )}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden fixed top-[72px] left-0 right-0 flex-col px-6 py-8 gap-4',
          'bg-bg-glass-strong backdrop-blur-md border-b border-border-secondary',
          'transition-all duration-250',
          mobileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        )}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href.replace('#', '')}
            smooth={true}
            duration={500}
            offset={-80}
            spy={true}
            activeClass="text-accent-primary"
            onClick={() => setMobileOpen(false)}
            className="text-lg font-medium text-fg-secondary hover:text-fg-primary transition-colors py-2"
            role="menuitem"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}