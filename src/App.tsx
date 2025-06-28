import React, { useEffect, useMemo, useState } from 'react';

import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { StoreSettings } from './components/StoreSettings';
import { UserProfile } from './components/UserProfile';
import { PromoSlider } from './components/PromoSlider';
import { SkeletonLoader } from './components/SkeletonLoader';
import { AdminDashboard } from './admin/AdminDashboard';

import { products } from './data/products';
import { CartItem, Product, Store } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { generateWhatsAppMessage, openWhatsApp } from './utils/whatsapp';

const defaultStore: Store = {
  name: 'Village Store',
  ownerName: 'Store Owner',
  phone: '+9198989898',
  address: 'Khukhundoo Store',
  whatsappNumber: '+917617028576',
};

function App() {
  // --------------------- Auth and State ---------------------
  const { user, isAdmin, isAuthenticated, login, logout, loading } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useLocalStorage<CartItem[]>('village-fresh-cart', []);
  const [store, setStore] = useLocalStorage<Store>('village-fresh-store', defaultStore);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // --------------------- PWA Install Prompt ---------------------
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('✅ PWA installed');
    }
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  // --------------------- Logic ---------------------
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      quantity <= 0
        ? prevCart.filter(item => item.product.id !== productId)
        : prevCart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
    );
  };

  const handleOrderViaWhatsApp = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const message = generateWhatsAppMessage(cart, store, total);
    openWhatsApp(store.whatsappNumber, message);
    setCart([]);
    setIsCartOpen(false);
  };

  const handleLogin = (userData: any) => {
    login(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserProfileOpen(false);
  };

  // --------------------- Conditional Renders ---------------------

  // 1. Show loading screen during auth check
  if (loading) return <SkeletonLoader />;

  // 2. Admin user? Show admin dashboard
  if (isAdmin) return <AdminDashboard />;

  // 3. Not authenticated? Show home/login
  if (!isAuthenticated) {
    return showLogin ? (
      <AuthPage onBack={() => setShowLogin(false)} onLogin={handleLogin} />
    ) : (
      <HomePage
        onGetStarted={() => setShowLogin(true)}
        onLogin={() => setShowLogin(true)}
      />
    );
  }

  // --------------------- Main App UI ---------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PWA Install Button */}
      {showInstall && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleInstall}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
          >
            📲 Install Village Store App
          </button>
        </div>
      )}

      <Header
        cart={cart}
        store={store}
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onStoreSettingsClick={() => setIsStoreSettingsOpen(true)}
        onUserClick={() => setIsUserProfileOpen(true)}
      />

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
          </section>
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        store={store}
        onUpdateQuantity={updateQuantity}
        onOrderViaWhatsApp={handleOrderViaWhatsApp}
      />

      <StoreSettings
        isOpen={isStoreSettingsOpen}
        onClose={() => setIsStoreSettingsOpen(false)}
        store={store}
        onSaveStore={setStore}
      />

      {user && (
        <UserProfile
          user={user}
          onLogout={handleLogout}
          onClose={() => setIsUserProfileOpen(false)}
          isOpen={isUserProfileOpen}
        />
      )}

      <div className="h-20" /> {/* spacing for mobile footer space */}
    </div>
  );
}

export default App;
