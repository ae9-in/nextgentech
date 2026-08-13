'use client'

import React, { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineContentProps {
  children: React.ReactNode
  as?: React.ElementType
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement | null>
  customVariants?: Variants
  className?: string
}

export function TimelineContent({
  children,
  as: Component = 'div',
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  ...props
}: TimelineContentProps) {
  const fallbackRef = useRef<HTMLDivElement>(null)
  const ref = timelineRef || fallbackRef
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  }

  const variants = customVariants || defaultVariants

  return (
    <motion.div
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
