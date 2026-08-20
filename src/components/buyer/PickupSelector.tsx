'use client';

import React from 'react';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { PickupLocation } from '@/types';

interface PickupSelectorProps {
  locations: PickupLocation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const PickupSelector: React.FC<PickupSelectorProps> = ({
  locations,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
        Select Campus Pickup Location
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {locations.map((loc) => {
          const isSelected = selectedId === loc.id;
          return (
            <div
              key={loc.id}
              onClick={() => onSelect(loc.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-sage-light border-olive ring-2 ring-olive/30 shadow-sm'
                  : 'bg-canvas border-oatmeal hover:bg-sandstone'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin
                    className={`w-4 h-4 ${isSelected ? 'text-olive' : 'text-muted-clay'}`}
                  />
                  <span className="font-bold text-sm text-charcoal font-heading">
                    {loc.name}
                  </span>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-olive" />}
              </div>

              <p className="text-xs text-muted-clay mt-1.5 line-clamp-2">{loc.description}</p>

              <div className="flex items-center gap-1.5 text-[11px] text-charcoal/70 mt-2 font-mono">
                <Clock className="w-3 h-3 text-olive" />
                <span>{loc.operatingHours}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
