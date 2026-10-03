import React from 'react';
import { 
  FaCheckCircle, 
  FaMicroscope, 
  FaGlobe, 
  FaFilePdf, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLock, 
  FaDna 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export const About: React.FC = () => (
  <div>
    <div className="knb-card">
      <h3 className="knb-card-subtitle">About JSK Chemicals Pvt. Ltd.</h3>
      <div style={{ lineHeight: '1.7', color: '#334155', fontSize: '15px' }}>
        <p style={{ marginBottom: '16px' }}>
          <strong>JSK Chemicals Pvt. Ltd.</strong> (associated with JSK Group and JSK Lab) is a premier chemical manufacturing and research enterprise headquartered in <strong>Ahmedabad, Gujarat, India</strong>. We specialize in the development, organic synthesis, and commercial manufacturing of <strong>Fine Chemicals, Speciality Intermediates, and Pharmaceutical Impurity Reference Standards</strong>.
        </p>
        <p style={{ marginBottom: '20px' }}>
          With state-of-the-art manufacturing infrastructure and an advanced analytical testing laboratory, we supply high-purity chemicals to leading pharmaceutical companies, agrochemical producers, and research institutions worldwide.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', margin: '28px 0' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#1b365d', margin: '0 0 10px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCheckCircle style={{ color: '#16a34a' }} /> cGMP & ISO 9001 Compliance
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Strict adherence to international quality management systems, batch traceability, and rigorous QA/QC documentation.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#1b365d', margin: '0 0 10px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaMicroscope style={{ color: '#0056b3' }} /> Advanced R&D Analytical Suite
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Equipped with high-performance HPLC, GC-MS, LC-MS, 400 MHz NMR, FT-IR, and Karl Fischer moisture analyzers.
            </p>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ color: '#1b365d', margin: '0 0 10px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaGlobe style={{ color: '#d97706' }} /> Global Delivery & Compliance
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Exporting chemical solutions with full MSDS/SDS, Certificate of Analysis (COA), and regulatory documentation.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="knb-card">
      <h3 className="knb-card-subtitle">Core Pillars of Excellence</h3>
      <div className="knb-table-responsive">
        <table className="knb-table">
          <thead>
            <tr>
              <th>Pillar</th>
              <th>Technical Capability</th>
              <th>Industry Benefit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fine & Specialty Synthesis</strong></td>
              <td>Acetalization, Alkylation, Condensation, Nitration, Halogenation, Hydrogenation</td>
              <td>High Purity Building Blocks for Complex Active Ingredients</td>
            </tr>
            <tr>
              <td><strong>Pharma Impurity Synthesis</strong></td>
              <td>Synthesis & Isolation of EP / USP / IP Impurities (Atenolol, Amlodipine, etc.)</td>
              <td>Accurate Reference Standards for Method Validation & DMF Filings</td>
            </tr>
            <tr>
              <td><strong>Custom Research & Contract Scale-up</strong></td>
              <td>Gram-scale R&D route synthesis scaling up to Multi-ton Commercial Batches</td>
              <td>Confidential non-disclosure agreement (NDA) protected process development</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const Facilities: React.FC = () => (
  <div className="knb-card">
    <h3 className="knb-card-subtitle">Manufacturing Facilities & Infrastructure (Ahmedabad, Gujarat)</h3>
    <div style={{ lineHeight: '1.7', fontSize: '15px', color: '#334155' }}>
      <p style={{ marginBottom: '20px' }}>
        Our chemical production complexes located in <strong>Shriyam Industrial Park and Keshvam Industrial Estate, Ahmedabad</strong> feature multi-purpose reaction blocks equipped with Glass Lined Reactors (GLR) and Stainless Steel Reactors (SSR-316/316L) operating under cleanroom conditions.
      </p>
      
      <div className="knb-table-responsive">
        <table className="knb-table">
          <thead>
            <tr>
              <th>Production / Facility Unit</th>
              <th>Reactor / Equipment Capacity</th>
              <th>Key Operations & Capabilities</th>
              <th>Quality Certification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Unit I - Multi-purpose Reaction Block</strong></td>
              <td>500L to 5,000L (Glass Lined & SS-316)</td>
              <td>High Temperature Reactions, Distillation, Hydrogenation, Nitration</td>
              <td><span style={{ color: '#16a34a', fontWeight: 'bold' }}>ISO 9001:2015</span></td>
            </tr>
            <tr>
              <td><strong>Unit II - Fine & Specialty Processing</strong></td>
              <td>1,000L to 3,000L (SS-316L)</td>
              <td>Crystallization, Agitated Nutsche Filters (ANFD), Vacuum Tray Dryers</td>
              <td><span style={{ color: '#16a34a', fontWeight: 'bold' }}>cGMP Standard</span></td>
            </tr>
            <tr>
              <td><strong>Analytical Testing & QA Lab</strong></td>
              <td>Instrumentation Suite</td>
              <td>HPLC (PDA/UV), GC-MS, NMR Isolation, Karl Fischer, Melting Point</td>
              <td><span style={{ color: '#16a34a', fontWeight: 'bold' }}>NABL Accredited</span></td>
            </tr>
            <tr>
              <td><strong>R&D Custom Synthesis Center</strong></td>
              <td>Glassware 1L to 50L Reactors</td>
              <td>Process Development, Impurity Isolation, Polymorph Screening</td>
              <td><span style={{ color: '#16a34a', fontWeight: 'bold' }}>R&D Approved</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export const Downloads: React.FC = () => (
  <div className="knb-card">
    <h3 className="knb-card-subtitle">Downloads & Technical Documentation</h3>
    <div className="knb-table-responsive">
      <table className="knb-table">
        <thead>
          <tr>
            <th>Document Title</th>
            <th>Category</th>
            <th>File Format</th>
            <th>File Size</th>
            <th style={{ textAlign: 'center' }}>Download Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>JSK Chemical Product Catalog 2026</strong></td>
            <td>Full Product Catalog</td>
            <td>PDF</td>
            <td>4.8 MB</td>
            <td style={{ textAlign: 'center' }}>
              <button 
                className="knb-btn-search" 
                style={{ padding: '6px 16px', fontSize: '12px', display: 'inline-flex' }}
                onClick={() => alert('Downloading JSK Chemical Catalog 2026 PDF...')}
              >
                <FaFilePdf /> Download PDF
              </button>
            </td>
          </tr>
          <tr>
            <td><strong>ISO 9001:2015 Quality Management Certificate</strong></td>
            <td>Company Compliance</td>
            <td>PDF</td>
            <td>1.2 MB</td>
            <td style={{ textAlign: 'center' }}>
              <button 
                className="knb-btn-search" 
                style={{ padding: '6px 16px', fontSize: '12px', display: 'inline-flex' }}
                onClick={() => alert('Downloading ISO Certificate PDF...')}
              >
                <FaFilePdf /> Download Certificate
              </button>
            </td>
          </tr>
          <tr>
            <td><strong>Safety Data Sheet (SDS / MSDS) Master Template</strong></td>
            <td>Safety Documentation</td>
            <td>PDF</td>
            <td>850 KB</td>
            <td style={{ textAlign: 'center' }}>
              <button 
                className="knb-btn-search" 
                style={{ padding: '6px 16px', fontSize: '12px', display: 'inline-flex' }}
                onClick={() => alert('Downloading SDS Master Template PDF...')}
              >
                <FaFilePdf /> Download SDS
              </button>
            </td>
          </tr>
          <tr>
            <td><strong>Pharma Impurity Standards List (Atenolol, Amlodipine, Pioglitazone)</strong></td>
            <td>Impurity Reference</td>
            <td>PDF / Excel</td>
            <td>2.1 MB</td>
            <td style={{ textAlign: 'center' }}>
              <button 
                className="knb-btn-search" 
                style={{ padding: '6px 16px', fontSize: '12px', display: 'inline-flex' }}
                onClick={() => alert('Downloading Impurity Standards List...')}
              >
                <FaFilePdf /> Download List
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="knb-card">
    <h3 className="knb-card-subtitle">Contact Corporate & Factory Offices</h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', fontSize: '14px', color: '#334155' }}>
      <div>
        <p><strong style={{ color: '#1b365d', fontSize: '16px' }}>JSK Chemicals Pvt. Ltd.</strong></p>
        <p style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', margin: '8px 0' }}>
          <FaMapMarkerAlt style={{ color: '#0056b3', marginTop: '3px', flexShrink: 0 }} /> 
          <span>
            Shriyam Industrial Park / Keshvam Industrial Estate,<br />
            Ahmedabad, Gujarat - 382430, India
          </span>
        </p>
        <p style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '8px 0' }}>
          <FaPhone style={{ color: '#0056b3', flexShrink: 0 }} /> 
          <span>+91 98797 67970</span>
        </p>
        <p style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '8px 0' }}>
          <FaEnvelope style={{ color: '#0056b3', flexShrink: 0 }} /> 
          <span>jsk.chemicals@gmail.com</span>
        </p>
        <p style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '8px 0' }}>
          <FaGlobe style={{ color: '#0056b3', flexShrink: 0 }} /> 
          <span>www.jskchemicals.com</span>
        </p>
      </div>

      <div>
        <h4 className="knb-label">Send Message to Sales & Technical Team</h4>
        <div style={{ marginBottom: '12px' }}>
          <input type="text" className="knb-input" placeholder="Your Full Name" />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input type="email" className="knb-input" placeholder="Your Official Email Address" />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <textarea className="knb-input" rows={3} style={{ height: 'auto' }} placeholder="Specify chemical name, CAS number, or inquiry message..."></textarea>
        </div>
        <button 
          className="knb-btn-search" 
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => alert('Thank you! Your message has been sent to JSK Chemicals sales team.')}
        >
          Send Inquiry Message
        </button>
      </div>
    </div>
  </div>
);

