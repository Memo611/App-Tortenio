import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

const promoImage = require('../../../assets/logo.jpg'); // Reemplaza con tu imagen
const suggestionImages = [
    require('../../../assets/logo.jpg'),
    require('../../../assets/iconUser.png'),
]; // Reemplaza con tus imágenes
import styles from './HomeStyles';
import global from '../../Styles/Styles';


function Home({ navigation }) {
    return (
        <View>
            <View style={styles.ContainerHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('Cuenta')} style={styles.iconoContainerUserHome}>
                    <Image source={iconUser} style={styles.IconoUserHome} />
                </TouchableOpacity>
                <View style={styles.Buscar}>
                    <TextInput style={styles.BuscarText} placeholder='Buscar...'></TextInput>
                </View>
            </View>

            {/* Sección de Promociones */}
            <View style={styles.promotionsContainer}>
                <Text style={styles.promotionsTitle}>PROMOCIONES!</Text>
                <View style={styles.promoItem}>
                    <Image source={promoImage} style={styles.promoImage} />
                    <Text style={styles.promoText}>Papas Sazonadas</Text>
                </View>
            </View>

            {/* Sección de Sugerencias del Día */}
            <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Sugerencias del Día</Text>
                <View style={styles.suggestionsGrid}>
                    {suggestionImages.map((image, index) => (
                        <View key={index} style={styles.suggestionItem}>
                            <Image source={image} style={styles.suggestionImage} />
                        </View>
                    ))}
                </View>
            </View>

            {/* Barra de menú */}
            <View style={styles.menuBar}>
                <Icon name="notifications" size={30} color="#FFFFFF" />
                <Icon name="home" size={30} color="#FFFFFF" />
                <Icon name="shopping-bag" size={30} color="#FFFFFF" />
            </View>
        </View>
    );
}

export default Home;