'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import PlayIcon from '@/public/icons/streamline-flex_play-list-4-remix.svg';
import PauseIcon from '@/public/icons/streamline-flex_button-pause-circle-remix.svg';
import RotateIcon from '@/public/icons/streamline-flex_rotate-right-circle.svg';
import ShareIcon from '@/public/icons/streamline-flex_share-link.svg';
import { twclsx } from '@/utils/twclsx';

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordDone, setRecordDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-12 p-6">
      {/* Mic button with pulse */}
      <div className="flex h-52 w-52 items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (isRecording) {
              setIsRecording(false);
              setRecordDone(true);
            } else {
              setIsRecording(true);
              setRecordDone(false);
            }
          }}
          className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white"
        >
          <motion.div
            className={twclsx(
              'absolute h-52 w-52 rounded-full border-4 border-transparent',
              isRecording ? 'border-blue-500' : '',
            )}
            animate={
              isRecording ? { scale: [1, 1.1, 1], opacity: [1, 0.5, 1] } : {}
            }
            transition={{ repeat: Infinity, duration: 1.5 }}
          />

          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.3501 9.65V11.35C4.3501 15.57 7.7801 19 12.0001 19C16.2201 19 19.6501 15.57 19.6501 11.35V9.65"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.6099 6.43C11.5099 6.1 12.4899 6.1 13.3899 6.43"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.2002 8.55C11.7302 8.41 12.2802 8.41 12.8102 8.55"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 19V22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {recordDone ? (
        <div className="flex flex-col items-center gap-6">
          <p className="font-bold">Translated result</p>

          {/* Fake playback bar */}
          <div className="flex h-20 w-full items-center gap-3 rounded-3xl px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.1)] md:gap-8">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="primary"
              leftIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
            />

            {/* Fake waveform (pulsing bars) */}
            <div className="flex flex-1 items-center justify-evenly gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={twclsx(
                    'h-1 w-1 rounded md:w-2',
                    isPlaying ? 'bg-blue-500' : 'bg-gray-300',
                  )}
                  animate={{
                    height: isPlaying ? [10, Math.random() * 40 + 10, 10] : 10,
                  }}
                  transition={
                    isPlaying
                      ? {
                          repeat: Infinity,
                          duration: 0.5 + Math.random(),
                          ease: 'easeInOut',
                        }
                      : {}
                  }
                />
              ))}
            </div>

            <span className="text-base font-semibold text-gray-900">
              00:05:00
            </span>

            <Button variant="primary" leftIcon={<RotateIcon />} />

            <div className="h-10 w-0.5 bg-gray-200 py-2"></div>

            <Button variant="primary" leftIcon={<ShareIcon />} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
