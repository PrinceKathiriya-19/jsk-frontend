import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../../services/UserContext';
import type { User } from '../../services/UserContext';
import './Login.css';

export const Login: React.FC = () => {
  const { login, register, isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const returnUrl = searchParams.get('returnUrl') || '/portal';

  useEffect(() => {
    if (isLoggedIn) {
      navigate(returnUrl);
    }
  }, [isLoggedIn, navigate, returnUrl]);

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [regData, setRegData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [isRegLoading, setIsRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    const response = await login(loginData.email, loginData.password);
    setIsLoginLoading(false);

    if (response.success) {
      navigate(returnUrl);
    } else {
      setLoginError(response.message);
    }
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) return;

    setIsRegLoading(true);
    setRegError(null);

    const newCustomer: User = {
      name: regData.name,
      company: regData.company,
      email: regData.email,
      phone: regData.phone,
      country: regData.country,
      address: regData.address,
      password: regData.password
    };

    const response = await register(newCustomer);
    setIsRegLoading(false);

    if (response.success) {
      navigate(returnUrl);
    } else {
      setRegError(response.message);
    }
  };


  return (
    <div className="login-page-wrapper">
      {/* Background decorations */}
      <div className="background-decorations">
        <div className="circle circle-accent"></div>
        <div className="circle circle-primary"></div>
      </div>

      <div className="auth-container animate-fade-up">
        <div className="card-top-accent"></div>
        
        {/* Header */}
        <div className="auth-header">
          <div className="brand-logo">
            <span>JSK</span>
          </div>
          <h1>Client Portal</h1>
          <p className="subtitle">Access your account, trace orders, &amp; request quick RFQs</p>
        </div>

        {/* Sliding Tab Headers */}
        <div className="tabs-header">
          <button 
            type="button" 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setLoginError(null); setRegError(null); }}
          >
            <span className="material-icons">login</span> Sign In
          </button>
          <button 
            type="button" 
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setLoginError(null); setRegError(null); }}
          >
            <span className="material-icons">person_add</span> Create Account
          </button>
          <div className={`tab-slider ${activeTab === 'register' ? 'slide-right' : ''}`}></div>
        </div>

        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="auth-form animate-fade-up">
            <div className="form-group">
              <label htmlFor="loginEmail">Business Email</label>
              <div className="input-wrapper">
                <span className="material-icons input-icon">email</span>
                <input 
                  type="email" 
                  id="loginEmail" 
                  value={loginData.email} 
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                  required 
                  placeholder="name@company.com" 
                  autoComplete="username" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <div className="input-wrapper">
                <span className="material-icons input-icon">lock</span>
                <input 
                  type="password" 
                  id="loginPassword" 
                  value={loginData.password} 
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                  required 
                  placeholder="••••••••" 
                  autoComplete="current-password" 
                />
              </div>
            </div>

            {/* Hint for Sarah */}
            <div className="demo-hint-box">
              <span className="material-icons">info</span>
              <span>Demo login: <strong>s.jenkins@apexbiotech.co.uk</strong> / <strong>password123</strong></span>
            </div>

            {loginError && (
              <div className="auth-error-banner animate-fade-up">
                <span className="material-icons">error_outline</span>
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="submit-auth-btn" disabled={isLoginLoading}>
              {isLoginLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Authenticating Client...</span>
                </>
              ) : (
                <>
                  <span className="material-icons">verified_user</span>
                  <span>Sign In to Portal</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* REGISTRATION FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegSubmit} className="auth-form animate-fade-up">
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="regName">Contact Full Name <span className="req">*</span></label>
                <div className="input-wrapper">
                  <span className="material-icons input-icon">person</span>
                  <input 
                    type="text" 
                    id="regName" 
                    value={regData.name} 
                    onChange={(e) => setRegData({...regData, name: e.target.value})} 
                    required 
                    placeholder="Sarah Jenkins" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="regCompany">Company Name <span className="req">*</span></label>
                <div className="input-wrapper">
                  <span className="material-icons input-icon">business</span>
                  <input 
                    type="text" 
                    id="regCompany" 
                    value={regData.company} 
                    onChange={(e) => setRegData({...regData, company: e.target.value})} 
                    required 
                    placeholder="Apex Biotech Ltd." 
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="regEmail">Corporate Email <span className="req">*</span></label>
                <div className="input-wrapper">
                  <span className="material-icons input-icon">email</span>
                  <input 
                    type="email" 
                    id="regEmail" 
                    value={regData.email} 
                    onChange={(e) => setRegData({...regData, email: e.target.value})} 
                    required 
                    placeholder="s.jenkins@apexbiotech.co.uk" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="regPhone">Phone Number <span className="req">*</span></label>
                <div className="input-wrapper">
                  <span className="material-icons input-icon">phone</span>
                  <input 
                    type="tel" 
                    id="regPhone" 
                    value={regData.phone} 
                    onChange={(e) => setRegData({...regData, phone: e.target.value})} 
                    required 
                    placeholder="+44 20 7946 0958" 
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regCountry">Country <span className="req">*</span></label>
              <div className="input-wrapper">
                <span className="material-icons input-icon">public</span>
                <input 
                  type="text" 
                  id="regCountry" 
                  value={regData.country} 
                  onChange={(e) => setRegData({...regData, country: e.target.value})} 
                  required 
                  placeholder="United Kingdom" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="regAddress">Corporate / Delivery Address <span className="req">*</span></label>
              <div className="input-wrapper">
                <span className="material-icons input-icon textarea-icon">location_on</span>
                <textarea 
                  id="regAddress" 
                  value={regData.address} 
                  onChange={(e) => setRegData({...regData, address: e.target.value})} 
                  required 
                  rows={2} 
                  placeholder="Unit 12, Science & Technology Park, Milton Road, Cambridge CB4 0FZ"
                ></textarea>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="regPassword">Security Password <span className="req">*</span></label>
                <div className="input-wrapper">
                  <span className="material-icons input-icon">lock</span>
                  <input 
                    type="password" 
                    id="regPassword" 
                    value={regData.password} 
                    onChange={(e) => setRegData({...regData, password: e.target.value})} 
                    required 
                    minLength={6} 
                    placeholder="Min 6 chars" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="regConfirm">Confirm Password <span className="req">*</span></label>
                <div className="input-wrapper">
                  <span className="material-icons input-icon">lock_reset</span>
                  <input 
                    type="password" 
                    id="regConfirm" 
                    value={regData.confirmPassword} 
                    onChange={(e) => setRegData({...regData, confirmPassword: e.target.value})} 
                    required 
                    placeholder="Repeat password" 
                  />
                </div>
                {regData.password !== regData.confirmPassword && regData.confirmPassword && (
                  <span className="error-msg">Passwords do not match</span>
                )}
              </div>
            </div>

            {regError && (
              <div className="auth-error-banner animate-fade-up">
                <span className="material-icons">error_outline</span>
                <span>{regError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-auth-btn" 
              disabled={regData.password !== regData.confirmPassword || isRegLoading}
            >
              {isRegLoading ? (
                <>
                  <span className="spinner"></span>
                  <span>Creating Client Workspace...</span>
                </>
              ) : (
                <>
                  <span className="material-icons">how_to_reg</span>
                  <span>Register &amp; Open Portal</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Back to Website link */}
        <div className="auth-footer">
          <Link to="/" className="back-link">
            <span className="material-icons">arrow_back</span>
            Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
