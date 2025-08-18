'use client';

import React from 'react';
import { twclsx } from '@/utils/twclsx';

import type { ReactNode, KeyboardEvent } from 'react';
import Image from 'next/image';

export interface IceBreakerProps {
  /** Left image/icon. Can be an <img/>, svg, or any node. */
  left?: ReactNode;
  /** Main content in the middle. Accepts string or any ReactNode. */
  children: ReactNode;
  /** Optional right icon. Defaults to a chevron arrow. */
  right?: ReactNode;
  /** Called when the row is clicked or activated via keyboard. */
  onClick?: () => void;
  /** Marks the item as active/selected (applies blue focus-like outline). */
  active?: boolean;
  /** Additional className for outer container. */
  className?: string;
  /** Accessible label if children is not descriptive. */
  ariaLabel?: string;
}

/**
 * IceBreaker
 * A horizontal, clickable row with an image on the left, content in the middle,
 * and an arrow on the right. On hover/active it highlights
 */
export const IceBreaker: React.FC<IceBreakerProps> = ({
  left,
  right,
  children,
  onClick,
  active,
  className,
  ariaLabel,
}) => {
  // base row container
  const base = twclsx(
    'group relative flex w-full items-center gap-4 rounded-xl border bg-white p-2 text-left',
    'border-gray-200 cursor-pointer',
    // hover/active visuals
    'hover:border-blue-500 hover:bg-blue-50',
    // active && 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/30',
    // accessibility focus
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
    className,
  );

  // Default right chevron
  const defaultRight = (
    <Image
      src={'/icons/streamline_login-1.svg'}
      alt={'Select'}
      width={24}
      height={24}
    />
  );

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : -1}
      aria-label={ariaLabel}
      className={base}
      onKeyDown={handleKey}
      onClick={onClick}
    >
      {/* Left image/icon */}
      <div className="flex h-16 w-[120px] shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-600">
        {left}
      </div>

      {/* Middle content */}
      <div className="min-w-0 flex-1 text-gray-900">
        <p className="break-words">{children}</p>
      </div>

      {/* Right arrow */}
      <div
        className={twclsx(
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          'opacity-0 group-hover:opacity-100',
          active && 'opacity-100',
        )}
        aria-hidden
      >
        {right ?? defaultRight}
      </div>
    </div>
  );
};

export default IceBreaker;
