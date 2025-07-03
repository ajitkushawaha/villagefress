import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Admin } from '../../types';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {logout, user}= useAuth()
  // Mock admin data - in real app, this would come from context/auth
  const admin: Admin = {
    id: 'admin1',
    name: 'John Admin',
    email: 'admin@villagefresh.com',
    phone: '+91 9876543210',
    role: 'super_admin',
    permissions: ['all'],
    createdAt: '2024-01-01',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  };

  // Check if admin is logged in
 

  const handleLogout = () => {
    logout()
   
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        admin={user}
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}