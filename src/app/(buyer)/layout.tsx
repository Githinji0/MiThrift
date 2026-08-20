import React from 'react';
import { Header } from '@/components/buyer/Header';
import { Footer } from '@/components/buyer/Footer';
import { MobileBottomNav } from '@/components/buyer/MobileBottomNav';

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
