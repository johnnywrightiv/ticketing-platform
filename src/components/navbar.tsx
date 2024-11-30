'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-50 flex w-full justify-center border-b backdrop-blur-sm">
      <div className="container flex h-16 w-full items-center justify-between px-4">
        <Link
          href="/"
          className="text-primary bg-background flex-shrink-0 text-xl font-bold transition-none hover:bg-transparent"
        >
          ACME CORP
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-grow items-center justify-end md:flex md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-full sm:max-w-sm">
            <SheetTitle className="hidden">Navigation</SheetTitle>
            <SheetDescription className="hidden">
              Mobile Navigation
            </SheetDescription>
            <div className="flex flex-col justify-center gap-6 space-y-6 pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary text-4xl font-semibold transition-colors"
                  onClick={() => setIsSheetOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="text-center">
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
