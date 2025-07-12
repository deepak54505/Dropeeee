import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
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
      cart: 'Reseller Cart',
      empty: 'Your cart is empty',
      emptyDesc: 'Add some products to start building your inventory',
      quantity: 'Qty',
      profit: 'Profit',
      total: 'Total Profit',
      wholesale: 'Wholesale Cost',
      continue: 'Continue Shopping'
    },
    hi: {
      cart: 'रिसेलर कार्ट',
      empty: 'आपका कार्ट खाली है',
      emptyDesc: 'अपनी इन्वेंटरी बनाने के लिए कुछ उत्पाद जोड़ें',
      quantity: 'मात्रा',
      profit: 'मुनाफा',
      total: 'कुल मुनाफा',
      wholesale: 'होलसेल कॉस्ट',
      continue: 'खरीदारी जारी रखें'
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className={`text-2xl font-bold ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {text[state.language].cart}
        </h2>
        
        <div className={`text-center py-12 ${
          state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">{text[state.language].empty}</h3>
          <p>{text[state.language].emptyDesc}</p>
        </div>
      </div>
    );
  }

  const totalWholesale = state.cart.reduce((sum, item) => sum + (item.product.wholesale * item.quantity), 0);
  const totalProfit = state.cart.reduce((sum, item) => sum + (item.product.profit * item.quantity), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {text[state.language].cart}
        </h2>
        <span className={`text-sm ${
          state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {state.cart.length} items
        </span>
      </div>

      <div className="space-y-4">
        {state.cart.map((item) => (
          <div
            key={item.product.id}
            className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
              state.theme === 'dark' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-100'
            }`}
          >
            <div className="flex items-start space-x-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold truncate ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.product.title}
                </h3>
                
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className={`text-sm ${
                      state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Wholesale:
                    </span>
                    <span className={`text-sm font-medium ${
                      state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {formatCurrency(item.product.wholesale)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`text-sm ${
                      state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {text[state.language].profit}:
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(item.product.profit)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        state.theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className={`px-3 py-1 font-medium ${
                      state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        state.theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={`p-6 rounded-xl shadow-lg ${
        state.theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-100'
      }`}>
        <h3 className={`font-semibold text-lg mb-4 ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className={`${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {text[state.language].wholesale}:
            </span>
            <span className={`font-medium ${
              state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {formatCurrency(totalWholesale)}
            </span>
          </div>
          
          <div className="flex justify-between text-lg font-bold">
            <span className="text-green-600">
              {text[state.language].total}:
            </span>
            <span className="text-green-600">
              {formatCurrency(totalProfit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}