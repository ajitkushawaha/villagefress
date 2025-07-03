import React from 'react';
import { Search, User, ShoppingCart, Mic, MapPin } from 'lucide-react';
import { groceryItems, vegetableItems, fashionItems, beautyItems } from '../../data/products'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { VillageSelectionModal } from '../../components/shop/VillageSelectionModal';

export function WelcomeHomePage() {
   const navigate = useNavigate()
   const {user}= useAuth()
  
   const ProductCard = ({ item, onClick }: { item: any; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all transform hover:scale-105 w-full"
    >
      <div className="aspect-square relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <h4 className="font-medium text-gray-900 text-xs leading-tight text-center">
          {item.name}
        </h4>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
   

      {/* Search Bar */}
      <section className="px-4 py-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div  className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onClick={() => navigate('/home/search')}
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            />
            {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mic className="w-5 h-5" />
            </button> */}
          </div>
        </div>
      </section>

      {/* Main Categories Banner */}
      <section className="px-4 py-6 bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to VillageFresh! 🛒
              </h2>
              <p className="text-gray-600">
                Fresh products delivered to your doorstep in 20 minutes
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => navigate('/home/shop')}
                className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all bg-white transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-2xl">🌾</span>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Grocery</span>
              </button>
              
              <button
                onClick={() => navigate('/home/shop')}
                className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all bg-white transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-2xl">🥬</span>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Vegetables</span>
              </button>
              
              <button
                onClick={() => navigate('/home/fashion')}
                className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all bg-white transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-2xl">👗</span>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Fashion</span>
              </button>
              
              <button
                onClick={() => navigate('/home/beauty')}
                className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all bg-white transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-2xl">💄</span>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Beauty</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto">
        {/* Fresh Grocery Section */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <h3 className="text-xl font-bold text-gray-900">Fresh Grocery</h3>
            </div>
            <button
              onClick={() => navigate('/home/shop')}
              className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {groceryItems.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onClick={() => navigate(`/home${item.category}`)}
              />
            ))}
          </div>
        </section>

        {/* Fresh Vegetables Section */}
        <section className="px-4 py-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🥬</span>
              <h3 className="text-xl font-bold text-gray-900">Fresh Vegetables</h3>
            </div>
            <button
              onClick={() => navigate('/home/shop')}
              className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {vegetableItems.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onClick={() => navigate(`/home${item.category}`)}
              />
            ))}
          </div>
        </section>

        {/* Fashion Section */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👗</span>
              <h3 className="text-xl font-bold text-gray-900">Fashion</h3>
            </div>
            <button
              onClick={() => navigate('/home/fashion')}
              className="text-pink-600 font-medium text-sm hover:text-pink-700 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {fashionItems.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onClick={() => navigate(`/home${item.category}`)}
              />
            ))}
          </div>
        </section>

        {/* Beauty Section */}
        <section className="px-4 py-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💄</span>
              <h3 className="text-xl font-bold text-gray-900">Beauty</h3>
            </div>
            <button
              onClick={() => navigate('/home/beauty')}
              className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {beautyItems.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                onClick={() => navigate(`/home${item.category}`)}
              />
            ))}
          </div>
        </section>

        {/* Welcome Message */}
        <section className="px-4 py-6">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore our fresh collection of products across all categories
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="text-emerald-600">⚡</span>
                <span>20 min delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-emerald-600">✅</span>
                <span>100% Fresh</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-emerald-600">🚚</span>
                <span>Free delivery</span>
              </div>
            </div>
          </div>
        </section>
         <VillageSelectionModal />
        <div className="h-20"></div>
      </div>
    </div>
  );
}