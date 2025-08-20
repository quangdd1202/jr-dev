'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import ConversationChatItem from '@/components/ConversationChatItem';
import Popup from '@/components/Popup';
import SlideUp from '@/components/SlideUp';
import Recorder from '@/components/Recorder';
import TranslationHistoryCard from '@/components/TranslationHistoryCard';
import TranslationDetails from '@/components/TranslationDetails';
import { twclsx } from '@/utils/twclsx';
import {
  fetchConversationBySlug,
  type Conversation,
} from '@/mocks/conversations';
import SendIcon from '@/public/icons/send.svg';
import MicIcon from '@/public/icons/microphone.svg';
import PencilIcon from '@/public/icons/streamline_pencil.svg';
import CategoryIcon from '@/public/icons/category.svg';
import ShareIcon from '@/public/icons/streamline-flex_share-link.svg';
import RecycleBinIcon from '@/public/icons/streamline_recycle-bin-2.svg';
import ChevronUpIcon from '@/public/icons/line-md_chevron-up.svg';
import ChevronDownIcon from '@/public/icons/chevron-down.svg';
import ReloadIcon from '@/public/icons/streamline_arrow-reload-horizontal-2.svg';
import BotIcon from '@/public/icons/bot.svg';
import ClockIcon from '@/public/icons/streamline-flex_time-lapse.svg';

// Timestamp helpers for chat
function formatTimestampLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffMs = todayStart.getTime() - targetStart.getTime();
  const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000));

  if (diffDays === 0) return `${time} Today`;
  if (diffDays === 1) return `${time} Yesterday`;

  const datePart = d.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() === now.getFullYear() ? undefined : 'numeric',
  });
  return `${time} ${datePart}`;
}

const TimestampChip: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex w-full justify-center py-1.5">
    <span className="rounded-full bg-gray-300 px-3 py-0.5 text-xs font-medium text-white">
      {label}
    </span>
  </div>
);

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

export default function ChatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchConversationBySlug(slug);
        if (mounted) {
          setConversation(data);
        }
      } catch (error) {
        if (mounted && error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [reasonClarity, setReasonClarity] = useState(false);
  const [reasonNotHelpful, setReasonNotHelpful] = useState(false);
  const [reasonNotUnsafe, setReasonNotUnsafe] = useState(false);

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
      slug,
    });
    setIsFeedbackOpen(false);
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
              <h2 className="text-2xl font-bold">
                {conversation?.title || 'Loading'}
              </h2>
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

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 lg:hidden"
          >
            <span className="rounded-full bg-blue-50 p-2 text-blue-500">
              <BotIcon />
            </span>
            <h2 className="text-base font-bold">JR TextBot</h2>
          </Link>
        </div>

        <main className="relative h-full w-full flex-1 overflow-auto">
          <div className="h-full w-full">
            <div className="flex h-full flex-col overflow-hidden focus-visible:outline-0">
              {/* Chat Items */}
              <div className="relative flex grow basis-auto flex-col overflow-auto px-4 [scrollbar-gutter:stable_both-edges] min-[1650px]:pt-[68px]">
                <div className="mx-auto w-full max-w-[768px]">
                  <div className="space-y-3">
                    {loading && (
                      <div className="text-sm text-gray-500">
                        Loading chat history...
                      </div>
                    )}
                    {error && (
                      <div className="text-sm text-red-600">{error}</div>
                    )}
                    {!loading && !error && conversation && (
                      <>
                        {conversation.messages.map((m, index) => {
                          const prev = conversation.messages[index - 1];

                          const isNewDay = (() => {
                            if (!prev) return true; // show before first message
                            const d1 = new Date(prev.createdAt);
                            const d2 = new Date(m.createdAt);
                            return (
                              d1.getFullYear() !== d2.getFullYear() ||
                              d1.getMonth() !== d2.getMonth() ||
                              d1.getDate() !== d2.getDate()
                            );
                          })();

                          const label = formatTimestampLabel(m.createdAt);

                          return (
                            <React.Fragment key={m.id}>
                              {isNewDay && <TimestampChip label={label} />}
                              <ConversationChatItem
                                sender={m.sender}
                                onDislike={
                                  m.sender === 'assistant'
                                    ? onClickDislike
                                    : undefined
                                }
                              >
                                {m.content}
                              </ConversationChatItem>
                            </React.Fragment>
                          );
                        })}
                      </>
                    )}
                  </div>

                  {/* Suggested Prompts */}
                  <SuggestedPrompts />
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
