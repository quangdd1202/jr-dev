import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import SidebarHistory from '@/components/SidebarHistory';
import MagnifierIcon from '@/public/icons/streamline-flex_magnifying-glass.svg';
import PlusIcon from '@/public/icons/streamline-flex_hospital-sign.svg';
import UserIcon from '@/public/icons/streamline_user-multiple-group.svg';
import { SpeedInsights } from '@vercel/speed-insights/next';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JR Dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${openSans.variable} h-full w-full antialiased`}>
        <div className="flex h-full w-full flex-col">
          <div className="relative z-0 flex h-full w-full flex-1 transition-colors">
            <div className="relative flex h-full w-full flex-row">
              {/* Sidebar */}
              <div className="relative z-21 h-full w-[297px] shrink-0 overflow-hidden bg-[#FBFBFB] max-md:hidden">
                <div className="relative flex h-full flex-col">
                  <div className="h-full w-full overflow-x-clip overflow-y-auto text-clip whitespace-nowrap opacity-100">
                    <nav className="relative flex h-full w-full flex-1 flex-col overflow-y-auto transition-opacity [scrollbar-gutter:stable_both-edges]">
                      <div className="sticky top-0 z-30 bg-[#FBFBFB] px-2 pb-10">
                        <div className="flex h-[68px] items-center justify-between border-b border-gray-100">
                          <Link href="/">
                            <Image
                              src="/logo.svg"
                              alt="logo"
                              width={128}
                              height={32}
                            />
                          </Link>

                          <Button
                            size="sm"
                            aria-label="Search"
                            className="hover:bg-gray-50 active:bg-gray-200"
                            variant="plain"
                            leftIcon={<MagnifierIcon />}
                          />
                        </div>

                        <Link href="/c/new">
                          <Button
                            variant="primary"
                            className="mt-4 w-full text-base font-bold"
                            leftIcon={<PlusIcon />}
                          >
                            New chat
                          </Button>
                        </Link>
                      </div>

                      <SidebarHistory />

                      <div className="grow px-2"></div>

                      <div className="bg-token-bg-elevated-secondary sticky bottom-0 z-30 px-2 py-1.5 empty:hidden">
                        <div className="flex flex-col items-start gap-y-2.5 rounded-2xl bg-white px-2 py-4">
                          <div className="flex items-center gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-white">
                              <UserIcon />
                            </span>
                            <div>
                              <div className="text-base font-semibold">
                                Emily
                              </div>
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

              {children}
              <SpeedInsights />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
