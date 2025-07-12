import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Dashboard() {
  const { state } = useApp();

  const totalProducts = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalLeads = state.leads.length;
  const avgOrderValue = totalProducts > 0 ? state.totalEarnings / totalProducts : 0;

  const text = {
    en: {
      dashboard: 'Dashboard',
      overview: 'Business Overview',
      totalProducts: 'Total Products',
      estimatedEarnings: 'Estimated Earnings',
      totalLeads: 'Total Leads',
      avgOrderValue: 'Avg Order Value',
      supplierInfo: 'Supplier Contact',
      supplierName: 'Dropee Wholesale Hub',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      businessHours: 'Business Hours',
      hours: '9:00 AM - 8:00 PM',
      recentActivity: 'Recent Activity',
      noActivity: 'No recent activity'
    },
    hi: {
      dashboard: 'डैशबोर्ड',
      overview: 'व्यापार अवलोकन',
      totalProducts: 'कुल उत्पाद',
      estimatedEarnings: 'अनुमानित आय',
      totalLeads: 'कुल लीड्स',
      avgOrderValue: 'औसत ऑर्डर वैल्यू',
      supplierInfo: 'सप्लायर संपर्क',
      supplierName: 'ड्रॉपी होलसेल हब',
      phone: 'फोन',
      email: 'ईमेल',
      address: 'पता',
      businessHours: 'व्यापार घंटे',
      hours: 'सुबह 9:00 - शाम 8:00',
      recentActivity: 'हाल की गतिविधि',
      noActivity: 'कोई हाल की गतिविधि नहीं'
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: text[state.language].totalProducts,
      value: totalProducts.toString(),
      icon: ShoppingBag,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: text[state.language].estimatedEarnings,
      value: formatCurrency(state.totalEarnings),
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      title: text[state.language].totalLeads,
      value: totalLeads.toString(),
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      title: text[state.language].avgOrderValue,
      value: formatCurrency(avgOrderValue),
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {text[state.language].dashboard}
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
              state.theme === 'dark' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold mt-2 ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-green-600 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supplier Info */}
      <div className={`p-6 rounded-xl shadow-lg ${
        state.theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-100'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          state.theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {text[state.language].supplierInfo}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className={`font-medium ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {text[state.language].supplierName}
              </h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className={`h-5 w-5 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <div>
                  <p className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {text[state.language].phone}
                  </p>
                  <p className={`font-medium ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    +91 98765 43210
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className={`h-5 w-5 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <div>
                  <p className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {text[state.language].email}
                  </p>
                  <p className={`font-medium ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    support@dropee.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className={`h-5 w-5 mt-1 ${
                state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <div>
                <p className={`text-sm ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {text[state.language].address}
                </p>
                <p className={`font-medium ${
                  state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  123 Wholesale Market<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
            
            <div>
              <p className={`text-sm ${
                state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {text[state.language].businessHours}
              </p>
              <p className={`font-medium ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {text[state.language].hours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}