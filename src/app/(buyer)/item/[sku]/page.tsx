'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Share2,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { ConditionBadge, StatusBadge } from '@/components/ui/Badge';
import { calculateDiscount, formatPrice, generateWhatsAppUrl } from '@/lib/utils';
import { PickupSelector } from '@/components/buyer/PickupSelector';
import { Modal } from '@/components/ui/Modal';
import { ProductGrid } from '@/components/buyer/ProductGrid';
import { CATEGORIES } from '@/lib/constants';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const skuParam = (params.sku as string)?.toUpperCase();

  const { products, pickupLocations, createReservation, isFavorite, toggleFavorite } = useStore();

  const product = products.find(
    (p) => p.sku.toUpperCase() === skuParam || p.id === params.sku || p.slug === params.sku
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPickupId, setSelectedPickupId] = useState(
    pickupLocations[0]?.id || 'loc-library'
  );
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-oatmeal flex items-center justify-center mx-auto text-muted-clay">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-charcoal font-heading">
          Item Not Found
        </h1>
        <p className="text-sm text-muted-clay max-w-md mx-auto">
          The requested SKU <strong>{params.sku}</strong> does not exist or may have been sold out and archived.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-olive text-canvas font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.categoryId) || CATEGORIES[10];
  const selectedPickup = pickupLocations.find((l) => l.id === selectedPickupId);
  const discount = calculateDiscount(product.sellingPrice, product.referencePrice);
  const favorited = isFavorite(product.id);
  const isAvailable = product.status === 'AVAILABLE';

  const waUrl = generateWhatsAppUrl({
    productTitle: product.title,
    sku: product.sku,
    price: product.sellingPrice,
    pickupLocationName: selectedPickup ? selectedPickup.name : 'Library Gate',
  });

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    try {
      const order = createReservation({
        productId: product.id,
        customerName,
        customerPhone,
        customerCampus: 'Main Campus',
        pickupLocationId: selectedPickupId,
      });

      setReservationSuccess(order.id);
    } catch (err) {
      console.error(err);
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Breadcrumb row */}
      <div className="flex items-center justify-between text-xs text-muted-clay">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 font-bold text-charcoal hover:text-olive transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
        <span className="font-mono">SKU: {product.sku}</span>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Image Gallery Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-oatmeal/40 border border-oatmeal shadow-card">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              <ConditionBadge grade={product.condition} size="md" />
              <StatusBadge status={product.status} size="md" />
            </div>

            {/* Favorite & Share Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShareLink}
                className="p-2.5 rounded-full bg-canvas/90 text-charcoal hover:bg-canvas shadow-md transition-transform"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`p-2.5 rounded-full shadow-md transition-transform ${
                  favorited ? 'bg-rose-500 text-white' : 'bg-canvas/90 text-charcoal'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* 1-of-1 Scarcity Tag */}
            {isAvailable && (
              <div className="absolute bottom-4 left-4 bg-charcoal/90 text-canvas backdrop-blur-md text-xs font-bold px-3 py-1 rounded-lg">
                1 of 1 available
              </div>
            )}
          </div>

          {/* Image Thumbnails if multiple */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-olive shadow-sm scale-105'
                      : 'border-oatmeal opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {copiedLink && (
            <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold text-center rounded-xl border border-emerald-200">
              Link copied to clipboard! Share on WhatsApp.
            </div>
          )}
        </div>

        {/* Right Product Details Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category & Title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: category.bgHex, color: category.textColor }}
              >
                {category.name}
              </span>
              {product.dropName && (
                <span className="text-xs font-bold text-olive bg-sage-light px-3 py-1 rounded-full">
                  Part of {product.dropName}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal font-heading leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing Row */}
          <div className="p-4 bg-sandstone rounded-2xl border border-oatmeal flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-charcoal font-heading">
                  {formatPrice(product.sellingPrice)}
                </span>
                {product.referencePrice && (
                  <span className="text-sm text-muted-clay line-through">
                    {formatPrice(product.referencePrice)}
                  </span>
                )}
              </div>
              {discount && (
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  Save {discount}% compared to retail store price
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-muted-clay uppercase tracking-widest block">
                Price Guarantee
              </span>
              <span className="text-xs font-bold text-olive">No Bidding · Fixed Price</span>
            </div>
          </div>

          {/* Description & Inspection Notes */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Item Details & Condition Notes
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed bg-canvas p-4 rounded-xl border border-oatmeal">
              {product.description}
            </p>
            {product.conditionDetails && (
              <div className="flex items-start gap-2 text-xs text-muted-clay bg-sage-light/60 p-3 rounded-xl border border-olive/20">
                <ShieldCheck className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block">MiThrift Inspection Report:</strong>
                  {product.conditionDetails}
                </div>
              </div>
            )}
          </div>

          {/* Campus Pickup Location Picker */}
          <div className="pt-2">
            <PickupSelector
              locations={pickupLocations}
              selectedId={selectedPickupId}
              onSelect={setSelectedPickupId}
            />
          </div>

          {/* Ordering Action Buttons */}
          <div className="pt-4 border-t border-oatmeal space-y-3">
            {isAvailable ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-2xl shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order via WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-olive hover:bg-olive-hover text-canvas font-bold py-4 rounded-2xl shadow-md transition-all text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve for Pickup</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-oatmeal/60 rounded-2xl text-center">
                <StatusBadge status={product.status} size="md" />
                <p className="text-xs text-muted-clay mt-2">
                  This 1-of-1 item is currently reserved or sold out. Check out other items in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Category Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-oatmeal space-y-6">
          <h2 className="text-xl font-extrabold text-charcoal font-heading">
            More in {category.name}
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}

      {/* Reservation Modal */}
      <Modal
        isOpen={isReserveModalOpen}
        onClose={() => {
          setIsReserveModalOpen(false);
          setReservationSuccess(null);
        }}
        title="Reserve Item for Campus Pickup"
      >
        {reservationSuccess ? (
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-charcoal font-heading">Reservation Placed!</h3>
            <p className="text-xs text-muted-clay max-w-xs mx-auto">
              Your reservation code is <strong>{reservationSuccess}</strong>. The item has been put on hold for you at <strong>{selectedPickup?.name}</strong>.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Confirm Pickup Time on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmReservation} className="space-y-4">
            <div className="p-3 bg-sandstone rounded-xl border border-oatmeal text-xs space-y-1">
              <div className="font-bold text-charcoal">{product.title}</div>
              <div className="flex justify-between font-mono text-muted-clay">
                <span>SKU: {product.sku}</span>
                <span className="font-bold text-olive">{formatPrice(product.sellingPrice)}</span>
              </div>
              <div className="text-muted-clay pt-1">
                Pickup Station: <strong>{selectedPickup?.name}</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kevin Maina"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2.5 bg-canvas border border-oatmeal rounded-xl text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +254 712 345 678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-canvas border border-oatmeal rounded-xl text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-olive hover:bg-olive-hover text-canvas font-bold rounded-xl text-sm shadow-md transition-all"
            >
              Confirm Reservation (Free Hold)
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
