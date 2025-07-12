import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Wireless Bluetooth Earbuds',
    image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg',
    category: 'Electronics',
    mrp: 2999,
    wholesale: 1200,
    profit: 1799,
    description: 'Premium quality wireless earbuds with noise cancellation and 24-hour battery life.',
    rating: 4.5,
    inStock: true
  },
  {
    id: '2',
    title: 'Stylish Cotton T-Shirt',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    category: 'Fashion',
    mrp: 899,
    wholesale: 350,
    profit: 549,
    description: 'Premium cotton t-shirt available in multiple colors and sizes.',
    rating: 4.2,
    inStock: true
  },
  {
    id: '3',
    title: 'Smart LED Table Lamp',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    category: 'Home Decor',
    mrp: 1599,
    wholesale: 650,
    profit: 949,
    description: 'RGB LED table lamp with touch controls and mobile app connectivity.',
    rating: 4.7,
    inStock: true
  },
  {
    id: '4',
    title: 'Vitamin C Face Serum',
    image: 'https://images.pexels.com/photos/7795821/pexels-photo-7795821.jpeg',
    category: 'Personal Care',
    mrp: 1299,
    wholesale: 520,
    profit: 779,
    description: 'Anti-aging vitamin C serum for glowing and healthy skin.',
    rating: 4.8,
    inStock: true
  },
  {
    id: '5',
    title: 'Premium Backpack',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    category: 'Fashion',
    mrp: 2499,
    wholesale: 1000,
    profit: 1499,
    description: 'Water-resistant laptop backpack with multiple compartments.',
    rating: 4.4,
    inStock: true
  },
  {
    id: '6',
    title: 'Bluetooth Speaker',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    category: 'Electronics',
    mrp: 3999,
    wholesale: 1600,
    profit: 2399,
    description: 'Portable waterproof Bluetooth speaker with deep bass.',
    rating: 4.6,
    inStock: true
  },
  {
    id: '7',
    title: 'Decorative Wall Clock',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    category: 'Home Decor',
    mrp: 1899,
    wholesale: 760,
    profit: 1139,
    description: 'Modern wooden wall clock perfect for home decoration.',
    rating: 4.3,
    inStock: true
  },
  {
    id: '8',
    title: 'Hair Growth Oil',
    image: 'https://images.pexels.com/photos/7262818/pexels-photo-7262818.jpeg',
    category: 'Personal Care',
    mrp: 999,
    wholesale: 400,
    profit: 599,
    description: 'Natural hair growth oil with essential oils and vitamins.',
    rating: 4.5,
    inStock: true
  }
];

export const categories = ['All', 'Fashion', 'Electronics', 'Home Decor', 'Personal Care'] as const;