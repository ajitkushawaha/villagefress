import React from 'react';
import { categories } from '../data/categories';
import { Category } from '../types';

interface CategoryGridProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryGrid({ selectedCategory, onCategorySelect }: CategoryGridProps) {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => onCategorySelect(null)}
          className={`p-4 rounded-xl border-2 transition-all ${
            selectedCategory === null
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 bg-white hover:border-emerald-200'
          }`}
        >
          <div className="text-2xl mb-2">🛒</div>
          <div className="text-xs font-medium text-gray-900">All Items</div>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedCategory === category.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 bg-white hover:border-emerald-200'
            }`}
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <div className="text-xs font-medium text-gray-900">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}