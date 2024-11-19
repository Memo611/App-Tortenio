import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    StyleSheet,
    Animated,
    FlatList,
} from 'react-native';
import styles from './HomeStyles';
import modalStyles from './modalStyles';
import { CartContext } from '../../context/CartContext';

const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');
const cartIcon = require('../../../assets/iconos/shopping_cart_checkout.png');
const menuIcon = require('../../../assets/iconos/Menu.png');

const promotions = [
    {
        id: 1,
        image: require('../../../assets/burritos.jpg'),
        name: 'Papas Sazonadas',
        cost: '$30',
        time: '10 minutos',
        quantity: 1,
        description: 'Crujientes papas sazonadas con especias.',
    },
    {
        id: 2,
        image: require('../../../assets/coca.jpg'),
        name: 'Hamburguesa Especial',
        cost: '$50',
        time: '15 minutos',
        quantity: 1,
        description: 'Hamburguesa de carne premium con queso y salsas especiales.',
    },
    {
        id: 3,
        image: require('../../../assets/waffles.png'),
        name: 'Waffles con Chocolate',
        cost: '$40',
        time: '12 minutos',
        quantity: 1,
        description: 'Waffles con un toque de chocolate derretido y crema batida.',
    },
];

const suggestions = [
    {
        id: 3,
        image: require('../../../assets/waffles.png'),
        name: 'Waffles con Chocolate',
        cost: '$40',
        time: '12 minutos',
        quantity: 1,
        description: 'Waffles con un toque de chocolate derretido y crema batida.',
    },
    {
        id: 4,
        image: require('../../../assets/coca.jpg'),
        name: 'Coca-Cola',
        cost: '$20',
        time: '5 minutos',
        quantity: 1,
        description: 'Bebida refrescante clásica.',
    },
    {
        id: 5,
        image: require('../../../assets/tostitos.png'),
        name: 'Tostitos',
        cost: '$25',
        time: '8 minutos',
        quantity: 1,
        description: 'Tostitos con limón y chile.',
    },
    {
        id: 6,
        image: require('../../../assets/burritos.jpg'),
        name: 'Burritos',
        cost: '$35',
        time: '10 minutos',
        quantity: 1,
        description: 'Deliciosos burritos rellenos de carne y queso.',
    },
];

function Home({ navigation }) {
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPromo, setCurrentPromo] = useState(promotions[0]);
    const [currentSuggestion, setCurrentSuggestion] = useState(null);
    const { cart, addToCart } = useContext(CartContext);
    const fadeAnim = new Animated.Value(1);

    // Actualización del carrusel de promociones
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentPromo(promotions[currentPromoIndex]);
    }, [currentPromoIndex]);

    const handlePromoClick = () => {
        setModalVisible(true);
    };

    const handleAddToCart = () => {
        addToCart(currentPromo);
        setModalVisible(false);
    };

    const handleSuggestionClick = (item) => {
        setCurrentSuggestion(item);  // Cambia solo el producto de la sugerencia
        setModalVisible(true);        // Abre el modal
    };
    return (
        <View style={{ flex: 1 }}>
            {/* Encabezado */}
            <View style={styles.ContainerHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('menu')} style={styles.iconoContainerUserHome}>
                    <Image source={menuIcon} style={styles.IconoUserHome} />
                </TouchableOpacity>
                <View style={styles.Buscar}>
                    <TextInput style={styles.BuscarText} placeholder="Buscar..." />
                </View>
                <TouchableOpacity
                    style={styles.cartContainer}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Image source={cartIcon} style={styles.cartIcon} />
                    {cart.length > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cart.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>


            {/* Sección de Promociones */}
            <View style={styles.promotionsContainer}>
                <Text style={styles.promotionsTitle}>PROMOCIONES!</Text>
                <TouchableOpacity onPress={handlePromoClick} style={styles.promoItem}>
                    <Animated.Image
                        source={currentPromo.image}
                        style={[styles.promoImage, { opacity: fadeAnim }]}
                        resizeMode="cover"
                    />
                    <Text style={styles.promoText}>{currentPromo.name}</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de Detalles de Promoción */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        {/* Aquí verificamos si currentSuggestion está definido. Si no lo está, mostramos la promoción */}
                        <Image
                            source={(currentSuggestion || currentPromo).image}
                            style={modalStyles.modalImage}
                        />
                        <Text style={modalStyles.modalTitle}>
                            {(currentSuggestion || currentPromo).name}
                        </Text>
                        <Text style={modalStyles.modalCost}>
                            Costo: {(currentSuggestion || currentPromo).cost}
                        </Text>
                        <Text style={modalStyles.modalTime}>
                            Tiempo de preparación: {(currentSuggestion || currentPromo).time}
                        </Text>
                        <Text style={modalStyles.modalDescription}>
                            {(currentSuggestion || currentPromo).description}
                        </Text>
                        <TouchableOpacity
                            style={modalStyles.addButton}
                            onPress={handleAddToCart}
                        >
                            <Text style={modalStyles.addButtonText}>Agregar al Carrito</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modalStyles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={modalStyles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* Sección de Sugerencias del Día */}
            <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Sugerencias del Día</Text>
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Grid de 2 columnas
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
                            <View style={styles.suggestionItem}>
                                <Image source={item.image} style={styles.suggestionImage} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

export default Home;