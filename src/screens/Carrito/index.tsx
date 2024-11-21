import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { CartContext } from '../../context/CartContext';

function CartScreen({ navigation }) {
    const { cart, addToCart, removeFromCart, updateQuantity, calculateTotal, addToNotifications, notifications, clearCart } = useContext(CartContext); // Usamos addToNotifications

    const handlePayment = () => {
        if (cart.length === 0) {
            Alert.alert('Carrito vacío', 'No tienes artículos en tu carrito para pagar.');
            return;
        }

        // Crear un resumen del pedido
        const orderSummary = cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            cost: item.cost,
        }));

        // Agregar el pedido a las notificaciones
        addToNotifications(orderSummary); // Llamada al contexto
        clearCart();
        // Vaciar el carrito
        Alert.alert('Pedido Realizado', 'Tu pedido ha sido realizado con éxito.');

        // Redirigir al usuario a la pantalla de notificaciones o Home
        navigation.navigate('Home'); // Puedes ajustar a la pantalla de notificaciones si prefieres
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Carrito de Compras</Text>

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.backButtonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.cartItem}>
                                <Image source={item.image} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemCost}>{item.cost}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => updateQuantity(index, item.quantity - 1)}
                                            disabled={item.quantity <= 1} // Desactiva el botón si la cantidad es 1
                                        >
                                            <Text style={[styles.quantityText, item.quantity <= 1 && styles.disabledText]}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => updateQuantity(index, item.quantity + 1)}
                                        >
                                            <Text style={styles.quantityText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => removeFromCart(index)}
                                    >
                                        <Text style={styles.removeButtonText}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>

                    {/* Botón de pagar */}
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={handlePayment} // Cambié aquí para llamar handlePayment
                    >
                        <Text style={styles.checkoutButtonText}>Pagar</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

export default CartScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 60,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        marginBottom: 16,
    },
    backButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    disabledText: {
        color: 'gray', 
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemCost: {
        fontSize: 14,
        color: 'green',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    quantityButton: {
        backgroundColor: '#e0e0e0',
        padding: 5,
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    removeButton: {
        marginTop: 8,
        backgroundColor: '#ff4d4d',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    removeButtonText: {
        color: 'white',
        fontSize: 14,
    },
    totalContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: 'white',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    checkoutButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
