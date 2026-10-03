import React, { useState } from 'react';
import type { User } from '../../services/UserContext';
import './AdminUsers.css';


export interface ExtendedUser extends User {
  id?: number | string;
  role?: string;
}

export const AdminUsers: React.FC = () => {
  // Local state initialized with seed / context users + extra demo users for complete Master UI

  const [usersList, setUsersList] = useState<ExtendedUser[]>([
    {
      id: 1,
      name: 'Sarah Jenkins',
      company: 'Apex Biotech Ltd.',
      email: 's.jenkins@apexbiotech.co.uk',
      phone: '+44 20 7946 0958',
      country: 'United Kingdom',
      address: 'Unit 12, Science & Technology Park, Milton Road, Cambridge CB4 0FZ',
      role: 'ROLE_CUSTOMER'
    },
    {
      id: 2,
      name: 'Rajesh Sharma',
      company: 'Sun Pharmaceuticals Ltd.',
      email: 'r.sharma@sunpharma.com',
      phone: '+91 98250 12345',
      country: 'India',
      address: 'Plot 14, GIDC Estate, Ankleshwar, Gujarat',
      role: 'ROLE_CUSTOMER'
    },
    {
      id: 3,
      name: 'System Administrator',
      company: 'JSK Chemicals Pvt. Ltd.',
      email: 'admin@jskchemicals.com',
      phone: '+91 98797 67970',
      country: 'India',
      address: 'Corporate HQ, Ahmedabad, Gujarat',
      role: 'ROLE_ADMIN'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');
  const [editingUserId, setEditingUserId] = useState<number | string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<ExtendedUser>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    password: '',
    role: 'ROLE_CUSTOMER'
  });

  // Delete Confirmation Modal State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<ExtendedUser | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenAddModal = () => {
    setModalMode('ADD');
    setEditingUserId(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      country: '',
      address: '',
      password: '',
      role: 'ROLE_CUSTOMER'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (user: ExtendedUser) => {
    setModalMode('EDIT');
    setEditingUserId(user.id || user.email);
    setFormData({
      name: user.name || '',
      company: user.company || '',
      email: user.email || '',
      phone: user.phone || '',
      country: user.country || '',
      address: user.address || '',
      password: '',
      role: user.role || 'ROLE_CUSTOMER'
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (modalMode === 'ADD') {
      const newId = Date.now();
      const newUser: ExtendedUser = {
        ...formData,
        id: newId,
        email: formData.email.toLowerCase().trim()
      };

      setUsersList(prev => [newUser, ...prev]);
      triggerToast(`User "${newUser.name}" created successfully.`);
    } else {
      setUsersList(prev =>
        prev.map(u => (u.id === editingUserId || u.email === formData.email ? { ...u, ...formData } : u))
      );
      triggerToast(`User "${formData.name}" details updated.`);
    }

    setShowModal(false);
  };

  const handleOpenDeleteConfirm = (user: ExtendedUser) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsersList(prev => prev.filter(u => u.id !== userToDelete.id && u.email !== userToDelete.email));
      triggerToast(`User record "${userToDelete.name}" deleted.`);
    }
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // Filtering
  const filteredUsers = usersList.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsersCount = usersList.length;
  const customerCount = usersList.filter(u => u.role === 'ROLE_CUSTOMER' || !u.role).length;
  const adminCount = usersList.filter(u => u.role === 'ROLE_ADMIN').length;

  return (
    <div className="admin-users-wrapper">
      {/* Page Header */}
      <header className="users-page-header">
        <div className="container header-inner">
          <div className="title-area">
            <h1>User Master Management</h1>
            <p className="subtitle">Manage client accounts, roles, access credentials, and user data</p>
          </div>
          <button className="btn-add-user" onClick={handleOpenAddModal}>
            <span className="material-icons">person_add</span> Add New User
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="users-main-content">
        <div className="container">

          {/* KPI Analytics Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon total">
                <span className="material-icons">people</span>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">{totalUsersCount}</span>
                <span className="kpi-label">Total Users</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon customer">
                <span className="material-icons">business</span>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">{customerCount}</span>
                <span className="kpi-label">Customer Accounts</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon admin">
                <span className="material-icons">admin_panel_settings</span>
              </div>
              <div className="kpi-info">
                <span className="kpi-value">{adminCount}</span>
                <span className="kpi-label">Admin Accounts</span>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="controls-bar">
            <div className="search-box">
              <span className="material-icons search-icon">search</span>
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery('')}>
                  <span className="material-icons">close</span>
                </button>
              )}
            </div>

            <div className="filter-role-selector">
              <span className="filter-label">Filter Role:</span>
              <select
                value={selectedRoleFilter}
                onChange={e => setSelectedRoleFilter(e.target.value)}
                className="role-select"
              >
                <option value="ALL">All Roles ({totalUsersCount})</option>
                <option value="ROLE_CUSTOMER">Customers ({customerCount})</option>
                <option value="ROLE_ADMIN">Admins ({adminCount})</option>
              </select>
            </div>
          </div>

          {/* User Master Data Grid Table */}
          <div className="users-table-card">
            <div className="table-header">
              <h2>Registered Users ({filteredUsers.length})</h2>
            </div>

            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Company Name</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="empty-table-msg">
                        <span className="material-icons">group_off</span>
                        <p>No user accounts found matching your search.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, idx) => (
                      <tr key={user.id || idx}>
                        <td className="row-num">{idx + 1}</td>
                        <td className="user-name">
                          <strong>{user.name}</strong>
                        </td>
                        <td className="company-name">{user.company || 'N/A'}</td>
                        <td className="user-email">{user.email}</td>
                        <td className="user-phone">{user.phone || 'N/A'}</td>
                        <td className="user-country">{user.country || 'N/A'}</td>
                        <td>
                          <span className={`role-badge ${user.role}`}>
                            {user.role === 'ROLE_ADMIN' ? 'Administrator' : 'Customer'}
                          </span>
                        </td>
                        <td className="action-cells">
                          <button
                            className="btn-action edit"
                            onClick={() => handleOpenEditModal(user)}
                            title="Edit User"
                          >
                            <span className="material-icons">edit</span> Edit
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => handleOpenDeleteConfirm(user)}
                            title="Delete User"
                          >
                            <span className="material-icons">delete</span> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* Add / Edit User Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-card animate-fade-up" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
              <span className="material-icons">close</span>
            </button>
            <div className="modal-top-accent"></div>

            <div className="modal-header">
              <h2>{modalMode === 'ADD' ? 'Create New User' : 'Edit User Details'}</h2>
              <p>{modalMode === 'ADD' ? 'Fill in details to register a new user in system' : `Update account info for ${formData.email}`}</p>
            </div>

            <form onSubmit={handleFormSubmit} className="user-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="formName">Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="formName"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formCompany">Company Name</label>
                  <input
                    type="text"
                    id="formCompany"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Biotech Ltd."
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="formEmail">Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    id="formEmail"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={modalMode === 'EDIT'}
                    placeholder="user@company.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formPhone">Phone Number</label>
                  <input
                    type="text"
                    id="formPhone"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="formCountry">Country</label>
                  <input
                    type="text"
                    id="formCountry"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="India"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formRole">User Role <span className="req">*</span></label>
                  <select
                    id="formRole"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    required
                  >
                    <option value="ROLE_CUSTOMER">Customer (Client Portal Access)</option>
                    <option value="ROLE_ADMIN">Administrator (Full Admin Access)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formAddress">Address</label>
                <textarea
                  id="formAddress"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  placeholder="Street / Industrial Zone, City, State"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="formPassword">
                  {modalMode === 'ADD' ? 'Security Password *' : 'New Password (leave blank to keep unchanged)'}
                </label>
                <input
                  type="password"
                  id="formPassword"
                  value={formData.password || ''}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required={modalMode === 'ADD'}
                  placeholder="••••••••"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  <span className="material-icons">save</span>
                  {modalMode === 'ADD' ? 'Create User' : 'Save Changes'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="modal-backdrop">
          <div className="confirm-modal-card animate-fade-up">
            <span className="material-icons warning-icon">warning</span>
            <h2>Delete User Record?</h2>
            <p>
              Are you sure you want to delete user account <strong>"{userToDelete.name}"</strong> ({userToDelete.email})? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-danger-confirm" onClick={confirmDeleteUser}>
                <span className="material-icons">delete</span> Confirm Delete
              </button>
              <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>
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
            <span className="material-icons toast-icon">check_circle</span>
            <div className="toast-content">
              <p className="toast-title">User Master Updated</p>
              <p className="toast-desc">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
