import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

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
        </View>
    );
}

export default Home;