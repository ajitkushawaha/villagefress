import React from 'react';
import { User, LogOut, Settings, MapPin, Phone, Mail, X } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  onLogout: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function UserProfile({ user, onLogout, onClose, isOpen }: UserProfileProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed top-0 max-w-60 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-emerald-600" />
                 <p>{user.displayName}</p>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.displayName}</h3>
              <p className="text-sm text-gray-600 capitalize">{user.provider}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            {user.email && (
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <MapPin className="w-5 h-5" />
              <span>Delivery Addresses</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              <span>Account Settings</span>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}