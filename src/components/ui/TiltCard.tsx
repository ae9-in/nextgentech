'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltDegree = 12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * tiltDegree;
    const rX = ((mouseY - height / 2) / (height / 2)) * -tiltDegree;

    setRotateX(rX);
    setRotateY(rY);
    setGlowX((mouseX / width) * 100);
    setGlowY((mouseY / height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={`relative group rounded-2xl transition-all duration-300 ${className}`}
    >
      {/* Radial Spotlight glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
};
