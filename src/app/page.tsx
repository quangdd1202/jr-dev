'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import IceBreaker from '@/components/IceBreaker';
import ChatHistoryItem from '@/components/ChatHistoryItem';
import MagnifierIcon from '@/public/icons/streamline-flex_magnifying-glass.svg';
import PlusIcon from '@/public/icons/streamline-flex_hospital-sign.svg';
import SendIcon from '@/public/icons/send.svg';
import MicIcon from '@/public/icons/microphone.svg';
import UserIcon from '@/public/icons/streamline_user-multiple-group.svg';
import Link from 'next/link';
import SlideUp from '@/components/SlideUp';
import Recorder from '@/components/Recorder';
import ClockIcon from '@/public/icons/streamline-flex_time-lapse.svg';
import ChevronDownIcon from '@/public/icons/chevron-down.svg';
import TranslationHistoryCard from '@/components/TranslationHistoryCard';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const [voiceOpen, setVoiceOpen] = useState(false);
  return (
    <>
      {/* Sidebar */}
      <div className="relative z-21 h-full w-[297px] shrink-0 overflow-hidden bg-[#FBFBFB] max-md:hidden">
        <div className="relative flex h-full flex-col">
          <div className="h-full w-full overflow-x-clip overflow-y-auto text-clip whitespace-nowrap opacity-100">
            <nav className="relative flex h-full w-full flex-1 flex-col overflow-y-auto transition-opacity [scrollbar-gutter:stable_both-edges]">
              <div className="sticky top-0 z-30 bg-[#FBFBFB] px-2 pb-10">
                <div className="flex h-[68px] items-center justify-between border-b border-gray-100">
                  <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={128} height={32} />
                  </Link>

                  <Button
                    size="sm"
                    aria-label="Search"
                    className="hover:bg-gray-50 active:bg-gray-200"
                    variant="plain"
                    leftIcon={<MagnifierIcon />}
                  />
                </div>

                <Button
                  variant="primary"
                  className="mt-4 w-full text-base font-bold"
                  leftIcon={<PlusIcon />}
                >
                  New chat
                </Button>
              </div>

              <div className="px-2">
                {/* Today */}
                <div className="mt-4">
                  <div className="px-2 pb-2 text-base font-bold">Today</div>
                  <div className="flex flex-col gap-4">
                    <ChatHistoryItem label="Helpful AI Ready" href="/c/1" />
                    <ChatHistoryItem label="Greenhouse Effect Expla..." />
                    <ChatHistoryItem label="Movie Streaming Help" />
                  </div>
                </div>

                {/* Previous 7 days */}
                <div className="mt-6">
                  <div className="px-2 pb-2 text-base font-bold">
                    Previous 7 days
                  </div>
                  <div className="flex flex-col gap-4">
                    <ChatHistoryItem label="Web Design Workflow" />
                    <ChatHistoryItem label="Photo generation" />
                    <ChatHistoryItem label="Cats eat grass" />
                    <ChatHistoryItem label="Weather Dynamics" active />
                  </div>
                </div>
              </div>

              <div className="grow px-2"></div>

              <div className="bg-token-bg-elevated-secondary sticky bottom-0 z-30 px-2 py-1.5 empty:hidden">
                <div className="flex flex-col items-start gap-y-2.5 rounded-2xl bg-white px-2 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white">
                      <UserIcon />
                    </span>
                    <div>
                      <div className="text-base font-semibold">Emily</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-full font-bold whitespace-nowrap"
                    rightIcon={
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.75 13.5L11.25 9L6.75 4.5"
                          stroke="#0070F0"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  >
                    Upgrade to pro
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative flex min-w-0 flex-1 flex-col">
        {/* Heading */}
        <div className="mx-auto mt-20 mb-16 w-full max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Ask everything you want!
          </h1>
        </div>

        {/* Icebreakers */}
        <div className="mx-auto w-full max-w-[768px] space-y-3">
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
            &#34;Industrial Revolution&#39;s impact on geopolitics.&#34;
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

        {/* Bottom composer */}
        <div className="mx-auto mt-auto flex w-full max-w-[768px] gap-4 pt-12 pb-4">
          <TextInput
            leftIcon={
              <Button
                className="h-12 w-12 px-0"
                variant="secondary"
                aria-label="Open voice input"
                onClick={() => setVoiceOpen(true)}
              >
                <MicIcon />
              </Button>
            }
            placeholder="Create an HD wallpaper cat licking paw images"
            containerClassName="pl-1 flex-1"
            aria-label="message-input"
          />

          <Button className="h-14 w-14 px-0" variant="primary">
            <SendIcon />
          </Button>
        </div>

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

            <div className="grow overflow-auto">
              <div className="grow">
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
                  />

                  <TranslationHistoryCard
                    fromLang="EN"
                    toLang="JP"
                    sourceText="こんにちは、初めまして"
                    translatedText="Hello, nice to meet you"
                    className="grow cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                  />

                  <TranslationHistoryCard
                    fromLang="EN"
                    toLang="JP"
                    sourceText="こんにちは、初めまして"
                    translatedText="Hello, nice to meet you"
                    className="grow cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </SlideUp>

        {/* Disclaimer */}
        <div className="mx-auto mb-4 w-full max-w-[768px] text-center text-xs">
          <p>
            StormBot may produce inaccurate information about people, places, or
            fact. {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
              <b className="underline">Privacy Notice</b>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
