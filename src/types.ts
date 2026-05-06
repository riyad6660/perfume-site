/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
  scentFamily: string[];
  pyramidNotes: {
    top: string[];
    mid: string[];
    base: string[];
  };
  subscriptionEnabled: boolean;
  engravingEnabled: boolean;
  tags: string[];
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  size: "30ml" | "50ml" | "100ml";
  price: number;
  stock: number;
  sku: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  createdAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  size: string;
  price: number;
  quantity: number;
  engravingText?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  loyaltyPoints: number;
  tier: "Silver" | "Gold" | "Platinum";
  orderCount: number;
  totalSpent: number;
  createdAt: string;
}

export interface JournalPost {
  id: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  coverImage: string;
  publishDate: string;
  tags: string[];
  status: "draft" | "published";
}

export interface QuizResult {
  id: string;
  email: string;
  recommendedProductIds: string[];
  answers: Record<string, string>;
  createdAt: string;
}
