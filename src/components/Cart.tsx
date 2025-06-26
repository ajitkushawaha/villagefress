import React from 'react';
import { X, Plus, Minus, MessageCircle } from 'lucide-react';
import { CartItem, Store } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  store: Store;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOrderViaWhatsApp: () => void;
}

export function Cart({ isOpen, onClose, cart, store, onUpdateQuantity, onOrderViaWhatsApp }: CartProps) {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            My Cart ({totalItems} items)
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some products to get started!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
                  <p className="text-xs text-gray-600">{item.product.unit}</p>
                  <p className="font-bold text-emerald-600">₹{item.product.price}</p>
                </div>
                
                <div className="flex items-center space-x-2 bg-white rounded-lg border">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium px-2 min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-emerald-600">₹{total}</span>
            </div>
            
            <button
              onClick={onOrderViaWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Order via WhatsApp</span>
            </button>
            
            <p className="text-xs text-gray-600 text-center">
              Your order will be sent to {store.name} via WhatsApp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}