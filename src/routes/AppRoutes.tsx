import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';

import { Home } from '../pages/home/Home';
import { About } from '../pages/about/About';
import { Products } from '../pages/products/Products';
import { Facilities } from '../pages/facilities/Facilities';
import { Downloads } from '../pages/downloads/Downloads';
import { Contact } from '../pages/contact/Contact';
import { OrderInquiry } from '../pages/order-inquiry/OrderInquiry';
import { Login } from '../pages/login/Login';
import { Portal } from '../pages/portal/Portal';
import { AdminLogin } from '../pages/admin-login/AdminLogin';
import { AdminDashboard } from '../pages/admin-dashboard/AdminDashboard';
import { AdminUsers } from '../pages/admin-users/AdminUsers';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="fine-chemicals-products" element={<Products category="fine" />} />
        <Route path="speciality-chemicals-products" element={<Products category="speciality" />} />
        <Route path="impurity-products" element={<Products category="impurity" />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="downloads" element={<Downloads />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="order-inquiry" element={<OrderInquiry />} />
        <Route path="login" element={<Login />} />
        <Route path="portal" element={<Portal />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="admin-users" element={<AdminUsers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

