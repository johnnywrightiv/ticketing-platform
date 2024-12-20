import React from 'react';
import Navbar, { NavLink } from '@/components/Navbar';

export const dynamic = 'force-dynamic';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Navbar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Events</NavLink>
        <NavLink href="/orders">My Tickets</NavLink>
      </Navbar>
      <div className="container my-6">{children}</div>
    </div>
  );
}
