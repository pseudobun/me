'use client';

import { motion, useReducedMotion } from 'motion/react';

interface Blob {
  size: number;
  color: string;
  top: string;
  left: string;
  duration: number;
  delay: number;
  drift: { x: number; y: number };
}

// Deterministic configs (no Math.random) so SSR and client markup match.
const BLOBS: Blob[] = [
  {
    size: 340,
    color: 'var(--color-primary)',
    top: '8%',
    left: '12%',
    duration: 19,
    delay: 0,
    drift: { x: 40, y: 30 },
  },
  {
    size: 260,
    color: 'var(--color-secondary)',
    top: '58%',
    left: '68%',
    duration: 23,
    delay: 1.5,
    drift: { x: -50, y: 24 },
  },
  {
    size: 200,
    color: 'var(--color-primary)',
    top: '72%',
    left: '18%',
    duration: 27,
    delay: 0.8,
    drift: { x: 32, y: -34 },
  },
  {
    size: 220,
    color: 'var(--color-secondary)',
    top: '14%',
    left: '74%',
    duration: 21,
    delay: 2.2,
    drift: { x: -28, y: 40 },
  },
];

/**
 * Subtle drifting blurred blobs behind the page content. Decorative only.
 * Framer Motion (motion/react); respects prefers-reduced-motion.
 */
export default function FloatingShapes() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((blob) => (
        <motion.span
          key={`${blob.top}-${blob.left}`}
          className="absolute rounded-full blur-3xl"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            opacity: 0.06,
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, blob.drift.x, 0],
                  y: [0, blob.drift.y, 0],
                  scale: [1, 1.12, 1],
                  opacity: [0.05, 0.09, 0.05],
                }
          }
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
