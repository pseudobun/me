'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  delay?: number;
  /** Wrapper element tag. Defaults to div. */
  as?: 'div' | 'section' | 'li';
}

/**
 * Fade + slide-up on scroll into view, once. Pure CSS transition + a vanilla
 * IntersectionObserver (no animation deps). Respects prefers-reduced-motion.
 * Ported from lutra-lander-v2.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLLIElement>}
      className={cn(
        'transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-[26px] opacity-0',
        className
      )}
      style={{ ...style, transitionDelay: shown ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
