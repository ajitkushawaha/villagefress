import React from 'react';
import { X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const LocationRestrictionModal: React.FC<Props> = ({ isOpen,locationName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
        <div className="text-center">
          <div className="text-5xl mb-4">😢</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Not in Service Area</h2>
          <p className="text-gray-600 text-sm mb-4">
            Unfortunately, we do not currently deliver to your location {locationName}. We're expanding soon!
          </p>
         
        </div>
      </div>
    </div>
  );
};
