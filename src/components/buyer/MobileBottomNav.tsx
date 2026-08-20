'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Sparkles, Heart, PlusCircle } from 'lucide-react';
import { useStore } from '@/hooks/useStore';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { favorites } = useStore();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/shop', label: 'Shop', icon: ShoppingBag },
    { href: '/drops', label: 'Drops', icon: Sparkles, badge: 'HOT' },
    { href: '/favorites', label: 'Saved', icon: Heart, count: favorites.length },
    { href: '/sell', label: 'Sell', icon: PlusCircle },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-4 right-4 z-50 bg-[#FAF9F5]/85 backdrop-blur-2xl rounded-full px-3 py-2 shadow-float">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
                isActive ? 'text-[#5E6F3D] font-extrabold' : 'text-[#6E6D68] hover:text-[#1F201D]'
              }`}
            >
              <div className="relative">
                <IconComponent className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {item.count}
                  </span>
                )}
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 bg-amber-400 text-[#1F201D] text-[8px] font-black px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-heading tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
