'use client';

import React, { ComponentProps, useState } from 'react';
import Link from 'next/link';
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
      className="text-foreground"
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
        'hover:bg-secondary hover:text-secondary-foreground focus-visible:hover:bg-secondary focus-visible:hover:text-secondary-foreground rounded-md p-2 transition-colors',
        pathname === props.href && 'bg-secondary text-secondary-foreground',
      )}
    />
  );
}

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <nav className="bg-background text-foreground top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto grid h-16 grid-cols-2 items-center md:grid-cols-3">
        <Link
          href="/"
          className="font-heading text-foreground hover:text-primary text-xl font-bold transition-colors"
        >
          ACME CORP
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
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            {/* Mobile Navigation Sheet */}
            <SheetContent
              side="right"
              className="w-full max-w-full sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile Navigation
              </SheetDescription>
              <div className="flex flex-col justify-center gap-6 pt-10">
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
