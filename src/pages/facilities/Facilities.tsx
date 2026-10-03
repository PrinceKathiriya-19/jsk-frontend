import React from 'react';
import { Link } from 'react-router-dom';

export const Facilities: React.FC = () => {
  const facilities = [
    { icon: 'factory', title: 'Manufacturing Plant', desc: 'Modern manufacturing plant with advanced reactors and distillation units for large-scale production.' },
    { icon: 'science', title: 'Quality Control Lab', desc: 'In-house analytical laboratory with HPLC, GC, and other advanced instruments for quality testing.' },
    { icon: 'thermostat', title: 'Temperature Controlled Storage', desc: 'Cold storage and temperature-controlled warehousing to maintain product integrity.' },
    { icon: 'water_drop', title: 'Solvent Recovery Unit', desc: 'Environmentally responsible solvent recovery and recycling system.' },
    { icon: 'security', title: 'Safety Systems', desc: 'Comprehensive fire safety, hazardous material handling, and emergency response systems.' },
    { icon: 'eco', title: 'Effluent Treatment Plant', desc: 'Advanced ETP ensuring zero liquid discharge and compliance with environmental norms.' },
  ];

  return (
    <div>
      <div className="page-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">Our Infrastructure</span>
          <h1>Facilities</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-icons">chevron_right</span>
            Facilities
          </div>
        </div>
      </div>

      <section className="facilities-section">
        <div className="container">
          <div className="facilities-intro">
            <span className="section-label">World-Class Infrastructure</span>
            <h2 className="section-title">Our Manufacturing Facilities</h2>
            <div className="divider"></div>
            <p className="section-desc">
              Located at Shriyam Industrial Park, Ahmedabad, our facility is equipped with state-of-the-art equipment to ensure consistent product quality.
            </p>
          </div>

          <div className="facilities-grid">
            {facilities.map((facility, idx) => (
              <div key={idx} className="facility-card">
                <div className="facility-icon">
                  <span className="material-icons">{facility.icon}</span>
                </div>
                <h3>{facility.title}</h3>
                <p>{facility.desc}</p>
              </div>
            ))}
          </div>

          {/* Address Card */}
          <div className="address-card">
            <div className="address-content">
              <h3>Visit Our Facility</h3>
              <p>17-Shriyam Industrial Park, Singarva Kathwada Road, Behind Kathwada GIDC, Ahmedabad, Gujarat - 382430</p>
            </div>
            <Link to="/contact-us" className="btn-primary">
              <span className="material-icons">directions</span>
              Get Directions
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .page-banner { height: 280px; background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%); position: relative; display: flex; align-items: center; }
        .banner-overlay { position: absolute; inset: 0; background: rgba(10,20,40,0.4); }
        .banner-content { position: relative; z-index: 1; }
        .banner-content h1 { font-family: var(--font-display); font-size: 48px; color: var(--white); margin: 8px 0 16px; }
        .breadcrumb { display: flex; align-items: center; gap: 4px; font-size: 14px; color: rgba(255,255,255,0.6); }
        .breadcrumb a { color: var(--accent-light); }
        .breadcrumb .material-icons { font-size: 16px; }
        .facilities-section { padding: 80px 0; }
        .facilities-intro { margin-bottom: 56px; }
        .facilities-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-bottom: 48px; }
        .facility-card {
          padding: 36px 28px;
          border-radius: 12px;
          border: 1px solid var(--light-gray);
          background: var(--white);
          transition: var(--transition);
          text-align: center;
        }
        .facility-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }
        .facility-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(26,60,94,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .facility-icon .material-icons { font-size: 28px; color: var(--primary); }
        .facility-card h3 { font-family: var(--font-display); font-size: 18px; color: var(--primary); margin-bottom: 10px; }
        .facility-card p { font-size: 14px; color: var(--mid-gray); line-height: 1.7; }
        .address-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          padding: 36px 40px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          border-radius: 16px;
        }
        .address-content h3 { font-family: var(--font-display); font-size: 22px; color: var(--white); margin-bottom: 8px; }
        .address-content p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; }
        @media (max-width: 900px) { .facilities-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) {
          .facilities-grid { grid-template-columns: 1fr; }
          .address-card { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};
