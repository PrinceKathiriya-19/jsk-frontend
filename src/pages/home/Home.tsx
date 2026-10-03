import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home: React.FC = () => {
  const slides = [
    {
      title: 'Fine Chemicals',
      subtitle: 'Precision Chemistry for Modern Industries',
      desc: 'High-purity fine chemicals for pharmaceutical, agricultural and industrial applications.',
      bg: 'slide-1',
      link: '/fine-chemicals-products'
    },
    {
      title: 'Specialty Chemicals',
      subtitle: 'Advanced Formulations for Your Needs',
      desc: 'Custom specialty chemicals crafted with expertise for diverse industrial requirements.',
      bg: 'slide-2',
      link: '/speciality-chemicals-products'
    },
    {
      title: 'Impurity Standards',
      subtitle: 'Reference Standards for Quality Control',
      desc: 'Certified impurity reference standards for pharmaceutical quality assurance.',
      bg: 'slide-3',
      link: '/impurity-products'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const products = [
    {
      icon: 'science',
      name: 'Fine Chemicals',
      desc: 'High-purity compounds for pharmaceutical, life science, and research applications.',
      link: '/fine-chemicals-products',
      color: '#1a3c5e'
    },
    {
      icon: 'biotech',
      name: 'Speciality Chemicals',
      desc: 'Advanced specialty formulations tailored for agricultural and industrial sectors.',
      link: '/speciality-chemicals-products',
      color: '#2e5f8a'
    },
    {
      icon: 'category',
      name: 'Impurity',
      desc: 'Certified impurity reference standards for rigorous pharmaceutical quality control.',
      link: '/impurity-products',
      color: '#e8a020'
    }
  ];

  const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '500+', label: 'Products' },
    { value: '100+', label: 'Happy Clients' },
    { value: '3', label: 'Product Categories' }
  ];

  const features = [
    { icon: 'verified', title: 'Quality Assured', desc: 'Every product undergoes rigorous quality checks before delivery.' },
    { icon: 'local_shipping', title: 'Timely Delivery', desc: 'Reliable logistics ensuring on-time delivery worldwide.' },
    { icon: 'support_agent', title: 'Expert Support', desc: 'Technical support from our team of chemistry experts.' },
    { icon: 'gpp_good', title: 'GMP Compliant', desc: 'Our manufacturing follows Good Manufacturing Practices.' }
  ];

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="hero">
        <div className="slides-wrapper">
          {slides.map((slide, idx) => (
            <div key={idx} className={`slide ${currentSlide === idx ? 'active' : ''} ${slide.bg}`}>
              <div className="slide-overlay"></div>
              <div className="container slide-content">
                <span className="slide-label animate-fade-up">JSK Chemicals</span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <p className="slide-desc">{slide.desc}</p>
                <div className="slide-actions">
                  <Link to={slide.link} className="btn-primary">
                    <span className="material-icons">arrow_forward</span>
                    Explore Products
                  </Link>
                  <Link to="/contact-us" className="btn-outline-white">Get Quote</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="slide-arrow prev" onClick={prevSlide}>
          <span className="material-icons">chevron_left</span>
        </button>
        <button className="slide-arrow next" onClick={nextSlide}>
          <span className="material-icons">chevron_right</span>
        </button>

        {/* Dots */}
        <div className="slide-dots">
          {slides.map((_, idx) => (
            <button key={idx} className={`dot ${currentSlide === idx ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></button>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-img-card">
              <div className="about-img-bg"></div>
              <div className="about-badge">
                <span className="material-icons">verified</span>
                <div>
                  <div className="badge-value">ISO</div>
                  <div className="badge-label">Certified</div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-content">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">About JSK Chemicals</h2>
            <div className="divider"></div>
            <p className="section-desc">
              JSK Chemicals is a manufacturing company of fine and specialty chemicals, focused on providing high quality, consistent and efficient services for industries and research institutes.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--mid-gray)', marginTop: '16px', lineHeight: '1.75' }}>
              We are committed to delivering excellence in chemical manufacturing with state-of-the-art facilities located in Ahmedabad, Gujarat. Our team of expert chemists ensures every product meets the highest standards.
            </p>
            <div className="about-features">
              <div className="about-feat">
                <span className="material-icons">check_circle</span>
                Quality Assured Products
              </div>
              <div className="about-feat">
                <span className="material-icons">check_circle</span>
                Expert Technical Team
              </div>
              <div className="about-feat">
                <span className="material-icons">check_circle</span>
                State-of-the-Art Facility
              </div>
              <div className="about-feat">
                <span className="material-icons">check_circle</span>
                Timely Delivery
              </div>
            </div>
            <Link to="/about-us" className="btn-primary" style={{ marginTop: '32px', width: 'fit-content' }}>
              Read More
              <span className="material-icons">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Offerings</span>
            <h2 className="section-title">Product Categories</h2>
            <div className="divider"></div>
            <p className="section-desc">
              We manufacture and supply a comprehensive range of fine and specialty chemicals to meet diverse industrial needs.
            </p>
          </div>
          <div className="products-grid">
            {products.map((prod, idx) => (
              <Link key={idx} to={prod.link} className="product-card">
                <div className="product-card-icon" style={{ background: `${prod.color}15` }}>
                  <span className="material-icons" style={{ color: prod.color }}>{prod.icon}</span>
                </div>
                <h3 className="product-card-title">{prod.name}</h3>
                <p className="product-card-desc">{prod.desc}</p>
                <div className="product-card-link">
                  View Products
                  <span className="material-icons">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Our Strengths</h2>
            <div className="divider" style={{ margin: '16px auto 0' }}></div>
          </div>
          <div className="features-grid">
            {features.map((feat, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  <span className="material-icons">{feat.icon}</span>
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="contact-strip">
        <div className="container contact-strip-inner">
          <div className="contact-strip-text">
            <h2>Ready to Work Together?</h2>
            <p>Contact us for product inquiries, pricing, and technical support.</p>
          </div>
          <div className="contact-strip-actions">
            <Link to="/contact-us" className="btn-primary">
              <span className="material-icons">send</span>
              Get In Touch
            </Link>
            <a href="tel:+919879767970" className="btn-outline-white-strip">
              <span className="material-icons">phone</span>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
