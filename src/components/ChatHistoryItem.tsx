'use client';

import React from 'react';
import { twclsx } from '@/utils/twclsx';
import AiScannerRobotIcon from '../../public/icons/streamline-flex_ai-scanner-robot.svg';

import type { ReactNode, MouseEventHandler } from 'react';

export interface ChatHistoryItemProps {
  /** Conversation title shown at the right side. */
  label: ReactNode;
  /** Optional small image path under /public (e.g. "/icons/photo.svg"). */
  icon?: ReactNode;
  /** Mark item as active/selected. */
  active?: boolean;
  /** Optional click handler (row becomes button-like). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Extra classes for the outer container. */
  className?: string;
  /** Accessible label if label is not descriptive text. */
  ariaLabel?: string;
}

/**
 * ChatHistoryItem
 * Small row used in a sidebar list of conversations.
 * - Left: 24px icon (uses a default when none provided)
 * - Right: single-line text that truncates with ellipsis
 */
export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  label,
  icon,
  active,
  onClick,
  className,
  ariaLabel,
}) => {
  const classes = twclsx(
    'flex items-center gap-3 rounded-lg px-3 py-2',
    'cursor-pointer select-none',
    'text-[#090A0A] hover:bg-gray-50',
    active && 'font-semibold text-blue-600 bg-blue-50',
    className,
  );

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={classes}
      onClick={onClick}
    >
      {/* Left icon */}
      <div
        className={twclsx(
          'shrink-0',
          active ? 'text-blue-600' : 'text-gray-500',
        )}
      >
        {icon || <AiScannerRobotIcon />}
      </div>

      {/* Right label (truncated) */}
      <div className="min-w-0 flex-1">
        <span className="block truncate text-left">{label}</span>
      </div>
    </button>
  );
};

export default ChatHistoryItem;
