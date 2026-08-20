'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { formatPrice } from '@/lib/utils';
import {
  DoodleLoopArrowUpRight,
  DoodleCurveArrowDown,
  DoodleLoopArrowLeft,
  DoodleSparkle,
  DoodlePointerArrow,
} from '@/components/ui/DoodleArrows';

export const EditorialHero: React.FC = () => {
  const { products } = useStore();

  // Dynamic featured find item (e.g. Study lamp or Denim jacket)
  const featuredItem =
    products.find((p) => p.sku === 'HME-SL-118') ||
    products.find((p) => p.isFeatured) ||
    products[0];

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-8 max-w-[1440px] mx-auto">
      {/* Main Large Rounded Hero Panel (Sandstone #EFEAE1 with soft shadow) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative bg-[#EFEAE1] rounded-[2rem] sm:rounded-[2.75rem] lg:rounded-[3.25rem] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-card"
      >
        {/* Background Organic Shapes & Soft Ambiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Olive Organic Blob top right */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#5E6F3D]/10 blur-3xl"
          />
          {/* Sage Curved Shape center-left */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 -left-28 w-[24rem] h-[24rem] rounded-full bg-[#7A8C53]/15 blur-2xl"
          />
          {/* Warm Canvas Soft Glow behind subject */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-[#FAF9F5]/70 blur-xl" />
        </div>

        {/* Hero Content Grid (Asymmetrical Magazine Layout) */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Editorial Typography, Copy, CTAs & Social Proof (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-5 space-y-5 sm:space-y-6 text-center lg:text-left z-20"
          >
            {/* Drop Indicator (Boxless, Clean Typography & Playful Font) */}
            <div className="inline-flex items-center gap-2.5 cursor-default">
              <span className="text-xs font-black uppercase tracking-widest text-[#5E6F3D] flex items-center gap-1.5 font-heading">
                <Sparkles className="w-3.5 h-3.5 text-[#5E6F3D]" />
                NEW DROP
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E6F3D]/40" />
              <span className="font-playful text-xl font-bold text-[#1F201D] tracking-wide">
                Friday at 6 PM
              </span>
            </div>

            {/* Oversized Expressive Headline with Playful Overlapping Angle */}
            <div className="relative pt-1 pb-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight leading-[0.9] uppercase text-[#1F201D]">
                GOOD FINDS.
              </h1>
              <div className="relative -mt-2 sm:-mt-4 lg:-mt-5 sm:ml-4 lg:ml-8 transform -rotate-3 sm:-rotate-4 inline-block z-10">
                <span className="font-playful text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#5E6F3D] tracking-normal lowercase select-none block leading-none">
                  better prices.
                </span>
              </div>

              {/* Hand-drawn pointer arrow towards CTAs */}
              <div className="hidden lg:block absolute -bottom-6 right-8 text-[#5E6F3D] pointer-events-none">
                <DoodlePointerArrow className="w-12 h-10" />
              </div>
            </div>

            {/* Supporting Copy */}
            <div className="space-y-1 max-w-md mx-auto lg:mx-0">
              <p className="text-sm sm:text-base font-semibold text-[#1F201D]/90 leading-snug">
                Curated secondhand essentials for campus life.
              </p>
              <p className="text-xs sm:text-sm text-[#6E6D68] leading-relaxed">
                One-of-one finds, student-friendly prices, and convenient campus pickup.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#5E6F3D] hover:bg-[#4D5D32] text-[#FAF9F5] font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-xs sm:text-sm group"
                >
                  <span>Shop the Drop</span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF9F5] text-[#5E6F3D] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/sell"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full bg-[#FAF9F5] text-[#5E6F3D] hover:bg-white font-bold shadow-sm transition-all text-xs sm:text-sm"
                >
                  <span>Sell With MiThrift</span>
                </Link>
              </motion.div>
            </div>

            {/* Social Proof Floating Pill */}
            <div className="pt-2 flex items-center justify-center lg:justify-start">
              <motion.div
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-3 bg-[#FAF9F5] px-4 py-2.5 rounded-2xl shadow-subtle"
              >
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-[#FAF9F5] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-[#FAF9F5] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                    alt=""
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-[#FAF9F5] object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                    alt=""
                  />
                </div>
                <div className="text-left">
                  <span className="block text-[11px] font-extrabold text-[#1F201D] leading-none">
                    Loved by campus shoppers
                  </span>
                  <span className="block text-[10px] text-[#6E6D68] mt-0.5">
                    1,200+ student finds
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CENTER COLUMN: Central Student Fashion & Thrift Lifestyle Cutout (4 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-4 relative flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]"
          >
            {/* Backdrop Layered Shapes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Organic Soft Olive Blob */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-[#5E6F3D]/20 animate-pulse transition-all duration-1000" />
              {/* Secondary Sage Shape */}
              <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-[60%_40%_30%_70%_/_50%_30%_70%_40%] bg-[#7A8C53]/15 rotate-45" />
            </div>

            {/* Central Student Lifestyle Cutout */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative z-10 w-64 sm:w-80 lg:w-96 h-80 sm:h-[26rem] lg:h-[30rem] flex items-center justify-center pointer-events-auto"
            >
              <Image
                src="/images/hero-student.png"
                alt="MiThrift Campus Streetwear & Thrift Style"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl transition-transform duration-700"
              />
              
              {/* Floating Quality Tag over image */}
              <div className="absolute bottom-4 left-4 sm:left-6 bg-[#FAF9F5]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-subtle flex items-center gap-1.5 z-20">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5E6F3D]" />
                <span className="text-[10px] font-bold text-[#1F201D]">
                  MiThrift Inspected
                </span>
              </div>
            </motion.div>

            {/* Floating Category Pills around Central Subject */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 left-2 z-20"
            >
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D9E2EC] text-[#102A43] shadow-subtle">
                TECH
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/4 -right-2 z-20"
            >
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#F3D8D7] text-[#621B18] shadow-subtle">
                FASHION
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-2 right-4 z-20"
            >
              <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FEF08A] text-[#713F12] shadow-subtle">
                HOSTEL
              </span>
            </motion.div>

            {/* Hand-drawn Loop Arrow between center & right (matching user reference) */}
            <div className="hidden xl:block absolute -right-12 top-10 text-[#1F201D]/70 pointer-events-none z-30">
              <DoodleLoopArrowUpRight className="w-16 h-16" />
            </div>
            <div className="hidden xl:block absolute -right-10 bottom-6 text-[#1F201D]/70 pointer-events-none z-30">
              <DoodleLoopArrowLeft className="w-14 h-14" />
            </div>
            <div className="hidden xl:block absolute -right-16 top-1/2 -translate-y-1/2 text-[#5E6F3D]/80 pointer-events-none z-30">
              <DoodleSparkle className="w-5 h-5" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Floating "Featured Find" Card & Additional Pills (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-3 space-y-3 flex flex-col items-center lg:items-end relative"
          >
            {/* Top Scarcity Badge */}
            <div className="inline-flex items-center gap-1 bg-[#5E6F3D] text-[#FAF9F5] text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
              <span>1 OF 1 UNIQUE</span>
            </div>

            {/* Floating Compact "Featured Find" Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="w-full max-w-[210px] sm:max-w-[220px] bg-[#FAF9F5] rounded-2xl p-3 shadow-card space-y-2 relative group transition-all hover:shadow-float"
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-extrabold uppercase tracking-wider text-[#5E6F3D]">
                  Featured Find
                </span>
                <span className="font-mono text-[#6E6D68]">
                  {featuredItem.sku}
                </span>
              </div>

              {/* Product Thumbnail */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFEAE1]/60">
                <Image
                  src={featuredItem.images[0]}
                  alt={featuredItem.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-1.5 left-1.5 bg-[#5E6F3D] text-[#FAF9F5] text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase shadow-sm">
                  {featuredItem.condition}
                </div>
              </div>

              {/* Product Title & Details */}
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs font-heading text-[#1F201D] line-clamp-1">
                  {featuredItem.title}
                </h4>
                <p className="text-[9px] text-[#6E6D68] line-clamp-1">
                  {featuredItem.conditionDetails || 'Inspected & campus ready'}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold text-[#1F201D] font-heading">
                  {formatPrice(featuredItem.sellingPrice)}
                </span>

                <Link
                  href={`/item/${featuredItem.sku}`}
                  className="inline-flex items-center gap-1 bg-[#5E6F3D] hover:bg-[#4D5D32] text-[#FAF9F5] text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm transition-all"
                >
                  <span>Get It</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
            </motion.div>

            {/* Additional Floating Category Badges & Doodle Curve Down Arrow */}
            <div className="flex items-center gap-1.5 pt-0.5 relative">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#E2E8F0] text-[#1E293B] shadow-subtle">
                TEXTBOOKS
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#EEDBBF] text-[#4A3418] shadow-subtle">
                HOME
              </span>
              <div className="hidden lg:block absolute -left-10 -bottom-5 text-[#1F201D]/70 pointer-events-none">
                <DoodleCurveArrowDown className="w-10 h-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
