import React from 'react';
import { Star, ShoppingCart, Share, TrendingUp, Package } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      `🔥 *${product.title}* 🔥\n\n` +
      `💰 MRP: ₹${product.mrp}\n` +
      `🎯 Your Price: ₹${product.wholesale}\n` +
      `📈 Profit: ₹${product.profit}\n\n` +
      `${product.description}\n\n` +
      `⭐ Rating: ${product.rating}/5\n\n` +
      `Order now via WhatsApp! 📱\n` +
      `Use referral code: ${state.referralCode}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const text = {
    en: {
      addToCart: 'Add to Cart',
      share: 'Share',
      profit: 'Profit',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock'
    },
    hi: {
      addToCart: 'कार्ट में जोड़ें',
      share: 'शेयर करें',
      profit: 'मुनाफा',
      inStock: 'उपलब्ध',
      outOfStock: 'स्टॉक खत्म'
    }
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${
      state.theme === 'dark' 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-100'
    }`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inStock
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {product.inStock ? text[state.language].inStock : text[state.language].outOfStock}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className={`ml-1 text-sm ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {product.rating}
          </span>
        </div>
        
        <p className={`text-sm mb-3 line-clamp-2 ${
          state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {product.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              MRP:
            </span>
            <span className={`font-medium ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {formatCurrency(product.mrp)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`text-sm ${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Wholesale:
            </span>
            <span className={`font-medium ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {formatCurrency(product.wholesale)}
            </span>
          </div>
          
          <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/30 p-2 rounded-lg">
            <span className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {text[state.language].profit}:
            </span>
            <span className="font-bold text-green-700 dark:text-green-300">
              {formatCurrency(product.profit)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={addToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
              product.inStock
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {text[state.language].addToCart}
          </button>
          
          <button
            onClick={shareViaWhatsApp}
            className={`px-4 py-2 rounded-lg transition-colors ${
              state.theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}