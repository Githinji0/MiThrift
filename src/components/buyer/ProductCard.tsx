'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, MapPin, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { calculateDiscount, formatPrice } from '@/lib/utils';
import { ConditionBadge, StatusBadge } from '@/components/ui/Badge';
import { useStore } from '@/hooks/useStore';
import { Modal } from '@/components/ui/Modal';
import { generateWhatsAppUrl } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickReserve?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const favorited = isFavorite(product.id);

  const category = CATEGORIES.find((c) => c.id === product.categoryId) || CATEGORIES[10];
  const discount = calculateDiscount(product.sellingPrice, product.referencePrice);
  const isAvailable = product.status === 'AVAILABLE';
  const isReserved = product.status === 'RESERVED';
  const isSold = product.status === 'SOLD';

  const waUrl = generateWhatsAppUrl({
    productTitle: product.title,
    sku: product.sku,
    price: product.sellingPrice,
  });

  return (
    <>
      <div className="group relative flex flex-col bg-sandstone/70 rounded-3xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300">
        {/* Top Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-sandstone">
          <Link href={`/item/${product.sku}`} className="block w-full h-full">
            <Image
              src={product.images[0] || 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6'}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                isSold ? 'grayscale opacity-75' : ''
              }`}
            />
          </Link>

          {/* Condition Badge top-left */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            <ConditionBadge grade={product.condition} />
            {product.dropName && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-olive text-canvas px-2.5 py-0.5 rounded-full shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                {product.dropName.split(' ')[0]} Drop
              </span>
            )}
          </div>

          {/* Status Badge top-right */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <StatusBadge status={product.status} />
          </div>

          {/* Scarcity 1-of-1 Tag */}
          {isAvailable && (
            <div className="absolute bottom-2.5 left-2.5 z-10 bg-charcoal/85 text-canvas backdrop-blur-md text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm">
              1 available
            </div>
          )}

          {/* Favorite & Quick View Floating Buttons */}
          <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="p-2 rounded-full bg-canvas/90 text-charcoal hover:bg-canvas hover:scale-105 shadow-sm transition-transform"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-transform hover:scale-105 ${
                favorited
                  ? 'bg-rose-500 text-white'
                  : 'bg-canvas/90 text-charcoal hover:bg-canvas'
              }`}
              title={favorited ? 'Remove from favorites' : 'Save to favorites'}
              aria-label="Favorite"
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-4 justify-between">
          <div>
            {/* Category & SKU row */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: category.bgHex, color: category.textColor }}
              >
                {category.name}
              </span>
              <span className="text-[10px] font-mono text-muted-clay uppercase tracking-wider">
                {product.sku}
              </span>
            </div>

            {/* Title */}
            <Link href={`/item/${product.sku}`}>
              <h3 className="text-xs sm:text-sm font-bold text-charcoal line-clamp-2 hover:text-olive transition-colors font-heading leading-tight">
                {product.title}
              </h3>
            </Link>
          </div>

          {/* Pricing & CTA */}
          <div className="mt-3 pt-2.5 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm sm:text-base font-extrabold text-charcoal font-heading">
                  {formatPrice(product.sellingPrice)}
                </span>
                {product.referencePrice && (
                  <span className="text-[11px] text-muted-clay line-through">
                    {formatPrice(product.referencePrice)}
                  </span>
                )}
              </div>
              {discount && (
                <span className="text-[10px] font-bold text-emerald-700 block">
                  Save {discount}% off retail
                </span>
              )}
            </div>

            {/* Direct action button */}
            {isAvailable && (
              <Link
                href={`/item/${product.sku}`}
                className="text-xs font-bold text-canvas bg-olive hover:bg-olive-hover px-3.5 py-1.5 rounded-xl shadow-sm transition-all text-center"
              >
                Reserve
              </Link>
            )}
            {isReserved && (
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-xl">
                On Hold
              </span>
            )}
            {isSold && (
              <span className="text-[11px] font-bold text-stone-500">
                Gone
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        maxWidth="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-sandstone">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ConditionBadge grade={product.condition} size="md" />
                <StatusBadge status={product.status} size="md" />
              </div>

              <h2 className="text-lg font-bold text-charcoal font-heading leading-snug">
                {product.title}
              </h2>
              <p className="text-xs font-mono text-muted-clay mt-1">SKU: {product.sku}</p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-charcoal">
                  {formatPrice(product.sellingPrice)}
                </span>
                {product.referencePrice && (
                  <span className="text-sm text-muted-clay line-through">
                    {formatPrice(product.referencePrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-charcoal/80 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-4 p-3.5 bg-sandstone rounded-2xl text-xs text-charcoal space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-olive">
                  <MapPin className="w-4 h-4" />
                  <span>Campus Pickup Available</span>
                </div>
                <p className="text-muted-clay pl-5">
                  Pick up at Library Gate, Student Center, or Hall 4.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {isAvailable ? (
                <>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-2xl shadow-sm transition-colors text-sm"
                  >
                    Order via WhatsApp
                  </a>
                  <Link
                    href={`/item/${product.sku}`}
                    onClick={() => setIsQuickViewOpen(false)}
                    className="w-full inline-flex items-center justify-center bg-olive hover:bg-olive-hover text-white font-bold py-3 rounded-2xl transition-colors text-sm"
                  >
                    Full Product Details
                  </Link>
                </>
              ) : (
                <Link
                  href={`/item/${product.sku}`}
                  onClick={() => setIsQuickViewOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-sandstone text-charcoal font-bold py-3 rounded-2xl text-sm"
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
