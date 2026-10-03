import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../../services/OrderContext';
import './AdminSidebar.css';

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isCollapsed: externalIsCollapsed, 
  onToggleCollapse 
}) => {
  const { logoutAdmin } = useOrders();
  const navigate = useNavigate();
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalIsCollapsed(!internalIsCollapsed);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header for Admin */}
      <div className="admin-mobile-bar">
        <button className="admin-hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <span className="material-icons">{isMobileOpen ? 'close' : 'menu'}</span>
        </button>
        <div className="admin-mobile-brand">
          <span className="badge">JSK</span>
          <span>Admin Console</span>
        </div>
        <button className="admin-mobile-logout" onClick={handleLogout} title="Logout">
          <span className="material-icons">logout</span>
        </button>
      </div>

      {/* Admin Sidebar Container */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        
        {/* Brand Header */}
        <div className="sidebar-brand">
          <Link to="/admin-dashboard" className="brand-logo-link" onClick={closeMobile}>
            <div className="brand-badge">JSK</div>
            {!isCollapsed && (
              <div className="brand-titles">
                <span className="main-title">JSK Chemicals</span>
                <span className="sub-title">Admin Management</span>
              </div>
            )}
          </Link>
          <button 
            className="collapse-toggle-btn" 
            onClick={handleToggle}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className="material-icons">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Sidebar Menu Group */}
        <div className="sidebar-menu-wrapper">
          <div className="menu-group-label">{!isCollapsed && 'ADMIN MENU'}</div>
          
          <ul className="sidebar-menu">
            <li>
              <NavLink 
                to="/admin-dashboard" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                <span className="material-icons">dashboard</span>
                {!isCollapsed && <span className="link-text">Admin Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin-users" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                <span className="material-icons">people</span>
                {!isCollapsed && <span className="link-text">User Master</span>}
              </NavLink>
            </li>
          </ul>

        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="sidebar-footer">
          <div className="user-profile-summary">
            <div className="avatar-circle">A</div>
            {!isCollapsed && (
              <div className="profile-meta">
                <span className="user-name">Administrator</span>
                <span className="user-role">Super Admin</span>
              </div>
            )}
          </div>
          <button className="logout-sidebar-btn" onClick={handleLogout} title="Logout Administrator">
            <span className="material-icons">logout</span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>

      </aside>
    </>
  );
};
