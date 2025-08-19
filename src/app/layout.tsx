import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

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
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
