'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import ChatHistoryItem from '@/components/ChatHistoryItem';
import ConversationChatItem from '@/components/ConversationChatItem';
import MagnifierIcon from '@/public/icons/streamline-flex_magnifying-glass.svg';
import PlusIcon from '@/public/icons/streamline-flex_hospital-sign.svg';
import SendIcon from '@/public/icons/send.svg';
import MicIcon from '@/public/icons/microphone.svg';
import UserIcon from '@/public/icons/streamline_user-multiple-group.svg';
import Link from 'next/link';
import { twclsx } from '@/utils/twclsx';
import PencilIcon from '@/public/icons/streamline_pencil.svg';
import CategoryIcon from '@/public/icons/category.svg';
import ShareIcon from '@/public/icons/streamline-flex_share-link.svg';
import RecycleBinIcon from '@/public/icons/streamline_recycle-bin-2.svg';
import ChevronUpIcon from '@/public/icons/line-md_chevron-up.svg';
import ChevronDownIcon from '@/public/icons/chevron-down.svg';
import ReloadIcon from '@/public/icons/streamline_arrow-reload-horizontal-2.svg';
import Popup from '@/components/Popup';

const SuggestedPrompts: React.FC = () => {
  const [open, setOpen] = useState(true);
  const prompts = [
    'Show me the temperature today',
    'Why does it rain',
    'Do you feel different because of weather',
    'What kind of clouds are there',
    'What is the weather forecast for the next five days in my area, including high and low temperatures',
  ];

  return (
    <div className="my-6">
      {/* Toggle */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="suggested-prompts"
      >
        {open ? (
          <>
            <span>Hide Prompts</span>
            <ChevronUpIcon />
          </>
        ) : (
          <>
            <span>Show Prompts</span>
            <ChevronDownIcon />
          </>
        )}
      </button>

      {/* Chips */}
      {open && (
        <>
          <div id="suggested-prompts" className="my-3 flex flex-wrap gap-3">
            {prompts.map((p) => (
              <Button
                key={p}
                size="md"
                variant="outline"
                className="border-gray-400 break-words whitespace-normal text-gray-500 hover:bg-gray-200 active:bg-gray-200"
              >
                {p}
              </Button>
            ))}
          </div>

          {/* Regenerate */}
          <div className="mt-3">
            <Button size="md" variant="primary" leftIcon={<ReloadIcon />}>
              Regenerate
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default function Home({ params }: { params: { slug: string } }) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [reasonClarity, setReasonClarity] = useState(false);
  const [reasonNotHelpful, setReasonNotHelpful] = useState(false);
  const [reasonNotUnsafe, setReasonNotUnsafe] = useState(false);

  const onClickDislike = () => {
    setIsFeedbackOpen(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
  };

  const handleCreateFeedback = () => {
    // For now just log the feedback and close the popup.
    // This can be replaced with an API call in the future.
    console.log('Feedback submitted', {
      feedbackText,
      reasons: {
        lackOfClarity: reasonClarity,
        notHelpful: reasonNotHelpful,
        notUnsafe: reasonNotUnsafe,
      },
      slug: params.slug,
    });
    setIsFeedbackOpen(false);
  };

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
      <div className="relative flex h-full max-w-full flex-1 flex-col">
        {/* Header */}
        <div
          className={twclsx(
            'start-0 end-0 top-0 z-20 flex h-[68px] items-center justify-between border-b border-gray-100 bg-white px-6 py-3.5',
            'min-[1650px]:absolute min-[1650px]:border-transparent min-[1650px]:bg-transparent',
          )}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Weather Dynamics</h2>
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

        <main className="relative h-full w-full flex-1 overflow-auto">
          <div className="h-full w-full">
            <div className="flex h-full flex-col overflow-hidden focus-visible:outline-0">
              {/* Chat Items */}
              <div className="relative flex grow basis-auto flex-col overflow-auto px-4 [scrollbar-gutter:stable_both-edges] min-[1650px]:pt-[68px]">
                <div className="mx-auto w-full max-w-[768px]">
                  <div className="space-y-3">
                    <ConversationChatItem sender="user">
                      Why does the weather not just stay the same?
                    </ConversationChatItem>

                    <ConversationChatItem
                      sender="assistant"
                      onDislike={onClickDislike}
                    >
                      The two main reasons why the weather does not stay the
                      same are: Atmospheric Dynamics: The Earth&apos;s
                      atmosphere is constantly in motion due to various factors
                      like air circulation, pressure systems, and the
                      interaction of different air masses. These dynamic
                      processes lead to continuous changes in weather patterns
                      as air masses move, mix, and create variations in
                      temperature, pressure, and humidity. Solar Influence: The
                      Sun is the primary driver of weather patterns on Earth.
                      Solar radiation heats the Earth unevenly due to its
                      curvature and axial tilt, leading to temperature gradients
                      across different regions. This differential heating causes
                      air to rise, creating low-pressure areas, and air to sink,
                      forming high-pressure areas, which influence the movement
                      of air masses and weather patterns.
                    </ConversationChatItem>

                    <ConversationChatItem
                      sender="assistant"
                      onDislike={onClickDislike}
                    >
                      The two main reasons why the weather does not stay the
                      same are: Atmospheric Dynamics: The Earth&apos;s
                      atmosphere is constantly in motion due to various factors
                      like air circulation, pressure systems, and the
                      interaction of different air masses. These dynamic
                      processes lead to continuous changes in weather patterns
                      as air masses move, mix, and create variations in
                      temperature, pressure, and humidity. Solar Influence: The
                      Sun is the primary driver of weather patterns on Earth.
                      Solar radiation heats the Earth unevenly due to its
                      curvature and axial tilt, leading to temperature gradients
                      across different regions. This differential heating causes
                      air to rise, creating low-pressure areas, and air to sink,
                      forming high-pressure areas, which influence the movement
                      of air masses and weather patterns.
                    </ConversationChatItem>

                    <ConversationChatItem
                      sender="assistant"
                      onDislike={onClickDislike}
                    >
                      The two main reasons why the weather does not stay the
                      same are: Atmospheric Dynamics: The Earth&apos;s
                      atmosphere is constantly in motion due to various factors
                      like air circulation, pressure systems, and the
                      interaction of different air masses. These dynamic
                      processes lead to continuous changes in weather patterns
                      as air masses move, mix, and create variations in
                      temperature, pressure, and humidity. Solar Influence: The
                      Sun is the primary driver of weather patterns on Earth.
                      Solar radiation heats the Earth unevenly due to its
                      curvature and axial tilt, leading to temperature gradients
                      across different regions. This differential heating causes
                      air to rise, creating low-pressure areas, and air to sink,
                      forming high-pressure areas, which influence the movement
                      of air masses and weather patterns.
                    </ConversationChatItem>

                    <ConversationChatItem
                      sender="assistant"
                      onDislike={onClickDislike}
                    >
                      The two main reasons why the weather does not stay the
                      same are: Atmospheric Dynamics: The Earth&apos;s
                      atmosphere is constantly in motion due to various factors
                      like air circulation, pressure systems, and the
                      interaction of different air masses. These dynamic
                      processes lead to continuous changes in weather patterns
                      as air masses move, mix, and create variations in
                      temperature, pressure, and humidity. Solar Influence: The
                      Sun is the primary driver of weather patterns on Earth.
                      Solar radiation heats the Earth unevenly due to its
                      curvature and axial tilt, leading to temperature gradients
                      across different regions. This differential heating causes
                      air to rise, creating low-pressure areas, and air to sink,
                      forming high-pressure areas, which influence the movement
                      of air masses and weather patterns.
                    </ConversationChatItem>

                    <ConversationChatItem
                      sender="assistant"
                      onDislike={onClickDislike}
                    >
                      The two main reasons why the weather does not stay the
                      same are: Atmospheric Dynamics: The Earth&apos;s
                      atmosphere is constantly in motion due to various factors
                      like air circulation, pressure systems, and the
                      interaction of different air masses. These dynamic
                      processes lead to continuous changes in weather patterns
                      as air masses move, mix, and create variations in
                      temperature, pressure, and humidity. Solar Influence: The
                      Sun is the primary driver of weather patterns on Earth.
                      Solar radiation heats the Earth unevenly due to its
                      curvature and axial tilt, leading to temperature gradients
                      across different regions. This differential heating causes
                      air to rise, creating low-pressure areas, and air to sink,
                      forming high-pressure areas, which influence the movement
                      of air masses and weather patterns.
                    </ConversationChatItem>
                  </div>

                  {/* Suggested Prompts */}
                  <SuggestedPrompts />
                </div>
              </div>

              <div className="relative z-10 flex w-full basis-auto flex-col gap-4 px-4">
                {/* Bottom composer */}
                <div className="mx-auto flex w-full max-w-[768px] gap-4">
                  <TextInput
                    leftIcon={
                      <Button className="h-12 w-12 px-0" variant="secondary">
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

                {/* Disclaimer */}
                <div className="mx-auto mb-4 w-full max-w-[768px] text-center text-xs">
                  <p>
                    StormBot may produce inaccurate information about people,
                    places, or fact.{' '}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                      <b className="underline">Privacy Notice</b>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Feedback Popup */}
      <Popup
        open={isFeedbackOpen}
        title={
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              Assist me in improving my answer
            </span>
          </div>
        }
        onPopupClose={handleCloseFeedback}
        primaryButton={{ label: 'Create', onClick: handleCreateFeedback }}
        secondaryButton={{ label: 'Cancel', onClick: handleCloseFeedback }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="feedback-text" className="sr-only">
              What would the ideal answer have been?
            </label>
            <textarea
              id="feedback-text"
              className="block min-h-[140px] w-full resize-y rounded-lg border border-gray-300 px-6 py-4 text-base placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="What would the ideal answer have been?"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-800">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={reasonClarity}
                onChange={(e) => setReasonClarity(e.target.checked)}
              />
              <span>Lack of clarity</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={reasonNotHelpful}
                onChange={(e) => setReasonNotHelpful(e.target.checked)}
              />
              <span>This is not helpful</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={reasonNotUnsafe}
                onChange={(e) => setReasonNotUnsafe(e.target.checked)}
              />
              <span>This is not unsafe</span>
            </label>
          </div>
        </div>
      </Popup>
    </>
  );
}
