import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { products, categories } from '../data/products';
import { useApp } from '../contexts/AppContext';
import { Search, Filter } from 'lucide-react';

export function ProductGrid() {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const text = {
    en: {
      search: 'Search products...',
      trending: 'Trending Products',
      noProducts: 'No products found',
      filters: 'Filters'
    },
    hi: {
      search: 'उत्पाद खोजें...',
      trending: 'ट्रेंडिंग उत्पाद',
      noProducts: 'कोई उत्पाद नहीं मिला',
      filters: 'फिल्टर'
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder={text[state.language].search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
              state.theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
        
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : state.theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {text[state.language].trending}
        </h2>
        <div className={`text-sm ${
          state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {filteredProducts.length} products
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${
          state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">{text[state.language].noProducts}</p>
        </div>
      )}
    </div>
  );
}