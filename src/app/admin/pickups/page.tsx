'use client';

import React, { useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { MapPin, Clock, Plus, CheckCircle2, SwitchCamera } from 'lucide-react';

export default function AdminPickupsPage() {
  const { pickupLocations, addPickupLocation, updatePickupLocation } = useStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addPickupLocation({
      name,
      description: description || 'Designated campus pickup station.',
      operatingHours: operatingHours || 'Mon - Fri: 9:00 AM - 6:00 PM',
      isActive: true,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setDescription('');
      setOperatingHours('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-oatmeal pb-4">
        <h1 className="text-2xl font-extrabold text-charcoal font-heading flex items-center gap-2">
          <MapPin className="w-6 h-6 text-olive" />
          Campus Pickup Stations Manager
        </h1>
        <p className="text-xs text-muted-clay mt-0.5">
          Configure designated campus collection gates, operating hours, and active station status.
        </p>
      </div>

      {/* Add Location Form */}
      <div className="bg-canvas p-6 rounded-2xl border border-oatmeal shadow-subtle space-y-4">
        <h2 className="text-base font-bold text-charcoal font-heading flex items-center gap-2">
          <Plus className="w-4 h-4 text-olive" />
          Add New Pickup Station
        </h2>

        {isSuccess ? (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Station added successfully!
          </div>
        ) : (
          <form onSubmit={handleAddLocation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Station Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hall 4 Courtyard Bench"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mon - Fri: 9:00 AM - 6:00 PM"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                Directions / Location Description
              </label>
              <textarea
                rows={2}
                placeholder="Shaded bench outside Hall 4 main reception gate..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-canvas border border-oatmeal rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-olive hover:bg-olive-hover text-canvas font-bold text-xs rounded-xl shadow-sm transition-all uppercase tracking-wider"
            >
              Add Pickup Station
            </button>
          </form>
        )}
      </div>

      {/* Pickup Locations List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-charcoal font-heading">
          Active Campus Stations ({pickupLocations.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pickupLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-canvas border border-oatmeal rounded-2xl p-5 shadow-subtle space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-charcoal font-heading text-base">
                    <MapPin className="w-5 h-5 text-olive" />
                    <span>{loc.name}</span>
                  </div>
                  <button
                    onClick={() => updatePickupLocation(loc.id, { isActive: !loc.isActive })}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      loc.isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {loc.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <p className="text-xs text-muted-clay mt-2">{loc.description}</p>
              </div>

              <div className="pt-3 border-t border-oatmeal flex items-center justify-between text-xs font-mono text-charcoal/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-olive" />
                  <span>{loc.operatingHours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
