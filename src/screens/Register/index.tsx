import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../../Styles/Styles';

const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

export default function Register({ navigation }) {
    const [userImage, setUserImage] = useState(null);

    const handleChangePhoto = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('El usuario canceló la selección de imagen');
            } else if (response.error) {
                console.log('Error de selección de imagen: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setUserImage(source);
            }
        });
    };

    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                {/* Logo empresa */}
                <View style={styles.logoContainerRegister}>
                    <Image source={logo} style={styles.LogoRegister} />
                </View>

                {/* Icono usuario */}
                <View style={styles.iconoContainerUser}>
                    {userImage ? (
                        <Image source={userImage} style={styles.IconoUser} />
                    ) : (
                        <Image source={iconUser} style={styles.IconoUser} />
                    )}
                </View>

                {/* Formulario */}
                <View style={styles.formContainerUser}>
                    <Text style={styles.RegisterText}>Registro</Text>

                    {/* Campos de Nombre y Apellido en la misma línea */}
                    <View style={styles.rowContainer}>
                        <View style={styles.halfInputContainer}>
                            <Icon name="person" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                placeholder="Nombre"
                                style={styles.input}
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.halfInputContainer}>
                            <Icon name="person" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                placeholder="Apellido"
                                style={styles.input}
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    {/* Campos de Número de Control y Teléfono en la misma línea */}
                    <View style={styles.rowContainer}>
                        <View style={styles.halfInputContainer}>
                            <Icon name="badge" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                placeholder="Número de Control"
                                style={styles.input}
                                keyboardType="numeric"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.halfInputContainer}>
                            <Icon name="phone" size={20} color="#666" style={styles.icon} />
                            <TextInput
                                placeholder="Teléfono"
                                style={styles.input}
                                keyboardType="phone-pad"
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    {/* Campo de Correo Electrónico */}
                    <View style={styles.inputContainer}>
                        <Icon name="email" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholder="Correo electrónico"
                            style={styles.input}
                            keyboardType="email-address"
                            returnKeyType="next"
                        />
                    </View>

                    {/* Campo de Contraseña */}
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholder="Contraseña"
                            style={styles.input}
                            secureTextEntry
                            returnKeyType="done"
                        />
                    </View>

                    {/* Botones de Cancelar y Registrarse en la misma línea */}
                    <View style={styles.rowContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botón para cambiar foto de usuario */}
                <TouchableOpacity
                    onPress={handleChangePhoto}
                    style={styles.changePhotoButton}
                >
                    <Icon name="edit" size={24} color="#D64619" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
