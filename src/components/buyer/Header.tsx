'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Sparkles,
  Heart,
  Search,
  Lock,
  Tag,
  HelpCircle,
  PlusCircle,
  Menu,
  X,
  Package,
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { STORE_NAME } from '@/lib/constants';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { favorites, orders } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeReservations = orders.filter(
    (o) => o.status === 'PENDING' || o.status === 'READY_FOR_PICKUP'
  ).length;

  const navLinks = [
    { href: '/shop', label: 'Shop', icon: ShoppingBag },
    { href: '/drops', label: 'Flash Drops', icon: Sparkles, badge: 'NEW' },
    { href: '/categories', label: 'Categories', icon: Tag },
    { href: '/sell', label: 'Sell With Us', icon: PlusCircle },
    { href: '/how-it-works', label: 'How It Works', icon: HelpCircle },
  ];

  return (
    <>
      {/* Top Floating Announcement Strip */}
      <div className="pt-2 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#1F201D]/90 backdrop-blur-md text-[#FAF9F5] py-1.5 px-4 rounded-full text-[11px] font-medium shadow-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            <strong>Next Drop:</strong> Friday Tech & Hostel Drop @ 6:00 PM · Free Campus Pickup
          </span>
        </div>
      </div>

      {/* Floating Independent Multi-Pill Glassy Navigation */}
      <header className="sticky top-2 sm:top-3 z-50 px-3 sm:px-6 max-w-7xl mx-auto w-full transition-all duration-300">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          
          {/* 1. Left Brand Logo Pill */}
          <Link
            href="/"
            className="flex items-center gap-2.5 bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] backdrop-blur-xl rounded-full px-4 py-2 sm:py-2.5 shadow-subtle hover:shadow-card transition-all group shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#5E6F3D] flex items-center justify-center text-[#FAF9F5] font-black text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#1F201D] font-heading leading-none">
              {STORE_NAME}
            </span>
          </Link>

          {/* 2. Center Individual Navigation Pills (Each item is its own pill) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-subtle hover:shadow-card hover:scale-105 backdrop-blur-xl ${
                    isActive
                      ? 'bg-[#5E6F3D] text-[#FAF9F5] shadow-md scale-105'
                      : 'bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] text-[#1F201D] hover:text-[#5E6F3D]'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-black ${
                        isActive ? 'text-amber-300' : 'text-[#5E6F3D]'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Individual Action Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Pill */}
            <Link
              href="/shop"
              className="flex items-center justify-center p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] text-[#1F201D] hover:text-[#5E6F3D] backdrop-blur-xl shadow-subtle hover:shadow-card transition-all hover:scale-105"
              title="Search Catalog"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline-block ml-1.5 text-xs font-bold">Search</span>
            </Link>

            {/* Favorites Pill */}
            <Link
              href="/favorites"
              className="relative flex items-center gap-1.5 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] text-[#1F201D] hover:text-[#5E6F3D] backdrop-blur-xl shadow-subtle hover:shadow-card transition-all hover:scale-105"
              title="Saved Favorites"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Orders Pill */}
            <Link
              href="/orders"
              className="relative flex items-center gap-1.5 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] text-[#1F201D] hover:text-[#5E6F3D] backdrop-blur-xl shadow-subtle hover:shadow-card transition-all hover:scale-105"
              title="My Reservations"
              aria-label="Orders"
            >
              <Package className="w-4 h-4" />
              {activeReservations > 0 && (
                <span className="w-4 h-4 bg-amber-500 text-[#1F201D] text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {activeReservations}
                </span>
              )}
            </Link>

            {/* Staff Pill */}
            <Link
              href="/admin"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] text-xs font-bold text-[#1F201D] backdrop-blur-xl shadow-subtle hover:shadow-card transition-all hover:scale-105"
              title="Staff Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#5E6F3D]" />
              <span>Staff</span>
            </Link>

            {/* Mobile Menu Trigger Pill */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#FAF9F5]/80 text-[#1F201D] backdrop-blur-xl shadow-subtle"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#1F201D]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Multi-Pill Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 bg-[#FAF9F5]/80 backdrop-blur-2xl rounded-3xl shadow-float space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold shadow-subtle transition-all ${
                      isActive
                        ? 'bg-[#5E6F3D] text-[#FAF9F5]'
                        : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-[#EFEAE1]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] bg-amber-400 text-[#1F201D] px-1.5 py-0.2 rounded-full font-black">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="pt-1">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold text-[#5E6F3D] bg-[#7A8C53]/15 shadow-subtle"
              >
                <Lock className="w-4 h-4 text-[#5E6F3D]" />
                <span>MiThrift Staff Admin Console</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
