import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './services/CartContext';
import { UserProvider } from './services/UserContext';
import { OrderProvider } from './services/OrderContext';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <OrderProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </OrderProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
