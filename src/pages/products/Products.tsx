import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../services/CartContext';
import type { Product } from '../../services/CartContext';

interface ProductsProps {
  category: 'fine' | 'speciality' | 'impurity';
  title?: string;
}

export const Products: React.FC<ProductsProps> = ({ category }) => {
  const { addToCart } = useCart();


  const fineChemicals: Product[] = [
    { name: 'Acetonitrile', casNo: '75-05-8', formula: 'CH₃CN', category: 'fine' },
    { name: 'Benzaldehyde', casNo: '100-52-7', formula: 'C₇H₆O', category: 'fine' },
    { name: 'Chloroacetyl Chloride', casNo: '79-04-9', formula: 'C₂H₂ClO', category: 'fine' },
    { name: 'Dimethyl Sulfoxide', casNo: '67-68-5', formula: '(CH₃)₂SO', category: 'fine' },
    { name: 'Ethyl Acetate', casNo: '141-78-6', formula: 'CH₃COOC₂H₅', category: 'fine' },
    { name: 'Formic Acid', casNo: '64-18-6', formula: 'HCOOH', category: 'fine' },
    { name: 'Glacial Acetic Acid', casNo: '64-19-7', formula: 'CH₃COOH', category: 'fine' },
    { name: 'Hydroxylamine Hydrochloride', casNo: '5470-11-1', formula: 'NH₂OH·HCl', category: 'fine' },
    { name: 'Isopropyl Alcohol', casNo: '67-63-0', formula: 'C₃H₈O', category: 'fine' },
    { name: 'Methylene Dichloride', casNo: '75-09-2', formula: 'CH₂Cl₂', category: 'fine' },
  ];

  const specialityChemicals: Product[] = [
    { name: 'Ammonium Chloride', casNo: '12125-02-9', formula: 'NH₄Cl', category: 'speciality' },
    { name: 'Boric Acid', casNo: '10043-35-3', formula: 'H₃BO₃', category: 'speciality' },
    { name: 'Calcium Chloride', casNo: '10043-52-4', formula: 'CaCl₂', category: 'speciality' },
    { name: 'Ferric Chloride', casNo: '7705-08-0', formula: 'FeCl₃', category: 'speciality' },
    { name: 'Magnesium Sulfate', casNo: '7487-88-9', formula: 'MgSO₄', category: 'speciality' },
    { name: 'Potassium Carbonate', casNo: '584-08-7', formula: 'K₂CO₃', category: 'speciality' },
    { name: 'Sodium Acetate', casNo: '127-09-3', formula: 'CH₃COONa', category: 'speciality' },
    { name: 'Zinc Chloride', casNo: '7646-85-7', formula: 'ZnCl₂', category: 'speciality' },
  ];

  const impurityProducts: Product[] = [
    { name: 'Amlodipine Impurity A', casNo: '88150-42-9', formula: 'C₂₀H₂₄ClN₃O₅', category: 'impurity' },
    { name: 'Ciprofloxacin Impurity B', casNo: '86393-32-0', formula: 'C₁₇H₁₈FN₃O₃', category: 'impurity' },
    { name: 'Metformin Impurity C', casNo: '657-24-9', formula: 'C₄H₁₁N₅', category: 'impurity' },
    { name: 'Omeprazole Impurity D', casNo: '73590-58-6', formula: 'C₁₇H₁₉N₃O₃S', category: 'impurity' },
    { name: 'Paracetamol Impurity A', casNo: '103-90-2', formula: 'C₈H₉NO₂', category: 'impurity' },
    { name: 'Rosuvastatin Impurity E', casNo: '287714-41-4', formula: 'C₂₂H₂₇FN₃O₆S', category: 'impurity' },
  ];

  let currentProducts: Product[] = [];
  let categoryTitle = 'Fine Chemicals';

  if (category === 'fine') {
    currentProducts = fineChemicals;
    categoryTitle = 'Fine Chemicals';
  } else if (category === 'speciality') {
    currentProducts = specialityChemicals;
    categoryTitle = 'Speciality Chemicals';
  } else if (category === 'impurity') {
    currentProducts = impurityProducts;
    categoryTitle = 'Impurity';
  }

  // Local quantity state per product
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getQty = (product: Product) => {
    if (quantities[product.name] !== undefined) {
      return quantities[product.name];
    }
    return product.category === 'impurity' ? 1 : 25;
  };

  const adjustQty = (product: Product, delta: number) => {
    const current = getQty(product);
    const newQty = Math.max(1, current + delta);
    setQuantities(prev => ({ ...prev, [product.name]: newQty }));
  };

  const handleQtyChange = (product: Product, value: number) => {
    const newQty = Math.max(1, value || 1);
    setQuantities(prev => ({ ...prev, [product.name]: newQty }));
  };

  const handleAddInquiry = (product: Product) => {
    const qty = getQty(product);
    addToCart(product, qty);
    setToastMessage(`Added ${qty} kg of ${product.name} to inquiry list.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div>
      {/* Page Banner */}
      <div className="page-banner animate-fade-up">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="section-label">Our Offerings</span>
          <h1>{categoryTitle}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-icons">chevron_right</span>
            Products
            <span className="material-icons">chevron_right</span>
            {categoryTitle}
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <section className="products-page-section">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-tabs animate-fade-up">
            <Link to="/fine-chemicals-products" className={`cat-tab ${category === 'fine' ? 'active' : ''}`}>Fine Chemicals</Link>
            <Link to="/speciality-chemicals-products" className={`cat-tab ${category === 'speciality' ? 'active' : ''}`}>Speciality Chemicals</Link>
            <Link to="/impurity-products" className={`cat-tab ${category === 'impurity' ? 'active' : ''}`}>Impurity</Link>
          </div>

          {/* Table */}
          <div className="products-table-wrap animate-fade-up">
            <table className="products-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>CAS No.</th>
                  <th>Molecular Formula</th>
                  <th>Order Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="row-num">{index + 1}</td>
                    <td className="product-name">{product.name}</td>
                    <td className="cas-no">{product.casNo}</td>
                    <td className="formula">{product.formula}</td>
                    <td>
                      <div className="qty-selector">
                        <button className="qty-btn" onClick={() => adjustQty(product, -5)} title="Decrease by 5">-</button>
                        <input 
                          type="number" 
                          className="qty-input" 
                          value={getQty(product)} 
                          onChange={(e) => handleQtyChange(product, parseInt(e.target.value))}
                          min="1" 
                        />
                        <span className="qty-unit">kg</span>
                        <button className="qty-btn" onClick={() => adjustQty(product, 5)} title="Increase by 5">+</button>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleAddInquiry(product)} className="add-inquiry-btn">
                        <span className="material-icons">add_shopping_cart</span> Add to Inquiry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div className="products-note animate-fade-up">
            <span className="material-icons">info</span>
            <p>The above list is indicative. We manufacture many more products on request. Please <Link to="/contact-us">contact us</Link> for custom requirements.</p>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-body">
            <span className="material-icons toast-success-icon">check_circle</span>
            <div className="toast-content">
              <p className="toast-title">Added to Inquiry</p>
              <p className="toast-desc">{toastMessage}</p>
            </div>
          </div>
          <Link to="/order-inquiry" className="toast-action-btn">
            View Cart <span className="material-icons">arrow_forward</span>
          </Link>
        </div>
      )}

      <style>{`
        .page-banner {
          height: 280px;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          position: relative;
          display: flex;
          align-items: center;
        }
        .banner-overlay { position: absolute; inset: 0; background: rgba(10,20,40,0.4); }
        .banner-content { position: relative; z-index: 1; }
        .banner-content h1 { font-family: var(--font-display); font-size: 48px; color: var(--white); margin: 8px 0 16px; }
        .breadcrumb { display: flex; align-items: center; gap: 4px; font-size: 14px; color: rgba(255,255,255,0.6); }
        .breadcrumb a { color: var(--accent-light); }
        .breadcrumb .material-icons { font-size: 16px; }
        .products-page-section { padding: 60px 0 80px; }
        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 40px;
          background: var(--off-white);
          padding: 6px;
          border-radius: 10px;
          width: fit-content;
          border: 1px solid var(--light-gray);
        }
        .cat-tab {
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--dark-gray);
          transition: var(--transition);
        }
        .cat-tab.active, .cat-tab:hover {
          background: var(--white);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        .cat-tab.active { color: var(--primary); font-weight: 600; }
        .products-table-wrap {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--light-gray);
          box-shadow: var(--shadow-sm);
        }
        .products-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--white);
        }
        .products-table thead {
          background: var(--primary);
        }
        .products-table thead th {
          padding: 16px 20px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: var(--white);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .products-table tbody tr {
          border-bottom: 1px solid var(--light-gray);
          transition: var(--transition);
        }
        .products-table tbody tr:last-child { border-bottom: none; }
        .products-table tbody tr:hover { background: var(--off-white); }
        .products-table td {
          padding: 14px 20px;
          font-size: 14px;
          color: var(--dark-gray);
          vertical-align: middle;
        }
        .row-num { color: var(--mid-gray); font-size: 13px; }
        .product-name { font-weight: 500; color: var(--primary); }
        .cas-no { color: var(--mid-gray); font-family: monospace; font-size: 13px; }
        .formula { font-family: monospace; font-size: 13px; }
        
        /* Qty Selector in Table */
        .qty-selector {
          display: flex;
          align-items: center;
          gap: 2px;
          background: var(--off-white);
          padding: 3px;
          border-radius: 6px;
          border: 1px solid var(--light-gray);
          width: fit-content;
        }
        .qty-btn {
          background: var(--white);
          border: 1px solid var(--light-gray);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          color: var(--primary);
          transition: var(--transition);
        }
        .qty-btn:hover { background: var(--primary); color: var(--white); border-color: var(--primary); }
        .qty-input {
          width: 50px;
          text-align: center;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          outline: none;
        }
        .qty-input::-webkit-inner-spin-button, .qty-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .qty-unit { font-size: 12px; font-weight: 600; color: var(--mid-gray); padding-right: 4px; }

        /* Action Buttons */
        .add-inquiry-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--accent);
          color: var(--white);
          border: none;
          font-size: 13px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
        }
        .add-inquiry-btn:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(232, 160, 32, 0.25);
        }
        .add-inquiry-btn .material-icons { font-size: 16px; }

        .products-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(26,60,94,0.05);
          border: 1px solid rgba(26,60,94,0.1);
          border-radius: 8px;
          padding: 16px 20px;
          margin-top: 28px;
        }
        .products-note .material-icons { color: var(--primary-light); font-size: 18px; margin-top: 1px; flex-shrink: 0; }
        .products-note p { font-size: 14px; color: var(--dark-gray); line-height: 1.6; }
        .products-note a { color: var(--accent); font-weight: 600; }

        /* Toast Notification styles */
        .toast-notification {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: var(--primary-dark);
          border-left: 5px solid var(--accent);
          border-radius: 8px;
          box-shadow: var(--shadow-lg);
          padding: 18px 24px;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          color: var(--white);
          animation: fadeInUp 0.4s ease forwards;
        }
        .toast-body { display: flex; align-items: center; gap: 14px; }
        .toast-success-icon { color: var(--accent); font-size: 28px; }
        .toast-content { display: flex; flex-direction: column; gap: 2px; }
        .toast-title { font-weight: 600; font-size: 15px; color: var(--white); }
        .toast-desc { font-size: 13px; color: var(--light-gray); }
        .toast-action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.1);
          color: var(--white);
          font-size: 13px;
          font-weight: 600;
          border-radius: 6px;
          transition: var(--transition);
        }
        .toast-action-btn:hover {
          background: var(--accent);
          color: var(--white);
        }
        .toast-action-btn .material-icons { font-size: 16px; }

        @media (max-width: 768px) {
          .products-table-wrap { overflow-x: auto; }
          .category-tabs { flex-wrap: wrap; width: 100%; }
          .toast-notification {
            left: 20px;
            right: 20px;
            bottom: 20px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .toast-action-btn { justify-content: center; }
        }
      `}</style>
    </div>
  );
};
