import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    StyleSheet,
    Animated,
    Dimensions,
    FlatList,
} from 'react-native';
import styles from './HomeStyles';
import modalStyles from './modalStyles';

const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

const promotions = [
    {
        image: require('../../../assets/burritos.jpg'),
        name: 'Papas Sazonadas',
        cost: '$30',
        time: '10 minutos',
        description: 'Crujientes papas sazonadas con especias.',
    },
    {
        image: require('../../../assets/coca.jpg'),
        name: 'Hamburguesa Especial',
        cost: '$50',
        time: '15 minutos',
        description: 'Hamburguesa de carne premium con queso y salsas especiales.',
    },
    {
        image: require('../../../assets/waffles.png'),
        name: 'Waffles con Chocolate',
        cost: '$40',
        time: '12 minutos',
        description: 'Waffles con un toque de chocolate derretido y crema batida.',
    },
];

const suggestionImages = [
    require('../../../assets/coca.jpg'),
    require('../../../assets/waffles.png'),
    require('../../../assets/tostitos.png'),
    require('../../../assets/burritos.jpg'),
];

function Home({ navigation }) {
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPromo, setModalPromo] = useState(promotions[0]); // Estado separado para la promoción del modal
    const [cart, setCart] = useState([]);
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
        // Solo actualiza la promoción que no está asociada al modal
        if (!modalVisible) {
            setModalPromo(promotions[currentPromoIndex]);
        }
    }, [currentPromoIndex]);

    const handlePromoClick = (promo) => {
        setModalPromo(promo); // Establecer la promoción seleccionada en el modal
        setModalVisible(true); // Abrir el modal
    };

    const handleAddToCart = () => {
        setCart((prevCart) => [...prevCart, modalPromo]); // Usar modalPromo en lugar de currentPromo
        setModalVisible(false); // Cerrar el modal después de añadir al carrito
    };

    return (
        <View>
            {/* Encabezado */}
            <View style={styles.ContainerHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('Cuenta')} style={styles.iconoContainerUserHome}>
                    <Image source={iconUser} style={styles.IconoUserHome} />
                </TouchableOpacity>
                <View style={styles.Buscar}>
                    <TextInput style={styles.BuscarText} placeholder="Buscar..." />
                </View>
            </View>

            {/* Sección de Promociones */}
            <View style={styles.promotionsContainer}>
                <Text style={styles.promotionsTitle}>PROMOCIONES!</Text>
                <TouchableOpacity onPress={() => handlePromoClick(promotions[currentPromoIndex])} style={styles.promoItem}>
                    <Animated.Image
                        source={promotions[currentPromoIndex].image}
                        style={[styles.promoImage, { opacity: fadeAnim }]}
                        resizeMode="cover" // Evita que la imagen se distorsione o se "tinte"
                    />
                    <Text style={styles.promoText}>{promotions[currentPromoIndex].name}</Text>
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
                        <Image source={modalPromo.image} style={modalStyles.modalImage} />
                        <Text style={modalStyles.modalTitle}>{modalPromo.name}</Text>
                        <Text style={modalStyles.modalCost}>Costo: {modalPromo.cost}</Text>
                        <Text style={modalStyles.modalTime}>Tiempo de preparación: {modalPromo.time}</Text>
                        <Text style={modalStyles.modalDescription}>{modalPromo.description}</Text>
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
                    data={suggestionImages}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <View style={styles.suggestionItem}>
                            <Image source={item} style={styles.suggestionImage} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

export default Home;
