import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaSearch, 
  FaFlask, 
  FaBoxes, 
  FaVials, 
  FaDna,
  FaIndustry, 
  FaDownload, 
  FaPaperPlane, 
  FaUserLock, 
  FaInfoCircle, 
  FaPhoneAlt 
} from 'react-icons/fa';

export const Sidebar: React.FC = () => {
  return (
    <aside className="knb-sidebar">
      <ul className="knb-sidebar-nav">
        <li className="knb-sidebar-item">
          <NavLink to="/" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaSearch /> Product Catalog & Search
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/fine-chemicals-products" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaFlask /> Fine Chemicals
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/speciality-chemicals-products" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaBoxes /> Speciality Intermediates
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/impurity-products" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaVials /> Pharma Impurity Standards
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/custom-synthesis" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaDna /> Custom Synthesis R&D
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/facilities" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaIndustry /> Infrastructure & Plants
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/downloads" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaDownload /> Specs & SDS Downloads
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/order-inquiry" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaPaperPlane /> Request Quotation (RFQ)
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/portal" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaUserLock /> Client Inquiry Portal
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/about-us" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaInfoCircle /> About JSK Chemicals
          </NavLink>
        </li>
        <li className="knb-sidebar-item">
          <NavLink to="/contact-us" className={({ isActive }) => `knb-sidebar-link ${isActive ? 'active' : ''}`}>
            <FaPhoneAlt /> Contact & Location
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
