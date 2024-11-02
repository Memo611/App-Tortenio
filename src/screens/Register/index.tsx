import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const logo = require('../../../assets/logo.jpg');
const iconUseer= require('../../../assets/iconUser.png');
import styles from '../../Styles/Styles';

export default function Register({navigation}) {
    return (
        <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={40} // Ajuste para evitar desplazamiento adicional
    >
        {/* Logo empresa*/}
        <View style={styles.logoContainerRegister}>
            <Image source={logo} style={styles.LogoRegister} />
        </View>
        
        {/* icono usuario*/}
        <View style={styles.iconoContainerUser}>
            <Image source={logo} style={styles.IconoUser} />
        </View>

        {/* Formulario */}
        <View style={styles.formContainerUser}>
            <Text style={styles.RegisterText}>Registro</Text>
            {/*Campo de Nombre*/}
            <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Nombre"
                    style={styles.input}
                    keyboardType="email-address"
                    returnKeyType="next"
                />
            </View>

            {/*Campo de Apellido*/}
            <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Apellido"
                    style={styles.input}
                    keyboardType="email-address"
                    returnKeyType="next"
                />
            </View>

            {/* Campo de correo electrónico */}
            <View style={styles.inputContainer}>
                <Icon name="email" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Correo electrónico"
                    style={styles.input}
                    keyboardType="email-address"
                    returnKeyType="next"
                />
            </View>

            {/* Campo de contraseña */}
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#666" style={styles.icon} />
                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry
                    returnKeyType="done"
                />
            </View>

            {/* Botón de Cancelar */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.CancelButton}>
                <Text style={styles.CancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            {/* Botón de Registrarse */}
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            
        </View>
    </KeyboardAwareScrollView>
    );
}