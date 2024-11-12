import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const logo = require('../../../assets/logo.jpg');
import styles from './LoginStyles';
import global from '../../Styles/Styles';

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // if (!email || !password) {
        //     Alert.alert('Error', 'Por favor ingresa todos los campos.');
        //     return;
        // }

        // // Aquí simula autenticación; puedes reemplazar esto con una llamada a tu backend
        // if (email === 'test@tortenio.com' && password === '123456') {
        //     navigation.navigate('Main'); // Redirige a la pantalla de Home al iniciar sesión
        // } else {
        //     Alert.alert('Error', 'Correo o contraseña incorrectos.');
        // }
    };

    return (
        <ScrollView scrollEnabled={false}  stickyHeaderHiddenOnScroll={false} contentContainerStyle={global.scrollContent}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.loginText}>Login</Text>

                    <View style={global.inputContainer}>
                        <Icon name="email" size={20} color="#666" style={global.icon} />
                        <TextInput
                            placeholder="Correo electrónico"
                            style={global.input}
                            keyboardType="email-address"
                            returnKeyType="next"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={global.inputContainer}>
                        <Icon name="lock" size={20} color="#666" style={global.icon} />
                        <TextInput
                            placeholder="Contraseña"
                            style={global.input}
                            secureTextEntry
                            returnKeyType="done"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Regístrate ahora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </ScrollView>
    );
}

export default Login;
