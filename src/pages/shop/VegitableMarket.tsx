import React, { useEffect, useMemo, useState } from 'react';
import { CategoryGrid } from '../../components/shop/CategoryGrid';
import { ProductGrid } from '../../components/shop/ProductGrid';
import { PromoSlider } from '../../components/shop/PromoSlider';
import { SkeletonLoader } from '../../utils/SkeletonLoader';
import { products } from '../../data/products';

import { useAuth } from '../../hooks/useAuth';

import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { Search } from 'lucide-react';


function Shop() {
  const {  loading } = useAuth();
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { cart, addToCart, updateQuantity,  } = useCartStore();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);
  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="px-4 py-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onClick={() => navigate('../search')}
              type="text"
              placeholder="Search beauty products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
            />
          </div>
        </div>
      </section>
      <main className="flex max-w-7xl mx-auto w-full">
        <aside className="w-1/5 border-r border-gray-100 bg-white">
          <CategoryGrid
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </aside>

        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          <div className="pt-4">
            <PromoSlider />
          </div>

          <section className="px-2 py-1 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {filteredProducts.length} items available
            </p>

            <ProductGrid
              products={filteredProducts}
              cart={cart}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
            />
            {/* <LocationRestrictionModal
              isOpen={showRestrictedModal}
              onClose={() => console.log('User acknowledged restriction')}
              locationName={locationName}
              village={allVillages}
              onSelectVillage={(village) => {
                setMatchedVillage(village);
                localStorage.setItem('manual-village-id', village.id.toString());
              }}
            /> */}
          </section>
        </div>
      </main>

      
      <div className="h-20" /> {/* spacing for mobile footer space */}
    </div>
  );
}

export default Shop;
