import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  Settings, 
  BarChart3,
  Leaf,
  Shirt,
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      exact: true
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      path: '/admin/orders'
    },
    {
      title: 'Products',
      icon: Package,
      path: '/admin/products',
      submenu: [
        { title: 'All Products', path: '/admin/products', icon: Package },
        { title: 'Vegetables & Grocery', path: '/admin/products/grocery', icon: Leaf },
        { title: 'Fashion', path: '/admin/products/fashion', icon: Shirt },
        { title: 'Beauty', path: '/admin/products/beauty', icon: Sparkles },
        { title: 'Food & Beverages', path: '/admin/products/food', icon: UtensilsCrossed },
      ]
    },
    {
      title: 'Delivery Boys',
      icon: Truck,
      path: '/admin/delivery-boys'
    },
    {
      title: 'Customers',
      icon: Users,
      path: '/admin/customers'
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics'
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  const NavItem = ({ item, isSubmenu = false }: { item: any; isSubmenu?: boolean }) => {
    const Icon = item.icon;
    
    return (
      <NavLink
        to={item.path}
        onClick={onClose}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isSubmenu ? 'ml-4 pl-8' : ''
          } ${
            isActive
              ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`
        }
      >
        <Icon className="w-5 h-5" />
        <span>{item.title}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌱</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">VillageFresh</h2>
              <p className="text-xs text-gray-600">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <div key={index}>
                <NavItem item={item} />
                {item.submenu && (
                  <div className="mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <NavItem key={subIndex} item={subItem} isSubmenu />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>VillageFresh Admin v1.0</p>
              <p>© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}