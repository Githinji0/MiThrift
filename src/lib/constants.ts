import { Category, ConditionGrade, PickupLocation } from '@/types';

export const STORE_NAME = 'MiThrift';
export const STORE_SLOGAN = 'Good finds. Better prices.';
export const STORE_WHATSAPP_NUMBER = '254712345678'; // Default phone for WhatsApp orders
export const DEFAULT_CAMPUS = 'Main Campus';

export const CONDITION_GRADES: Record<
  ConditionGrade,
  { label: string; description: string; badgeBg: string; textHex: string }
> = {
  'Like New': {
    label: 'Like New',
    description: 'Minimal signs of use. Looks fresh out of the box.',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    textHex: '#065F46',
  },
  Excellent: {
    label: 'Excellent',
    description: 'Very good condition with minor signs of handling.',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
    textHex: '#115E59',
  },
  Good: {
    label: 'Good',
    description: 'Visible signs of normal student use but 100% functional.',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    textHex: '#92400E',
  },
  Fair: {
    label: 'Fair',
    description: 'Noticeable wear and tear, fully functional & budget friendly.',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
    textHex: '#9A3412',
  },
};

export const CATEGORIES: Category[] = [
  {
    id: 'textbooks',
    name: 'Textbooks & Study',
    slug: 'textbooks',
    description: 'Calculators, reference books, study lamps & stationary',
    icon: 'BookOpen',
    bgHex: '#E2E8F0',
    textColor: '#1E293B',
    badgeBg: 'bg-slate-100 text-slate-800',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Kettles, extension cables, audio & hostel tech',
    icon: 'Zap',
    bgHex: '#D9E2EC',
    textColor: '#102A43',
    badgeBg: 'bg-blue-100 text-blue-900',
  },
  {
    id: 'appliances',
    name: 'Appliances',
    slug: 'appliances',
    description: 'Microwaves, blenders, hot plates & mini fridges',
    icon: 'Flame',
    bgHex: '#FEE2E2',
    textColor: '#991B1B',
    badgeBg: 'bg-red-100 text-red-900',
  },
  {
    id: 'hostel-essentials',
    name: 'Hostel Essentials',
    slug: 'hostel-essentials',
    description: 'Storage boxes, mirrors, laundry baskets & organizers',
    icon: 'Home',
    bgHex: '#FEF08A',
    textColor: '#713F12',
    badgeBg: 'bg-yellow-100 text-yellow-900',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Pre-loved jackets, denim, sweaters & casual wear',
    icon: 'Shirt',
    bgHex: '#F3D8D7',
    textColor: '#621B18',
    badgeBg: 'bg-rose-100 text-rose-900',
  },
  {
    id: 'streetwear',
    name: 'Streetwear & Vintage',
    slug: 'streetwear',
    description: 'Rare vintage drops, graphic tees, hoodies & caps',
    icon: 'Sparkles',
    bgHex: '#E0E7FF',
    textColor: '#3730A3',
    badgeBg: 'bg-indigo-100 text-indigo-900',
  },
  {
    id: 'beauty-care',
    name: 'Beauty & Care',
    slug: 'beauty-care',
    description: 'Hair dryers, straighteners, mirrors & grooming',
    icon: 'Smile',
    bgHex: '#E0DBEC',
    textColor: '#3C2E59',
    badgeBg: 'bg-purple-100 text-purple-900',
  },
  {
    id: 'sports-outdoor',
    name: 'Sports & Outdoor',
    slug: 'sports-outdoor',
    description: 'Gym gear, sports balls, water bottles & backpacks',
    icon: 'Activity',
    bgHex: '#D4E7DC',
    textColor: '#1A432C',
    badgeBg: 'bg-emerald-100 text-emerald-900',
  },
  {
    id: 'accessories-jewelry',
    name: 'Accessories & Bags',
    slug: 'accessories-jewelry',
    description: 'Laptop bags, sunglasses, watches & jewelry',
    icon: 'ShoppingBag',
    bgHex: '#F7DEC8',
    textColor: '#593210',
    badgeBg: 'bg-orange-100 text-orange-900',
  },
  {
    id: 'furniture',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Study chairs, folding tables, shoe racks & cushions',
    icon: 'Armchair',
    bgHex: '#EEDBBF',
    textColor: '#4A3418',
    badgeBg: 'bg-amber-100 text-amber-900',
  },
  {
    id: 'other',
    name: 'Other Cool Finds',
    slug: 'other',
    description: 'Miscellaneous campus treasures and unique finds',
    icon: 'Package',
    bgHex: '#E2DBD0',
    textColor: '#1F201D',
    badgeBg: 'bg-stone-200 text-stone-800',
  },
];

export const PICKUP_LOCATIONS: PickupLocation[] = [
  {
    id: 'loc-library',
    name: 'Library Gate',
    description: 'Main entrance next to security bench.',
    operatingHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    isActive: true,
  },
  {
    id: 'loc-center',
    name: 'Student Center',
    description: 'Ground floor lounge near the cafeteria.',
    operatingHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    isActive: true,
  },
  {
    id: 'loc-hall4',
    name: 'Hall 4 Courtyard',
    description: 'Shaded bench outside Hall 4 reception.',
    operatingHours: 'Daily: 11:00 AM - 6:30 PM',
    isActive: true,
  },
  {
    id: 'loc-maingate',
    name: 'Main Gate Kiosk',
    description: 'MiThrift pickup box outside main security gate.',
    operatingHours: 'Daily: 8:00 AM - 8:00 PM',
    isActive: true,
  },
];
