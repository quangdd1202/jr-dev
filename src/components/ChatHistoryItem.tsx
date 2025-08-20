'use client';

import React from 'react';
import Link from 'next/link';
import { twclsx } from '@/utils/twclsx';
import AiScannerRobotIcon from '@/public/icons/streamline-flex_ai-scanner-robot.svg';

import type { ReactNode, MouseEventHandler } from 'react';

export interface ChatHistoryItemProps {
  /** Conversation title shown at the right side. */
  label: ReactNode;
  /** Optional small image path under /public (e.g. "/icons/photo.svg"). */
  icon?: ReactNode;
  /** Mark item as active/selected. */
  active?: boolean;
  /** Optional right-side text (e.g., timestamp). */
  rightText?: ReactNode;
  /** Optional click handler (row becomes button-like). */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** When provided, the item renders as a Next.js Link for navigation. */
  href?: string;
  /** Whether Next.js should prefetch the route (defaults to true). */
  prefetch?: boolean;
  /** Extra classes for the outer container. */
  className?: string;
  /** Accessible label if label is not descriptive text. */
  ariaLabel?: string;
}

/**
 * ChatHistoryItem
 * Small row used in a sidebar list of conversations.
 * - Left: 24px icon (uses a default when none provided)
 * - Center: single-line title (truncated)
 * - Right: optional timestamp/meta text
 * - Renders a Next.js <Link> when href is provided (supports prefetch)
 */
export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  label,
  icon,
  active,
  rightText,
  onClick,
  href,
  prefetch = true,
  className,
  ariaLabel,
}) => {
  const classes = twclsx(
    'flex items-center justify-between rounded-lg px-3 py-2',
    'cursor-pointer select-none gap-3',
    'text-[#090A0A] hover:bg-gray-200 active:bg-gray-200',
    active &&
      'font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
    className,
  );

  const left = (
    <div className="flex min-w-0 items-center gap-3">
      {/* Left icon */}
      <div
        className={twclsx(
          'shrink-0',
          active ? 'text-blue-600' : 'text-gray-500',
        )}
      >
        {icon || <AiScannerRobotIcon />}
      </div>

      {/* Title (truncated) */}
      <div className="min-w-0 flex-1">
        <span className="block truncate text-left">{label}</span>
      </div>
    </div>
  );

  const right = rightText ? (
    <div
      className={twclsx(
        'shrink-0 pl-2 text-xs',
        active ? 'text-blue-600' : 'text-gray-500',
      )}
    >
      {rightText}
    </div>
  ) : null;

  const content = (
    <>
      {left}
      {right}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        prefetch={prefetch}
        aria-label={ariaLabel}
        className={classes}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default ChatHistoryItem;
