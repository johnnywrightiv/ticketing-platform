import React from 'react';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Prosto_One } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';

const openOpen_Sans = Open_Sans({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-body',
});

const headerProsto_One = Prosto_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Ticketing Platform',
  description: 'Eliminate junk fees with our Ticketing Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${openOpen_Sans.variable} ${headerProsto_One.variable} font-body bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        <footer className="text-muted-foreground container fixed bottom-0 mx-auto px-4 pb-4 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Copyright</p>
        </footer>
      </body>
    </html>
  );
}
