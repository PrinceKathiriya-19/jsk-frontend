import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../services/OrderContext';
import type { Order } from '../../services/OrderContext';
import './AdminDashboard.css';

export const AdminDashboard: React.FC = () => {
  const { orders, isAdminLoggedIn, approveOrder, deleteOrder } = useOrders();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin-login');
    }
  }, [isAdminLoggedIn, navigate]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [isApproving, setIsApproving] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [generatedBody, setGeneratedBody] = useState('');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDeleteId, setOrderToDeleteId] = useState<string | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (title: string, message: string) => {
    setToastTitle(title);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const totalCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const approvedCount = orders.filter(o => o.status === 'approved').length;

  const filteredOrders = orders.filter(o => {
    if (activeFilter !== 'all' && o.status !== activeFilter) {
      return false;
    }
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const matchName = o.client.name.toLowerCase().includes(query);
      const matchCompany = o.client.company.toLowerCase().includes(query);
      const matchEmail = o.client.email.toLowerCase().includes(query);
      const matchId = o.id.toLowerCase().includes(query);
      return matchName || matchCompany || matchEmail || matchId;
    }
    return true;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || null;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
  };

  const formatDateFull = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };



  const generateSubject = (order: Order): string => {
    return `JSK Chemicals - Order Inquiry Approved [ID: #${order.id}]`;
  };

  const compileApprovalEmail = (order: Order): string => {
    const divider = '='.repeat(45);
    const itemDivider = '-'.repeat(45);
    
    let itemsText = '';
    order.items.forEach((item, idx) => {
      itemsText += `${idx + 1}. ${item.productName}\n`;
      itemsText += `   CAS No  : ${item.casNo}\n`;
      itemsText += `   Formula : ${item.formula}\n`;
      itemsText += `   Qty     : ${item.quantity} kg\n`;
      itemsText += `${itemDivider}\n`;
    });

    return `${divider}
JSK CHEMICALS - ORDER INQUIRY APPROVED
${divider}

Dear ${order.client.name},

We are pleased to inform you that your chemical product order inquiry (ID: #${order.id}) has been reviewed and successfully APPROVED by the administration team at JSK Chemicals.

--- REVIEWED SPECIFICATIONS ---
Company Name     : ${order.client.company}
Business Email   : ${order.client.email}
Phone Number     : ${order.client.phone}
Target Country   : ${order.client.country}
Delivery Address : ${order.client.address || 'Standard Delivery / No custom shipping address provided.'}

--- APPROVED CHEMICAL CATALOGS ---
${itemsText}
--- CUSTOM REQUIREMENTS & NOTES ---
${order.customRequirements || 'No special requirements listed.'}

${divider}
STATUS: SUCCESSFUL APPROVAL
Our logistics coordinators and commercial sales representatives will reach out to you within the next 24 hours with an official pricing contract, proforma invoice, and cargo shipping timelines.

Thank you for choosing JSK Chemicals as your raw materials and manufacturing partner.

Best regards,

Administrative Services Portal
JSK Chemicals India Ltd.
Website: jsk-chemicals.com
Contact: +91 98797 67970
${divider}`;
  };

  const triggerMailLink = (order: Order) => {
    const subject = generateSubject(order);
    const body = compileApprovalEmail(order);
    const mailtoUrl = `mailto:${order.client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const onApprove = (order: Order) => {
    setIsApproving(true);
    setTimeout(() => {
      const success = approveOrder(order.id);
      setIsApproving(false);

      if (success) {
        const emailBody = compileApprovalEmail(order);
        setGeneratedBody(emailBody);
        setShowEmailPreview(true);
        triggerToast('Order Approved', `Inquiry #${order.id} status successfully set to Approved.`);
        triggerMailLink(order);
      }
    }, 1000);
  };

  const onDelete = (id: string) => {
    setOrderToDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (orderToDeleteId) {
      const success = deleteOrder(orderToDeleteId);
      if (success) {
        if (selectedOrderId === orderToDeleteId) {
          setSelectedOrderId(null);
        }
        triggerToast('Record Deleted', `Inquiry #${orderToDeleteId} was permanently removed.`);
      }
    }
    setShowDeleteConfirm(false);
    setOrderToDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setOrderToDeleteId(null);
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Top Admin Header Bar */}
      <header className="admin-header">
        <div className="container header-inner">
          <div className="admin-brand">
            <div className="admin-badge">JSK</div>
            <div className="admin-titles">
              <h1>Admin Management Console</h1>
              <span className="admin-sub">Order Inquiry &amp; Quotation Queue</span>
            </div>
          </div>
        </div>
      </header>


      {/* Main Admin Workspace */}
      <main className="admin-main">
        <div className="container">
          
          {/* KPI Analytics Metric Cards */}
          <div className="kpi-grid animate-fade-up">
            <div className="kpi-card">
              <div className="kpi-icon total">
                <span className="material-icons">assignment</span>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">{totalCount}</span>
                <span className="kpi-label">Total Inquiries</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon pending">
                <span className="material-icons">hourglass_top</span>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">{pendingCount}</span>
                <span className="kpi-label">Pending Review</span>
              </div>
              {pendingCount > 0 && <span className="kpi-badge-alert">{pendingCount} action</span>}
            </div>

            <div className="kpi-card">
              <div className="kpi-icon approved">
                <span className="material-icons">check_circle</span>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">{approvedCount}</span>
                <span className="kpi-label">Approved Orders</span>
              </div>
            </div>
          </div>

          {/* Controls Bar: Search & Status Filters */}
          <div className="controls-bar animate-fade-up">
            <div className="search-box">
              <span className="material-icons search-icon">search</span>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search by client name, company, email, or order ID..." 
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <span className="material-icons">close</span>
                </button>
              )}
            </div>

            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All ({totalCount})
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveFilter('pending')}
              >
                Pending ({pendingCount})
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveFilter('approved')}
              >
                Approved ({approvedCount})
              </button>
            </div>
          </div>

          {/* Master-Detail Split Workspace */}
          <div className="workspace-grid animate-fade-up">
            
            {/* Orders Stack Queue (Left Panel) */}
            <div className="queue-panel">
              <div className="queue-header">
                <h2>Inquiry Queue ({filteredOrders.length})</h2>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="empty-queue">
                  <span className="material-icons empty-icon">inbox</span>
                  <p>No order inquiries match your filter criteria.</p>
                </div>
              ) : (
                <div className="queue-list">
                  {filteredOrders.map(order => (
                    <div 
                      key={order.id} 
                      className={`order-card ${selectedOrderId === order.id ? 'active' : ''} ${order.status}`}
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <div className="card-top-row">
                        <span className="order-id">#{order.id}</span>
                        <span className={`status-pill ${order.status}`}>
                          {order.status === 'pending' ? 'Pending' : 'Approved'}
                        </span>
                      </div>

                      <div className="client-summary">
                        <span className="client-name">{order.client.name}</span>
                        <span className="client-company">{order.client.company}</span>
                      </div>

                      <div className="card-bottom-row">
                        <span className="items-count">
                          <span className="material-icons">science</span> {order.items.length} Products
                        </span>
                        <span className="order-date">{formatDate(order.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Inspection Side Panel (Right Panel) */}
            <div className="details-panel">
              {selectedOrder ? (
                <div className="details-inner animate-fade-up">
                  {/* Banner bar */}
                  <div className="details-banner">
                    <div>
                      <div className="banner-id-row">
                        <h2>Inquiry Details: #{selectedOrder.id}</h2>
                        <span className={`status-pill large ${selectedOrder.status}`}>
                          {selectedOrder.status === 'pending' ? 'Pending Action' : 'Approved'}
                        </span>
                      </div>
                      <span className="timestamp-full">Placed on {formatDateFull(selectedOrder.timestamp)}</span>
                    </div>

                    <div className="header-actions">
                      <button className="btn-icon-delete" onClick={() => onDelete(selectedOrder.id)} title="Delete Inquiry">
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="details-section">
                    <h3><span className="material-icons">person</span> Client Specification</h3>
                    <div className="info-grid">
                      <div className="info-cell">
                        <span className="cell-label">Client Name</span>
                        <span className="cell-value">{selectedOrder.client.name}</span>
                      </div>

                      <div className="info-cell">
                        <span className="cell-label">Company</span>
                        <span className="cell-value">{selectedOrder.client.company}</span>
                      </div>

                      <div className="info-cell">
                        <span className="cell-label">Corporate Email</span>
                        <a href={`mailto:${selectedOrder.client.email}`} className="cell-value link">
                          {selectedOrder.client.email}
                        </a>
                      </div>

                      <div className="info-cell">
                        <span className="cell-label">Phone Number</span>
                        <a href={`tel:${selectedOrder.client.phone}`} className="cell-value link">
                          {selectedOrder.client.phone}
                        </a>
                      </div>

                      <div className="info-cell">
                        <span className="cell-label">Country</span>
                        <span className="cell-value">{selectedOrder.client.country}</span>
                      </div>

                      <div className="info-cell full-width">
                        <span className="cell-label">Delivery Address</span>
                        <span className="cell-value">{selectedOrder.client.address || 'Standard Delivery / No custom shipping address provided.'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Requested Products Table */}
                  <div className="details-section">
                    <h3><span className="material-icons">science</span> Requested Chemical Catalogs</h3>
                    <div className="products-table-wrap">
                      <table className="products-table">
                        <thead>
                          <tr>
                            <th>Category</th>
                            <th>Product Name</th>
                            <th>CAS Number</th>
                            <th>Formula</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                <span className={`category-tag ${item.category}`}>{item.category}</span>
                              </td>
                              <td className="product-name">{item.productName}</td>
                              <td className="cas-no">{item.casNo}</td>
                              <td className="formula">{item.formula}</td>
                              <td className="quantity font-weight-bold">{item.quantity} kg</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Custom Requirements */}
                  <div className="details-section">
                    <h3><span className="material-icons">description</span> Custom Requirements &amp; Notes</h3>
                    <div className="notes-box">
                      {selectedOrder.customRequirements || 'No special requirements listed.'}
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="details-actions">
                    {selectedOrder.status === 'pending' ? (
                      <button className="btn-approve-action" onClick={() => onApprove(selectedOrder)} disabled={isApproving}>
                        {isApproving ? (
                          <>
                            <span className="spinner inline"></span>
                            <span>Processing Approval...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-icons">mark_email_read</span>
                            <span>Approve &amp; Draft Email Quote</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button className="btn-resend-mail" onClick={() => triggerMailLink(selectedOrder)}>
                        <span className="material-icons">mark_email_read</span> Resend Approval Mail Draft
                      </button>
                    )}

                    <button className="btn-delete-action" onClick={() => onDelete(selectedOrder.id)}>
                      <span className="material-icons">delete</span> Remove Record
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-selection-placeholder">
                  <span className="material-icons">touch_app</span>
                  <h3>Select an Inquiry from Queue</h3>
                  <p>Click on any order inquiry from the left stack to review client details, chemical catalogs, and trigger quote approvals.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Approval Email Preview Modal */}
      {showEmailPreview && selectedOrder && (
        <div className="modal-backdrop">
          <div className="email-modal animate-fade-up">
            <div className="modal-header-accent"></div>
            <span className="material-icons success-badge">check_circle</span>
            <h2>Order Approved &amp; Mail Compiled!</h2>
            <p className="modal-sub">
              Status set to <strong>Approved</strong>. An email draft with full technical specifications has been generated.
            </p>

            <div className="email-preview-box">
              <div className="preview-header">
                <span><strong>To:</strong> {selectedOrder.client.email}</span>
                <span><strong>Subject:</strong> {generateSubject(selectedOrder)}</span>
              </div>
              <pre className="preview-body">{generatedBody}</pre>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={() => triggerMailLink(selectedOrder)}>
                <span className="material-icons">open_in_new</span> Launch Mail App
              </button>
              <button className="btn-outline" onClick={() => setShowEmailPreview(false)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal-card animate-fade-up">
            <span className="material-icons warning-badge">warning</span>
            <h2>Delete Order Record?</h2>
            <p className="confirm-modal-desc">
              Are you sure you want to delete inquiry <strong>#{orderToDeleteId}</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-danger" onClick={confirmDelete}>
                <span className="material-icons">delete</span> Yes, Delete Record
              </button>
              <button className="btn-outline" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-body">
            <span className="material-icons toast-success-icon">check_circle</span>
            <div className="toast-content">
              <span className="toast-title">{toastTitle}</span>
              <span className="toast-desc">{toastMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
