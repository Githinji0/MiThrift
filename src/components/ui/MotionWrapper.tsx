'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<MotionDivProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<MotionDivProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideInLeft: React.FC<MotionDivProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideInRight: React.FC<MotionDivProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<MotionDivProps> = ({
  children,
  className = '',
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<MotionDivProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
