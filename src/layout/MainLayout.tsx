// src/layouts/MainLayout.tsx
import React from 'react';
import { Header } from './Header';
import { BottomTabBar } from './BottomTabBar';
import { Cart } from '../components/shop/Cart';
import { UserProfile } from './UserProfile';

import { Outlet, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useOrderViaWhatsApp } from '../hooks/useOrderViaWhatsApp';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Store } from '../types';
import { useAuth } from '../hooks/useAuth';

const defaultStore: Store = {
  name: 'Village Store',
  ownerName: 'Store Owner',
  phone: '+9198989898',
  address: 'Khukhundoo Store',
  whatsappNumber: '+917617028576',
};

const MainLayout = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity } = useCartStore();
  const { user, logout } = useAuth();
  const [store, setStore] = useLocalStorage<Store>('village-fresh-store', defaultStore);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = React.useState(false);

  const { handleOrder } = useOrderViaWhatsApp(store, () => setIsCartOpen(false));

  const handleLogout = () => {
    logout();
    setIsUserProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        theme="grocery"
        cart={cart}
        store={store}
        user={user}
        onCartClick={() => setIsCartOpen(true)}
        onClick={() => navigate('store-settings')}
        onUserClick={() => setIsUserProfileOpen(true)}
      />

      
      <Outlet/>

      <BottomTabBar navigate={navigate} />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        store={store}
        onUpdateQuantity={updateQuantity}
        onOrderViaWhatsApp={handleOrder}
      />


      <UserProfile
        user={user}
        onLogout={handleLogout}
        onClose={() => setIsUserProfileOpen(false)}
        isOpen={isUserProfileOpen}
      />

      <div className="h-20" /> {/* spacing for bottom tab */}
    </div>
  );
};

export default MainLayout;
