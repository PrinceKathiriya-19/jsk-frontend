import React from 'react';
import { Link } from 'react-router-dom';

export const Downloads: React.FC = () => {
  const documents = [
    { icon: 'menu_book', title: 'Product Catalog 2024', desc: 'Complete catalog of all fine and specialty chemicals', size: '2.4 MB', format: 'PDF' },
    { icon: 'verified', title: 'Company Profile', desc: 'Overview of JSK Chemicals, facilities, and capabilities', size: '1.8 MB', format: 'PDF' },
    { icon: 'assignment', title: 'Fine Chemicals List', desc: 'Detailed list of fine chemicals with CAS numbers', size: '0.6 MB', format: 'PDF' },
    { icon: 'assignment', title: 'Speciality Chemicals List', desc: 'Detailed list of specialty chemicals with specifications', size: '0.5 MB', format: 'PDF' },
    { icon: 'science', title: 'Impurity Standards List', desc: 'Reference standards catalog for pharmaceutical impurities', size: '0.8 MB', format: 'PDF' },
    { icon: 'gpp_good', title: 'Quality Policy', desc: 'Our quality management system and policy document', size: '0.3 MB', format: 'PDF' },
  ];

  const handleDownload = (docTitle: string) => {
    alert(`Downloading ${docTitle}...`);
  };

  return (
    <div>
      <div className="page-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">Resources</span>
          <h1>Downloads</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-icons">chevron_right</span>
            Downloads
          </div>
        </div>
      </div>

      <section className="downloads-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Resources &amp; Documents</span>
            <h2 className="section-title">Available Downloads</h2>
            <div className="divider"></div>
            <p className="section-desc">Download product catalogs, certificates, and technical documents.</p>
          </div>

          <div className="downloads-grid">
            {documents.map((doc, idx) => (
              <div key={idx} className="download-card">
                <div className="doc-icon">
                  <span className="material-icons">{doc.icon}</span>
                </div>
                <div className="doc-info">
                  <h3>{doc.title}</h3>
                  <p>{doc.desc}</p>
                  <span className="doc-meta">{doc.size} • {doc.format}</span>
                </div>
                <button className="download-btn" onClick={() => handleDownload(doc.title)}>
                  <span className="material-icons">download</span>
                </button>
              </div>
            ))}
          </div>

          <div className="products-note" style={{ marginTop: '40px' }}>
            <span className="material-icons">info</span>
            <p>For specific product data sheets or certificates of analysis, please <Link to="/contact-us">contact us</Link> with your request.</p>
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
        .downloads-section { padding: 80px 0; }
        .section-header { margin-bottom: 48px; }
        .downloads-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .download-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          background: var(--white);
          border-radius: 12px;
          border: 1px solid var(--light-gray);
          transition: var(--transition);
        }
        .download-card:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(26,60,94,0.15);
        }
        .doc-icon {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          background: rgba(26,60,94,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .doc-icon .material-icons { font-size: 24px; color: var(--primary); }
        .doc-info { flex: 1; }
        .doc-info h3 { font-family: var(--font-display); font-size: 16px; color: var(--primary); margin-bottom: 4px; }
        .doc-info p { font-size: 13px; color: var(--mid-gray); margin-bottom: 6px; }
        .doc-meta { font-size: 12px; color: var(--mid-gray); background: var(--off-white); padding: 2px 8px; border-radius: 4px; }
        .download-btn {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--accent);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          flex-shrink: 0;
        }
        .download-btn:hover { background: var(--accent-dark); transform: translateY(-1px); }
        .download-btn .material-icons { font-size: 18px; color: var(--white); }
        .products-note { display: flex; align-items: flex-start; gap: 10px; background: rgba(26,60,94,0.05); border: 1px solid rgba(26,60,94,0.1); border-radius: 8px; padding: 16px 20px; }
        .products-note .material-icons { color: var(--primary-light); font-size: 18px; margin-top: 1px; flex-shrink: 0; }
        .products-note p { font-size: 14px; color: var(--dark-gray); line-height: 1.6; }
        .products-note a { color: var(--accent); font-weight: 600; }
        @media (max-width: 700px) { .downloads-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};
