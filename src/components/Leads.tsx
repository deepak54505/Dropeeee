import React, { useState } from 'react';
import { UserPlus, Phone, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Leads() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    area: '',
    pincode: ''
  });

  const text = {
    en: {
      leads: 'Lead Management',
      addLead: 'Add New Lead',
      noLeads: 'No leads yet',
      noLeadsDesc: 'Start capturing leads to grow your business',
      name: 'Name',
      whatsapp: 'WhatsApp Number',
      area: 'Area',
      pincode: 'Pincode',
      save: 'Save Lead',
      cancel: 'Cancel',
      sendWelcome: 'Send Welcome Message',
      viewDetails: 'View Details',
      total: 'Total Leads'
    },
    hi: {
      leads: 'लीड मैनेजमेंट',
      addLead: 'नया लीड जोड़ें',
      noLeads: 'अभी तक कोई लीड नहीं',
      noLeadsDesc: 'अपना व्यापार बढ़ाने के लिए लीड कैप्चर करना शुरू करें',
      name: 'नाम',
      whatsapp: 'व्हाट्सएप नंबर',
      area: 'एरिया',
      pincode: 'पिनकोड',
      save: 'लीड सेव करें',
      cancel: 'रद्द करें',
      sendWelcome: 'स्वागत संदेश भेजें',
      viewDetails: 'विवरण देखें',
      total: 'कुल लीड्स'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_LEAD', payload: formData });
    setFormData({ name: '', whatsapp: '', area: '', pincode: '' });
    setShowForm(false);
  };

  const sendWelcomeMessage = (lead: any) => {
    const message = encodeURIComponent(
      `Hi ${lead.name}! 👋\n\n` +
      `Welcome to Dropee! We're excited to have you.\n\n` +
      `🎯 Best quality products\n` +
      `💰 Competitive prices\n` +
      `🚚 Fast delivery to ${lead.area}\n\n` +
      `Check out our amazing deals!\n\n` +
      `Use referral code: ${state.referralCode}`
    );
    window.open(`https://wa.me/${lead.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {text[state.language].leads}
        </h2>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {text[state.language].addLead}
        </button>
      </div>

      {/* Add Lead Form */}
      {showForm && (
        <div className={`p-6 rounded-xl shadow-lg ${
          state.theme === 'dark' 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {text[state.language].name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {text[state.language].whatsapp}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {text[state.language].area}
                </label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {text[state.language].pincode}
                </label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {text[state.language].save}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {text[state.language].cancel}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leads List */}
      {state.leads.length === 0 ? (
        <div className={`text-center py-12 ${
          state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <UserPlus className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">{text[state.language].noLeads}</h3>
          <p>{text[state.language].noLeadsDesc}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`text-sm ${
            state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {text[state.language].total}: {state.leads.length}
          </div>
          
          {state.leads.map((lead) => (
            <div
              key={lead.id}
              className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
                state.theme === 'dark' 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {lead.name}
                  </h3>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className={`h-4 w-4 ${
                        state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm ${
                        state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {lead.whatsapp}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className={`h-4 w-4 ${
                        state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm ${
                        state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {lead.area}, {lead.pincode}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className={`h-4 w-4 ${
                        state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm ${
                        state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => sendWelcomeMessage(lead)}
                  className="flex items-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {text[state.language].sendWelcome}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}