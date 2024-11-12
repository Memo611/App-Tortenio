import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

function Notificaciones ({navigation}){
    return(
        <View>
            <View>
                <TouchableOpacity>
                    <Image source={iconUser} />      
                </TouchableOpacity>
                <View>
                    <TextInput placeholder='Buscar...'></TextInput>
                </View>
            </View>
        </View>
    );
}

export default Notificaciones;