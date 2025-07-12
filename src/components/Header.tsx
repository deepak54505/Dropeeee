import React from 'react';
import { ShoppingBag, Moon, Sun, Languages, Bell } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Header() {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: state.language === 'en' ? 'hi' : 'en' });
  };

  const text = {
    en: {
      title: 'Dropee',
      subtitle: 'Your Dropshipping Partner'
    },
    hi: {
      title: 'ड्रॉपी',
      subtitle: 'आपका ड्रॉपशिपिंग पार्टनर'
    }
  };

  return (
    <header className={`sticky top-0 z-50 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-b backdrop-blur-md bg-opacity-95 transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {text[state.language].title}
              </h1>
              <p className={`text-xs ${
                state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {text[state.language].subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className={`h-5 w-5 ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>
            
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-colors ${
                state.theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Languages className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                state.theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {state.theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            
            <div className="relative">
              <ShoppingBag className={`h-5 w-5 ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`} />
              {state.cart.length > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{state.cart.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}