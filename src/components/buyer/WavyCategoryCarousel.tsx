'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { useStore } from '@/hooks/useStore';
import { DoodleSparkle } from '@/components/ui/DoodleArrows';

export const WavyCategoryCarousel: React.FC = () => {
  const { products } = useStore();

  // Wavy vertical offsets and slight rotations creating an organic wave rhythm
  const waveOffsets = [
    { y: 0, rotate: -2 },
    { y: 22, rotate: 1.8 },
    { y: -10, rotate: -1.5 },
    { y: 24, rotate: 2 },
    { y: -14, rotate: -2 },
    { y: 20, rotate: 1.5 },
    { y: -8, rotate: -1.8 },
    { y: 22, rotate: 2 },
    { y: -12, rotate: -1.5 },
    { y: 18, rotate: 1.2 },
    { y: -6, rotate: -1 },
  ];

  // Duplicate categories array for seamless infinite looping
  const loopedCategories = [...CATEGORIES, ...CATEGORIES];

  return (
    <section className="w-full relative overflow-hidden py-4">
      {/* Header Container (Constrained & Centered) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 relative">
        <div className="flex items-end justify-between relative">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#5E6F3D] bg-sage-light px-3.5 py-1 rounded-full shadow-subtle mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#5E6F3D]" />
              <span>Campus Collections</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1F201D] font-heading tracking-tight">
              Browse by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6D68] mt-0.5">
              Inspected 1-of-1 pieces organized by campus essential type
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-[#6E6D68] bg-[#FAF9F5] px-4 py-2 rounded-full shadow-subtle">
            <span>Hover to explore</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6F3D] animate-ping" />
          </div>

          {/* Decorative Doodle Sparkle */}
          <div className="hidden lg:block absolute right-48 top-0 text-[#5E6F3D]/50 pointer-events-none">
            <DoodleSparkle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Full-Bleed Edge-to-Edge Wavy Auto-Scrolling Track */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden pt-6 pb-12">
        {/* Soft edge gradient fades */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#FAF9F5] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#FAF9F5] to-transparent z-20 pointer-events-none" />

        {/* Animated Marquee Flex Container (Pauses on Hover) */}
        <div className="animate-wavy-marquee flex items-center gap-4 sm:gap-6 pl-4">
          {loopedCategories.map((cat, idx) => {
            const wave = waveOffsets[idx % waveOffsets.length];
            const itemCount = products.filter((p) => p.categoryId === cat.id).length;

            return (
              <motion.div
                key={`${cat.id}-${idx}`}
                style={{
                  transform: `translateY(${wave.y}px) rotate(${wave.rotate}deg)`,
                  backgroundColor: cat.bgHex,
                }}
                whileHover={{
                  y: wave.y - 12,
                  rotate: 0,
                  scale: 1.06,
                  transition: { duration: 0.2 },
                }}
                className="w-48 sm:w-56 h-36 sm:h-40 rounded-[2rem] sm:rounded-[2.25rem] p-5 flex flex-col justify-between shadow-subtle hover:shadow-card cursor-pointer transition-all select-none shrink-0"
              >
                <Link
                  href={`/shop?category=${cat.id}`}
                  className="flex flex-col justify-between h-full w-full"
                >
                  {/* Top Row: Icon & 1-of-1 Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-subtle"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        color: cat.textColor,
                      }}
                    >
                      <Tag className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-subtle"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        color: cat.textColor,
                      }}
                    >
                      1-of-1
                    </span>
                  </div>

                  {/* Bottom Row: Category Name & Count */}
                  <div>
                    <h3
                      className="font-extrabold text-sm sm:text-base font-heading leading-tight line-clamp-1"
                      style={{ color: cat.textColor }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="text-[11px] font-semibold opacity-75 mt-0.5"
                      style={{ color: cat.textColor }}
                    >
                      {itemCount > 0 ? `${itemCount} items available` : 'Curated items'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
