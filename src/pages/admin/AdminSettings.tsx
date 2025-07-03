import React, { useState } from 'react';
import { Save, Store, Phone, Mail, MapPin, Clock, Truck, DollarSign } from 'lucide-react';

export function AdminSettings() {
  const [storeSettings, setStoreSettings] = useState({
    name: 'VillageFresh Store',
    ownerName: 'John Doe',
    phone: '+91 9876543210',
    email: 'store@villagefresh.com',
    address: '123 Village Center, Main Road, Village Name',
    whatsappNumber: '+91 9876543210',
    deliveryRadius: '5',
    deliveryFee: '20',
    freeDeliveryAbove: '99',
    deliveryTime: '8',
    operatingHours: {
      open: '08:00',
      close: '22:00'
    },
    isOpen: true
  });

  const [appSettings, setAppSettings] = useState({
    enableNotifications: true,
    enableSMS: false,
    enableEmail: true,
    autoAssignDelivery: true,
    requirePaymentConfirmation: false,
    allowCOD: true,
    allowUPI: true,
    maxOrdersPerDay: '100',
    minOrderAmount: '50'
  });

  const handleStoreSettingsChange = (field: string, value: any) => {
    setStoreSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAppSettingsChange = (field: string, value: any) => {
    setAppSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store and application settings</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Save All Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Store className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Store Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
              <input
                type="text"
                value={storeSettings.name}
                onChange={(e) => handleStoreSettingsChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
              <input
                type="text"
                value={storeSettings.ownerName}
                onChange={(e) => handleStoreSettingsChange('ownerName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={storeSettings.phone}
                  onChange={(e) => handleStoreSettingsChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={storeSettings.email}
                  onChange={(e) => handleStoreSettingsChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Address</label>
              <textarea
                value={storeSettings.address}
                onChange={(e) => handleStoreSettingsChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
              <input
                type="tel"
                value={storeSettings.whatsappNumber}
                onChange={(e) => handleStoreSettingsChange('whatsappNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="+91 9876543210"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                <input
                  type="time"
                  value={storeSettings.operatingHours.open}
                  onChange={(e) => handleStoreSettingsChange('operatingHours', {
                    ...storeSettings.operatingHours,
                    open: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                <input
                  type="time"
                  value={storeSettings.operatingHours.close}
                  onChange={(e) => handleStoreSettingsChange('operatingHours', {
                    ...storeSettings.operatingHours,
                    close: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isOpen"
                checked={storeSettings.isOpen}
                onChange={(e) => handleStoreSettingsChange('isOpen', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="isOpen" className="text-sm font-medium text-gray-700">
                Store is currently open
              </label>
            </div>
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Truck className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Delivery Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
              <input
                type="number"
                value={storeSettings.deliveryRadius}
                onChange={(e) => handleStoreSettingsChange('deliveryRadius', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee (₹)</label>
                <input
                  type="number"
                  value={storeSettings.deliveryFee}
                  onChange={(e) => handleStoreSettingsChange('deliveryFee', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Free Delivery Above (₹)</label>
                <input
                  type="number"
                  value={storeSettings.freeDeliveryAbove}
                  onChange={(e) => handleStoreSettingsChange('freeDeliveryAbove', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery Time (minutes)</label>
              <input
                type="number"
                value={storeSettings.deliveryTime}
                onChange={(e) => handleStoreSettingsChange('deliveryTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowCOD"
                checked={appSettings.allowCOD}
                onChange={(e) => handleAppSettingsChange('allowCOD', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="allowCOD" className="text-sm font-medium text-gray-700">
                Allow Cash on Delivery (COD)
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="allowUPI"
                checked={appSettings.allowUPI}
                onChange={(e) => handleAppSettingsChange('allowUPI', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="allowUPI" className="text-sm font-medium text-gray-700">
                Allow UPI Payments
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="requirePaymentConfirmation"
                checked={appSettings.requirePaymentConfirmation}
                onChange={(e) => handleAppSettingsChange('requirePaymentConfirmation', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="requirePaymentConfirmation" className="text-sm font-medium text-gray-700">
                Require payment confirmation for UPI
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Amount (₹)</label>
              <input
                type="number"
                value={appSettings.minOrderAmount}
                onChange={(e) => handleAppSettingsChange('minOrderAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Phone className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">App Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enableNotifications"
                checked={appSettings.enableNotifications}
                onChange={(e) => handleAppSettingsChange('enableNotifications', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="enableNotifications" className="text-sm font-medium text-gray-700">
                Enable push notifications
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enableSMS"
                checked={appSettings.enableSMS}
                onChange={(e) => handleAppSettingsChange('enableSMS', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="enableSMS" className="text-sm font-medium text-gray-700">
                Enable SMS notifications
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="enableEmail"
                checked={appSettings.enableEmail}
                onChange={(e) => handleAppSettingsChange('enableEmail', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="enableEmail" className="text-sm font-medium text-gray-700">
                Enable email notifications
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="autoAssignDelivery"
                checked={appSettings.autoAssignDelivery}
                onChange={(e) => handleAppSettingsChange('autoAssignDelivery', e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="autoAssignDelivery" className="text-sm font-medium text-gray-700">
                Auto-assign delivery boys
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Orders Per Day</label>
              <input
                type="number"
                value={appSettings.maxOrdersPerDay}
                onChange={(e) => handleAppSettingsChange('maxOrdersPerDay', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
}