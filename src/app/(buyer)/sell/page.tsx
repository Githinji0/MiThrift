'use client';

import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { CATEGORIES, CONDITION_GRADES } from '@/lib/constants';
import { CategoryId, ConditionGrade, InventoryType } from '@/types';
import {
  CheckCircle2,
  DollarSign,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Camera,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, ScaleIn } from '@/components/ui/MotionWrapper';

export default function SellWithUsPage() {
  const { submitIntake } = useStore();

  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [campus, setCampus] = useState('Main Campus');
  const [categoryId, setCategoryId] = useState<CategoryId>('appliances');
  const [itemTitle, setItemTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<ConditionGrade>('Excellent');
  const [askingPrice, setAskingPrice] = useState<string>('');
  const [preferredModel, setPreferredModel] = useState<InventoryType>('DIRECT_BUYOUT');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !itemTitle) return;

    submitIntake({
      studentName,
      studentPhone,
      campus,
      categoryId,
      itemTitle,
      description: description || 'Submitted via Sell With MiThrift intake form.',
      condition,
      askingPrice: askingPrice ? Number(askingPrice) : undefined,
      preferredModel,
      photoUrls: [
        photoUrl ||
          'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop',
      ],
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-10 sm:space-y-14 pb-12">
      {/* 1. Full-Screen Width Hero Header */}
      <FadeIn className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#EFEAE1] py-12 sm:py-16 lg:py-20 overflow-hidden shadow-subtle">
        {/* Background Ambient Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5E6F3D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7A8C53]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F5] px-4 py-1.5 rounded-full shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#5E6F3D]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#5E6F3D]">
              Direct Buyouts & 25% Consignment
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F201D] font-heading tracking-tight leading-[1.05] uppercase">
            Turn Unwanted Gear <br />
            <span className="text-[#5E6F3D]">Into Instant Cash.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6D68] max-w-lg mx-auto leading-relaxed">
            Done with your mini kettle, textbooks, calculator, hoodie, or desk chair? No sketchy buyers or price haggling — MiThrift inspects and buys it directly.
          </p>

          {/* 3 Value Pillars */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Cash or 75% Split</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
              <MapPin className="w-3.5 h-3.5 text-[#5E6F3D]" />
              <span>Free Campus Pickup</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>2-Hour Inspector Review</span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 2. Selling Model & Intake Form (Constrained Grid) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Interactive Selling Model Pill Selector */}
        <FadeIn className="space-y-3">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-extrabold text-[#1F201D] font-heading">
              Choose Your Selling Model
            </h2>
            <p className="text-xs text-[#6E6D68]">
              Select how you'd prefer MiThrift to handle your item
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Direct Buyout Pill */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreferredModel('DIRECT_BUYOUT')}
              className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                preferredModel === 'DIRECT_BUYOUT'
                  ? 'bg-[#5E6F3D] text-[#FAF9F5] shadow-card'
                  : 'bg-[#EFEAE1]/70 text-[#1F201D] hover:bg-[#EFEAE1] shadow-subtle'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      preferredModel === 'DIRECT_BUYOUT'
                        ? 'bg-[#FAF9F5] text-[#5E6F3D]'
                        : 'bg-[#FAF9F5] text-[#1F201D]'
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                  </div>
                  {preferredModel === 'DIRECT_BUYOUT' && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#FAF9F5]/20 px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-extrabold font-heading">
                  1. Direct Buyout (Instant Cash)
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    preferredModel === 'DIRECT_BUYOUT' ? 'text-[#FAF9F5]/85' : 'text-[#6E6D68]'
                  }`}
                >
                  We inspect your item and pay you instant cash upon campus collection. Best if you need money immediately before semester ends.
                </p>
              </div>

              <div
                className={`mt-4 pt-3 text-[11px] font-bold flex items-center gap-1 ${
                  preferredModel === 'DIRECT_BUYOUT' ? 'text-[#FAF9F5]' : 'text-[#5E6F3D]'
                }`}
              >
                <span>Paid instantly upon inspection</span>
              </div>
            </motion.div>

            {/* Consignment Pill */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreferredModel('CONSIGNMENT')}
              className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                preferredModel === 'CONSIGNMENT'
                  ? 'bg-[#5E6F3D] text-[#FAF9F5] shadow-card'
                  : 'bg-[#EFEAE1]/70 text-[#1F201D] hover:bg-[#EFEAE1] shadow-subtle'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      preferredModel === 'CONSIGNMENT'
                        ? 'bg-[#FAF9F5] text-[#5E6F3D]'
                        : 'bg-[#FAF9F5] text-[#1F201D]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                  </div>
                  {preferredModel === 'CONSIGNMENT' && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#FAF9F5]/20 px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-extrabold font-heading">
                  2. Consignment (75% Payout)
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    preferredModel === 'CONSIGNMENT' ? 'text-[#FAF9F5]/85' : 'text-[#6E6D68]'
                  }`}
                >
                  We clean, photograph, and feature your item in the next scheduled Flash Drop. You get 75% of the selling price when sold.
                </p>
              </div>

              <div
                className={`mt-4 pt-3 text-[11px] font-bold flex items-center gap-1 ${
                  preferredModel === 'CONSIGNMENT' ? 'text-[#FAF9F5]' : 'text-[#5E6F3D]'
                }`}
              >
                <span>Maximum cash payout</span>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* 3. Fluid Seamless Submission Form */}
        <FadeIn className="bg-[#EFEAE1]/60 rounded-[2.5rem] p-6 sm:p-10 shadow-card">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F201D] font-heading">
                Intake Submission Received!
              </h3>
              <p className="text-sm text-[#6E6D68] max-w-md mx-auto leading-relaxed">
                Awesome, <strong>{studentName}</strong>! Our MiThrift team will review your item and reach out via WhatsApp at <strong>{studentPhone}</strong> to schedule your pickup.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setItemTitle('');
                    setDescription('');
                  }}
                  className="px-8 py-3.5 bg-[#5E6F3D] text-[#FAF9F5] font-bold rounded-full text-xs hover:bg-[#4D5D32] shadow-md transition-all"
                >
                  Submit Another Item
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Student Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5E6F3D] text-[#FAF9F5] font-black text-xs flex items-center justify-center shadow-sm">
                    1
                  </span>
                  <h3 className="text-base font-extrabold text-[#1F201D] font-heading">
                    Your Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grace Njeri"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm font-semibold text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 7..."
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm font-semibold text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                      Campus / Hostel
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hall 4 / Main Campus"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm font-semibold text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Item Category & Condition */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5E6F3D] text-[#FAF9F5] font-black text-xs flex items-center justify-center shadow-sm">
                    2
                  </span>
                  <h3 className="text-base font-extrabold text-[#1F201D] font-heading">
                    Item Category & Condition Grade
                  </h3>
                </div>

                {/* Category Floating Pills */}
                <div>
                  <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-2 ml-1">
                    Select Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = categoryId === cat.id;
                      return (
                        <motion.button
                          key={cat.id}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCategoryId(cat.id)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-subtle ${
                            isSelected
                              ? 'bg-[#5E6F3D] text-[#FAF9F5] shadow-md'
                              : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
                          }`}
                        >
                          {cat.name}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Condition Grade Floating Pills */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-2 ml-1">
                    Item Condition *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {Object.keys(CONDITION_GRADES).map((grade) => {
                      const isSelected = condition === grade;
                      const gradeInfo = CONDITION_GRADES[grade as ConditionGrade];
                      return (
                        <motion.button
                          key={grade}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setCondition(grade as ConditionGrade)}
                          className={`p-3 rounded-2xl text-left transition-all shadow-subtle ${
                            isSelected
                              ? 'bg-[#5E6F3D] text-[#FAF9F5] shadow-md'
                              : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
                          }`}
                        >
                          <div className="font-extrabold text-xs">{grade}</div>
                          <div
                            className={`text-[10px] mt-0.5 line-clamp-1 ${
                              isSelected ? 'text-[#FAF9F5]/80' : 'text-[#6E6D68]'
                            }`}
                          >
                            {gradeInfo.description}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Item Title, Asking Price & Notes */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5E6F3D] text-[#FAF9F5] font-black text-xs flex items-center justify-center shadow-sm">
                    3
                  </span>
                  <h3 className="text-base font-extrabold text-[#1F201D] font-heading">
                    Item Details & Pricing
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                      Item Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electric Kettle 1.5L / Casio FX-991 Calculator"
                      value={itemTitle}
                      onChange={(e) => setItemTitle(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm font-semibold text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                      Expected Price (KES)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 800"
                      value={askingPrice}
                      onChange={(e) => setAskingPrice(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm font-semibold text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                    Description & Included Accessories
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention any accessories, cables, age, or notes about the item's condition..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-1.5 ml-1">
                    Photo URL (Optional)
                  </label>
                  <div className="relative">
                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6D68]" />
                    <input
                      type="text"
                      placeholder="Paste an image link or our campus photographer will take photos"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#FAF9F5] rounded-2xl text-xs sm:text-sm text-[#1F201D] placeholder:text-[#6E6D68]/60 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#5E6F3D] hover:bg-[#4D5D32] text-[#FAF9F5] font-extrabold rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Submit Item For MiThrift Inspection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
