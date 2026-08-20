'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES } from '@/lib/constants';
import { BarChart3, TrendingUp, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { getAdminStats, products } = useStore();
  const stats = getAdminStats();

  const totalMargin =
    stats.totalRevenue > 0
      ? Math.round((stats.estimatedProfit / stats.totalRevenue) * 100)
      : 0;

  // Category revenue breakdown
  const categoryStats = CATEGORIES.map((cat) => {
    const catProducts = products.filter((p) => p.categoryId === cat.id);
    const count = catProducts.length;
    const soldCount = catProducts.filter((p) => p.status === 'SOLD').length;
    let categoryRevenue = 0;
    catProducts.forEach((p) => {
      if (p.status === 'SOLD') categoryRevenue += p.sellingPrice;
    });

    return {
      category: cat,
      count,
      soldCount,
      revenue: categoryRevenue,
    };
  }).filter((c) => c.count > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-2xl font-extrabold text-charcoal font-heading flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-olive" />
          Profitability & Inventory Turnover Analytics
        </h1>
        <p className="text-xs text-muted-clay mt-0.5">
          Real-time margin analysis, acquisition vs selling performance, and category profitability.
        </p>
      </div>

      {/* Top Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-canvas p-5 rounded-2xl border border-oatmeal shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-clay uppercase">Total Gross Profit</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-charcoal font-heading">
            {formatPrice(stats.estimatedProfit)}
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-1">
            Average Profit Margin: {totalMargin}%
          </p>
        </div>

        <div className="bg-canvas p-5 rounded-2xl border border-oatmeal shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-clay uppercase">Inventory Turnover</span>
            <PieChart className="w-4 h-4 text-olive" />
          </div>
          <div className="text-2xl font-extrabold text-charcoal font-heading">
            {stats.totalInventory > 0
              ? Math.round((stats.soldItems / stats.totalInventory) * 100)
              : 0}%
          </div>
          <p className="text-xs text-muted-clay mt-1">
            {stats.soldItems} of {stats.totalInventory} items sold
          </p>
        </div>

        <div className="bg-canvas p-5 rounded-2xl border border-oatmeal shadow-subtle">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-clay uppercase">Active Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-charcoal font-heading">
            {formatPrice(stats.inventoryValue)}
          </div>
          <p className="text-xs text-muted-clay mt-1">
            Unsold inventory listed in catalog
          </p>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-canvas p-6 rounded-2xl border border-oatmeal shadow-subtle space-y-4">
        <h2 className="text-base font-bold text-charcoal font-heading">
          Category Profitability Performance
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal border-collapse">
            <thead className="bg-sandstone/80 border-b border-oatmeal uppercase font-mono text-[10px] text-muted-clay tracking-wider">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Total Listed</th>
                <th className="py-3 px-4 text-center">Items Sold</th>
                <th className="py-3 px-4 text-right">Category Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-oatmeal/60">
              {categoryStats.map((item) => (
                <tr key={item.category.id} className="hover:bg-sandstone/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-charcoal flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.category.textColor }}
                    />
                    {item.category.name}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold">{item.count}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                    {item.soldCount}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-extrabold text-olive">
                    {formatPrice(item.revenue)}
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
