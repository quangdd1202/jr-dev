'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { twclsx } from '@/utils/twclsx';

import type { ReactNode } from 'react';

export interface SlideUpProps {
  open: boolean;
  children?: ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  /** When true, the sheet covers the full screen. Default: false */
  fullScreen?: boolean;
  className?: string;
}

/**
 * SlideUp (Bottom Sheet)
 * - Reuses the same interaction model as Popup but anchored to the bottom.
 * - Supports optional fullscreen mode via `fullScreen` prop.
 * - Minimal animation on mount.
 */
export const SlideUp: React.FC<SlideUpProps> = ({
  open,
  children,
  onClose,
  closeOnOverlayClick = true,
  fullScreen = false,
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => onClose?.(), [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  // Focus when opened
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => dialogRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      aria-hidden={!open}
      data-testid="slideup-root"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        role="button"
        tabIndex={-1}
        aria-label="Close"
        onMouseDown={() => {
          if (closeOnOverlayClick) handleClose();
        }}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
        tabIndex={-1}
        className={twclsx(
          fullScreen
            ? [
                // fullscreen sheet covers the whole viewport
                'absolute inset-0 h-full w-full',
                'rounded-none border-0 bg-white shadow-none',
                'animate-[slideUpFull_180ms_ease-out]',
              ]
            : [
                // bottom sheet
                'absolute inset-x-0 bottom-0 max-h-[85vh] w-full',
                'rounded-t-2xl border-x border-t border-gray-200 bg-white shadow-[0_-6px_20px_-8px_rgba(0,0,0,0.25)]',
                'animate-[slideUp_180ms_ease-out]',
              ],
          // ensure internal content can scroll
          'min-h-0 overflow-y-auto focus:outline-none',
          className,
        )}
      >
        {children}
      </div>

      {/* Keyframes for slide-up */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
        @keyframes slideUpFull {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default SlideUp;
