import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../pages/HomePage';
import Auth from '../pages/AuthPage';
import Shop from '../pages/shop/VegitableMarket';
import AdminDashboard from '../pages/admin/AdminDashboard';
import BeautyPage from '../pages/shop/BeutyPage';
import FashionPage from '../pages/shop/FashionPage';
import { WelcomeHomePage } from '../pages/shop/WelcomeHomePage';
import { ProductDetailWrapper } from '../components/shop/ProductDetailWrapper';
import { SearchPage } from '../pages/shop/SearchPage';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { DeliveryAddressPage } from '../pages/shop/DeliveryAddressPage';
import { OrderConfirmationPage } from '../pages/shop/OrderConfirmationPage';
import { PaymentPage } from '../pages/shop/PaymentPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import AdminRoute from './AdminRoute';
import MainLayout from '../layout/MainLayout';
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminProducts } from '../pages/admin/AdminProduct';
import { AdminOrders } from '../pages/admin/AdminOrder';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { AdminDeliveryBoys } from '../pages/admin/AdminDeliveryBoys';

export const UserRoutes = () => {
  const navigate = useNavigate();
  const { addToCart, updateQuantity } = useCartStore();
  const [cart] = useState<any[]>([]);

  return (
    <Routes>
      {/* 🌐 Public Route */}
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

     
      <Route path="/home" element={<MainLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <WelcomeHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="shop"
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        <Route
          path="fashion"
          element={
            <PrivateRoute>
              <FashionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="beauty"
          element={
            <PrivateRoute>
              <BeautyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="search"
          element={
            <PrivateRoute>
              <SearchPage
                user={null}
                onBack={() => navigate(-1)}
                onProductClick={(product) => navigate(`/product/${product.id}`)}
                cart={cart}
                onAddToCart={addToCart}
                onUpdateQuantity={updateQuantity}
              />
            </PrivateRoute>
          }
        />
      

      </Route>

      {/* ❌ Routes WITHOUT layout (no Header or TabBar) */}
      <Route
        path="shop/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />
      <Route
        path="fashion/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />
      <Route
        path="beauty/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/product/:id"
        element={
          <PrivateRoute>
            <ProductDetailWrapper />
          </PrivateRoute>
        }
      /> */}
        <Route
          path="/delivery-address"
          element={
            <PrivateRoute>
              <DeliveryAddressPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirm-order"
          element={
            <PrivateRoute>
              <OrderConfirmationPage />
            </PrivateRoute>
          }
        />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};


export const AdminRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Public Route */}
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/:category" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="delivery-boys" element={<AdminDeliveryBoys />} />
        <Route path="customers" element={<div>Customers Page</div>} />
        <Route path="analytics" element={<div>Analytics Page</div>} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export const BoysRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Public Route */}
      <Route path="/" element={<Home />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route path="/delivery-boys" element={<AdminDeliveryBoys />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};