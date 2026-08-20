'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sparkles,
  DollarSign,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Store,
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';

interface AdminSidebarProps {
  onOpenQuickIntake: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onOpenQuickIntake }) => {
  const pathname = usePathname();
  const { logoutAdmin, orders } = useStore();

  const pendingOrdersCount = orders.filter((o) => o.status === 'PENDING').length;

  const links = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/inventory', label: 'Inventory Intake', icon: Package },
    { href: '/admin/orders', label: 'Orders & Pickups', icon: ShoppingBag, badge: pendingOrdersCount },
    { href: '/admin/drops', label: 'Flash Drops', icon: Sparkles },
    { href: '/admin/consignments', label: 'Consignment Payouts', icon: DollarSign },
    { href: '/admin/pickups', label: 'Pickup Locations', icon: MapPin },
    { href: '/admin/analytics', label: 'Profit Analytics', icon: BarChart3 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-charcoal text-canvas flex flex-col justify-between p-4 min-h-screen border-r border-charcoal-light">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-6 mb-4 border-b border-muted-clay/30 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-olive text-canvas flex items-center justify-center font-black">
              M
            </div>
            <div>
              <span className="font-extrabold font-heading text-canvas block leading-tight text-sm">
                MiThrift Admin
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Curator Console</span>
            </div>
          </div>
          <Link
            href="/"
            className="p-1.5 rounded-lg text-muted-clay hover:text-canvas hover:bg-muted-clay/20 transition-colors"
            title="View Buyer Storefront"
          >
            <Store className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Intake Button */}
        <button
          onClick={onOpenQuickIntake}
          className="w-full mb-6 flex items-center justify-center gap-2 bg-olive hover:bg-olive-hover text-canvas font-bold py-2.5 px-4 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>30-Sec Intake</span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-olive text-canvas shadow-sm'
                    : 'text-muted-clay hover:bg-sandstone/10 hover:text-canvas'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="bg-amber-500 text-charcoal font-black text-[10px] px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-muted-clay/30 px-2">
        <button
          onClick={logoutAdmin}
          className="w-full flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 py-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock Admin Session</span>
        </button>
      </div>
    </aside>
  );
};
