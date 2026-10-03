import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const values = [
    { icon: 'star', title: 'Quality', desc: 'Every product meets the highest quality standards before delivery.' },
    { icon: 'handshake', title: 'Integrity', desc: 'Honest and transparent business practices in all our dealings.' },
    { icon: 'lightbulb', title: 'Innovation', desc: 'Continuously improving processes and developing new products.' },
    { icon: 'people', title: 'Customer Focus', desc: 'Your satisfaction and success is our primary objective.' }
  ];

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">JSK Chemicals</span>
          <h1>About Us</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-icons">chevron_right</span>
            About Us
          </div>
        </div>
      </div>

      {/* About Content */}
      <section className="about-page-section">
        <div className="container">
          <div className="about-page-grid">
            <div className="about-page-content">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Who We Are</h2>
              <div className="divider"></div>
              <p>JSK Chemicals is a manufacturing company of fine and specialty chemicals, focused on providing high quality, consistent and efficient services for industries and research institutes.</p>
              <p>Based in Ahmedabad, Gujarat, we have built a reputation for reliability, quality, and innovation in the chemical manufacturing sector.</p>
              <p>Our state-of-the-art facility at Shriyam Industrial Park is equipped with modern equipment and operated by a team of experienced chemists and engineers.</p>
            </div>
            <div className="about-page-visual">
              <div className="about-page-card">
                <span className="material-icons">business</span>
                <h3>Our Mission</h3>
                <p>To provide high-quality fine and specialty chemicals with consistent purity and timely delivery to our global customers.</p>
              </div>
              <div className="about-page-card accent">
                <span className="material-icons">visibility</span>
                <h3>Our Vision</h3>
                <p>To become a globally recognized leader in fine and specialty chemical manufacturing from India.</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="values-section">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '48px' }}>Our Core Values</h2>
            <div className="values-grid">
              {values.map((v, idx) => (
                <div key={idx} className="value-card">
                  <span className="material-icons">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .page-banner {
          height: 280px;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          position: relative;
          display: flex;
          align-items: center;
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,20,40,0.4);
        }
        .banner-content {
          position: relative;
          z-index: 1;
        }
        .banner-content h1 {
          font-family: var(--font-display);
          font-size: 48px;
          color: var(--white);
          margin: 8px 0 16px;
        }
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }
        .breadcrumb a { color: var(--accent-light); }
        .breadcrumb .material-icons { font-size: 16px; }
        .about-page-section { padding: 80px 0; }
        .about-page-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 64px;
          align-items: start;
          margin-bottom: 80px;
        }
        .about-page-content p {
          font-size: 16px;
          color: var(--mid-gray);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .about-page-visual { display: flex; flex-direction: column; gap: 20px; }
        .about-page-card {
          padding: 28px;
          border-radius: 12px;
          border: 1px solid var(--light-gray);
          background: var(--off-white);
        }
        .about-page-card.accent { background: var(--primary); border-color: var(--primary); }
        .about-page-card .material-icons {
          font-size: 32px;
          color: var(--accent);
          margin-bottom: 12px;
          display: block;
        }
        .about-page-card h3 {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .about-page-card.accent h3 { color: var(--white); }
        .about-page-card p { font-size: 14px; color: var(--mid-gray); line-height: 1.7; }
        .about-page-card.accent p { color: rgba(255,255,255,0.7); }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .value-card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 12px;
          border: 1px solid var(--light-gray);
          transition: var(--transition);
        }
        .value-card:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .value-card:hover h3, .value-card:hover p { color: var(--white); }
        .value-card .material-icons {
          font-size: 36px;
          color: var(--accent);
          margin-bottom: 14px;
          display: block;
        }
        .value-card h3 {
          font-family: var(--font-display);
          font-size: 16px;
          color: var(--primary);
          margin-bottom: 10px;
          transition: var(--transition);
        }
        .value-card p { font-size: 13px; color: var(--mid-gray); line-height: 1.6; transition: var(--transition); }
        @media (max-width: 900px) {
          .about-page-grid { grid-template-columns: 1fr; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};
