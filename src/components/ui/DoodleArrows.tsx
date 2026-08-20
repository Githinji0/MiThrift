'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DoodleProps {
  className?: string;
  animate?: boolean;
}

/**
 * Looped doodle arrow swirling up-right (matching user reference image top-left)
 */
export const DoodleLoopArrowUpRight: React.FC<DoodleProps> = ({
  className = 'w-16 h-16 text-[#1F201D]',
  animate = true,
}) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : undefined}
      whileInView={animate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {/* Looped curved path */}
      <path
        d="M 22 72 C 38 60 55 52 46 36 C 38 22 25 32 36 48 C 45 60 62 48 78 30"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head pointing up-right */}
      <path
        d="M 62 26 L 80 29 L 81 47"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

/**
 * Curved hand-drawn sketch arrow curving down-right (matching user reference image right)
 */
export const DoodleCurveArrowDown: React.FC<DoodleProps> = ({
  className = 'w-16 h-16 text-[#1F201D]',
  animate = true,
}) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {/* Smooth curved swoop */}
      <path
        d="M 28 20 C 45 28 68 45 74 72"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head pointing down */}
      <path
        d="M 58 64 L 75 75 L 82 56"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

/**
 * Looped swirl doodle arrow pointing left (matching user reference image bottom)
 */
export const DoodleLoopArrowLeft: React.FC<DoodleProps> = ({
  className = 'w-16 h-16 text-[#1F201D]',
  animate = true,
}) => {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.8, rotate: 10 } : undefined}
      whileInView={animate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {/* Looped path swirling to the left */}
      <path
        d="M 78 40 C 64 45 52 46 54 62 C 56 75 70 70 65 52 C 58 35 38 42 22 52"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head pointing left */}
      <path
        d="M 36 38 L 20 53 L 34 68"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

/**
 * Four-point doodle star / sparkle accent (matching user reference image bottom-right)
 */
export const DoodleSparkle: React.FC<DoodleProps> = ({
  className = 'w-6 h-6 text-[#1F201D]',
  animate = true,
}) => {
  return (
    <motion.svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { opacity: 0, scale: 0.5, rotate: -20 } : undefined}
      whileInView={animate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <path
        d="M 25 5 Q 25 25 45 25 Q 25 25 25 45 Q 25 25 5 25 Q 25 25 25 5 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};

/**
 * Playful curved connector arrow for pointing towards CTAs / cards
 */
export const DoodlePointerArrow: React.FC<DoodleProps> = ({
  className = 'w-14 h-14 text-[#5E6F3D]',
  animate = true,
}) => {
  return (
    <motion.svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { opacity: 0, pathLength: 0 } : undefined}
      whileInView={animate ? { opacity: 1, pathLength: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <path
        d="M 10 20 C 35 10 70 20 80 55"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M 68 45 L 82 58 L 88 40"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
