import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../services/UserContext';
import { useOrders } from '../../services/OrderContext';
import type { Order } from '../../services/OrderContext';
import { useCart } from '../../services/CartContext';
import './Portal.css';

export const Portal: React.FC = () => {
  const { currentUser, isLoggedIn, logout, updateProfile } = useUser();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    company: '',
    phone: '',
    country: '',
    address: ''
  });
  const [profileError, setProfileError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const customerOrders = orders.filter(
    order => currentUser && order.client.email.toLowerCase() === currentUser.email.toLowerCase()
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleEditMode = () => {
    if (currentUser) {
      setEditData({
        name: currentUser.name || '',
        company: currentUser.company || '',
        phone: currentUser.phone || '',
        country: currentUser.country || '',
        address: currentUser.address || ''
      });
    }
    setIsEditMode(prev => !prev);
    setProfileError(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateProfile(editData);
    if (response.success) {
      setIsEditMode(false);
      triggerToast('Profile information updated successfully.');
    } else {
      setProfileError(response.message);
    }
  };


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getOrderSummaryText = (order: Order): string => {
    if (!order.items || order.items.length === 0) return 'No products';
    const firstItem = order.items[0];
    const extraCount = order.items.length - 1;
    if (extraCount === 0) {
      return `${firstItem.productName} (${firstItem.quantity} kg)`;
    }
    return `${firstItem.productName} (${firstItem.quantity} kg) + ${extraCount} more products`;
  };

  const reorderPastInquiry = (order: Order) => {
    if (!order.items || order.items.length === 0) return;

    order.items.forEach(item => {
      addToCart({
        name: item.productName,
        casNo: item.casNo,
        formula: item.formula,
        category: item.category
      }, item.quantity);
    });

    setSelectedOrder(null);
    triggerToast(`Successfully loaded ${order.items.length} products to Inquiry Cart!`);
    
    setTimeout(() => {
      navigate('/order-inquiry');
    }, 1500);
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Page Header Banner */}
      <div className="portal-banner animate-fade-up">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">Client Workspace</span>
          <h1>Welcome, {currentUser?.name}</h1>
          <p className="company-tag">{currentUser?.company} &bull; {currentUser?.country}</p>
        </div>
      </div>

      {/* Main Workspace Section */}
      <section className="portal-section">
        <div className="container">
          <div className="portal-grid">
            
            {/* Left Column: User Profile Info / Edit Mode */}
            <div className="profile-card animate-fade-up">
              <div className="card-header">
                <h2><span className="material-icons">business_center</span> Company Profile</h2>
                {!isEditMode && (
                  <button className="edit-btn" onClick={toggleEditMode}>
                    <span className="material-icons">edit</span> Edit Details
                  </button>
                )}
              </div>

              {!isEditMode ? (
                <div className="profile-details">
                  <div className="info-group">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{currentUser?.name}</span>
                  </div>
                  <div className="info-group">
                    <span className="info-label">Corporate Email</span>
                    <span className="info-value">{currentUser?.email}</span>
                  </div>
                  <div className="info-group">
                    <span className="info-label">Business Phone</span>
                    <span className="info-value">{currentUser?.phone || 'N/A'}</span>
                  </div>
                  <div className="info-group">
                    <span className="info-label">Shipping / Billing Address</span>
                    <span className="info-value address-value">{currentUser?.address || 'N/A'}</span>
                  </div>
                  
                  <hr className="profile-divider" />

                  <button className="logout-btn" onClick={handleLogout}>
                    <span className="material-icons">logout</span> Sign Out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="profile-edit-form">
                  <div className="form-group">
                    <label htmlFor="editName">Full Name</label>
                    <input 
                      type="text" 
                      id="editName" 
                      value={editData.name} 
                      onChange={(e) => setEditData({...editData, name: e.target.value})} 
                      required 
                      className="form-input" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="editCompany">Company Name</label>
                    <input 
                      type="text" 
                      id="editCompany" 
                      value={editData.company} 
                      onChange={(e) => setEditData({...editData, company: e.target.value})} 
                      required 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="editPhone">Phone Number</label>
                    <input 
                      type="text" 
                      id="editPhone" 
                      value={editData.phone} 
                      onChange={(e) => setEditData({...editData, phone: e.target.value})} 
                      required 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="editCountry">Country</label>
                    <input 
                      type="text" 
                      id="editCountry" 
                      value={editData.country} 
                      onChange={(e) => setEditData({...editData, country: e.target.value})} 
                      required 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="editAddress">Address</label>
                    <textarea 
                      id="editAddress" 
                      value={editData.address} 
                      onChange={(e) => setEditData({...editData, address: e.target.value})} 
                      required 
                      rows={3} 
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {profileError && <span className="error-msg">{profileError}</span>}

                  <div className="form-actions">
                    <button type="submit" className="save-btn">
                      <span className="material-icons">save</span> Save Changes
                    </button>
                    <button type="button" className="cancel-btn" onClick={toggleEditMode}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Past Inquiries / RFQ History */}
            <div className="history-card animate-fade-up">
              <div className="card-header">
                <h2><span className="material-icons">history</span> Inquiry &amp; Order History</h2>
                <span className="inquiries-count">{customerOrders.length} Inquiries Placed</span>
              </div>

              {customerOrders.length === 0 ? (
                <div className="empty-orders-state">
                  <span className="material-icons empty-icon">assignment</span>
                  <h3>No Inquiries Found</h3>
                  <p>You haven't submitted any chemical RFQs or order inquiries yet. Your catalog selection history will appear here once placed.</p>
                  <Link to="/fine-chemicals-products" className="start-inquiry-btn">
                    <span className="material-icons">science</span> Start Order Inquiry
                  </Link>
                </div>
              ) : (
                <div className="orders-table-wrapper">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Inquiry ID</th>
                        <th>Date Placed</th>
                        <th>Chemicals Requested</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerOrders.map(order => (
                        <tr key={order.id}>
                          <td className="order-id"><strong>{order.id}</strong></td>
                          <td className="order-date">{formatDate(order.timestamp)}</td>
                          <td className="order-summary">
                            <span className="summary-text">{getOrderSummaryText(order)}</span>
                          </td>
                          <td>
                            <span className={`status-badge ${order.status}`}>
                              {order.status === 'pending' ? 'Pending Review' : 'Quote Sent / Approved'}
                            </span>
                          </td>
                          <td>
                            <button className="view-details-btn" onClick={() => setSelectedOrder(order)}>
                              <span className="material-icons">visibility</span> View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Detailed Order Inquiry Modal Dialog */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-card animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>
              <span className="material-icons">close</span>
            </button>
            
            <div className="modal-accent"></div>
            
            <div className="modal-header">
              <span className="order-badge">Inquiry: {selectedOrder.id}</span>
              <h2>Order Details</h2>
              <p className="modal-date">Submitted on {formatDate(selectedOrder.timestamp)}</p>
            </div>

            {/* Items Table */}
            <div className="modal-items-section">
              <h3>Requested Chemical Products</h3>
              <div className="modal-items-list">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="modal-item-row">
                    <div className="modal-item-details">
                      <span className={`item-cat-label ${item.category}`}>{item.category}</span>
                      <h4>{item.productName}</h4>
                      <span className="item-meta">CAS: {item.casNo} &bull; Formula: {item.formula}</span>
                    </div>
                    <div className="modal-item-qty">
                      <span className="qty-num">{item.quantity}</span> <span className="qty-unit">kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Requirements Box */}
            <div className="modal-requirements-section">
              <h3>Custom Technical Requirements / Notes</h3>
              <div className="requirements-box">
                {selectedOrder.customRequirements || 'No specific custom packaging or purity requirements noted.'}
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions-bar">
              <button className="reorder-action-btn" onClick={() => reorderPastInquiry(selectedOrder)}>
                <span className="material-icons">autorenew</span> Add All items to Cart &amp; Re-Order
              </button>
              <button className="close-action-btn" onClick={() => setSelectedOrder(null)}>
                Close Dialog
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
              <p className="toast-title">Cart Loaded</p>
              <p className="toast-desc">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
