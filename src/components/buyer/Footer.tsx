import React from 'react';
import Link from 'next/link';
import { STORE_NAME } from '@/lib/constants';
import { MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-transparent">
      {/* Wavy SVG Top Divider */}
      <div className="w-full overflow-hidden leading-none -mb-1 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-10 sm:h-16 lg:h-20 block text-charcoal"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,40 C 320,110 520,10 800,55 C 1080,100 1280,30 1440,65 L 1440,120 L 0,120 Z"
            fill="#1F201D"
          />
        </svg>
      </div>

      {/* Dark Charcoal Footer Body */}
      <div className="bg-charcoal text-canvas pt-8 sm:pt-12 pb-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-muted-clay/20">
            {/* Brand & Mission */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-olive flex items-center justify-center text-canvas font-black text-lg shadow-sm">
                  M
                </div>
                <span className="text-xl font-extrabold font-heading text-canvas">
                  {STORE_NAME}
                </span>
              </div>
              <p className="text-xs text-muted-clay leading-relaxed">
                Curated secondhand essentials for university life. 1-of-1 quality inspected items, student prices, and hassle-free campus pickup.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/40">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Not a P2P Marketplace · 100% Curated</span>
              </div>
            </div>

            {/* Quick Shop Links */}
            <div>
              <h4 className="text-xs font-bold text-canvas uppercase tracking-wider mb-4 font-heading">
                Explore Store
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-clay">
                <li>
                  <Link href="/shop" className="hover:text-canvas transition-colors">
                    Shop All Products
                  </Link>
                </li>
                <li>
                  <Link href="/drops" className="hover:text-canvas transition-colors flex items-center gap-1.5">
                    <span>Flash Drops</span>
                    <span className="text-[9px] bg-amber-500 text-charcoal px-1.5 py-0.5 rounded font-black">HOT</span>
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-canvas transition-colors">
                    Browse Categories
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-canvas transition-colors">
                    How MiThrift Works
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="hover:text-canvas transition-colors">
                    Saved Items
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pickup Locations */}
            <div>
              <h4 className="text-xs font-bold text-canvas uppercase tracking-wider mb-4 font-heading">
                Campus Pickups
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-clay">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <span>Library Gate (Main Station)</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <span>Student Center Lounge</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <span>Hall 4 Reception</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <span>Main Gate Kiosk</span>
                </li>
              </ul>
            </div>

            {/* Sell With Us Callout */}
            <div className="bg-sandstone/10 p-6 rounded-3xl border border-muted-clay/20 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-canvas font-heading mb-1">
                  Got items to clear out?
                </h4>
                <p className="text-xs text-muted-clay leading-relaxed">
                  Sell directly to MiThrift for instant cash or leave items on 25% consignment.
                </p>
              </div>
              <Link
                href="/sell"
                className="mt-4 inline-flex items-center justify-between px-5 py-3 rounded-full bg-olive hover:bg-olive-hover text-canvas font-bold text-xs shadow-sm transition-all"
              >
                <span>Sell With MiThrift</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-clay gap-4">
            <p>© {new Date().getFullYear()} MiThrift Campus Store. Good stuff shouldn't go to waste.</p>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hover:text-canvas transition-colors">
                Staff Portal
              </Link>
              <Link href="/about" className="hover:text-canvas transition-colors">
                About Mission
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