export const CustomSynthesis: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="knb-card">
        <h3 className="knb-card-subtitle">Custom Synthesis & Contract R&D Services</h3>
        <p style={{ lineHeight: '1.7', color: '#334155' }}>
          JSK Chemicals offers specialized contract research and custom synthesis (FTE or fee-for-service model) for novelty molecules, complex building blocks, and custom impurities not available in standard catalogs.
        </p>
        
        <div className="knb-table-responsive" style={{ marginTop: '20px' }}>
          <table className="knb-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Quantity Deliverable</th>
                <th>Analytical Characterization</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gram-Scale Synthesis</strong></td>
                <td>1g - 100g</td>
                <td>HPLC, 1H-NMR, LC-MS, COA</td>
                <td>2 to 3 Weeks</td>
              </tr>
              <tr>
                <td><strong>Kilo-Scale Scale-up</strong></td>
                <td>1 kg - 50 kg</td>
                <td>Full Batch Record, Impurity Profile, GC-MS</td>
                <td>4 to 6 Weeks</td>
              </tr>
              <tr>
                <td><strong>Commercial Bulk Batches</strong></td>
                <td>100 kg - Multi-Tons</td>
                <td>cGMP Compliance, Stability Data, SDS</td>
                <td>Scheduled Production</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button 
            className="knb-btn-search" 
            style={{ padding: '10px 24px', fontSize: '14px' }}
            onClick={() => navigate('/order-inquiry')}
          >
            <FaDna /> Request Custom Synthesis Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export const Login: React.FC = () => (
  <div className="knb-card" style={{ maxWidth: '480px', margin: '40px auto' }}>
    <h3 className="knb-card-subtitle" style={{ textAlign: 'center' }}><FaLock /> Client Inquiry & Order Portal Login</h3>
    <form onSubmit={(e) => { e.preventDefault(); alert('Logged into JSK Client Portal!'); }}>
      <div style={{ marginBottom: '16px' }}>
        <label className="knb-label">Client User ID / Email <span className="required">*</span></label>
        <input type="text" className="knb-input" placeholder="Enter User ID / Email" required />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label className="knb-label">Password <span className="required">*</span></label>
        <input type="password" className="knb-input" placeholder="Enter Password" required />
      </div>
      <button type="submit" className="knb-btn-search" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
        Login to JSK Portal
      </button>
    </form>
  </div>
);

