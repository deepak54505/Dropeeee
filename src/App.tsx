import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Dashboard } from './components/Dashboard';
import { Toolkit } from './components/Toolkit';
import { Leads } from './components/Leads';
import { HelpChat } from './components/HelpChat';
import { CountdownTimer } from './components/CountdownTimer';

function AppContent() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <CountdownTimer />
            <ProductGrid />
          </div>
        );
      case 'cart':
        return <Cart />;
      case 'dashboard':
        return <Dashboard />;
      case 'toolkit':
        return <Toolkit />;
      case 'leads':
        return <Leads />;
      default:
        return <ProductGrid />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </main>
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <HelpChat />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;