import React from 'react';
import { ShoppingCart, MapPin, Settings, User } from 'lucide-react';
import { Store, User as UserType } from '../types';

interface HeaderProps {
  cart: any[];
  store: Store;
  user: UserType | null;
  onCartClick: () => void;
  onStoreSettingsClick: () => void;
  onUserClick: () => void;
}

export function Header({ cart, store, user, onCartClick, onStoreSettingsClick, onUserClick }: HeaderProps) {
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌱</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">VillageFresh</h1>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-32">{store.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <button
                onClick={onUserClick}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>
            ) : (
              <button
                onClick={onStoreSettingsClick}
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}