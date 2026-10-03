import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">JSK</div>
              <div>
                <div className="footer-logo-name">JSK Chemicals</div>
                <div className="footer-logo-sub">Fine &amp; Specialty Chemicals</div>
              </div>
            </div>
            <p className="footer-desc">
              A manufacturing company of fine and specialty chemicals, focused on providing high quality, consistent and efficient services for industries and research institutes.
            </p>
            <div className="footer-social">
              <a href="mailto:jsk.chemicals@gmail.com" className="social-btn" title="Email">
                <span className="material-icons">email</span>
              </a>
              <a href="tel:+919879767970" className="social-btn" title="Phone">
                <span className="material-icons">phone</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/downloads">Downloads</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-links">
              <li><Link to="/fine-chemicals-products">Fine Chemicals</Link></li>
              <li><Link to="/speciality-chemicals-products">Speciality Chemicals</Link></li>
              <li><Link to="/impurity-products">Impurity</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="material-icons">location_on</span>
                <span>17-Shriyam Industrial Park, Singarva Kathwada Road, Behind Kathwada GIDC, Ahmedabad, Gujarat - 382430</span>
              </li>
              <li>
                <span className="material-icons">phone</span>
                <a href="tel:+919879767970">+91 9879767970</a>
              </li>
              <li>
                <span className="material-icons">email</span>
                <a href="mailto:jsk.chemicals@gmail.com">jsk.chemicals@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© JSK Chemicals Ahmedabad, {currentYear} All Rights Reserved</p>
          <p>Powered By: <a href="https://zectorinc.com" target="_blank" rel="noopener noreferrer">Zector Inc</a></p>
        </div>
      </div>
    </footer>
  );
};
