import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem, Lead, MessageTemplate, Theme, Language } from '../types';

interface AppState {
  cart: CartItem[];
  leads: Lead[];
  theme: Theme;
  language: Language;
  messageTemplates: MessageTemplate[];
  totalEarnings: number;
  referralCode: string;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'ADD_LEAD'; payload: Omit<Lead, 'id' | 'createdAt'> }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'UPDATE_TEMPLATE'; payload: MessageTemplate }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  cart: [],
  leads: [],
  theme: 'light',
  language: 'en',
  messageTemplates: [
    {
      id: '1',
      title: 'Welcome Message',
      content: 'Hi! Welcome to my store. Check out these amazing products with great prices!',
      language: 'en'
    },
    {
      id: '2',
      title: 'स्वागत संदेश',
      content: 'नमस्ते! मेरी दुकान में आपका स्वागत है। बेहतरीन कीमतों पर ये शानदार उत्पाद देखें!',
      language: 'hi'
    }
  ],
  totalEarnings: 0,
  referralCode: 'DROPEE2025'
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'ADD_LEAD':
      const newLead: Lead = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString()
      };
      return {
        ...state,
        leads: [...state.leads, newLead]
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        messageTemplates: state.messageTemplates.map(template =>
          template.id === action.payload.id ? action.payload : template
        )
      };
    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('dropee-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dropee-state', JSON.stringify(state));
  }, [state]);

  // Calculate total earnings
  useEffect(() => {
    const earnings = state.cart.reduce((total, item) => {
      return total + (item.product.profit * item.quantity);
    }, 0);
    if (earnings !== state.totalEarnings) {
      dispatch({ type: 'LOAD_STATE', payload: { totalEarnings: earnings } });
    }
  }, [state.cart, state.totalEarnings]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}