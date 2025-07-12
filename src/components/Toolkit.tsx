import React, { useState } from 'react';
import { Calculator, FileText, Download, Copy, Palette, MessageSquare } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Toolkit() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('calculator');
  const [calcValues, setCalcValues] = useState({
    mrp: '',
    wholesale: '',
    delivery: '50'
  });

  const text = {
    en: {
      toolkit: 'Digital Reseller Toolkit',
      calculator: 'Profit Calculator',
      templates: 'Message Templates',
      flyer: 'Flyer Generator',
      mrp: 'MRP Price',
      wholesale: 'Wholesale Price',
      delivery: 'Delivery Cost',
      profit: 'Your Profit',
      calculate: 'Calculate',
      template: 'Message Template',
      edit: 'Edit Template',
      save: 'Save Template',
      copy: 'Copy to Clipboard',
      generate: 'Generate Flyer',
      download: 'Download Flyer',
      referral: 'Referral Code',
      copied: 'Copied!',
      flyerTitle: 'Shop with confidence - Best prices guaranteed!',
      contactUs: 'Contact us for bulk orders and special discounts!'
    },
    hi: {
      toolkit: 'डिजिटल रिसेलर टूलकिट',
      calculator: 'मुनाफा कैलकुलेटर',
      templates: 'मैसेज टेम्प्लेट',
      flyer: 'फ्लायर जेनेरेटर',
      mrp: 'एमआरपी कीमत',
      wholesale: 'होलसेल कीमत',
      delivery: 'डिलिवरी कॉस्ट',
      profit: 'आपका मुनाफा',
      calculate: 'गणना करें',
      template: 'मैसेज टेम्प्लेट',
      edit: 'टेम्प्लेट एडिट करें',
      save: 'टेम्प्लेट सेव करें',
      copy: 'कॉपी करें',
      generate: 'फ्लायर बनाएं',
      download: 'फ्लायर डाउनलोड करें',
      referral: 'रेफरल कोड',
      copied: 'कॉपी हो गया!',
      flyerTitle: 'भरोसे के साथ खरीदारी करें - बेस्ट प्राइस गारंटी!',
      contactUs: 'बल्क ऑर्डर और स्पेशल डिस्काउंट के लिए संपर्क करें!'
    }
  };

  const calculateProfit = () => {
    const mrp = parseFloat(calcValues.mrp) || 0;
    const wholesale = parseFloat(calcValues.wholesale) || 0;
    const delivery = parseFloat(calcValues.delivery) || 0;
    return Math.max(0, mrp - wholesale - delivery);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const currentTemplate = state.messageTemplates.find(t => t.language === state.language);

  const tabs = [
    { id: 'calculator', icon: Calculator, label: text[state.language].calculator },
    { id: 'templates', icon: MessageSquare, label: text[state.language].templates },
    { id: 'flyer', icon: FileText, label: text[state.language].flyer }
  ];

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${
        state.theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {text[state.language].toolkit}
      </h2>

      {/* Tab Navigation */}
      <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                : state.theme === 'dark'
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`p-6 rounded-xl shadow-lg ${
        state.theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-100'
      }`}>
        
        {/* Profit Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {text[state.language].mrp}
                  </label>
                  <input
                    type="number"
                    value={calcValues.mrp}
                    onChange={(e) => setCalcValues({...calcValues, mrp: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      state.theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="₹2999"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {text[state.language].wholesale}
                  </label>
                  <input
                    type="number"
                    value={calcValues.wholesale}
                    onChange={(e) => setCalcValues({...calcValues, wholesale: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      state.theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="₹1200"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {text[state.language].delivery}
                  </label>
                  <input
                    type="number"
                    value={calcValues.delivery}
                    onChange={(e) => setCalcValues({...calcValues, delivery: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      state.theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="₹50"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/30 rounded-xl">
                  <div className={`text-sm font-medium mb-2 ${
                    state.theme === 'dark' ? 'text-green-300' : 'text-green-700'
                  }`}>
                    {text[state.language].profit}
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{calculateProfit().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {text[state.language].template}
              </label>
              <textarea
                value={currentTemplate?.content || ''}
                onChange={(e) => {
                  if (currentTemplate) {
                    dispatch({
                      type: 'UPDATE_TEMPLATE',
                      payload: { ...currentTemplate, content: e.target.value }
                    });
                  }
                }}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder={text[state.language].edit}
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => copyToClipboard(currentTemplate?.content || '')}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                {text[state.language].copy}
              </button>
            </div>
            
            <div className="mt-6">
              <div className={`p-4 rounded-lg ${
                state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-medium ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {text[state.language].referral}
                  </span>
                  <button
                    onClick={() => copyToClipboard(state.referralCode)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className={`font-mono text-lg ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {state.referralCode}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flyer Generator */}
        {activeTab === 'flyer' && (
          <div className="space-y-6">
            <div className={`p-6 border-2 border-dashed rounded-xl ${
              state.theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <div className="text-center">
                <Palette className={`h-12 w-12 mx-auto mb-4 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <h3 className={`text-lg font-medium mb-2 ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {text[state.language].flyerTitle}
                </h3>
                <p className={`mb-4 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {text[state.language].contactUs}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {state.cart.slice(0, 4).map((item) => (
                    <div key={item.product.id} className="text-center">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <p className={`text-xs truncate ${
                        state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.product.title}
                      </p>
                      <p className="text-xs font-bold text-green-600">
                        ₹{item.product.profit} profit
                      </p>
                    </div>
                  ))}
                </div>
                
                <button className="flex items-center mx-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  {text[state.language].download}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}