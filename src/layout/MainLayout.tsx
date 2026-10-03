import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';
import { AdminSidebar } from '../components/sidebar/AdminSidebar';
import { useOrders } from '../services/OrderContext';

export const MainLayout: React.FC = () => {
  const { isAdminLoggedIn } = useOrders();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (isAdminLoggedIn) {
    return (
      <div className="admin-layout-container" style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)} 
        />
        <main 
          className="admin-layout-main" 
          style={{ 
            flex: 1, 
            minWidth: 0, 
            paddingLeft: isSidebarCollapsed ? '72px' : '250px', 
            transition: 'padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
        >
          <Outlet />
        </main>
        <style>{`
          @media (max-width: 992px) {
            .admin-layout-main {
              padding-left: 0 !important;
              padding-top: 56px;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
