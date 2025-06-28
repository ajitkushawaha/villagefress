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
      <div className="w-full  px-4 py-3 flex items-center justify-center " >
        <div className="flex items-center justify-between w-4/5 ">
          {/* Logo & Store Info */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌱</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">VillageFresh</h1>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[100px] sm:max-w-[150px]">{store.name}</span>
              </div>
            </div>
          </div>

          {/* User, Settings, Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <button
                onClick={onUserClick}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center text-[10px] leading-none">
                    <User className="w-5 h-5" />
                    <p className="truncate max-w-[60px]">{user.displayName}</p>
                  </div>
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
