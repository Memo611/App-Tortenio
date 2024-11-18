import React from 'react';
import ContainerRoutes from './src/routes';
import { CartProvider } from './src/context/CartContext';


export default function LoginScreen() {
  return (
    <CartProvider>
      <ContainerRoutes />
    </CartProvider>
  );
}

