import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const logo = require('../../../assets/logo.jpg');
import styles from '../../Styles/Styles';


function Home() {
    return (
        <View>
            <Image source={logo} style={styles.logo} />
            <Text> Fulano </Text>
        </View>
    );
}

export default Home;