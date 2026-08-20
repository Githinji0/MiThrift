'use client';

import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { QuickIntakeModal } from '@/components/admin/QuickIntakeModal';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated, loginAdmin } = useStore();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isQuickIntakeOpen, setIsQuickIntakeOpen] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setErrorMsg('Invalid admin passcode. Try "mithrift2026" or "admin".');
    } else {
      setErrorMsg('');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-charcoal text-canvas">
        <div className="w-full max-w-md bg-canvas/10 backdrop-blur-md p-8 rounded-3xl border border-muted-clay/30 space-y-6 shadow-float">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-olive text-canvas flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold font-heading text-canvas">
              MiThrift Staff Portal
            </h1>
            <p className="text-xs text-muted-clay">
              Enter passcode to manage inventory, intake, orders & profit analytics.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-clay uppercase tracking-wider mb-1">
                Passcode
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-clay" />
                <input
                  type="password"
                  required
                  placeholder="Enter passcode (e.g. mithrift2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-canvas/10 border border-muted-clay/40 rounded-xl text-sm font-mono text-canvas placeholder:text-muted-clay focus:outline-none focus:ring-2 focus:ring-olive"
                />
              </div>
              {errorMsg && <p className="text-xs text-rose-400 font-bold mt-1.5">{errorMsg}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-olive hover:bg-olive-hover text-canvas font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-muted-clay/20 text-center">
            <Link href="/" className="text-xs text-muted-clay hover:text-canvas transition-colors">
              ← Return to Buyer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-sandstone/30">
      <AdminSidebar onOpenQuickIntake={() => setIsQuickIntakeOpen(true)} />

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

      <QuickIntakeModal
        isOpen={isQuickIntakeOpen}
        onClose={() => setIsQuickIntakeOpen(false)}
      />
    </div>
  );
}
