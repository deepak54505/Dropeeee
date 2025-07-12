export interface Product {
  id: string;
  title: string;
  image: string;
  category: 'Fashion' | 'Electronics' | 'Home Decor' | 'Personal Care';
  mrp: number;
  wholesale: number;
  profit: number;
  description: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  area: string;
  pincode: string;
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'hi';
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'hi';