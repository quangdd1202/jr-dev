'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import IceBreaker from '@/components/IceBreaker';
import SlideUp from '@/components/SlideUp';
import Recorder from '@/components/Recorder';
import TranslationHistoryCard from '@/components/TranslationHistoryCard';
import TranslationDetails from '@/components/TranslationDetails';
import { twclsx } from '@/utils/twclsx';
import SendIcon from '@/public/icons/send.svg';
import MicIcon from '@/public/icons/microphone.svg';
import ClockIcon from '@/public/icons/streamline-flex_time-lapse.svg';
import ChevronDownIcon from '@/public/icons/chevron-down.svg';
import PencilIcon from '@/public/icons/streamline_pencil.svg';
import CategoryIcon from '@/public/icons/category.svg';
import ShareIcon from '@/public/icons/streamline-flex_share-link.svg';
import RecycleBinIcon from '@/public/icons/streamline_recycle-bin-2.svg';
import BotIcon from '@/public/icons/bot.svg';

export default function NewChatPage() {
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
          <div className="hidden w-full items-center justify-between gap-4 lg:flex">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">New Chat</h2>
              <Button
                variant="plain"
                size="md"
                className="hover:bg-gray-50 active:bg-gray-200"
                leftIcon={<PencilIcon />}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="primary" size="md" leftIcon={<CategoryIcon />}>
                Plugins
              </Button>

              <Button
                variant="plain"
                size="md"
                className="hover:bg-gray-50 active:bg-gray-200"
                leftIcon={<ShareIcon />}
              />
              <Button
                variant="plain"
                size="md"
                className="hover:bg-gray-50 active:bg-gray-200"
                leftIcon={<RecycleBinIcon />}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-2 lg:hidden">
            <span className="rounded-full bg-blue-50 p-2 text-blue-500">
              <BotIcon />
            </span>
            <h2 className="text-base font-bold">JR TextBot</h2>
          </div>
        </div>

        <main className="relative h-full w-full flex-1 overflow-auto">
          <div className="h-full w-full">
            <div className="flex h-full flex-col overflow-hidden focus-visible:outline-0">
              <div className="relative flex grow basis-auto flex-col overflow-auto px-4 [scrollbar-gutter:stable_both-edges] min-[1650px]:pt-[68px]">
                {/* Heading */}
                <div className="mx-auto mt-20 mb-16 w-full max-w-3xl text-center">
                  <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
                    Ask everything you want!
                  </h1>
                </div>

                {/* Icebreakers */}
                <div className="mx-auto w-full max-w-[768px] grow">
                  <div className="space-y-3">
                    <IceBreaker
                      left={
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 10.0235C8.99968 9.42818 9.1315 8.84018 9.38596 8.30194C9.64041 7.7637 10.0112 7.28864 10.4714 6.91104C10.9317 6.53344 11.4701 6.26271 12.0477 6.11837C12.6253 5.97403 13.2277 5.95969 13.8115 6.07638C14.3951 6.19266 14.9457 6.43681 15.4237 6.79129C15.9017 7.14576 16.2952 7.60175 16.5759 8.12646C16.8566 8.65117 17.0176 9.23157 17.0472 9.82591C17.0768 10.4202 16.9743 11.0138 16.7472 11.5638C16.4424 12.2992 15.9263 12.9277 15.2642 13.3696C14.6021 13.8116 13.8237 14.0472 13.0276 14.0466V16.7293M13.023 21.9984C12.8706 21.9984 12.7244 21.9378 12.6166 21.83C12.5089 21.7222 12.4483 21.5761 12.4483 21.4236C12.4483 21.2712 12.5089 21.125 12.6166 21.0172C12.7244 20.9095 12.8706 20.8489 13.023 20.8489C13.1754 20.8489 13.3216 20.9095 13.4294 21.0172C13.5372 21.125 13.5977 21.2712 13.5977 21.4236C13.5977 21.5761 13.5372 21.7222 13.4294 21.83C13.3216 21.9378 13.1754 21.9984 13.023 21.9984Z"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    >
                      &#34;Industrial Revolution&#39;s impact on
                      geopolitics.&#34;
                    </IceBreaker>
                    <IceBreaker
                      left={
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.9318 18.2257C9.04806 20.1218 5.84685 20.7497 4 18.8536C6.46247 16.3049 4 15.0737 5.84685 13.2269C6.17114 12.8656 6.56568 12.5743 7.00637 12.3707C7.44706 12.1671 7.92463 12.0555 8.40991 12.0428C8.89519 12.03 9.37797 12.1163 9.82876 12.2964C10.2795 12.4766 10.6889 12.7467 11.0317 13.0904C11.3745 13.4341 11.6437 13.8441 11.8227 14.2953C12.0018 14.7465 12.0869 15.2295 12.0729 15.7148C12.059 16.2 11.9462 16.6773 11.7416 17.1175C11.5369 17.5577 11.2446 17.9515 10.8826 18.2749L10.9318 18.2257Z"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.16504 12.1015L15.6967 4.81753C16.6251 3.77344 18.3008 3.72173 19.2919 4.70672C20.2769 5.69786 20.2252 7.37357 19.1811 8.30192L11.9698 14.7597"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    >
                      &#34;Create an HD wallpaper cat licking paw images.&#34;
                    </IceBreaker>
                    <IceBreaker
                      left={
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.7692 16.0769L9.53846 19.1538M13.2308 16.0769L14.4615 19.1538M8.30769 19.1538H15.6923M19.3846 5H4.61538C4.45217 5 4.29565 5.06484 4.18024 5.18024C4.06483 5.29565 4 5.45217 4 5.61538V15.4615C4 15.6247 4.06483 15.7813 4.18024 15.8967C4.29565 16.0121 4.45217 16.0769 4.61538 16.0769H19.3846C19.5478 16.0769 19.7044 16.0121 19.8198 15.8967C19.9352 15.7813 20 15.6247 20 15.4615V5.61538C20 5.45217 19.9352 5.29565 19.8198 5.18024C19.7044 5.06484 19.5478 5 19.3846 5Z"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.92289 8.99998L6.76904 10.8461L8.6152 12.3846M15.3844 9.30767L17.2306 10.8461L15.0767 12.6923M11.0767 13.3077L12.9229 7.76921"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    >
                      &#34;HTTP request in JavaScript?&#34;
                    </IceBreaker>
                    <IceBreaker
                      left={
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5383 9.53846C17.5383 13.2308 11.9999 17.5385 11.9999 17.5385C11.9999 17.5385 6.46143 13.2308 6.46143 9.53846C6.46143 6.52185 8.98327 4 11.9999 4C15.0165 4 17.5383 6.52185 17.5383 9.53846Z"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.0178 15.6923H18.1538L20 20H4L5.84615 15.6923H6.98215M12 11.3846C12.4896 11.3846 12.9592 11.1901 13.3054 10.8439C13.6516 10.4977 13.8462 10.0281 13.8462 9.53848C13.8462 9.04885 13.6516 8.57927 13.3054 8.23305C12.9592 7.88683 12.4896 7.69233 12 7.69233C11.5104 7.69233 11.0408 7.88683 10.6946 8.23305C10.3484 8.57927 10.1538 9.04885 10.1538 9.53848C10.1538 10.0281 10.3484 10.4977 10.6946 10.8439C11.0408 11.1901 11.5104 11.3846 12 11.3846Z"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    >
                      &#34;Tell me about the history of the Eiffel Tower.&#34;
                    </IceBreaker>
                    <IceBreaker
                      left={
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.05543 20H13.9443M16.9999 9.57668C17.0066 8.58808 16.7505 7.61568 16.2581 6.76042C15.7656 5.90516 15.0548 5.19822 14.1995 4.71299C13.3441 4.22777 12.3753 3.98194 11.3938 4.00103C10.4122 4.02013 9.45359 4.30345 8.61746 4.82158C7.78134 5.33971 7.09819 6.07377 6.63892 6.94754C6.17965 7.82132 5.96101 8.80295 6.0057 9.79055C6.05039 10.7781 6.35678 11.7357 6.89307 12.5638C7.42935 13.3919 8.17597 14.0603 9.05543 14.4997V16.3459C9.05543 16.5091 9.11981 16.6656 9.23442 16.781C9.34902 16.8964 9.50446 16.9612 9.66654 16.9612H13.3332C13.4953 16.9612 13.6507 16.8964 13.7653 16.781C13.8799 16.6656 13.9443 16.5091 13.9443 16.3459V14.4997C14.8579 14.0465 15.6278 13.3456 16.1676 12.4759C16.7074 11.6063 16.9956 10.6022 16.9999 9.57668Z"
                            stroke="#72777A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    >
                      &#34;Write a short poem about the beauty of nature.&#34;
                    </IceBreaker>
                  </div>
                </div>
              </div>

              {/* Bottom composer */}
              <div className="relative z-10 flex w-full basis-auto flex-col gap-4 px-4">
                <div className="mx-auto flex w-full max-w-[768px] items-center justify-between gap-4">
                  <TextInput
                    leftIcon={
                      <Button
                        className="h-9 w-9 px-0 md:h-12 md:w-12"
                        variant="secondary"
                        aria-label="Open voice input"
                        onClick={() => setVoiceOpen(true)}
                      >
                        <MicIcon />
                      </Button>
                    }
                    placeholder="Create an HD wallpaper cat licking paw images"
                    className="h-10 text-sm md:h-14 md:text-base"
                    containerClassName="pl-0.5 md:pl-1 flex-1"
                    aria-label="message-input"
                  />

                  <Button
                    className="h-10 w-10 px-0 md:h-14 md:w-14"
                    variant="primary"
                  >
                    <SendIcon />
                  </Button>
                </div>

                {/* Disclaimer */}
                <div className="mx-auto mb-4 w-full max-w-[768px] text-center text-xs">
                  <p>
                    StormBot may produce inaccurate information about people,
                    places, or fact.{' '}
                    <Link href="#">
                      <b className="underline">Privacy Notice</b>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Voice input slide-up */}
      <SlideUp open={voiceOpen} onClose={() => setVoiceOpen(false)} fullScreen>
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
    </>
  );
}
