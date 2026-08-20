'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AdminStats,
  Drop,
  IntakeSubmission,
  Order,
  OrderStatus,
  PickupLocation,
  Product,
  ProductStatus,
} from '@/types';
import { INITIAL_DROPS, INITIAL_INTAKES, INITIAL_ORDERS, INITIAL_PRODUCTS } from './mockData';
import { PICKUP_LOCATIONS } from './constants';

interface StoreContextType {
  products: Product[];
  drops: Drop[];
  orders: Order[];
  intakes: IntakeSubmission[];
  pickupLocations: PickupLocation[];
  favorites: string[];
  isAdminAuthenticated: boolean;
  
  // Buyer Actions
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  createReservation: (data: {
    productId: string;
    customerName: string;
    customerPhone: string;
    customerCampus: string;
    pickupLocationId: string;
  }) => Order;
  submitIntake: (submission: Omit<IntakeSubmission, 'id' | 'status' | 'createdAt'>) => void;

  // Admin Actions
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateProductStatus: (id: string, status: ProductStatus) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addDrop: (drop: Omit<Drop, 'id' | 'createdAt'>) => void;
  updateDrop: (id: string, updates: Partial<Drop>) => void;
  updatePickupLocation: (id: string, updates: Partial<PickupLocation>) => void;
  addPickupLocation: (location: Omit<PickupLocation, 'id'>) => void;

