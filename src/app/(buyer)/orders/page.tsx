'use client';

import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge';
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils';
import { Package, Search, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.productTitle.toLowerCase().includes(q) ||
      o.productSku.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-3xl font-extrabold text-charcoal font-heading flex items-center gap-2">
          <Package className="w-7 h-7 text-olive" />
          Campus Pickup Reservations
        </h1>
        <p className="text-xs text-muted-clay mt-1">
          Lookup your active reservations and check campus station pickup status.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-clay" />
        <input
          type="text"
          placeholder="Lookup by Order ID (e.g. MITH-8421) or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-sandstone/70 border border-oatmeal rounded-xl text-sm text-charcoal focus:ring-2 focus:ring-olive/40 focus:outline-none"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-sandstone/40 rounded-3xl border border-dashed border-oatmeal">
            <Package className="w-12 h-12 text-muted-clay mx-auto mb-2" />
            <h3 className="text-base font-bold text-charcoal font-heading">No Reservations Found</h3>
            <p className="text-xs text-muted-clay mt-1">
              You don't have any active pickup reservations matching this search.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-5 py-2 bg-olive text-canvas font-bold text-xs rounded-xl"
            >
              Browse Shop Catalog
            </Link>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const waUrl = generateWhatsAppUrl({
              productTitle: order.productTitle,
              sku: order.productSku,
              price: order.productPrice,
              pickupLocationName: order.pickupLocationName,
            });

            return (
              <div
                key={order.id}
                className="p-5 bg-canvas rounded-2xl border border-oatmeal shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-sm text-charcoal">
                      {order.id}
                    </span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <span className="text-xs font-mono font-bold text-olive">
                    {formatPrice(order.productPrice)}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-charcoal font-heading">
                    {order.productTitle}
                  </h3>
                  <div className="text-xs font-mono text-muted-clay">SKU: {order.productSku}</div>
                </div>

                <div className="pt-2 border-t border-oatmeal flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-clay gap-2">
                  <div className="flex items-center gap-1.5 font-medium text-charcoal">
                    <MapPin className="w-4 h-4 text-olive" />
                    <span>Pickup Station: {order.pickupLocationName}</span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                    <span>Contact Station via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