export const Portal: React.FC = () => (
  <div className="knb-card">
    <h3 className="knb-card-subtitle">Client Inquiry & Order Tracking Portal</h3>
    <p style={{ color: '#4a5568' }}>
      Welcome to the JSK Chemicals Client Portal. Here you can track your active RFQs, view batch COAs, check synthesis status, and download tax invoices.
    </p>
    
    <div className="knb-table-responsive" style={{ marginTop: '20px' }}>
      <table className="knb-table">
        <thead>
          <tr>
            <th>RFQ Reference</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Expected Dispatch</th>
            <th>COA Document</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>JSK-RFQ-2026-9042</strong></td>
            <td>4-Amino-3-methylphenol (CAS 2835-99-6)</td>
            <td>500 kg</td>
            <td><span style={{ color: '#16a34a', fontWeight: 'bold' }}>Quotation Sent</span></td>
            <td>28/07/2026</td>
            <td>
              <button className="knb-btn-export" onClick={() => alert('Downloading COA...')}><FaFilePdf /> COA.pdf</button>
            </td>
          </tr>
          <tr>
            <td><strong>JSK-RFQ-2026-8812</strong></td>
            <td>Atenolol EP Impurity A (CAS 17194-82-0)</td>
            <td>100 mg</td>
            <td><span style={{ color: '#d97706', fontWeight: 'bold' }}>In Synthesis</span></td>
            <td>05/08/2026</td>
            <td>Pending Batch</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
