'use client';

import React from 'react';
import { twclsx } from '@/utils/twclsx';
import Button from '@/components/Button';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

export interface TranslationHistoryCardProps {
  /** Source language label, e.g., "EN" */
  fromLang: ReactNode;
  /** Target language label, e.g., "JP" */
  toLang: ReactNode;
  /** Original/source text */
  sourceText: ReactNode;
  /** Translated text */
  translatedText: ReactNode;
  /** When true, the card will stretch to 100% width */
  fullWidth?: boolean;
  /** Additional classes for the outer container */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * TranslationHistoryCard
 * Renders a card with a language pill at the top, then the source text,
 * a divider, and the translated text. The pill reuses the Button component
 * without any action/handler.
 */
export const TranslationHistoryCard: React.FC<TranslationHistoryCardProps> = ({
  fromLang,
  toLang,
  sourceText,
  translatedText,
  fullWidth,
  className,
  onClick,
}) => {
  const container = twclsx(
    'rounded-2xl border border-gray-200 bg-white p-6 shadow-sm',
    fullWidth ? 'w-full' : '',
    className,
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={container} role="button" tabIndex={0} onClick={onClick}>
      {/* Languages pill */}
      <div className="mb-4">
        <Button
          variant="outline"
          // no onClick – used as a static pill
          className="bg-blue-50 select-none"
        >
          <span className="flex items-center gap-3">
            <span>{fromLang}</span>
            <ChevronRight className="h-4 w-4" />
            <span>{toLang}</span>
          </span>
        </Button>
      </div>

      {/* Translated text */}
      <div className="text-lg font-semibold text-gray-900">
        {translatedText}
      </div>

      {/* Divider */}
      <hr className="my-4 border-t border-gray-200" />

      {/* Source text */}
      <div className="text-gray-500">{sourceText}</div>
    </div>
  );
};

export default TranslationHistoryCard;
