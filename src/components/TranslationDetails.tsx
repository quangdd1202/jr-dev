'use client';

import React from 'react';
import SlideUp from '@/components/SlideUp';
import Button from '@/components/Button';
import ChevronDownIcon from '@/public/icons/chevron-down.svg';
import { ChevronRight } from 'lucide-react';

export interface TranslationDetailsProps {
  open: boolean;
  onClose: () => void;
  fromLang?: string | React.ReactNode;
  toLang?: string | React.ReactNode;
  sourceText?: string | React.ReactNode;
  translatedText?: string | React.ReactNode;
}

/**
 * TranslationDetails
 * Full-screen slide-up displaying original and translated texts with language pills.
 * NOTE: Keep styling identical to original inline implementation.
 */
const TranslationDetails: React.FC<TranslationDetailsProps> = ({
  open,
  onClose,
  fromLang = 'EN',
  toLang = 'JP',
  sourceText,
  translatedText,
}) => {
  return (
    <SlideUp open={open} onClose={onClose} fullScreen>
      <div className="mx-auto flex h-full max-w-[1440px] flex-col">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-blue-50">
              <span className="flex items-center gap-3 text-base font-bold">
                <span>{fromLang}</span>
                <ChevronRight className="h-4 w-4" />
                <span>{toLang}</span>
              </span>
            </Button>

            <Button variant="plain" leftIcon={<ChevronDownIcon />} />
          </div>

          <Button
            leftIcon={<ChevronDownIcon />}
            variant="plain"
            onClick={onClose}
          />

          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-blue-50">
              <span className="flex items-center gap-3 text-base font-bold">
                <span>{toLang}</span>
                <ChevronRight className="h-4 w-4" />
                <span>{fromLang}</span>
              </span>
            </Button>

            <Button variant="plain" leftIcon={<ChevronDownIcon />} />
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-stretch gap-6 p-6 md:flex-row md:items-start">
          {/* Left: Original input */}
          <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3 text-base font-semibold">
              Original input text
            </div>
            <div className="flex-1 overflow-auto p-6 whitespace-pre-wrap text-gray-900">
              {sourceText}
            </div>
          </div>

          {/* Right: Translated text */}
          <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-blue-50 px-4 py-3 text-base font-semibold">
              Translated text
            </div>
            <div className="flex-1 overflow-auto p-6 whitespace-pre-wrap text-gray-900">
              {translatedText}
            </div>
          </div>

          {/* Center swap button (decorative) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-14">
            <Button
              variant="primary"
              className="h-20 w-20 rotate-90 md:rotate-0"
              leftIcon={
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6.85714H22.2857M1.71423 17.1429H4.28566C5.08407 17.1429 21 17.1429 22.2857 17.1429"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.8569 3.42857C20.1426 3.42857 21.8569 5.14286 22.2855 6.85714C21.8569 8.57143 20.1426 10.2857 18.8569 10.2857"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.42871 13.2857C3.143 13.2857 1.42871 15 1.00014 16.7143C1.42871 18.4286 3.143 20.1429 4.42871 20.1429"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default TranslationDetails;
