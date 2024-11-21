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
    SafeAreaView,
    ScrollView,
} from 'react-native';
import styles from './HomeStyles'; // Estilos de la pantalla principal
import modalStyles from './modalStyles'; // Estilos del modal
import { CartContext } from '../../context/CartContext'; // Contexto del carrito de compras

// Importación de activos
const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');
const cartIcon = require('../../../assets/iconos/shopping_cart_checkout.png');
const menuIcon = require('../../../assets/iconos/Menu.png');

// Datos de prueba para promociones
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

// Datos de prueba para sugerencias
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

/**
 * Pantalla principal del Home.
 * 
 * @param {Object} props - Propiedades pasadas al componente.
 */
function Home({ navigation }) {
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0); // Índice actual de la promoción
    const [modalVisible, setModalVisible] = useState(false); // Estado de visibilidad del modal
    const [currentPromo, setCurrentPromo] = useState(promotions[0]); // Promoción actual mostrada
    const [currentSuggestion, setCurrentSuggestion] = useState(null); // Sugerencia seleccionada
    const { cart, addToCart } = useContext(CartContext); // Estado del carrito desde el contexto
    const fadeAnim = new Animated.Value(1); // Animación de desvanecimiento

    // Actualización automática del carrusel de promociones
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

        return () => clearInterval(interval); // Limpieza del intervalo al desmontar
    }, []);

    // Cambiar la promoción actual cuando cambie el índice
    useEffect(() => {
        setCurrentPromo(promotions[currentPromoIndex]);
    }, [currentPromoIndex]);

    // Manejar la selección de una promoción
    const handlePromoClick = () => {
        setCurrentSuggestion(null);
        setModalVisible(true);
    };

    // Agregar promoción o sugerencia al carrito
    const handleAddToCart = () => {
        const item = currentSuggestion || currentPromo;
        addToCart(item);
        setModalVisible(false);
    };

    // Manejar la selección de una sugerencia
    const handleSuggestionClick = (item) => {
        setCurrentSuggestion(item);
        setModalVisible(true);
    };

    // Renderización principal del componente
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.container}>
                    {/* Encabezado */}
                    <View style={styles.ContainerHeader}>
                        {/* Botón de menú */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('menu')}
                            style={styles.iconoContainerUserHome}
                        >
                            <Image source={menuIcon} style={styles.IconoUserHome} />
                        </TouchableOpacity>

                        {/* Barra de búsqueda */}
                        <View style={styles.Buscar}>
                            <TextInput style={styles.BuscarText} placeholder="Buscar..." />
                        </View>

                        {/* Carrito */}
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
                            {/* Asegúrate de que la imagen no herede colores del contenedor */}
                            <Animated.Image
                                source={currentPromo.image}
                                style={[styles.promoImage, { opacity: fadeAnim }]}
                                resizeMode="contain"
                            />
                            <Text style={styles.promoText}>{currentPromo.name}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Modal de Detalles */}
                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={modalStyles.modalContainer}>
                            <View style={modalStyles.modalContent}>
                                {/* Mostrar datos dinámicos según sea promoción o sugerencia */}
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
                                    Tiempo: {(currentSuggestion || currentPromo).time}
                                </Text>
                                <Text style={modalStyles.modalDescription}>
                                    {(currentSuggestion || currentPromo).description}
                                </Text>

                                {/* Botón para agregar al carrito */}
                                <TouchableOpacity
                                    style={modalStyles.addButton}
                                    onPress={handleAddToCart}
                                >
                                    <Text style={modalStyles.addButtonText}>Agregar al Carrito</Text>
                                </TouchableOpacity>

                                {/* Botón para cerrar el modal */}
                                <TouchableOpacity
                                    style={modalStyles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={modalStyles.closeButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {/* Sección de Sugerencias */}
                    <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsTitle}>Sugerencias del Día</Text>
                        <FlatList
                            data={suggestions}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2} // Mostrar en formato de grid
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
                                    <View style={styles.suggestionItem}>
                                        <Image source={item.image} style={styles.suggestionImage} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    {/* Tarjeta interactiva para "Ver Menú Completo" */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Menu')}
                        style={styles.menuCard}
                    >
                        <View style={styles.menuCardTextContainer}>
                            <Text style={styles.menuCardTitle}>Ver Menú Completo</Text>
                            <Text style={styles.menuCardSubtitle}>Descubre todos nuestros platillos deliciosos.</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
