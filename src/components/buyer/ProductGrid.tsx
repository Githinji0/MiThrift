'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { PackageX, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  emptyTitle = 'Nothing here yet.',
  emptySubtitle = "Check back soon or explore other categories when the next drop lands.",
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-sandstone/70 rounded-3xl h-72 p-4 flex flex-col justify-between"
          >
            <div className="bg-oatmeal/60 rounded-2xl h-40 w-full mb-3" />
            <div className="space-y-2">
              <div className="bg-oatmeal/60 h-4 rounded w-3/4" />
              <div className="bg-oatmeal/60 h-3 rounded w-1/2" />
            </div>
            <div className="bg-oatmeal/60 h-6 rounded w-1/3 mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 my-8 text-center bg-sandstone/40 rounded-3xl">
        <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center text-olive mb-4">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-charcoal font-heading mb-1">{emptyTitle}</h3>
        <p className="text-sm text-muted-clay max-w-md mb-6">{emptySubtitle}</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-olive text-canvas font-bold text-xs hover:bg-olive-hover shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Browse All Inventory
        </Link>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};
