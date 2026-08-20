'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Tag, ChevronRight, Store } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { ProductGrid } from '@/components/buyer/ProductGrid';
import { QualityBadges } from '@/components/buyer/QualityBadges';
import { DropCountdown } from '@/components/buyer/DropCountdown';
import { EditorialHero } from '@/components/buyer/EditorialHero';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { CATEGORIES } from '@/lib/constants';

export default function HomePage() {
  const { products, drops } = useStore();

  const featuredDrop = drops.find((d) => d.isFeatured) || drops[0];
  const newArrivals = products.slice(0, 8);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Editorial High-Impact Hero Section */}
      <EditorialHero />

      {/* Featured Flash Drop Section */}
      {featuredDrop && (
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-charcoal text-canvas rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden shadow-float">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1 rounded-full">
                    FEATURED FLASH DROP
                  </span>
                  <span className="text-xs text-muted-clay font-medium">
                    {featuredDrop.productIds.length} Curated Items
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-canvas">
                  {featuredDrop.name}
                </h2>
                <p className="text-sm text-muted-clay max-w-lg">{featuredDrop.description}</p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-3">
                <DropCountdown
                  targetDate={featuredDrop.releaseDate}
                  targetTime={featuredDrop.releaseTime}
                />
                <Link
                  href="/drops"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-olive-light hover:underline transition-colors"
                >
                  <span>Explore All Drops</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Drop Items Preview Grid */}
            <div className="mt-8 pt-6">
              <ProductGrid products={featuredProducts} />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Category Grid Section */}
      <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal font-heading">
              Browse Categories
            </h2>
            <p className="text-xs text-muted-clay mt-0.5">Find campus essentials by type</p>
          </div>
          <Link
            href="/categories"
            className="text-xs font-bold text-olive hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <StaggerItem key={cat.id}>
              <motion.div whileHover={{ y: -4, scale: 1.03 }} transition={{ duration: 0.2 }}>
                <Link
                  href={`/shop?category=${cat.id}`}
                  className="p-4 sm:p-5 rounded-3xl flex flex-col justify-between h-32 shadow-subtle hover:shadow-card transition-all block"
                  style={{ backgroundColor: cat.bgHex }}
                >
                  <div className="flex justify-between items-start">
                    <Tag className="w-5 h-5" style={{ color: cat.textColor }} />
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full shadow-subtle"
                      style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: cat.textColor }}
                    >
                      1-of-1
                    </span>
                  </div>
                  <span
                    className="font-bold text-xs font-heading leading-snug line-clamp-2"
                    style={{ color: cat.textColor }}
                  >
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>

      {/* Fresh Arrivals Catalog Section */}
      <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-charcoal font-heading">
              Fresh Finds, Just In
            </h2>
            <p className="text-xs text-muted-clay mt-0.5">
              One-of-one pieces. Student-friendly prices. Gone when they're gone.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sandstone hover:bg-sandstone-hover text-xs font-bold text-charcoal transition-colors shadow-subtle"
          >
            <span>View Full Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} />
      </FadeIn>

      {/* 5-Step Quality Pipeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <QualityBadges />
      </div>

      {/* Campus Pickup Explanation Banner */}
      <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-canvas rounded-[2.5rem] p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-olive bg-sage-light px-3.5 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span>Campus Convenience</span>
            </span>
            <h2 className="text-2xl font-extrabold text-charcoal font-heading">
              Order online. Pick up on campus.
            </h2>
            <p className="text-xs text-muted-clay leading-relaxed">
              Reserve your item in seconds. Select your preferred campus station (Library Gate, Student Center, or Hall 4), receive WhatsApp confirmation, and collect your item conveniently.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {[
              { name: 'Library Gate', code: 'Main Station' },
              { name: 'Student Center', code: 'Ground Lounge' },
              { name: 'Hall 4 Courtyard', code: 'Reception Bench' },
              { name: 'Main Gate Kiosk', code: 'Security Box' },
            ].map((loc) => (
              <motion.div
                key={loc.name}
                whileHover={{ scale: 1.03 }}
                className="p-3.5 bg-sandstone rounded-2xl flex flex-col justify-center text-center sm:text-left shadow-subtle"
              >
                <div className="flex items-center gap-1.5 text-olive font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{loc.name}</span>
                </div>
                <span className="text-[10px] text-muted-clay mt-0.5">{loc.code}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Sell With Us CTA Banner */}
      <ScaleIn className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-sandstone rounded-[2.5rem] p-8 sm:p-12 shadow-card text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-olive text-canvas flex items-center justify-center mx-auto shadow-sm">
            <Store className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal font-heading">
            Got something you're done with?
          </h2>
          <p className="text-sm text-muted-clay max-w-md mx-auto">
            Turn unwanted hostel gear, textbooks, appliances, or clothes into cash. Choose direct buyout or 25% consignment.
          </p>
          <div className="pt-2">
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 bg-olive hover:bg-olive-hover text-canvas font-bold px-8 py-3.5 rounded-full shadow-md transition-all text-sm"
            >
              <span>Sell With MiThrift</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScaleIn>
    </div>
  );
}
