import React, { createContext, useState } from 'react';
// Si deseas usar uuid para generar IDs únicos, descomenta la siguiente línea:
// import { v4 as uuidv4 } from 'uuid'; 

// Crea el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Estado global del carrito
    const [notifications, setNotifications] = useState([]);

    // Función para agregar un pedido a las notificaciones
    const addToNotifications = (orderSummary) => {
        // Crear una descripción con los productos del carrito
        const productDetails = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');

        const order = {
            id: (notifications.length + 1).toString(), // Genera un ID único
            title: 'Pedido',
            productDetails: `Productos: ${productDetails}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Orden Aceptada', // Estado inicial
            progress: 0, // Progreso inicial
            orderSummary, // Detalles del pedido
        };

        setNotifications((prevNotifications) => [...prevNotifications, order]);

        // Iniciar la actualización del progreso
        updateNotificationProgress(order.id); // Pasa el ID del pedido recién creado
    };

    // Función para actualizar el progreso de una notificación
    const updateNotificationProgress = (id) => {
        const steps = [
            { status: 'Orden Aceptada', progress: 33 },
            { status: 'En Preparación', progress: 66},
            { status: 'Pedido Listo', progress: 100 },
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) =>
                        notification.id === id
                            ? { ...notification, status: step.status, progress: step.progress}
                            : notification
                    )
                );
            }, index * 7000); // Cambiar cada 7 segundos (ajusta el tiempo según sea necesario)
        });
    };


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
            // Verifica que la cantidad sea válida
            if (quantity >= 0) {
                newCart[index].quantity = quantity;
            }
            return newCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            // Asegúrate de que item.cost sea un número antes de hacer la multiplicación
            const price = parseFloat(item.cost.replace('$', '').trim()); // Convierte el precio a número
            if (!isNaN(price)) {
                return total + price * item.quantity;
            }
            return total;
        }, 0);
    };

    const clearCart = () => {
        setCart([]); // Resetea el carrito
    };

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, calculateTotal,
            addToNotifications, notifications, clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
