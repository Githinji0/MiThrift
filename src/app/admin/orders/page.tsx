'use client';

import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { formatPrice } from '@/lib/utils';
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge';
import { OrderStatus } from '@/types';
import { ShoppingBag, Search, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCustomer = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.includes(q);
      const matchSku = o.productSku.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchPhone && !matchSku) return false;
    }
    if (statusFilter !== 'all' && o.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-oatmeal pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal font-heading flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-olive" />
            Order & Pickup Management
          </h1>
          <p className="text-xs text-muted-clay mt-0.5">
            Manage campus station pickups, customer reservations, and payment status updates.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-clay" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, phone, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-canvas border border-oatmeal rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-olive/40"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-canvas border border-oatmeal rounded-xl text-xs font-bold text-charcoal"
        >
          <option value="all">All Order Statuses ({orders.length})</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="READY_FOR_PICKUP">READY FOR PICKUP</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-canvas border border-oatmeal rounded-2xl overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal border-collapse">
            <thead className="bg-sandstone/80 border-b border-oatmeal uppercase font-mono text-[10px] text-muted-clay tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Product & SKU</th>
                <th className="py-3 px-4">Pickup Station</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-center">Status Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-oatmeal/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-sandstone/30 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-extrabold text-charcoal block">
                      {order.id}
                    </span>
                    <span className="text-[10px] text-muted-clay font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-charcoal font-heading block">
                      {order.customerName}
                    </span>
                    <span className="text-[11px] text-muted-clay flex items-center gap-1">
                      <Phone className="w-3 h-3 text-olive" />
                      {order.customerPhone}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-charcoal line-clamp-1">{order.productTitle}</span>
                    <span className="font-mono text-[10px] text-muted-clay">
                      SKU: {order.productSku}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-olive flex items-center gap-1 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      {order.pickupLocationName}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-charcoal">
                    {formatPrice(order.productPrice)}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-[11px] font-bold py-1.5 px-2 rounded-lg border border-oatmeal bg-canvas cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="READY_FOR_PICKUP">READY FOR PICKUP</option>
                      <option value="COMPLETED">COMPLETED (PAID)</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
