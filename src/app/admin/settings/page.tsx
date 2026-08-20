'use client';

import React, { useState } from 'react';
import { Settings, Phone, Lock, Save, CheckCircle2 } from 'lucide-react';
import { STORE_NAME, STORE_WHATSAPP_NUMBER } from '@/lib/constants';

export default function AdminSettingsPage() {
  const [waNumber, setWaNumber] = useState(STORE_WHATSAPP_NUMBER);
  const [storeTitle, setStoreTitle] = useState(STORE_NAME);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-2xl font-extrabold text-charcoal font-heading flex items-center gap-2">
          <Settings className="w-6 h-6 text-olive" />
          Store & Admin Configuration
        </h1>
        <p className="text-xs text-muted-clay mt-0.5">
          Manage store defaults, WhatsApp order integration parameters & security locks.
        </p>
      </div>

      <div className="bg-canvas p-6 rounded-2xl border border-oatmeal shadow-subtle space-y-6">
        {isSaved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Store Brand Name
            </label>
            <input
              type="text"
              value={storeTitle}
              onChange={(e) => setStoreTitle(e.target.value)}
              className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
              Official WhatsApp Order Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-clay" />
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-mono font-bold"
              />
            </div>
            <p className="text-[11px] text-muted-clay mt-1">
              Used when generating dynamic pre-filled WhatsApp reservation links (`wa.me/254...`).
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-olive hover:bg-olive-hover text-canvas font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
