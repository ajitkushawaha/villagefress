import React, { useState, useMemo } from 'react';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { Header } from './components/Header';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { StoreSettings } from './components/StoreSettings';
import { UserProfile } from './components/UserProfile';
import { products } from './data/products';
import { CartItem, Product, Store } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { generateWhatsAppMessage, openWhatsApp } from './utils/whatsapp';
import { PromoSlider } from './components/PromoSlider';
import { SkeletonLoader } from './components/SkeletonLoader';
import { AdminDashboard } from './admin/AdminDashboard';

const defaultStore: Store = {
  name: 'Village Store',
  ownerName: 'Store Owner',
  phone: '+9198989898',
  address: 'Khukhundoo Store',
  whatsappNumber: '+917617028576'
};

type AppView = 'home' | 'auth' | 'shop';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useLocalStorage<CartItem[]>('village-fresh-cart', []);
  const [store, setStore] = useLocalStorage<Store>('village-fresh-store', defaultStore);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const { user, isAdmin, isAuthenticated, login, logout, loading } = useAuth();

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find((item: CartItem) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item: CartItem) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleOrderViaWhatsApp = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const message = generateWhatsAppMessage(cart, store, total);
    openWhatsApp(store.whatsappNumber, message);

    // Clear cart after sending order
    setCart([]);
    setIsCartOpen(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView('shop');
    } else {
      setCurrentView('auth');
    }
  };

  const handleLogin = (userData: any) => {
    login(userData);
    setCurrentView('shop');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
    setIsUserProfileOpen(false);
  };
if (isAdmin) {
  return <AdminDashboard />;
}
  // 👇 Show loading while Firebase auth checks status
  if (loading) return <SkeletonLoader />;

  // 👇 Not logged in? Show home or auth page
  if (!isAuthenticated) {
    return (
      <>
        {currentView === 'home' && (
          <HomePage
            onGetStarted={handleGetStarted}
            onLogin={() => setCurrentView('auth')}
          />
        )}
        {currentView === 'auth' && (
          <AuthPage
            onBack={() => setCurrentView('home')}
            onLogin={handleLogin}
          />
        )}
      </>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header
        cart={cart}
        store={store}
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onStoreSettingsClick={() => setIsStoreSettingsOpen(true)}
        onUserClick={() => setIsUserProfileOpen(true)}
      />

      <main className="flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-1/5 border-r border-gray-100 bg-white">
          <CategoryGrid
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          {/* Promo Slider */}
          <div className=" pt-4">
            <PromoSlider />
          </div>

          {/* Products */}
          <section className="px-2 py-1 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                : 'All Products'}
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

      <div className="h-20" />
    </div>
  );
}

export default App;