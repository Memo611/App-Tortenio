import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

import styles from '../../Styles/Styles';


function Home() {
    return (
        <View>
            <View >
                <View style={styles.iconoContainerUserHome}>                
                        <Image source={iconUser} style={styles.IconoUserHome} />           
                </View>
                <View style={styles.Buscar}>
                    <TextInput style={styles.BuscarText}>Buscar</TextInput>
                </View>
            </View>
        </View>
    );
}

export default Home;