'use client';

import React, { useCallback, useEffect, useId, useRef } from 'react';
import { twclsx } from '@/utils/twclsx';
import Button from './Button';

import type { ReactNode } from 'react';

export type PopupAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export interface PopupProps {
  /** Controls visibility of the popup */
  open: boolean;
  /** Optional popup title shown in the header */
  title?: ReactNode;
  /** Optional content of the popup */
  children?: ReactNode;
  /** Primary button configuration (rightmost button) */
  primaryButton?: PopupAction;
  /** Secondary button configuration (left of primary) */
  secondaryButton?: PopupAction;
  /** Called when user closes the popup using X button, clicking the overlay, or pressing Escape. */
  onPopupClose?: () => void;
  /** When true, clicking the dark overlay closes the popup (default: true). */
  closeOnOverlayClick?: boolean;
  /** Optional className for the dialog container */
  className?: string;
}

/**
 * Popup (Modal) component
 * - Renders a centered dialog over a dimmed backdrop.
 * - Supports optional title, content (children), and action buttons.
 * - Triggers `onPopupClose` when closed via X, overlay click, or Escape.
 */
export const Popup: React.FC<PopupProps> = ({
  open,
  title,
  children,
  primaryButton,
  secondaryButton,
  onPopupClose,
  closeOnOverlayClick = true,
  className,
}) => {
  const labelledById = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    onPopupClose?.();
  }, [onPopupClose]);

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

  // Move focus into dialog when opened
  useEffect(() => {
    if (open) {
      // Use a setTimeout to ensure element is present in DOM
      const id = window.setTimeout(() => dialogRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      aria-hidden={!open}
      data-testid="popup-root"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        role="button"
        tabIndex={-1}
        aria-label="Close popup"
        onMouseDown={() => {
          if (closeOnOverlayClick) handleClose();
        }}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? labelledById : undefined}
        ref={dialogRef}
        tabIndex={-1}
        className={twclsx(
          'absolute top-1/2 left-1/2 w-[min(95vw,700px)] -translate-x-1/2 -translate-y-1/2',
          'rounded-xl border border-gray-200 bg-white shadow-xl',
          'focus:outline-none',
          className,
        )}
      >
        {/* Header */}
        {(title || onPopupClose) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-3">
            {title ? (
              <h2
                id={labelledById}
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </h2>
            ) : (
              <span />
            )}
            <Button
              variant="plain"
              size="md"
              className="text-gray-500 hover:bg-gray-50 active:bg-gray-200"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              onClick={handleClose}
            />
          </div>
        )}

        {/* Body */}
        {children && <div className="px-6 py-3">{children}</div>}

        {/* Footer */}
        {(primaryButton || secondaryButton) && (
          <div className="flex justify-end gap-3 px-6 pt-3 pb-6">
            {secondaryButton && (
              <Button
                variant="outline"
                onClick={secondaryButton.onClick}
                disabled={secondaryButton.disabled}
                className="px-6 text-base"
              >
                {secondaryButton.label}
              </Button>
            )}
            {primaryButton && (
              <Button
                variant="primary"
                onClick={primaryButton.onClick}
                disabled={primaryButton.disabled}
                className="px-6 text-base"
              >
                {primaryButton.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
