import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message'; 
import styles from './LoginStyles';
import global from '../../Styles/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const logo = require('../../../assets/logo.jpg');

function Login({ navigation }) {
    const [emailOrNumControl, setEmailOrNumControl] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
        if (!emailOrNumControl && !password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Por favor, ingresa tu correo y la contraseña',
            });
            return;
        } else if (!emailOrNumControl) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Por favor, ingresa tu correo o número de control',
            });
            return;
        } else if (!password) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Por favor, ingresa tu contraseña',
            });
            return;
        }
    
        try {
            const response = await fetch('http://192.168.100.104:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailOrNumControl,  // Usamos el nombre del campo que recibe el backend
                    password,           // Contraseña del usuario
                }),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                navigation.navigate('Main');
                Toast.show({
                    type: 'success',
                    text1: 'Bienvenido',
                    text2: data.message,
                },);

            } else if (response.status === 401) {
                // Cuando las credenciales son incorrectas
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Credenciales incorrectas, por favor intenta nuevamente.',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: data.message || 'Hubo un problema con el servidor',
                });
            }
        } catch (error) {
            console.error('Error en el login:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Hubo un problema con el servidor',
            });
        }
    };
    

    return (
        <ScrollView scrollEnabled={true} stickyHeaderHiddenOnScroll={true} contentContainerStyle={global.scrollContent}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.loginText}>Login</Text>
                <View style={global.inputContainer}>
                    <AntDesign name= 'mail' style={global.icon} color="#666" />
                    <TextInput
                        placeholder="Correo electrónico o Núm. Control"
                        style={global.input}
                        keyboardType="default"
                        returnKeyType="next"
                        value={emailOrNumControl}
                        onChangeText={setEmailOrNumControl}
                    />
                </View>
               {/* Campo de contraseña con alternar visibilidad */}
               <View style={global.inputContainer}>
                    <Icon name="lock" size={20} color="#666" style={global.icon} />
                    <TextInput
                        placeholder="Contraseña"
                        style={global.input}
                        secureTextEntry={!isPasswordVisible} // Alternar visibilidad
                        returnKeyType="done"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Cambiar estado
                        style={styles.passwordToggle}
                    >
                        <Icon
                            name={isPasswordVisible ? 'visibility' : 'visibility-off'} // Icono dinámico
                            style={global.iconEye}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
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
