import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', company: '', email: '', phone: '', product: '', message: '' });
  };

  return (
    <div>
      <div className="page-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">Get In Touch</span>
          <h1>Contact Us</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-icons">chevron_right</span>
            Contact Us
          </div>
        </div>
      </div>

      <section className="contact-section">
        <div className="container contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <span className="section-label">Reach Us</span>
            <h2 className="section-title">Contact Information</h2>
            <div className="divider"></div>
            <p style={{ fontSize: '15px', color: 'var(--mid-gray)', lineHeight: 1.75, marginBottom: '32px' }}>
              We'd love to hear from you. Get in touch with us for product inquiries, pricing, technical support, or any other questions.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon"><span className="material-icons">location_on</span></div>
                <div>
                  <h4>Office Address</h4>
                  <p>17-Shriyam Industrial Park, Singarva Kathwada Road, Behind Kathwada GIDC, Ahmedabad, Gujarat - 382430</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon"><span className="material-icons">phone</span></div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+919879767970">+91 9879767970</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon"><span className="material-icons">email</span></div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:jsk.chemicals@gmail.com">jsk.chemicals@gmail.com</a>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon"><span className="material-icons">schedule</span></div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            <h3 className="form-title">Send us a Message</h3>
            <p style={{ fontSize: '14px', color: 'var(--mid-gray)', marginBottom: '28px' }}>Fill out the form and we'll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="success-msg">
                <span className="material-icons">check_circle</span>
                <div>
                  <h4>Thank You!</h4>
                  <p>Your message has been sent. We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      placeholder="Your full name" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input 
                      type="text" 
                      value={formData.company} 
                      onChange={(e) => setFormData({...formData, company: e.target.value})} 
                      placeholder="Your company" 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      placeholder="+91 XXXXXXXXXX" 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Product Interest</label>
                  <select 
                    value={formData.product} 
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                  >
                    <option value="">-- Select Category --</option>
                    <option value="fine">Fine Chemicals</option>
                    <option value="speciality">Speciality Chemicals</option>
                    <option value="impurity">Impurity Standards</option>
                    <option value="other">Other / General Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    rows={5} 
                    placeholder="Tell us about your requirements..." 
                    required 
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span className="material-icons">send</span>
                  Send Message
                </button>
              </form>
            )}
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
        .contact-section { padding: 80px 0; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 72px; }
        .info-cards { display: flex; flex-direction: column; gap: 20px; }
        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: var(--off-white);
          border-radius: 10px;
          border: 1px solid var(--light-gray);
        }
        .info-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .info-icon .material-icons { font-size: 20px; color: var(--white); }
        .info-card h4 { font-family: var(--font-display); font-size: 14px; color: var(--primary); margin-bottom: 4px; }
        .info-card p, .info-card a { font-size: 14px; color: var(--mid-gray); line-height: 1.6; }
        .info-card a:hover { color: var(--accent); }
        .contact-form-wrap {
          background: var(--white);
          border-radius: 16px;
          padding: 40px;
          border: 1px solid var(--light-gray);
          box-shadow: var(--shadow-sm);
        }
        .form-title { font-family: var(--font-display); font-size: 24px; color: var(--primary); margin-bottom: 8px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-group label { font-size: 13px; font-weight: 600; color: var(--dark-gray); }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 12px 14px;
          border: 1px solid var(--light-gray);
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--dark-gray);
          background: var(--white);
          transition: var(--transition);
          outline: none;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--primary-light);
          box-shadow: 0 0 0 3px rgba(26,60,94,0.08);
        }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .success-msg {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 10px;
        }
        .success-msg .material-icons { font-size: 28px; color: #22c55e; flex-shrink: 0; }
        .success-msg h4 { font-family: var(--font-display); font-size: 17px; color: var(--primary); margin-bottom: 4px; }
        .success-msg p { font-size: 14px; color: var(--mid-gray); }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .contact-form-wrap { padding: 24px; } }
      `}</style>
    </div>
  );
};
