'use client';

import React from 'react';
import Image from 'next/image';
import { twclsx } from '@/utils/twclsx';
import BotIcon from '@/public/icons/bot.svg';

import type { ReactNode } from 'react';

export type ConversationSender = 'assistant' | 'user';

export interface ConversationChatItemProps {
  sender: ConversationSender;
  /** Message content */
  children: ReactNode;
  /** Optional avatar/icon image path. If not provided for assistant, defaults to /icons/bot.svg */
  avatarSrc?: string;
  /** Alt text for avatar image */
  avatarAlt?: string;
  /** Extra classes for outer container */
  className?: string;
  // Actions
  onCopy?: () => void;
  onLike?: () => void; // assistant only
  onDislike?: () => void; // assistant only
  onEdit?: () => void; // user only
}

/**
 * ConversationChatItem
 * - Renders a single chat row either from assistant (left) or user (right)
 * - Assistant actions (copy/like/dislike) are always visible
 * - User actions (copy/edit) are visible on hover
 */
export const ConversationChatItem: React.FC<ConversationChatItemProps> = ({
  sender,
  children,
  className,
  onCopy,
  onLike,
  onDislike,
  onEdit,
}) => {
  const isAssistant = sender === 'assistant';

  const wrapper = twclsx(
    'group w-full',
    isAssistant
      ? 'flex items-start gap-3'
      : 'flex items-start gap-3 justify-end',
    className,
  );

  const bubble = twclsx(
    'rounded-3xl px-4 text-gray-900',
    isAssistant
      ? 'py-4 bg-gray-100 rounded-tl-none'
      : 'py-2.5 bg-blue-50 text-blue-700',
  );

  const avatar = (
    <div
      className={twclsx(
        'mt-1 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-blue-500',
        !isAssistant && 'hidden',
      )}
    >
      {isAssistant && <BotIcon />}
    </div>
  );

  const ActionButton: React.FC<{
    title: string;
    onClick?: () => void;
    children: ReactNode;
    alwaysVisible?: boolean;
  }> = ({ title, onClick, children, alwaysVisible }) => (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={twclsx(
        'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700',
        !alwaysVisible && 'opacity-0 group-hover:opacity-100',
      )}
    >
      {children}
    </button>
  );

  return (
    <div className={wrapper}>
      {isAssistant && avatar}

      <div
        className={twclsx(
          'min-w-0',
          isAssistant ? '' : 'flex flex-col items-end',
        )}
      >
        {/* Message bubble */}
        <div className={bubble}>{children}</div>

        {/* Actions */}
        <div
          className={twclsx(
            'mt-2 flex w-full items-center justify-end gap-2 text-sm',
          )}
        >
          {/* Copy always available */}
          <ActionButton
            title="Copy"
            onClick={onCopy}
            alwaysVisible={isAssistant}
          >
            <Image
              src={'/icons/streamline_align-front-1.svg'}
              alt={'Copy'}
              width={24}
              height={24}
            />
          </ActionButton>

          {isAssistant ? (
            <>
              <ActionButton title="Like" onClick={onLike} alwaysVisible>
                <Image
                  src={'/icons/streamline_like-1.svg'}
                  alt={'Copy'}
                  width={24}
                  height={24}
                />
              </ActionButton>
              <ActionButton title="Dislike" onClick={onDislike} alwaysVisible>
                <Image
                  src={'/icons/streamline_dislike-1.svg'}
                  alt={'Copy'}
                  width={24}
                  height={24}
                />
              </ActionButton>
            </>
          ) : (
            <ActionButton title="Edit" onClick={onEdit}>
              <Image
                src={'/icons/streamline_pencil.svg'}
                alt={'Copy'}
                width={24}
                height={24}
              />
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationChatItem;
