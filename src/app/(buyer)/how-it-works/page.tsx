'use client';

import React from 'react';
import Link from 'next/link';
import { QualityBadges } from '@/components/buyer/QualityBadges';
import {
  ShieldCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Package,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export default function HowItWorksPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. Full-Screen Width Editorial Hero */}
      <FadeIn className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#EFEAE1] py-12 sm:py-16 lg:py-20 overflow-hidden shadow-subtle">
        {/* Background Ambient Blobs */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#5E6F3D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-[#7A8C53]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F5] px-4 py-1.5 rounded-full shadow-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5E6F3D]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#5E6F3D]">
              Centralized Campus Thrift Standard
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F201D] font-heading tracking-tight leading-[1.05] uppercase">
            How MiThrift Works: <br />
            <span className="text-[#5E6F3D]">Curated, Safe & Simple.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6D68] max-w-xl mx-auto leading-relaxed">
            MiThrift is NOT a messy peer-to-peer marketplace. There are no random seller profiles, endless chat haggling, or unverified items. We inspect, clean, photograph, and sell every single piece directly.
          </p>

          {/* Feature Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Ghosting or Meeting Strangers</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5E6F3D]" />
              <span>100% Inspected & Tested Gear</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
              <MapPin className="w-3.5 h-3.5 text-[#5E6F3D]" />
              <span>Convenient Campus Gate Pickup</span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 2. Main Content Sections (Constrained Grid) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        {/* Side-by-Side Comparison: Old Marketplace vs MiThrift */}
        <div className="space-y-4">
          <FadeIn className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F201D] font-heading">
              The Difference
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6D68] mt-1">
              Why campus thrift shopping is completely reinvented with MiThrift
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {/* Old P2P Marketplace Card */}
            <SlideInLeft className="bg-[#FAF9F5] p-6 sm:p-8 rounded-[2.5rem] shadow-subtle space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-sm">
                  <XCircle className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1F201D] font-heading">
                  Old Campus Marketplace
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#6E6D68]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Unverified sellers who ghost or don't show up.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Meeting unfamiliar people in random or awkward locations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Broken electronics with zero testing or quality checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Exhausting price haggling and bidding wars.</span>
                </li>
              </ul>
            </SlideInLeft>

            {/* MiThrift Model Card */}
            <SlideInRight className="bg-[#5E6F3D] text-[#FAF9F5] p-6 sm:p-8 rounded-[2.5rem] shadow-card space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FAF9F5] text-[#5E6F3D] flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#FAF9F5] font-heading">
                  The MiThrift Standard
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-[#FAF9F5]/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#FAF9F5] font-bold">✓</span>
                  <span>Single verified store — you deal directly with MiThrift staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FAF9F5] font-bold">✓</span>
                  <span>Safe pickup at official campus stations (Library Gate, Student Center).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FAF9F5] font-bold">✓</span>
                  <span>Every appliance, tech item, and piece is inspected & condition-graded.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FAF9F5] font-bold">✓</span>
                  <span>Transparent, student-friendly fixed prices with instant WhatsApp order.</span>
                </li>
              </ul>
            </SlideInRight>
          </div>
        </div>

        {/* 3. 5-Step Quality Pipeline */}
        <QualityBadges />

        {/* 4. Campus Pickup Stations Guide */}
        <FadeIn className="bg-[#FAF9F5] rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-card space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#5E6F3D] bg-sage-light px-3.5 py-1.5 rounded-full shadow-subtle">
              Campus Pickup Stations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F201D] font-heading">
              Collect On Your Walk To Class
            </h2>
            <p className="text-xs sm:text-sm text-[#6E6D68]">
              Choose the station closest to your hostel or lecture hall when reserving your item.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                name: 'Library Gate',
                desc: 'Main campus security station',
                time: '10:00 AM – 6:30 PM',
              },
              {
                name: 'Student Center',
                desc: 'Ground floor lounge pickup point',
                time: '11:00 AM – 7:00 PM',
              },
              {
                name: 'Hall 4 Courtyard',
                desc: 'Hostel reception bench station',
                time: '4:00 PM – 8:30 PM',
              },
              {
                name: 'Main Gate Kiosk',
                desc: 'Fast express handoff box',
                time: '9:00 AM – 6:00 PM',
              },
            ].map((loc) => (
              <StaggerItem key={loc.name}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-5 bg-[#EFEAE1]/70 rounded-3xl space-y-2 shadow-subtle hover:shadow-card transition-all h-full"
                >
                  <div className="flex items-center gap-2 text-[#5E6F3D]">
                    <MapPin className="w-4 h-4" />
                    <h4 className="font-extrabold text-sm text-[#1F201D] font-heading">
                      {loc.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#6E6D68]">{loc.desc}</p>
                  <div className="text-[10px] font-mono font-bold text-[#5E6F3D] bg-[#FAF9F5] px-2.5 py-1 rounded-xl inline-block">
                    {loc.time}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeIn>

        {/* 5. Fluid Bottom CTAs */}
        <ScaleIn className="bg-[#EFEAE1] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-card text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F201D] font-heading">
            Ready to find something good?
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6D68] max-w-md mx-auto">
            Explore today's fresh arrivals or submit unwanted gear for buyout.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#5E6F3D] hover:bg-[#4D5D32] text-[#FAF9F5] font-bold px-8 py-3.5 rounded-full shadow-md transition-all text-xs sm:text-sm"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/sell"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#FAF9F5] text-[#5E6F3D] hover:bg-white font-bold shadow-sm transition-all text-xs sm:text-sm"
              >
                <span>Sell With MiThrift</span>
              </Link>
            </motion.div>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
}
