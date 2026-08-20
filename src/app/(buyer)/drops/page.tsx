'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Package, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { DropCountdown } from '@/components/buyer/DropCountdown';
import { ProductGrid } from '@/components/buyer/ProductGrid';
import { formatDropDateTime } from '@/lib/utils';
import { FadeIn, ScaleIn } from '@/components/ui/MotionWrapper';

export default function FlashDropsPage() {
  const { drops, products } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* 1. Hero Header Banner */}
      <FadeIn className="relative bg-[#EFEAE1] rounded-[2.5rem] sm:rounded-[3.25rem] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-card text-center space-y-4">
        {/* Ambient background glows */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#5E6F3D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#7A8C53]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F5] px-4 py-1.5 rounded-full shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#5E6F3D]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#5E6F3D]">
              Scheduled Campus Batch Releases
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F201D] font-heading tracking-tight leading-[1.05] uppercase">
            Curated Flash Drops <br />
            <span className="text-[#5E6F3D]">& Re-stocks.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6D68] max-w-lg mx-auto leading-relaxed">
            Instead of endless messy feeds, MiThrift releases inspected student essentials in curated batch drops. Limited 1-of-1 pieces with campus pickup.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="relative z-10 pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>First-Come Reservations</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Quality Inspected</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
            <Package className="w-3.5 h-3.5 text-[#5E6F3D]" />
            <span>Same-Day Campus Pickup</span>
          </div>
        </div>
      </FadeIn>

      {/* 2. Fluid Drops List */}
      <div className="space-y-10 sm:space-y-14">
        {drops.map((drop, idx) => {
          const dropProducts = products.filter(
            (p) => p.dropId === drop.id || drop.productIds.includes(p.id)
          );

          return (
            <FadeIn
              key={drop.id}
              delay={idx * 0.1}
              className="bg-[#FAF9F5] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-card space-y-8 relative overflow-hidden"
            >
              {/* Drop Showcase Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Cover Image Presentation */}
                <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-card bg-[#EFEAE1]">
                  <Image
                    src={drop.coverImage}
                    alt={drop.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {drop.status === 'LIVE' && (
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                      Live Drop
                    </div>
                  )}
                  {drop.isFeatured && (
                    <div className="absolute top-4 right-4 bg-[#5E6F3D] text-[#FAF9F5] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Drop Info & Countdown */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#5E6F3D] bg-sage-light px-3.5 py-1 rounded-full shadow-subtle">
                      {drop.tagline}
                    </span>
                    <span className="text-xs text-[#6E6D68] flex items-center gap-1.5 font-mono bg-[#EFEAE1]/60 px-3 py-1 rounded-full shadow-subtle">
                      <Calendar className="w-3.5 h-3.5 text-[#5E6F3D]" />
                      <span>{formatDropDateTime(drop.releaseDate, drop.releaseTime)}</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1F201D] font-heading tracking-tight">
                    {drop.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6E6D68] leading-relaxed max-w-xl">
                    {drop.description}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                    <DropCountdown
                      targetDate={drop.releaseDate}
                      targetTime={drop.releaseTime}
                    />

                    <div className="inline-flex items-center gap-2 bg-[#EFEAE1]/70 text-[#1F201D] text-xs font-bold px-4 py-2 rounded-full shadow-subtle">
                      <Package className="w-3.5 h-3.5 text-[#5E6F3D]" />
                      <span>{dropProducts.length} Curated Items</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid for this Drop */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#1F201D] uppercase tracking-widest bg-[#EFEAE1] px-4 py-1.5 rounded-full shadow-subtle">
                    Drop Inventory
                  </span>
                  <Link
                    href={`/shop?drop=${drop.id}`}
                    className="text-xs font-bold text-[#5E6F3D] hover:underline flex items-center gap-1"
                  >
                    <span>View In Shop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <ProductGrid
                  products={dropProducts}
                  emptyTitle="Items loading into drop..."
                  emptySubtitle="Stock is currently being inspected and prepared for release."
                />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
