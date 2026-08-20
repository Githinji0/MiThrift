'use client';

import React from 'react';
import { useStore } from '@/hooks/useStore';
import { formatPrice } from '@/lib/utils';
import { DollarSign, Phone, CheckCircle2, Clock } from 'lucide-react';

export default function AdminConsignmentsPage() {
  const { products, updateProduct } = useStore();

  const consignmentItems = products.filter((p) => p.inventoryType === 'CONSIGNMENT');

  let totalSellingValue = 0;
  let totalMiThriftCommission = 0;
  let totalSellerPayouts = 0;

  consignmentItems.forEach((item) => {
    const comm = item.commissionRate || 0.25;
    const mithriftShare = item.sellingPrice * comm;
    const sellerShare = item.sellingPrice - mithriftShare;

    totalSellingValue += item.sellingPrice;
    totalMiThriftCommission += mithriftShare;
    totalSellerPayouts += sellerShare;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-2xl font-extrabold text-charcoal font-heading flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-olive" />
          Consignment Payout & Commission Tracker
        </h1>
        <p className="text-xs text-muted-clay mt-0.5">
          Track student-owned inventory, 25% MiThrift commission splits, and pending seller payouts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-canvas p-4 rounded-xl border border-oatmeal">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">
            Total Consignment Volume
          </span>
          <span className="text-xl font-extrabold text-charcoal font-heading">
            {formatPrice(totalSellingValue)}
          </span>
          <span className="text-xs text-muted-clay block mt-1">
            {consignmentItems.length} consigned items listed
          </span>
        </div>

        <div className="bg-canvas p-4 rounded-xl border border-oatmeal">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">
            MiThrift 25% Share
          </span>
          <span className="text-xl font-extrabold text-emerald-700 font-heading">
            {formatPrice(totalMiThriftCommission)}
          </span>
          <span className="text-xs text-muted-clay block mt-1">Net revenue earned</span>
        </div>

        <div className="bg-canvas p-4 rounded-xl border border-oatmeal">
          <span className="text-[10px] font-bold text-muted-clay uppercase block">
            Total Student Seller Payouts
          </span>
          <span className="text-xl font-extrabold text-olive font-heading">
            {formatPrice(totalSellerPayouts)}
          </span>
          <span className="text-xs text-muted-clay block mt-1">To be remitted to owners</span>
        </div>
      </div>

      {/* Consignment Table */}
      <div className="bg-canvas border border-oatmeal rounded-2xl overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal border-collapse">
            <thead className="bg-sandstone/80 border-b border-oatmeal uppercase font-mono text-[10px] text-muted-clay tracking-wider">
              <tr>
                <th className="py-3 px-4">Item & SKU</th>
                <th className="py-3 px-4">Consignor / Owner</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Selling Price</th>
                <th className="py-3 px-4 text-right">MiThrift (25%)</th>
                <th className="py-3 px-4 text-right">Seller Payout (75%)</th>
                <th className="py-3 px-4 text-center">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-oatmeal/60">
              {consignmentItems.map((item) => {
                const commRate = item.commissionRate || 0.25;
                const miThriftShare = item.sellingPrice * commRate;
                const sellerShare = item.sellingPrice - miThriftShare;

                return (
                  <tr key={item.id} className="hover:bg-sandstone/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-charcoal block line-clamp-1">{item.title}</span>
                      <span className="font-mono text-[10px] text-muted-clay">{item.sku}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-charcoal block font-heading">
                        {item.consignorName || 'Student Consignor'}
                      </span>
                      <span className="text-[11px] text-muted-clay flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-olive" />
                        {item.consignorPhone || 'Phone unavailable'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.status === 'SOLD'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-charcoal">
                      {formatPrice(item.sellingPrice)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-extrabold text-emerald-700">
                      +{formatPrice(miThriftShare)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-extrabold text-olive">
                      {formatPrice(sellerShare)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {item.status === 'SOLD' ? (
                        <button
                          onClick={() =>
                            updateProduct(item.id, {
                              consignorName: `${item.consignorName || ''} (Paid)`,
                            })
                          }
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-700 text-white shadow-sm"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-[10px] text-muted-clay">Awaiting Sale</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
