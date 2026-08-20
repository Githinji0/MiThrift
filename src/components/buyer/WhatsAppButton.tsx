'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/utils';

interface WhatsAppButtonProps {
  productTitle: string;
  sku: string;
  price: number;
  pickupLocationName?: string;
  productUrl?: string;
  className?: string;
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productTitle,
  sku,
  price,
  pickupLocationName,
  productUrl,
  className = '',
  label = 'Order via WhatsApp',
}) => {
  const url = generateWhatsAppUrl({
    productTitle,
    sku,
    price,
    pickupLocationName,
    productUrl,
  });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 text-sm ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span>{label}</span>
    </a>
  );
};