  // Computed Stats
  getAdminStats: () => AdminStats;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'mithrift_products_v1',
  DROPS: 'mithrift_drops_v1',
  ORDERS: 'mithrift_orders_v1',
  INTAKES: 'mithrift_intakes_v1',
  PICKUPS: 'mithrift_pickups_v1',
  FAVORITES: 'mithrift_favorites_v1',
  ADMIN_AUTH: 'mithrift_admin_auth_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [drops, setDrops] = useState<Drop[]>(INITIAL_DROPS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [intakes, setIntakes] = useState<IntakeSubmission[]>(INITIAL_INTAKES);
  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>(PICKUP_LOCATIONS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedDrops = localStorage.getItem(STORAGE_KEYS.DROPS);
      if (savedDrops) setDrops(JSON.parse(savedDrops));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedIntakes = localStorage.getItem(STORAGE_KEYS.INTAKES);
      if (savedIntakes) setIntakes(JSON.parse(savedIntakes));

      const savedPickups = localStorage.getItem(STORAGE_KEYS.PICKUPS);
      if (savedPickups) setPickupLocations(JSON.parse(savedPickups));

      const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

      const savedAuth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (savedAuth === 'true') setIsAdminAuthenticated(true);
    } catch (error) {
      console.error('Failed to load storage from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.DROPS, JSON.stringify(drops));
    } catch {}
  }, [drops, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.INTAKES, JSON.stringify(intakes));
    } catch {}
  }, [intakes, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PICKUPS, JSON.stringify(pickupLocations));
    } catch {}
  }, [pickupLocations, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites, isLoaded]);

  // Buyer Actions
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const createReservation = (data: {
    productId: string;
    customerName: string;
    customerPhone: string;
    customerCampus: string;
    pickupLocationId: string;
  }): Order => {
    const product = products.find((p) => p.id === data.productId);
    if (!product) throw new Error('Product not found');

    const pickupLoc = pickupLocations.find((l) => l.id === data.pickupLocationId);
    const pickupName = pickupLoc ? pickupLoc.name : 'Library Gate';

    const orderId = `MITH-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerCampus: data.customerCampus,
      productId: product.id,
      productSku: product.sku,
      productTitle: product.title,
      productPrice: product.sellingPrice,
      pickupLocationId: data.pickupLocationId,
      pickupLocationName: pickupName,
      status: 'PENDING',
      paymentStatus: 'UNPAID',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Update order state
    setOrders((prev) => [newOrder, ...prev]);

    // Automatically mark 1-of-1 item as RESERVED
    updateProductStatus(product.id, 'RESERVED');

    return newOrder;
  };

  const submitIntake = (
    submission: Omit<IntakeSubmission, 'id' | 'status' | 'createdAt'>
  ) => {
    const newIntake: IntakeSubmission = {
      ...submission,
      id: `sub-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
    };
    setIntakes((prev) => [newIntake, ...prev]);
  };

  // Admin Actions
  const loginAdmin = (passcode: string): boolean => {
    if (passcode === 'mithrift2026' || passcode === 'admin123' || passcode === 'admin') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const addProduct = (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Product => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const updateProductStatus = (id: string, status: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const now = new Date().toISOString();
        return {
          ...p,
          status,
          updatedAt: now,
          ...(status === 'RESERVED' ? { reservedAt: now } : {}),
          ...(status === 'SOLD' ? { soldAt: now } : {}),
        };
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updated = { ...o, status, updatedAt: new Date().toISOString() };
        if (status === 'COMPLETED') {
          updated.paymentStatus = 'PAID';
          updateProductStatus(o.productId, 'SOLD');
        } else if (status === 'CANCELLED' || status === 'EXPIRED') {
          updateProductStatus(o.productId, 'AVAILABLE');
        }
        return updated;
      })
    );
  };

  const addDrop = (dropData: Omit<Drop, 'id' | 'createdAt'>) => {
    const newDrop: Drop = {
      ...dropData,
      id: `drop-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
    };
    setDrops((prev) => [newDrop, ...prev]);
  };

  const updateDrop = (id: string, updates: Partial<Drop>) => {
    setDrops((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const updatePickupLocation = (id: string, updates: Partial<PickupLocation>) => {
    setPickupLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, ...updates } : loc))
    );
  };

  const addPickupLocation = (location: Omit<PickupLocation, 'id'>) => {
    const newLoc: PickupLocation = {
      ...location,
      id: `loc-${Math.floor(100 + Math.random() * 900)}`,
    };
    setPickupLocations((prev) => [...prev, newLoc]);
  };

  const getAdminStats = (): AdminStats => {
    const totalInventory = products.length;
    const availableItems = products.filter((p) => p.status === 'AVAILABLE').length;
    const reservedItems = products.filter((p) => p.status === 'RESERVED').length;
    const soldItems = products.filter((p) => p.status === 'SOLD').length;

    let totalRevenue = 0;
    let estimatedProfit = 0;
    let inventoryValue = 0;

    products.forEach((p) => {
      if (p.status === 'SOLD') {
        totalRevenue += p.sellingPrice;
        if (p.inventoryType === 'DIRECT_BUYOUT') {
          estimatedProfit += p.sellingPrice - p.acquisitionPrice;
        } else {
          const comm = p.commissionRate || 0.25;
          estimatedProfit += p.sellingPrice * comm;
        }
      } else {
        inventoryValue += p.sellingPrice;
      }
    });

    const pendingPickups = orders.filter(
      (o) => o.status === 'PENDING' || o.status === 'CONFIRMED' || o.status === 'READY_FOR_PICKUP'
    ).length;

    const pendingPayouts = products
      .filter((p) => p.inventoryType === 'CONSIGNMENT' && p.status === 'SOLD')
      .reduce((sum, p) => sum + p.sellingPrice * (1 - (p.commissionRate || 0.25)), 0);

    return {
      totalInventory,
      availableItems,
      reservedItems,
      soldItems,
      totalRevenue,
      estimatedProfit,
      inventoryValue,
      pendingPickups,
      pendingPayouts,
    };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        drops,
        orders,
        intakes,
        pickupLocations,
        favorites,
        isAdminAuthenticated,
        toggleFavorite,
        isFavorite,
        createReservation,
        submitIntake,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        updateProductStatus,
        deleteProduct,
        updateOrderStatus,
        addDrop,
        updateDrop,
        updatePickupLocation,
        addPickupLocation,
        getAdminStats,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
