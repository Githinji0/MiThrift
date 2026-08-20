'use client';

import React, { useState } from 'react';
import { Search, Filter, X, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, CONDITION_GRADES } from '@/lib/constants';
import { CategoryId, ConditionGrade, ProductStatus } from '@/types';

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  condition: ConditionGrade | 'all';
  status: ProductStatus | 'all';
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular';
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleCategoryClick = (catId: CategoryId | 'all') => {
    onFilterChange({ ...filters, category: catId });
  };

  return (
    <div className="space-y-5">
      {/* 1. Top Search & Controls Row (Pill-based) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Pill Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6D68]" />
          <input
            type="text"
            placeholder="Search catalog by title, SKU, brand, or keyword..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-11 pr-10 py-3 bg-[#FAF9F5] rounded-full text-xs sm:text-sm font-semibold text-[#1F201D] placeholder:text-[#6E6D68]/70 shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#6E6D68] hover:text-[#1F201D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Pill Select */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
              className="appearance-none pl-4 pr-9 py-3 bg-[#FAF9F5] rounded-full text-xs font-bold text-[#1F201D] shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#5E6F3D]/30 cursor-pointer"
            >
              <option value="newest">Sort: Newest Drops</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E6D68]">
              ▾
            </div>
          </div>

          {/* Advanced Filter Toggle Pill */}
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all shadow-subtle ${
              isAdvancedOpen || filters.condition !== 'all' || filters.status !== 'all'
                ? 'bg-[#5E6F3D] text-[#FAF9F5] shadow-md'
                : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* 2. Horizontal Floating Category Pills Bar */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-subtle ${
              filters.category === 'all'
                ? 'bg-[#5E6F3D] text-[#FAF9F5] scale-105 shadow-md'
                : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-subtle ${
                  isSelected
                    ? 'bg-[#5E6F3D] text-[#FAF9F5] scale-105 shadow-md'
                    : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Advanced Filter Drawer (Clean, Borderless Pill Panel) */}
      {isAdvancedOpen && (
        <div className="bg-[#EFEAE1]/70 rounded-3xl p-6 shadow-card space-y-6 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Condition Grade Pills */}
            <div>
              <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-2.5">
                Condition Grade
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => onFilterChange({ ...filters, condition: 'all' })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-subtle ${
                    filters.condition === 'all'
                      ? 'bg-[#5E6F3D] text-[#FAF9F5]'
                      : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
                  }`}
                >
                  Any
                </button>
                {Object.keys(CONDITION_GRADES).map((grade) => (
                  <button
                    key={grade}
                    onClick={() =>
                      onFilterChange({ ...filters, condition: grade as ConditionGrade })
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-subtle ${
                      filters.condition === grade
                        ? 'bg-[#5E6F3D] text-[#FAF9F5]'
                        : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Status Pills */}
            <div>
              <label className="block text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider mb-2.5">
                Availability
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'AVAILABLE', label: 'Available Now' },
                  { id: 'RESERVED', label: 'On Hold' },
                  { id: 'SOLD', label: 'Sold Out' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        status: item.id as ProductStatus | 'all',
                      })
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-subtle ${
                      filters.status === item.id
                        ? 'bg-[#5E6F3D] text-[#FAF9F5]'
                        : 'bg-[#FAF9F5] text-[#1F201D] hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-[#6E6D68] uppercase tracking-wider">
                  Max Price: KES {filters.maxPrice.toLocaleString()}
                </label>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={filters.maxPrice}
                onChange={(e) =>
                  onFilterChange({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="w-full accent-[#5E6F3D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6E6D68] mt-1 font-mono">
                <span>KES 100</span>
                <span>KES 10,000+</span>
              </div>
            </div>
          </div>

          {/* Reset Filters Pill */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF9F5] hover:bg-white text-xs font-bold text-[#6E6D68] hover:text-[#1F201D] shadow-subtle transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Results Count Summary */}
      <div className="flex items-center justify-between text-xs text-[#6E6D68] px-2">
        <span>
          Showing <strong className="text-[#1F201D]">{totalResults}</strong> curated 1-of-1 item
          {totalResults === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  );
};
