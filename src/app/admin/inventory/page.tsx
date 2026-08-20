'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/hooks/useStore';
import { formatPrice } from '@/lib/utils';
import { ConditionBadge, StatusBadge } from '@/components/ui/Badge';
import { QuickIntakeModal } from '@/components/admin/QuickIntakeModal';
import { ProductStatus } from '@/types';
import { Plus, Search, Trash2, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminInventoryPage() {
  const { products, updateProductStatus, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isQuickIntakeOpen, setIsQuickIntakeOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      if (!matchTitle && !matchSku) return false;
    }
    if (statusFilter !== 'all' && p.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-oatmeal pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal font-heading">
            Inventory Intake & Catalog
          </h1>
          <p className="text-xs text-muted-clay mt-0.5">
            30-second inventory intake, SKU assignment, cost pricing & live status controls.
          </p>
        </div>

        <button
          onClick={() => setIsQuickIntakeOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-olive hover:bg-olive-hover text-canvas font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>+ 30-Sec Add Item</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-clay" />
          <input
            type="text"
            placeholder="Search by SKU or item title..."
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
          <option value="all">All Statuses ({products.length})</option>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="RESERVED">RESERVED</option>
          <option value="SOLD">SOLD OUT</option>
        </select>
      </div>

      {/* Inventory Data Table */}
      <div className="bg-canvas border border-oatmeal rounded-2xl overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal border-collapse">
            <thead className="bg-sandstone/80 border-b border-oatmeal uppercase font-mono text-[10px] text-muted-clay tracking-wider">
              <tr>
                <th className="py-3 px-4">Item & SKU</th>
                <th className="py-3 px-4">Condition</th>
                <th className="py-3 px-4">Acquisition Model</th>
                <th className="py-3 px-4 text-right">Cost</th>
                <th className="py-3 px-4 text-right">Selling Price</th>
                <th className="py-3 px-4 text-right">Profit</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-oatmeal/60">
              {filteredProducts.map((p) => {
                const profit =
                  p.inventoryType === 'DIRECT_BUYOUT'
                    ? p.sellingPrice - p.acquisitionPrice
                    : p.sellingPrice * (p.commissionRate || 0.25);

                return (
                  <tr key={p.id} className="hover:bg-sandstone/30 transition-colors">
                    {/* Image & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-oatmeal/40 border border-oatmeal shrink-0">
                          <Image
                            src={p.images[0] || 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6'}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-muted-clay block text-[10px]">
                            {p.sku}
                          </span>
                          <span className="font-bold text-charcoal font-heading leading-tight line-clamp-1">
                            {p.title}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Condition */}
                    <td className="py-3 px-4">
                      <ConditionBadge grade={p.condition} />
                    </td>

                    {/* Source Model */}
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {p.inventoryType === 'DIRECT_BUYOUT' ? (
                        <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Direct Buyout
                        </span>
                      ) : (
                        <span className="text-purple-800 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          Consignment (25%)
                        </span>
                      )}
                    </td>

                    {/* Cost */}
                    <td className="py-3 px-4 text-right font-mono text-muted-clay">
                      {p.inventoryType === 'DIRECT_BUYOUT' ? formatPrice(p.acquisitionPrice) : 'KES 0'}
                    </td>

                    {/* Selling Price */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-charcoal">
                      {formatPrice(p.sellingPrice)}
                    </td>

                    {/* Profit */}
                    <td className="py-3 px-4 text-right font-mono font-extrabold text-emerald-700">
                      +{formatPrice(profit)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4 text-center">
                      <select
                        value={p.status}
                        onChange={(e) =>
                          updateProductStatus(p.id, e.target.value as ProductStatus)
                        }
                        className="text-[11px] font-bold py-1 px-2 rounded-lg border border-oatmeal bg-canvas cursor-pointer"
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="RESERVED">RESERVED</option>
                        <option value="SOLD">SOLD</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <QuickIntakeModal
        isOpen={isQuickIntakeOpen}
        onClose={() => setIsQuickIntakeOpen(false)}
      />
    </div>
  );
}
