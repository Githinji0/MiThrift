'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';
import { ProfitStatCard } from '@/components/admin/ProfitStatCard';
import { formatPrice } from '@/lib/utils';
import {
  Package,
  CheckCircle2,
  Clock,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge';

export default function AdminOverviewPage() {
  const { getAdminStats, orders, products } = useStore();
  const stats = getAdminStats();

  const recentOrders = orders.slice(0, 5);
  const recentProducts = products.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-oatmeal pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal font-heading">
            Admin Overview Dashboard
          </h1>
          <p className="text-xs text-muted-clay mt-0.5">
            Real-time inventory metrics, order fulfillment & financial profitability.
          </p>
        </div>

        <Link
          href="/admin/inventory"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-olive hover:bg-olive-hover text-canvas font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Quick 30-Sec Intake</span>
        </Link>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProfitStatCard
          title="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          subtitle={`${stats.soldItems} items sold`}
          icon={DollarSign}
        />
        <ProfitStatCard
          title="Estimated Gross Profit"
          value={formatPrice(stats.estimatedProfit)}
          subtitle="Direct margin + 25% consignment share"
          icon={TrendingUp}
        />
        <ProfitStatCard
          title="Unsold Inventory Value"
          value={formatPrice(stats.inventoryValue)}
          subtitle={`${stats.availableItems} active available items`}
          icon={Package}
        />
        <ProfitStatCard
          title="Pending Pickups"
          value={String(stats.pendingPickups)}
          subtitle="Orders awaiting gate collection"
          icon={MapPin}
        />
      </div>

      {/* Secondary Metric Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-canvas p-4 rounded-xl border border-oatmeal text-center">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">Available Items</span>
          <span className="text-xl font-extrabold text-emerald-700">{stats.availableItems}</span>
        </div>

        <div className="bg-canvas p-4 rounded-xl border border-oatmeal text-center">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">Reserved Items</span>
          <span className="text-xl font-extrabold text-amber-700">{stats.reservedItems}</span>
        </div>

        <div className="bg-canvas p-4 rounded-xl border border-oatmeal text-center">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">Sold Items</span>
          <span className="text-xl font-extrabold text-charcoal">{stats.soldItems}</span>
        </div>

        <div className="bg-canvas p-4 rounded-xl border border-oatmeal text-center">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">Pending Seller Payouts</span>
          <span className="text-xl font-extrabold text-olive">{formatPrice(stats.pendingPayouts)}</span>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Recent Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-canvas p-6 rounded-2xl border border-oatmeal shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-charcoal font-heading flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-olive" />
              Recent Pickup Reservations
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-olive hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-3 bg-sandstone/50 rounded-xl border border-oatmeal flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-charcoal">{order.id}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="font-bold text-charcoal mt-1">{order.productTitle}</div>
                  <div className="text-[11px] text-muted-clay">
                    Customer: {order.customerName} ({order.customerPhone}) · {order.pickupLocationName}
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-olive">
                  {formatPrice(order.productPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inventory Additions */}
        <div className="bg-canvas p-6 rounded-2xl border border-oatmeal shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-charcoal font-heading flex items-center gap-2">
              <Package className="w-4 h-4 text-olive" />
              Recent Intake Additions
            </h2>
            <Link
              href="/admin/inventory"
              className="text-xs font-bold text-olive hover:underline flex items-center gap-1"
            >
              <span>Manage Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProducts.map((p) => {
              const profit =
                p.inventoryType === 'DIRECT_BUYOUT'
                  ? p.sellingPrice - p.acquisitionPrice
                  : p.sellingPrice * (p.commissionRate || 0.25);

              return (
                <div
                  key={p.id}
                  className="p-3 bg-sandstone/50 rounded-xl border border-oatmeal flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-muted-clay">{p.sku}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sage-light text-olive">
                        {p.inventoryType.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="font-bold text-charcoal mt-1 line-clamp-1">{p.title}</div>
                    <div className="text-[11px] text-muted-clay">
                      Condition: {p.condition} · Selling: {formatPrice(p.sellingPrice)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block font-mono font-bold text-emerald-700">
                      +{formatPrice(profit)} profit
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
