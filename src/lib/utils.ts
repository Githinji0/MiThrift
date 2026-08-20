import { STORE_WHATSAPP_NUMBER } from './constants';

/**
 * Format a price number into KES string format.
 * Example: 850 -> "KES 850"
 */
export function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

/**
 * Calculate discount percentage between selling price and reference price.
 */
export function calculateDiscount(sellingPrice: number, referencePrice?: number): number | null {
  if (!referencePrice || referencePrice <= sellingPrice) return null;
  const discount = ((referencePrice - sellingPrice) / referencePrice) * 100;
  return Math.round(discount);
}

/**
 * Generate a dynamic WhatsApp message & URL for product orders/reservations.
 */
export function generateWhatsAppUrl(options: {
  productTitle: string;
  sku: string;
  price: number;
  pickupLocationName?: string;
  productUrl?: string;
}): string {
  const { productTitle, sku, price, pickupLocationName, productUrl } = options;

  const currentOrigin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://mithrift.app';

  const fullUrl = productUrl || `${currentOrigin}/item/${sku}`;
  const pickupText = pickupLocationName ? pickupLocationName : '[Library Gate / Student Center]';

  const message = `Hi MiThrift! I want to buy this item:

Item: ${productTitle}
SKU: ${sku}
Price: ${formatPrice(price)}
Link: ${fullUrl}

Can I pick it up at ${pickupText}?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Generate auto SKU strategy (e.g. ELC-MK-102 or FSH-JK-304)
 */
export function generateSku(categoryCode: string, title: string): string {
  const catPrefix = (categoryCode.substring(0, 3) || 'GEN').toUpperCase();
  const words = title.trim().split(/\s+/);
  let titleCode = 'XX';
  if (words.length >= 2) {
    titleCode = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    titleCode = words[0].substring(0, 2).toUpperCase();
  }
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${catPrefix}-${titleCode}-${randomNum}`;
}

/**
 * Format ISO date string into readable format (e.g. "Friday · 6:00 PM")
 */
export function formatDropDateTime(dateStr: string, timeStr: string): string {
  try {
    const d = new Date(dateStr);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${dayName}, ${monthName} · ${timeStr}`;
  } catch {
    return `${dateStr} · ${timeStr}`;
  }
}

/**
 * Classnames utility string joiner
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
