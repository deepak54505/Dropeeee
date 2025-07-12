import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function HelpChat() {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const text = {
    en: {
      help: 'Help & Support',
      typing: 'Type your message...',
      send: 'Send',
      welcomeMsg: 'Hi! How can I help you today?',
      options: [
        'How to add products?',
        'How to calculate profit?',
        'How to generate leads?',
        'Technical support'
      ]
    },
    hi: {
      help: 'सहायता और सपोर्ट',
      typing: 'अपना मैसेज टाइप करें...',
      send: 'भेजें',
      welcomeMsg: 'नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?',
      options: [
        'उत्पाद कैसे जोड़ें?',
        'मुनाफा कैसे कैलकुलेट करें?',
        'लीड्स कैसे जेनेरेट करें?',
        'तकनीकी सहायता'
      ]
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      // Simulate sending message
      setMessage('');
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
          <div className={`rounded-xl shadow-2xl overflow-hidden ${
            state.theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
              <h3 className="font-medium">{text[state.language].help}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-600 rounded-full p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              <div className="flex">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                  <p className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {text[state.language].welcomeMsg}
                  </p>
                </div>
              </div>

              {/* Quick Options */}
              <div className="space-y-2">
                {text[state.language].options.map((option, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left text-sm p-2 rounded-lg transition-colors ${
                      state.theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${
              state.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={text[state.language].typing}
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <button
                  onClick={handleSend}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}