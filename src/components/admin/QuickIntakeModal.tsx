'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { CATEGORIES, CONDITION_GRADES } from '@/lib/constants';
import { CategoryId, ConditionGrade, InventoryType } from '@/types';
import { generateSku, formatPrice } from '@/lib/utils';
import { useStore } from '@/hooks/useStore';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface QuickIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickIntakeModal: React.FC<QuickIntakeModalProps> = ({ isOpen, onClose }) => {
  const { addProduct, drops } = useStore();

  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState<CategoryId>('electronics');
  const [condition, setCondition] = useState<ConditionGrade>('Excellent');
  const [inventoryType, setInventoryType] = useState<InventoryType>('DIRECT_BUYOUT');
  const [acquisitionPrice, setAcquisitionPrice] = useState<number>(500);
  const [sellingPrice, setSellingPrice] = useState<number>(850);
  const [referencePrice, setReferencePrice] = useState<number>(1500);
  const [commissionRate, setCommissionRate] = useState<number>(0.25);
  const [consignorName, setConsignorName] = useState('');
  const [consignorPhone, setConsignorPhone] = useState('');
  const [dropId, setDropId] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAutoGenerateSku = () => {
    if (!title) return;
    const generated = generateSku(categoryId, title);
    setSku(generated);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!sku) {
      setSku(generateSku(categoryId, val));
    }
  };

  // Calculated Margins
  const grossProfit = sellingPrice - acquisitionPrice;
  const consignmentRevenue = sellingPrice * commissionRate;
  const sellerPayout = sellingPrice - consignmentRevenue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sellingPrice) return;

    const finalSku = sku || generateSku(categoryId, title);
    const finalImage =
      imageUrl ||
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?q=80&w=800&auto=format&fit=crop';

    const selectedDrop = drops.find((d) => d.id === dropId);

    addProduct({
      sku: finalSku,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description || 'Inspected and curated by MiThrift staff.',
      categoryId,
      images: [finalImage],
      sellingPrice: Number(sellingPrice),
      acquisitionPrice: inventoryType === 'DIRECT_BUYOUT' ? Number(acquisitionPrice) : 0,
      referencePrice: referencePrice ? Number(referencePrice) : undefined,
      condition,
      status: 'AVAILABLE',
      inventoryType,
      consignorName: inventoryType === 'CONSIGNMENT' ? consignorName : undefined,
      consignorPhone: inventoryType === 'CONSIGNMENT' ? consignorPhone : undefined,
      commissionRate: inventoryType === 'CONSIGNMENT' ? Number(commissionRate) : undefined,
      dropId: selectedDrop ? selectedDrop.id : undefined,
      dropName: selectedDrop ? selectedDrop.name : undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // reset fields
      setTitle('');
      setSku('');
      setDescription('');
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="30-Second Inventory Intake" maxWidth="xl">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-3" />
          <h3 className="text-xl font-bold text-charcoal font-heading">Product Published!</h3>
          <p className="text-sm text-muted-clay mt-1">
            Added to shop inventory as <strong>{sku}</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & SKU row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Item Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Electric Mini Kettle 1.5L"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-sm font-semibold text-charcoal focus:ring-2 focus:ring-olive/40 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                SKU
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Auto-generated"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-mono font-bold text-charcoal uppercase"
                />
                <button
                  type="button"
                  onClick={handleAutoGenerateSku}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-clay hover:text-olive"
                  title="Generate SKU"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as CategoryId)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-bold text-charcoal"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Condition Grade
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ConditionGrade)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-bold text-charcoal"
              >
                {Object.keys(CONDITION_GRADES).map((g) => (
                  <option key={g} value={g}>
                    {g} — {CONDITION_GRADES[g as ConditionGrade].description.substring(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Inventory Model Selector (Direct Buyout vs Consignment) */}
          <div className="p-3 bg-sandstone rounded-xl border border-oatmeal space-y-3">
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
              Acquisition Model
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInventoryType('DIRECT_BUYOUT')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  inventoryType === 'DIRECT_BUYOUT'
                    ? 'bg-olive text-canvas shadow-sm'
                    : 'bg-canvas text-charcoal border border-oatmeal'
                }`}
              >
                Direct Buyout (Owned)
              </button>
              <button
                type="button"
                onClick={() => setInventoryType('CONSIGNMENT')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  inventoryType === 'CONSIGNMENT'
                    ? 'bg-olive text-canvas shadow-sm'
                    : 'bg-canvas text-charcoal border border-oatmeal'
                }`}
              >
                Consignment (25% Commission)
              </button>
            </div>

            {/* Financial Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {inventoryType === 'DIRECT_BUYOUT' ? (
                <div>
                  <label className="block text-[11px] font-bold text-muted-clay mb-1">
                    Buyout Price Paid (KES)
                  </label>
                  <input
                    type="number"
                    value={acquisitionPrice}
                    onChange={(e) => setAcquisitionPrice(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-canvas border border-oatmeal rounded-lg text-xs font-bold"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-muted-clay mb-1">
                      Consignor Name
                    </label>
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={consignorName}
                      onChange={(e) => setConsignorName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-canvas border border-oatmeal rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-muted-clay mb-1">
                      Consignor Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+254..."
                      value={consignorPhone}
                      onChange={(e) => setConsignorPhone(e.target.value)}
                      className="w-full px-3 py-1.5 bg-canvas border border-oatmeal rounded-lg text-xs"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold text-charcoal mb-1">
                  Store Selling Price (KES) *
                </label>
                <input
                  type="number"
                  required
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-canvas border border-olive rounded-lg text-xs font-bold text-olive"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-muted-clay mb-1">
                  Reference Price (KES)
                </label>
                <input
                  type="number"
                  placeholder="Original Retail"
                  value={referencePrice}
                  onChange={(e) => setReferencePrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-canvas border border-oatmeal rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Profit Margin Preview Card */}
            <div className="bg-canvas p-2.5 rounded-lg border border-oatmeal flex items-center justify-between text-xs font-mono">
              <span className="text-muted-clay">Expected Profit Margin:</span>
              {inventoryType === 'DIRECT_BUYOUT' ? (
                <span className="font-bold text-emerald-700">
                  + {formatPrice(grossProfit)} (Gross Profit)
                </span>
              ) : (
                <span className="font-bold text-emerald-700">
                  + {formatPrice(consignmentRevenue)} (MiThrift 25% Share) · Seller Payout:{' '}
                  {formatPrice(sellerPayout)}
                </span>
              )}
            </div>
          </div>

          {/* Flash Drop & Photo URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Assign to Flash Drop
              </label>
              <select
                value={dropId}
                onChange={(e) => setDropId(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs text-charcoal"
              >
                <option value="">No Drop (Standard Feed)</option>
                {drops.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.releaseDate})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Short Description / Inspection Notes
            </label>
            <textarea
              rows={2}
              placeholder="Clean condition, inspected auto-shutoff switch..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-olive hover:bg-olive-hover text-canvas font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Publish Item Immediately
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
