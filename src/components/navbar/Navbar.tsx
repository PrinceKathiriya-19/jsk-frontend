import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../services/CartContext';
import { useUser } from '../../services/UserContext';
import { useOrders } from '../../services/OrderContext';
import './Navbar.css';

export const Navbar: React.FC = () => {

  const { cartCount } = useCart();
  const { isLoggedIn } = useUser();
  const { isAdminLoggedIn } = useOrders();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsProductsOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleProducts = () => {
    setIsProductsOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container top-bar-inner">
            <div className="top-contact">
              <a href="mailto:jsk.chemicals@gmail.com" className="contact-item">
                <span className="material-icons">email</span>
                jsk.chemicals@gmail.com
              </a>
              <a href="tel:+919879767970" className="contact-item">
                <span className="material-icons">phone</span>
                +91 98797 67970
              </a>
            </div>
            <div className="top-tagline">Fine &amp; Specialty Chemicals Manufacturer</div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="main-nav">
          <div className="container nav-inner">
            {/* Logo */}
            <Link to="/" className="logo" onClick={closeMenu}>
              <div className="logo-icon">
                <span>JSK</span>
              </div>
              <div className="logo-text">
                <span className="logo-main">JSK Chemicals</span>
                <span className="logo-sub">Fine &amp; Specialty Chemicals</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="nav-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About Us
                </NavLink>
              </li>
              <li className="dropdown-parent" onMouseEnter={() => setIsProductsOpen(true)} onMouseLeave={() => setIsProductsOpen(false)}>
                <span className="nav-link dropdown-trigger" onClick={toggleProducts}>
                  Products
                  <span className={`material-icons arrow ${isProductsOpen ? 'open' : ''}`}>keyboard_arrow_down</span>
                </span>
                <div className={`dropdown ${isProductsOpen ? 'open' : ''}`}>
                  <Link to="/fine-chemicals-products" className="dropdown-item" onClick={closeMenu}>
                    <span className="material-icons">science</span>
                    Fine Chemicals
                  </Link>
                  <Link to="/speciality-chemicals-products" className="dropdown-item" onClick={closeMenu}>
                    <span className="material-icons">biotech</span>
                    Speciality Chemicals
                  </Link>
                  <Link to="/impurity-products" className="dropdown-item" onClick={closeMenu}>
                    <span className="material-icons">category</span>
                    Impurity
                  </Link>
                </div>
              </li>
              <li>
                <NavLink to="/facilities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Facilities
                </NavLink>
              </li>
              <li>
                <NavLink to="/downloads" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Downloads
                </NavLink>
              </li>
              <li>
                {isLoggedIn ? (
                  <NavLink to="/portal" className={({ isActive }) => `nav-link portal-nav-link ${isActive ? 'active' : ''}`}>
                    <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '4px' }}>account_circle</span>
                    Workspace
                  </NavLink>
                ) : (
                  <NavLink to="/login" className={({ isActive }) => `nav-link portal-nav-link ${isActive ? 'active' : ''}`}>
                    <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '4px' }}>login</span>
                    Sign In
                  </NavLink>
                )}
              </li>
              <li>
                <Link to="/order-inquiry" className="cart-nav-link" title="Inquiry Cart">
                  <span className="material-icons">shopping_cart</span>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="nav-btn">Contact Us</Link>
              </li>
              <li>
                {isAdminLoggedIn ? (
                  <Link to="/admin-dashboard" className="nav-btn admin-btn" onClick={closeMenu}>
                    <span className="material-icons">dashboard</span> Panel
                  </Link>
                ) : (
                  <Link to="/admin-login" className="nav-btn admin-btn" onClick={closeMenu}>
                    <span className="material-icons">lock</span> Admin
                  </Link>
                )}
              </li>
            </ul>

            {/* Mobile Hamburger */}
            <button className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li><Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about-us" className="mobile-nav-link" onClick={closeMenu}>About Us</Link></li>
            <li>
              <div className="mobile-nav-link" onClick={toggleProducts}>
                Products <span className={`material-icons ${isProductsOpen ? 'rotate' : ''}`}>expand_more</span>
              </div>
              <div className={`mobile-dropdown ${isProductsOpen ? 'open' : ''}`}>
                <Link to="/fine-chemicals-products" className="mobile-sub-link" onClick={closeMenu}>Fine Chemicals</Link>
                <Link to="/speciality-chemicals-products" className="mobile-sub-link" onClick={closeMenu}>Speciality Chemicals</Link>
                <Link to="/impurity-products" className="mobile-sub-link" onClick={closeMenu}>Impurity</Link>
              </div>
            </li>
            <li><Link to="/facilities" className="mobile-nav-link" onClick={closeMenu}>Facilities</Link></li>
            <li><Link to="/downloads" className="mobile-nav-link" onClick={closeMenu}>Downloads</Link></li>
            <li>
              {isLoggedIn ? (
                <Link to="/portal" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }}>account_circle</span> Client Workspace
                </Link>
              ) : (
                <Link to="/login" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }}>login</span> Client Login
                </Link>
              )}
            </li>
            <li>
              <Link to="/order-inquiry" className="mobile-nav-link" onClick={closeMenu}>
                Inquiry Cart
                {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
              </Link>
            </li>
            <li><Link to="/contact-us" className="mobile-nav-link accent" onClick={closeMenu}>Contact Us</Link></li>
            <li>
              {isAdminLoggedIn ? (
                <Link to="/admin-dashboard" className="mobile-nav-link admin" onClick={closeMenu}>
                  <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }}>dashboard</span> Admin Panel
                </Link>
              ) : (
                <Link to="/admin-login" className="mobile-nav-link admin" onClick={closeMenu}>
                  <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }}>lock</span> Admin Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="nav-spacer"></div>
    </>
  );
};
