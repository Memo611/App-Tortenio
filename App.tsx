import React from 'react';
import ContainerRoutes from './src/routes';
import { CartProvider } from './src/context/CartContext';
import Toast from 'react-native-toast-message';


export default function LoginScreen() {
  return (
    <CartProvider>
      <><ContainerRoutes /><Toast position='top' topOffset={10} /></>
    </CartProvider>
  );
}

