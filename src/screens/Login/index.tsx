import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const logo = require('../../../assets/logo.jpg');
import styles from '../../Styles/Styles';


function Login() {
    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            enableOnAndroid={true}
            extraScrollHeight={40} // Ajuste para evitar desplazamiento adicional
        >
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>

            {/* Formulario */}
            <View style={styles.formContainer}>
                <Text style={styles.loginText}>Login</Text>

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

                {/* Enlace de recuperación de contraseña */}
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                {/* Botón de inicio de sesión */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>

                {/* Enlace de registro */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                    <TouchableOpacity>
                        <Text style={styles.registerLink}>Regístrate ahora</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

export default Login;