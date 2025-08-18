'use client';

import React from 'react';
import { twclsx } from '@/utils/twclsx';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'outline' | 'disabled';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
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

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed select-none';

  const sizes: Record<ButtonSize, string> = {
    sm: isIconOnly ? 'h-8 w-8' : 'h-8 px-3 text-sm',
    md: isIconOnly ? 'h-10 w-10' : 'h-10 px-4 text-sm',
    lg: isIconOnly ? 'h-12 w-12' : 'h-12 px-5 text-base',
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:text-white/80',
    outline:
      'border border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-300 disabled:border-blue-200',
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
