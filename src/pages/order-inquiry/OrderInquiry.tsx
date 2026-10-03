import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../services/CartContext';
import type { CartItem } from '../../services/CartContext';
import { useUser } from '../../services/UserContext';
import { useOrders } from '../../services/OrderContext';
import './OrderInquiry.css';

export const OrderInquiry: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { currentUser, isLoggedIn } = useUser();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    message: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.name || '',
        companyName: currentUser.company || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        country: currentUser.country || '',
        address: currentUser.address || ''
      }));
    }
  }, [currentUser]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [generatedEmailBody, setGeneratedEmailBody] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleQtyAdjust = (item: CartItem, delta: number) => {
    const newQty = Math.max(1, item.quantity + delta);
    updateQuantity(item.product.name, newQty);
  };

  const handleQtyChange = (item: CartItem, value: number) => {
    const cleanQty = Math.max(1, value || 1);
    updateQuantity(item.product.name, cleanQty);
  };

  const handleRemove = (productName: string) => {
    removeFromCart(productName);
    triggerToast(`Removed "${productName}" from your inquiry list.`);
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    clearCart();
    setShowClearConfirm(false);
    triggerToast('Cleared all items from your inquiry list.');
  };

  const compileEmailText = () => {
    const divider = '='.repeat(45);
    const itemDivider = '-'.repeat(45);
    
    let itemsText = '';
    cartItems.forEach((item, idx) => {
      itemsText += `${idx + 1}. ${item.product.name}\n`;
      itemsText += `   CAS No  : ${item.product.casNo}\n`;
      itemsText += `   Formula : ${item.product.formula}\n`;
      itemsText += `   Qty     : ${item.quantity} kg\n`;
      itemsText += `${itemDivider}\n`;
    });

    return `${divider}
JSK CHEMICALS - PRODUCT ORDER INQUIRY
${divider}

--- CLIENT DETAILS ---
Client Name      : ${formData.fullName}
Company Name     : ${formData.companyName}
Business Email   : ${formData.email}
Phone Number     : ${formData.phone}
Country          : ${formData.country}
Delivery Address : ${formData.address || 'N/A'}

--- ORDERED ITEMS ---
${itemsText}
--- CUSTOM REQUIREMENTS & MESSAGE ---
${formData.message || 'No additional custom message.'}

${divider}
Generated via JSK Chemicals RFQ Portal
${divider}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    const emailBody = compileEmailText();
    setGeneratedEmailBody(emailBody);
    setShowSuccessModal(true);

    // Save to order service
    const client = {
      name: formData.fullName,
      company: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      address: formData.address
    };

    const items = cartItems.map(item => ({
      productName: item.product.name,
      casNo: item.product.casNo,
      formula: item.product.formula,
      category: item.product.category,
      quantity: item.quantity
    }));

    addOrder(client, items, formData.message);
  };

  const triggerMailto = (body: string) => {
    const recipient = 'jsk.chemicals@gmail.com';
    const subject = `RFQ Product Order Inquiry - ${formData.companyName}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    clearCart();
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      address: '',
      message: ''
    });
  };

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner animate-fade-up">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">RFQ / Quotation Portal</span>
          <h1>Chemicals Order Inquiry</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-icons">chevron_right</span>
            Order Inquiry
          </div>
        </div>
      </div>

      {/* Main Section */}
      <section className="inquiry-section">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state animate-fade-up">
              <span className="material-icons empty-icon">shopping_cart</span>
              <h2>Your Inquiry Cart is Empty</h2>
              <p>You haven't added any products to your inquiry list yet. Browse our extensive catalogs of fine and specialty chemicals to add items.</p>
              <div className="empty-actions">
                <Link to="/fine-chemicals-products" className="btn-primary">
                  <span className="material-icons">science</span> Browse Fine Chemicals
                </Link>
                <Link to="/speciality-chemicals-products" className="btn-outline">
                  <span className="material-icons">biotech</span> Specialty Products
                </Link>
              </div>
            </div>
          ) : (
            <div className="inquiry-grid">
              {/* Left Side: Order Items List */}
              <div className="items-panel animate-fade-up">
                <div className="panel-header">
                  <h2>Selected Products ({cartItems.length})</h2>
                  <button className="clear-all-btn" onClick={handleClearAll}>
                    <span className="material-icons">delete_sweep</span> Clear All
                  </button>
                </div>

                <div className="cart-items-list">
                  {cartItems.map(item => (
                    <div key={item.product.name} className="cart-item-card">
                      <div className="item-details">
                        <span className={`item-cat ${item.product.category}`}>
                          {item.product.category === 'fine' ? 'Fine' : item.product.category === 'speciality' ? 'Specialty' : 'Impurity'}
                        </span>
                        <h3>{item.product.name}</h3>
                        <div className="meta-row">
                          <span className="meta-item"><strong>CAS No:</strong> {item.product.casNo}</span>
                          <span className="meta-item"><strong>Formula:</strong> {item.product.formula}</span>
                        </div>
                      </div>
                      
                      <div className="item-controls">
                        <div className="qty-selector">
                          <button className="qty-btn" onClick={() => handleQtyAdjust(item, -10)} title="Decrease by 10">
                            <span className="material-icons">keyboard_double_arrow_left</span>
                          </button>
                          <button className="qty-btn" onClick={() => handleQtyAdjust(item, -1)} title="Decrease by 1">
                            <span className="material-icons">remove</span>
                          </button>
                          <input 
                            type="number" 
                            className="qty-input" 
                            value={item.quantity} 
                            onChange={(e) => handleQtyChange(item, parseInt(e.target.value))} 
                            min="1" 
                          />
                          <span className="qty-unit">kg</span>
                          <button className="qty-btn" onClick={() => handleQtyAdjust(item, 1)} title="Increase by 1">
                            <span className="material-icons">add</span>
                          </button>
                          <button className="qty-btn" onClick={() => handleQtyAdjust(item, 10)} title="Increase by 10">
                            <span className="material-icons">keyboard_double_arrow_right</span>
                          </button>
                        </div>
                        
                        <button className="remove-btn" onClick={() => handleRemove(item.product.name)} title="Remove item">
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Contact & Shipping Form or Sign In Prompt */}
              <div className={`form-panel animate-fade-up ${!isLoggedIn ? 'locked' : ''}`}>
                {isLoggedIn ? (
                  <>
                    <h2>Request Quote / Submit Inquiry</h2>
                    <p className="form-desc">Provide your business details and requirements below. We will compile a formal quote matching your requested quantities.</p>

                    <div className="login-autofill-banner">
                      <span className="material-icons autofill-icon">check_circle</span>
                      <div className="banner-text">
                        Logged in as <strong>{currentUser?.name}</strong>. Details pre-filled.
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="inquiry-form">
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                        <div className="input-icon-wrap">
                          <span className="material-icons field-icon">person</span>
                          <input 
                            type="text" 
                            id="fullName" 
                            value={formData.fullName} 
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                            required 
                            placeholder="John Doe" 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="companyName">Company Name <span className="required">*</span></label>
                        <div className="input-icon-wrap">
                          <span className="material-icons field-icon">business</span>
                          <input 
                            type="text" 
                            id="companyName" 
                            value={formData.companyName} 
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})} 
                            required 
                            placeholder="JSK Industries Ltd." 
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="email">Business Email <span className="required">*</span></label>
                          <div className="input-icon-wrap">
                            <span className="material-icons field-icon">email</span>
                            <input 
                              type="email" 
                              id="email" 
                              value={formData.email} 
                              onChange={(e) => setFormData({...formData, email: e.target.value})} 
                              required 
                              placeholder="procurement@company.com" 
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                          <div className="input-icon-wrap">
                            <span className="material-icons field-icon">phone</span>
                            <input 
                              type="tel" 
                              id="phone" 
                              value={formData.phone} 
                              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                              required 
                              placeholder="+91 98765 43210" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="country">Country <span className="required">*</span></label>
                        <div className="input-icon-wrap">
                          <span className="material-icons field-icon">public</span>
                          <input 
                            type="text" 
                            id="country" 
                            value={formData.country} 
                            onChange={(e) => setFormData({...formData, country: e.target.value})} 
                            required 
                            placeholder="India" 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Delivery / Shipping Address</label>
                        <div className="input-icon-wrap">
                          <span className="material-icons field-icon textarea-icon">location_on</span>
                          <textarea 
                            id="address" 
                            value={formData.address} 
                            onChange={(e) => setFormData({...formData, address: e.target.value})} 
                            rows={3} 
                            placeholder="Complete warehouse or delivery site address (for logistical costing)"
                          ></textarea>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Custom Requirements / Notes</label>
                        <div className="input-icon-wrap">
                          <span className="material-icons field-icon textarea-icon">chat</span>
                          <textarea 
                            id="message" 
                            value={formData.message} 
                            onChange={(e) => setFormData({...formData, message: e.target.value})} 
                            rows={3} 
                            placeholder="Any custom purity grade, particle size, packaging requirements or certifications needed..."
                          ></textarea>
                        </div>
                      </div>

                      <button type="submit" className="submit-btn">
                        <span className="material-icons">send</span> Compile &amp; Send Order Inquiry
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="auth-required-panel animate-fade-up">
                    <span className="material-icons lock-large-icon">lock</span>
                    <h2>Authentication Required</h2>
                    <p className="auth-desc">To submit order inquiries, compile quotes, and track your request history, you must be logged into your corporate account.</p>
                    
                    <div className="auth-benefits">
                      <div className="benefit-item">
                        <span className="material-icons benefit-icon">speed</span>
                        <div className="benefit-text">
                          <strong>Instant 1-Click RFQ</strong>
                          <span>Auto-fill your verified business details</span>
                        </div>
                      </div>
                      <div className="benefit-item">
                        <span className="material-icons benefit-icon">history_edu</span>
                        <div className="benefit-text">
                          <strong>Live Status Tracking</strong>
                          <span>Trace quote replies and order history</span>
                        </div>
                      </div>
                      <div className="benefit-item">
                        <span className="material-icons benefit-icon">support_agent</span>
                        <div className="benefit-text">
                          <strong>Priority Sourcing</strong>
                          <span>Direct channel with JSK chemists</span>
                        </div>
                      </div>
                    </div>

                    <button className="auth-action-btn" onClick={() => navigate('/login?returnUrl=/order-inquiry')}>
                      <span className="material-icons">login</span> Sign In / Create Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="modal-card animate-fade-up">
            <div className="modal-header-accent"></div>
            <span className="material-icons success-badge">check_circle</span>
            <h2>Inquiry Compiled Successfully!</h2>
            <p className="modal-sub">We have generated a highly structured product inquiry email. Please click "Open Mail App &amp; Send" below to finalize and send it.</p>
            
            <div className="email-preview-box">
              <div className="preview-header">
                <span><strong style={{ color: 'var(--primary)' }}>To:</strong> jsk.chemicals@gmail.com</span>
                <span><strong>Subject:</strong> RFQ Order Inquiry - {formData.companyName}</span>
              </div>
              <pre className="preview-body">{generatedEmailBody}</pre>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={() => triggerMailto(generatedEmailBody)}>
                <span className="material-icons">open_in_new</span> Open Mail App &amp; Send
              </button>
              <button className="btn-outline" onClick={closeSuccessModal}>
                Close &amp; Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal-card animate-fade-up">
            <span className="material-icons warning-badge">warning</span>
            <h2>Clear Inquiry Cart?</h2>
            <p className="confirm-modal-desc">Are you sure you want to remove all selected chemical products? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={confirmClearAll}>
                <span className="material-icons">delete</span> Yes, Clear All
              </button>
              <button className="btn-outline" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-body">
            <span className="material-icons toast-success-icon">check_circle</span>
            <div className="toast-content">
              <p className="toast-title">Cart Updated</p>
              <p className="toast-desc">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
