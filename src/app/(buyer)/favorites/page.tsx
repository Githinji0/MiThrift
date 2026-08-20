'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';
import { ProductGrid } from '@/components/buyer/ProductGrid';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { products, favorites } = useStore();

  const savedProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-oatmeal pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-charcoal font-heading flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            Saved Items
          </h1>
          <p className="text-xs text-muted-clay mt-1">
            Keep track of 1-of-1 items you are eyeing before they sell out.
          </p>
        </div>
        <span className="text-xs font-bold text-olive bg-sage-light px-3 py-1 rounded-full">
          {savedProducts.length} Saved
        </span>
      </div>

      <ProductGrid
        products={savedProducts}
        emptyTitle="Your future find belongs here."
        emptySubtitle="Click the heart icon on any 1-of-1 product card while browsing to save items here."
      />
    </div>
  );
}
