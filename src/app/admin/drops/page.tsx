'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/hooks/useStore';
import { Sparkles, Calendar, Clock, Plus, CheckCircle2, Package } from 'lucide-react';
import { formatDropDateTime } from '@/lib/utils';

export default function AdminDropsPage() {
  const { drops, addDrop, updateDrop, products } = useStore();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [releaseDate, setReleaseDate] = useState('2026-08-28');
  const [releaseTime, setReleaseTime] = useState('18:00');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !releaseDate) return;

    addDrop({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: tagline || 'Curated Campus Drop',
      description: description || 'Limited stock 1-of-1 items releasing at scheduled time.',
      coverImage:
        coverImage ||
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
      releaseDate,
      releaseTime,
      status: 'UPCOMING',
      productIds: [],
      isFeatured: false,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setTagline('');
      setDescription('');
      setCoverImage('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-2xl font-extrabold text-charcoal font-heading flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-olive" />
          Flash Drops & Curated Re-stocks Manager
        </h1>
        <p className="text-xs text-muted-clay mt-0.5">
          Schedule campus drop releases, set countdown timers, and assign items to batches.
        </p>
      </div>

      {/* Create New Drop Form */}
      <div className="bg-canvas p-6 rounded-2xl border border-oatmeal shadow-subtle space-y-4">
        <h2 className="text-base font-bold text-charcoal font-heading flex items-center gap-2">
          <Plus className="w-4 h-4 text-olive" />
          Create New Flash Drop Batch
        </h2>

        {isSuccess ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Flash Drop scheduled successfully!
          </div>
        ) : (
          <form onSubmit={handleCreateDrop} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Drop Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Friday Tech & Hostel Drop"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Sub-tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. 30 Tech & Hostel Essentials"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Release Date *
                </label>
                <input
                  type="date"
                  required
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Release Time *
                </label>
                <input
                  type="time"
                  required
                  value={releaseTime}
                  onChange={(e) => setReleaseTime(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Cover Photo URL
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Drop Description
              </label>
              <textarea
                rows={2}
                placeholder="Curated batch containing mini kettles, desk lamps, calculators..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-olive hover:bg-olive-hover text-canvas font-bold text-xs rounded-xl shadow-sm transition-all uppercase tracking-wider"
            >
              Schedule Flash Drop
            </button>
          </form>
        )}
      </div>

      {/* Existing Drops List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-charcoal font-heading">
          All Flash Drops ({drops.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drops.map((drop) => {
            const itemCount = products.filter(
              (p) => p.dropId === drop.id || drop.productIds.includes(p.id)
            ).length;

            return (
              <div
                key={drop.id}
                className="bg-canvas border border-oatmeal rounded-2xl p-5 shadow-subtle flex flex-col justify-between space-y-3"
              >
                <div className="flex gap-3">
                  <div className="relative w-20 aspect-[4/3] rounded-xl overflow-hidden bg-oatmeal shrink-0 border border-oatmeal">
                    <Image src={drop.coverImage} alt="" fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-olive bg-sage-light px-2 py-0.5 rounded-full uppercase">
                      {drop.status}
                    </span>
                    <h3 className="font-bold text-charcoal font-heading text-sm mt-1">
                      {drop.name}
                    </h3>
                    <p className="text-xs text-muted-clay line-clamp-1">{drop.tagline}</p>
                    <div className="text-[11px] font-mono text-muted-clay mt-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-olive" />
                      <span>{formatDropDateTime(drop.releaseDate, drop.releaseTime)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-oatmeal flex items-center justify-between text-xs">
                  <span className="font-bold text-charcoal flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-olive" />
                    <span>{itemCount} Assigned Items</span>
                  </span>
                  <button
                    onClick={() => updateDrop(drop.id, { isFeatured: !drop.isFeatured })}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      drop.isFeatured
                        ? 'bg-amber-400 text-charcoal border-amber-500'
                        : 'bg-sandstone text-muted-clay border-oatmeal'
                    }`}
                  >
                    {drop.isFeatured ? 'Featured on Home' : 'Feature Drop'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
