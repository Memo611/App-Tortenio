import React, { createContext, useState } from 'react';

// Crea el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Estado global del carrito

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
    
            if (existingItem) {
                // Si el producto ya está en el carrito, actualiza su cantidad
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Si el producto no está en el carrito, agrégalo
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index)); // Elimina un elemento del carrito
    };

    const updateQuantity = (index, quantity) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            newCart[index].quantity = quantity;
            return newCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.cost.replace('$', '')); // Convierte el precio a número
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};
