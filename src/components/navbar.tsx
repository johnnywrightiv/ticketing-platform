'use client';

import React, { ComponentProps, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, MoonIcon, SunIcon, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

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
      className="hover:bg-primary hover:text-secondary-foreground focus-visible:hover:bg-primary focus-visible:hover:text-secondary-foreground rounded-md p-2 transition-colors"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        'hover:bg-secondary hover:text-secondary-foreground focus-visible:hover:bg-secondary focus-visible:hover:text-secondary-foreground rounded-md p-2 px-4 transition-colors',
        pathname === props.href &&
          'hover:bg-background bg-background text-secondary-foreground p-4 py-6',
      )}
    />
  );
}

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <nav className="bg-foreground text-background top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto grid h-16 grid-cols-2 items-center md:grid-cols-3">
        <Link
          href="/"
          className="font-heading flex items-center text-xl font-bold transition-colors"
        >
          <Ticket className="mr-2 h-5 w-5" />
          QUICK TIX
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center space-x-4 md:flex">
          {children}
        </div>

        <div className="flex items-center justify-end space-x-2">
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary hover:text-secondary-foreground focus-visible:hover:bg-primary focus-visible:hover:text-secondary-foreground rounded-md p-2 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            {/* Mobile Navigation Sheet */}
            <SheetContent
              side="right"
              className="flex w-full max-w-full items-center justify-center text-center text-5xl font-semibold sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile Navigation
              </SheetDescription>
              <div className="flex flex-col justify-center gap-16 pt-10">
                {React.Children.map(children, (child) =>
                  React.cloneElement(child as React.ReactElement, {
                    onClick: () => setIsSheetOpen(false),
                    className: `${(child as React.ReactElement).props.className} text-2xl font-semibold`,
                  }),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
