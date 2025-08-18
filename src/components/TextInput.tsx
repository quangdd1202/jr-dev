'use client';

import React from 'react';
import { twclsx } from '@/utils/twclsx';

import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  truncate?: boolean;
  containerClassName?: string;
}

/**
 * TextInput
 * - Rounded pill input styled with Tailwind.
 * - Supports optional left and right icons.
 * - When `truncate` is true, the text/value will be ellipsized.
 */
export const TextInput: React.FC<TextInputProps> = ({
  leftIcon,
  rightIcon,
  truncate,
  className,
  containerClassName,
  ...rest
}) => {
  const inputClasses = twclsx(
    'peer block w-full bg-transparent placeholder:text-gray-400 focus:outline-none',
    // height/typography
    'h-12 text-base',
    // handle text overflow when requested
    truncate && 'truncate',
    className,
  );

  const wrapperClasses = twclsx(
    'flex items-center gap-3 rounded-full border border-gray-300 bg-white px-4 shadow-sm',
    'focus-within:border-blue-500',
    containerClassName,
  );

  return (
    <label className={wrapperClasses}>
      {leftIcon && (
        <span className="inline-flex shrink-0 text-gray-500">{leftIcon}</span>
      )}
      <input className={inputClasses} {...rest} />
      {rightIcon && (
        <span className="inline-flex shrink-0 text-gray-500">{rightIcon}</span>
      )}
    </label>
  );
};

export default TextInput;
