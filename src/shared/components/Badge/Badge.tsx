import { forwardRef, type HTMLAttributes } from 'react';
import './Badge.css';

type Variant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
type Size = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  rounded?: 'md' | 'full';
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      size = 'sm',
      rounded = 'md',
      startAdornment,
      endAdornment,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'badge',
      `badge--${variant}`,
      `badge--${size}`,
      rounded === 'full' ? 'badge--full' : 'badge--md',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...rest}>
        {startAdornment}
        {children}
        {endAdornment}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
