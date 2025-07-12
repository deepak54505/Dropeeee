import React from 'react';
import { Home, ShoppingCart, BarChart3, Wrench, Users, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { state } = useApp();

  const tabs = [
    { id: 'home', icon: Home, label: state.language === 'en' ? 'Home' : 'होम' },
    { id: 'cart', icon: ShoppingCart, label: state.language === 'en' ? 'Cart' : 'कार्ट' },
    { id: 'dashboard', icon: BarChart3, label: state.language === 'en' ? 'Dashboard' : 'डैशबोर्ड' },
    { id: 'toolkit', icon: Wrench, label: state.language === 'en' ? 'Toolkit' : 'टूलकिट' },
    { id: 'leads', icon: Users, label: state.language === 'en' ? 'Leads' : 'लीड्स' }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-t backdrop-blur-md bg-opacity-95`}>
      <div className="container mx-auto">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : state.theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}