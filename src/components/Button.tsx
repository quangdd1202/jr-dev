'use client';

import React from 'react';
import { twclsx } from '@/utils/twclsx';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button component
 * - Rounded pill button styled with Tailwind.
 * - Supports size variants (sm, md, lg, xl) and visual variants (primary, secondary, outline, disabled).
 * - Optional left and right icons; when used without children, renders an icon-only square button.
 * - Respects native button props and accessibility focus ring.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'plain'
  | 'disabled';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Visual style of the button. Default: 'outline'. */
  variant?: ButtonVariant;
  /** Size of the button. Default: 'md'. */
  size?: ButtonSize;
  /** Optional element rendered on the left side (e.g., an icon). */
  leftIcon?: ReactNode;
  /** Optional element rendered on the right side (e.g., an icon). */
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  disabled: disabledProp,
  children,
  ...rest
}) => {
  const isIconOnly = !children && (leftIcon || rightIcon);
  const disabled = disabledProp || variant === 'disabled';

  const base = twclsx(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
    'disabled:cursor-not-allowed select-none',
  );

  const sizes: Record<ButtonSize, string> = {
    sm: isIconOnly ? 'h-8 w-8' : 'h-8 px-3 text-sm',
    md: isIconOnly ? 'h-10 w-10' : 'h-10 px-4 text-sm',
    lg: isIconOnly ? 'h-12 w-12' : 'h-12 px-5 text-base',
    xl: isIconOnly ? 'h-14 w-14' : 'h-14 px-6 text-base',
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:text-white/80',
    secondary:
      'bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-400',
    outline:
      'border border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-300 disabled:border-blue-200',
    plain:
      'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-300 disabled:bg-transparent border-0',
    disabled:
      'border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-100',
  };

  const classes = twclsx(base, sizes[size], variants[variant], className);

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {leftIcon && (
        <span className={twclsx(isIconOnly ? '' : '-ml-0.5', 'inline-flex')}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className={twclsx(isIconOnly ? '' : '-mr-0.5', 'inline-flex')}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
