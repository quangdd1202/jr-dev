import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const twclsx = (...args: ClassValue[]) => twMerge(clsx(...args));
