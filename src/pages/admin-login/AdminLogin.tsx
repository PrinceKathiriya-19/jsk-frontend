import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../../services/OrderContext';
import './AdminLogin.css';

export const AdminLogin: React.FC = () => {
  const { loginAdmin } = useOrders();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(false);

    setTimeout(() => {
      const success = loginAdmin(username, password);
      setIsLoading(false);

      if (success) {
        navigate('/admin-dashboard');
      } else {
        setLoginError(true);
      }
    }, 1200);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="background-decorations">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <div className="login-card animate-fade-up">
        <div className="card-accent"></div>
        
        {/* Logo Header */}
        <div className="login-header">
          <div className="logo-circle">
            <span>JSK</span>
          </div>
          <h2>JSK Chemicals</h2>
          <p className="subtitle">Admin Management Workspace</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Administrator Username</label>
            <div className="input-wrapper">
              <span className="material-icons input-icon">person</span>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="e.g. admin" 
                autoComplete="username" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Security Password</label>
            <div className="input-wrapper">
              <span className="material-icons input-icon">lock</span>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••" 
                autoComplete="current-password" 
              />
            </div>
          </div>

          {loginError && (
            <div className="auth-error-alert animate-fade-up">
              <span className="material-icons">error_outline</span>
              <span>Invalid username or password. Please try again (Use: admin / admin123).</span>
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span className="material-icons">admin_panel_settings</span>
                <span>Authenticate &amp; Access</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Public Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
