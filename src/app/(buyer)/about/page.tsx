import React from 'react';
import { STORE_NAME, STORE_SLOGAN } from '@/lib/constants';
import { ShieldCheck, Store, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="bg-sandstone rounded-3xl p-8 border border-oatmeal text-center space-y-3 shadow-subtle">
        <div className="w-12 h-12 rounded-2xl bg-olive text-canvas flex items-center justify-center font-extrabold text-2xl mx-auto">
          M
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal font-heading">{STORE_NAME}</h1>
        <p className="text-sm font-bold text-olive uppercase tracking-wider">{STORE_SLOGAN}</p>
        <p className="text-xs text-muted-clay max-w-md mx-auto leading-relaxed">
          Building a sustainable, reliable, and affordable campus retail platform where good stuff doesn't go to waste.
        </p>
      </div>

      <div className="bg-canvas p-6 sm:p-8 rounded-3xl border border-oatmeal shadow-subtle space-y-6 text-sm text-charcoal/80 leading-relaxed">
        <h2 className="text-xl font-bold font-heading text-charcoal">Our Mission</h2>
        <p>
          Students buy hundreds of thousands of shillings worth of hostel essentials, textbooks, kettles, calculators, and fashion every semester. When moving out or graduating, these valuable items are often sold off at distress prices or abandoned.
        </p>
        <p>
          MiThrift was created to bridge this gap. Instead of chaotic P2P marketplace feeds filled with unverified sellers, broken appliances, and flakey pickup arrangements, <strong>MiThrift acts as the single trusted curator and inventory holder</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-sandstone/50 rounded-2xl border border-oatmeal space-y-2">
            <ShieldCheck className="w-5 h-5 text-olive" />
            <h3 className="font-bold text-charcoal font-heading text-xs">Quality Inspection First</h3>
            <p className="text-xs text-muted-clay">
              We test electrical heating elements, buttons, screens, and clothing seams before anything is listed on the drop.
            </p>
          </div>

          <div className="p-4 bg-sandstone/50 rounded-2xl border border-oatmeal space-y-2">
            <Store className="w-5 h-5 text-olive" />
            <h3 className="font-bold text-charcoal font-heading text-xs">Direct Buyouts & Consignment</h3>
            <p className="text-xs text-muted-clay">
              Students get immediate cash upfront or 75% consignment payouts when their items sell on drops.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-olive text-canvas font-bold text-xs rounded-xl shadow-sm hover:bg-olive-hover"
          >
            <Sparkles className="w-4 h-4" />
            Explore Current Drop Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
