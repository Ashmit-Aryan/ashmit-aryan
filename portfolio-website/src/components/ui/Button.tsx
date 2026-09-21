'use client'
import React from 'react'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      iconLeft,
      iconRight,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 font-display font-semibold
      rounded-lg border-none cursor-pointer transition-all duration-250
      whitespace-nowrap relative overflow-hidden focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2
      focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variantStyles = {
      primary: `
        bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary shadow-glow
        hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,212,170,0.2)]
        active:translate-y-0
      `,
      secondary: `
        bg-transparent text-fg-primary border border-border-primary
        hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary-dim
      `,
      ghost: `
        bg-transparent text-fg-secondary border border-transparent px-4 py-2
        hover:text-accent-primary hover:bg-accent-primary-dim
      `,
    }

    const sizeStyles = {
      sm: 'text-xs px-3 py-2',
      md: 'text-sm px-6 py-3',
      lg: 'text-base px-8 py-4',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {iconLeft && <span className="flex-shrink-0" aria-hidden="true">{iconLeft}</span>}
            <span>{children}</span>
            {iconRight && <span className="flex-shrink-0" aria-hidden="true">{iconRight}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'