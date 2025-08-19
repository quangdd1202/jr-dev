'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import SlideUp from '@/components/SlideUp';
import Recorder from '@/components/Recorder';
import TranslationHistoryCard from '@/components/TranslationHistoryCard';
import TranslationDetails from '@/components/TranslationDetails';
import { twclsx } from '@/utils/twclsx';
import ClockIcon from '@/public/icons/streamline-flex_time-lapse.svg';
import ChevronDownIcon from '@/public/icons/chevron-down.svg';
import CategoryIcon from '@/public/icons/category.svg';
import NotificationIcon from '@/public/icons/notification.svg';

export default function Home() {
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState<{
    fromLang: string;
    toLang: string;
    sourceText: string;
    translatedText: string;
  } | null>(null);

  const openTranslationDetails = (data: {
    fromLang: string;
    toLang: string;
    sourceText: string;
    translatedText: string;
  }) => {
    setSelectedTranslation(data);
    setDetailsOpen(true);
  };
  return (
    <>
      {/* Main Content */}
      <div className="relative flex h-full max-w-full flex-1 flex-col">
        {/* Header */}
        <div
          className={twclsx(
            'start-0 end-0 top-0 z-20 flex h-[68px] items-center justify-between border-b border-gray-100 bg-white px-6 py-3.5',
            'min-[1650px]:absolute min-[1650px]:border-transparent min-[1650px]:bg-transparent',
          )}
        >
          <div className="flex items-center">
            <Button
              variant="outline"
              size="md"
              className="border-gray-300 text-gray-500 hover:bg-gray-50 active:bg-gray-200"
              leftIcon={<CategoryIcon />}
            />
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="md"
              className="border-gray-300 text-gray-500 hover:bg-gray-50 active:bg-gray-200"
              leftIcon={<NotificationIcon />}
            />
          </div>
        </div>

        <main className="relative h-full w-full flex-1 overflow-auto">
          <div className="h-full w-full">
            <div className="flex h-full flex-col overflow-hidden focus-visible:outline-0">
              <div className="relative flex grow basis-auto flex-col overflow-auto px-4 [scrollbar-gutter:stable_both-edges] min-[1650px]:pt-[68px]">
                <h2 className="px-2 py-6 text-2xl font-bold lg:text-3xl">
                  Home
                </h2>
                <div className="mx-auto w-full max-w-[768px] grow">
                  <div className="flex h-full flex-col items-center gap-6 px-10 lg:justify-center">
                    <Link href="/c/new">
                      <Button
                        variant="plain"
                        className="px-12 py-8 text-base text-black shadow-[0_0_20px_rgba(0,0,0,0.1)] lg:text-2xl"
                      >
                        Chat with my TextBot
                      </Button>
                    </Link>

                    <Button
                      variant="plain"
                      className="px-12 py-8 text-base text-black shadow-[0_0_20px_rgba(0,0,0,0.1)] lg:text-2xl"
                      onClick={() => setVoiceOpen(true)}
                    >
                      Chat with my VoiceBot
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Voice input slide-up */}
        <SlideUp
          open={voiceOpen}
          onClose={() => setVoiceOpen(false)}
          fullScreen
        >
          <div className="mx-auto flex h-full max-w-[1440px] flex-col">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="bg-blue-50">
                  <span className="flex items-center gap-3 text-base font-bold">
                    <span>EN</span>
                    <ChevronRight className="h-4 w-4" />
                    <span>JP</span>
                  </span>
                </Button>

                <Button variant="plain" leftIcon={<ChevronDownIcon />} />
              </div>

              <Button
                leftIcon={<ChevronDownIcon />}
                variant="plain"
                onClick={() => setVoiceOpen(false)}
              />

              <div className="flex items-center gap-2">
                <Button variant="outline" className="bg-blue-50">
                  <span className="flex items-center gap-3 text-base font-bold">
                    <span>JP</span>
                    <ChevronRight className="h-4 w-4" />
                    <span>EN</span>
                  </span>
                </Button>

                <Button variant="plain" leftIcon={<ChevronDownIcon />} />
              </div>
            </div>

            <div className="flex grow flex-col overflow-auto">
              <div className="flex grow flex-col items-center justify-center">
                <Recorder />
              </div>

              <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ClockIcon />
                    <p className="text-2xl font-bold">Translation history</p>
                  </div>

                  <Button
                    variant="outline"
                    className="border-gray-400 bg-gray-50 text-gray-500 hover:bg-gray-100 active:bg-gray-200"
                  >
                    View All
                  </Button>
                </div>

                <div className="jsutify-between flex w-full flex-wrap gap-4">
                  <TranslationHistoryCard
                    fromLang="EN"
                    toLang="JP"
                    sourceText="こんにちは、初めまして"
                    translatedText="Hello, nice to meet you"
                    className="grow cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                    onClick={() =>
                      openTranslationDetails({
                        fromLang: 'EN',
                        toLang: 'JP',
                        sourceText: 'こんにちは、初めまして',
                        translatedText: 'Hello, nice to meet you',
                      })
                    }
                  />

                  <TranslationHistoryCard
                    fromLang="EN"
                    toLang="JP"
                    sourceText="こんにちは、初めまして"
                    translatedText="Hello, nice to meet you"
                    className="grow cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                    onClick={() =>
                      openTranslationDetails({
                        fromLang: 'EN',
                        toLang: 'JP',
                        sourceText: 'こんにちは、初めまして',
                        translatedText: 'Hello, nice to meet you',
                      })
                    }
                  />

                  <TranslationHistoryCard
                    fromLang="EN"
                    toLang="JP"
                    sourceText="こんにちは、初めまして"
                    translatedText="Hello, nice to meet you"
                    className="grow cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                    onClick={() =>
                      openTranslationDetails({
                        fromLang: 'EN',
                        toLang: 'JP',
                        sourceText: 'こんにちは、初めまして',
                        translatedText: 'Hello, nice to meet you',
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </SlideUp>

        {/* Translation Details (on card click) */}
        <TranslationDetails
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          fromLang={selectedTranslation?.fromLang}
          toLang={selectedTranslation?.toLang}
          sourceText={selectedTranslation?.sourceText}
          translatedText={selectedTranslation?.translatedText}
        />
      </div>
    </>
  );
}
