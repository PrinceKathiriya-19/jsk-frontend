import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFlask, FaSignInAlt, FaGlobe, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="knb-header">
      {/* Brand Logo */}
      <div className="knb-brand">
        <Link to="/" className="knb-brand-logo">
          <div className="knb-logo-mark"><FaFlask /> JSK</div>
          <span>JSK CHEMICALS</span>
        </Link>
      </div>

      {/* Corporate Information & Top Controls */}
      <div className="knb-header-user">
        <div className="knb-user-info" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#718096', display: 'block', fontWeight: 'bold' }}>
              Sales & Technical Support
            </span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1b365d', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaPhoneAlt style={{ color: '#0056b3', fontSize: '11px' }} /> +91 98797 67970
            </span>
          </div>
          <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '15px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#718096', display: 'block', fontWeight: 'bold' }}>
              Inquiry Email
            </span>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1b365d', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaEnvelope style={{ color: '#0056b3', fontSize: '11px' }} /> jsk.chemicals@gmail.com
            </span>
          </div>
        </div>

        <div className="knb-top-tools">
          <button className="knb-tool-btn">A-</button>
          <button className="knb-tool-btn active">A</button>
          <button className="knb-tool-btn">A+</button>
          <span style={{ margin: '0 4px', color: '#cbd5e0' }}>|</span>
          <span style={{ fontSize: '11px', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FaGlobe /> English
          </span>
          <button 
            className="knb-tool-btn" 
            style={{ marginLeft: '10px', background: '#1b365d', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px' }}
            onClick={() => navigate('/login')}
            title="Client Portal Login"
          >
            <FaSignInAlt /> Login
          </button>
        </div>
      </div>
    </header>
  );
};
