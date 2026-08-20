'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import { ProductFilters, FilterState } from '@/components/buyer/ProductFilters';
import { ProductGrid } from '@/components/buyer/ProductGrid';
import { CategoryId } from '@/types';
import { Sparkles, ShieldCheck, MapPin, Zap } from 'lucide-react';

function ShopContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get('category') as CategoryId) || 'all';

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: initialCategory,
    condition: 'all',
    status: 'all',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'newest',
  });

  useEffect(() => {
    const cat = searchParams.get('category') as CategoryId;
    if (cat) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchesTitle = product.title.toLowerCase().includes(q);
          const matchesSku = product.sku.toLowerCase().includes(q);
          const matchesDesc = product.description.toLowerCase().includes(q);
          if (!matchesTitle && !matchesSku && !matchesDesc) return false;
        }

        // Category filter
        if (filters.category !== 'all' && product.categoryId !== filters.category) {
          return false;
        }

        // Condition filter
        if (filters.condition !== 'all' && product.condition !== filters.condition) {
          return false;
        }

        // Status filter
        if (filters.status !== 'all' && product.status !== filters.status) {
          return false;
        }

        // Price range filter
        if (
          product.sellingPrice < filters.minPrice ||
          product.sellingPrice > filters.maxPrice
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
        if (filters.sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
        if (filters.sortBy === 'popular') return (b.viewCount || 0) - (a.viewCount || 0);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, filters]);

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'all',
      condition: 'all',
      status: 'all',
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'newest',
    });
  };

  return (
    <div className="space-y-8">
      <ProductFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleReset}
        totalResults={filteredProducts.length}
      />

      <ProductGrid
        products={filteredProducts}
        emptyTitle="We couldn't find that one."
        emptySubtitle="Try adjusting your category, price range, or search keyword to find matching items."
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* 1. Fluid Editorial Hero Banner */}
      <div className="relative bg-[#EFEAE1] rounded-[2.5rem] sm:rounded-[3.25rem] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-card text-center space-y-4">
        {/* Ambient background glows */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#5E6F3D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#7A8C53]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F5] px-4 py-1.5 rounded-full shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#5E6F3D]" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#5E6F3D]">
              Verified 1-of-1 Campus Finds
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F201D] font-heading tracking-tight leading-[1.05] uppercase">
            Shop Inspected <br />
            <span className="text-[#5E6F3D]">Campus Essentials.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6D68] max-w-lg mx-auto leading-relaxed">
            Every item is acquired, tested, and photographed by MiThrift. Fixed student-friendly prices with quick campus pickup.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="relative z-10 pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Staff Inspected & Graded</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Fixed Student Pricing</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF9F5]/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1F201D] shadow-subtle">
            <MapPin className="w-3.5 h-3.5 text-[#5E6F3D]" />
            <span>Free Campus Gate Pickup</span>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="py-12 text-center text-xs text-[#6E6D68]">Loading catalog...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  );
}
