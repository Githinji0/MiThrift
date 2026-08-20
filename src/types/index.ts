export type ConditionGrade = 'Like New' | 'Excellent' | 'Good' | 'Fair';

export type ProductStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export type InventoryType = 'DIRECT_BUYOUT' | 'CONSIGNMENT';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'READY_FOR_PICKUP'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED';

export type CategoryId =
  | 'electronics'
  | 'textbooks'
  | 'appliances'
  | 'hostel-essentials'
  | 'fashion'
  | 'streetwear'
  | 'beauty-care'
  | 'sports-outdoor'
  | 'accessories-jewelry'
  | 'furniture'
  | 'other';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  bgHex: string;
  textColor: string;
  badgeBg: string;
}

export interface PickupLocation {
  id: string;
  name: string;
  description: string;
  operatingHours: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string;
  description: string;
  categoryId: CategoryId;
  images: string[];
  sellingPrice: number; // in KES
  acquisitionPrice: number; // in KES (Admin only)
  referencePrice?: number; // original price if known
  condition: ConditionGrade;
  conditionDetails?: string;
  status: ProductStatus;
  inventoryType: InventoryType;
  consignorId?: string;
  consignorName?: string;
  consignorPhone?: string;
  commissionRate?: number; // e.g. 0.25 for 25%
  dropId?: string;
  dropName?: string;
  isFeatured?: boolean;
  viewCount?: number;
  pickupLocationId?: string;
  reservedAt?: string;
  reservedByPhone?: string;
  soldAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Drop {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  releaseDate: string; // ISO String or YYYY-MM-DD
  releaseTime: string; // e.g. "18:00"
  status: 'UPCOMING' | 'LIVE' | 'PAST';
  productIds: string[];
  isFeatured?: boolean;
  createdAt: string;
}

export interface Order {
  id: string; // e.g. MITH-9482
  customerName: string;
  customerPhone: string;
  customerCampus: string;
  productId: string;
  productSku: string;
  productTitle: string;
  productPrice: number;
  pickupLocationId: string;
  pickupLocationName: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IntakeSubmission {
  id: string;
  studentName: string;
  studentPhone: string;
  campus: string;
  categoryId: CategoryId;
  itemTitle: string;
  description: string;
  condition: ConditionGrade;
  askingPrice?: number;
  preferredModel: InventoryType;
  photoUrls: string[];
  status: 'PENDING_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  createdAt: string;
}

export interface Consignor {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalItems: number;
  totalSold: number;
  pendingPayout: number;
  totalPaid: number;
  createdAt: string;
}

export interface AdminStats {
  totalInventory: number;
  availableItems: number;
  reservedItems: number;
  soldItems: number;
  totalRevenue: number;
  estimatedProfit: number;
  inventoryValue: number;
  pendingPickups: number;
  pendingPayouts: number;
}
