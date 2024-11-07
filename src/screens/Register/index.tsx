import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import styles from '../../Styles/Styles';

const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

export default function Register({ navigation }) {
    // Estado para almacenar la imagen de perfil seleccionada por el usuario
    const [userImage, setUserImage] = useState<{ uri: string | undefined } | null>(null);

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numeroControl, setNumeroControl] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    // Función para manejar la selección de imagen desde la galería
    const handleChangePhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1.0,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('El usuario canceló la selección de imagen');
            } else if (response.errorMessage) {
                console.log('Error de selección de imagen: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const source = { uri: response.assets[0].uri };
                setUserImage(source);
            }
        });
    };

    // Función para validar y procesar el registro
    const handleRegister = () => {
        // Validaciones básicas de los campos
        if (!nombre.trim()) {
            Alert.alert('Error', 'El campo de Nombre es obligatorio');
            return;
        }
        if (!apellido.trim()) {
            Alert.alert('Error', 'El campo de Apellido es obligatorio');
            return;
        }
        if (!numeroControl.trim()) {
            Alert.alert('Error', 'El campo de Número de Control es obligatorio');
            return;
        }
        if (!telefono.trim() || telefono.length < 10) {
            Alert.alert('Error', 'Ingrese un número de teléfono válido');
            return;
        }
        if (!correo.trim() || !/\S+@\S+\.\S+/.test(correo)) {
            Alert.alert('Error', 'Ingrese un correo electrónico válido');
            return;
        }
        if (!contrasena.trim() || contrasena.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Aquí se puede agregar el proceso de registro (por ejemplo, llamar a una API)
        Alert.alert('Éxito', 'Registro completado con éxito');
    };

    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.scrollContent}>
            {/* Logo de la empresa */}
            <View style={styles.logoContainerRegister}>
                <Image source={logo} style={styles.LogoRegister} />
            </View>

            {/* Imagen de perfil del usuario */}
            <View style={styles.iconoContainerUser}>
                {userImage ? (
                    <Image source={userImage} style={styles.IconoUser} />
                ) : (
                    <Image source={iconUser} style={styles.IconoUser} />
                )}
                {/* Botón para cambiar la foto de perfil */}
                <TouchableOpacity onPress={handleChangePhoto} style={styles.changePhotoButton}>
                    <Icon name="edit" size={24} color="#D64619" />
                </TouchableOpacity>
            </View>

            {/* Formulario de registro */}
            <View style={styles.formContainerUser}>
                <Text style={styles.RegisterText}>Registro</Text>

                {/* Campos de Nombre y Apellido en la misma línea */}
                <View style={styles.rowContainer}>
                    <View style={styles.halfInputContainer}>
                        <Icon name="person" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholder="Nombre"
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.halfInputContainer}>
                        <Icon name="person" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholder="Apellido"
                            style={styles.input}
                            value={apellido}
                            onChangeText={setApellido}
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
                            value={numeroControl}
                            onChangeText={setNumeroControl}
                            keyboardType="numeric"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.halfInputContainer}>
                        <Icon name="phone" size={20} color="#666" style={styles.icon} />
                        <TextInput
                            placeholder="Teléfono"
                            style={styles.input}
                            value={telefono}
                            onChangeText={setTelefono}
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
                        value={correo}
                        onChangeText={setCorreo}
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
                        value={contrasena}
                        onChangeText={setContrasena}
                        secureTextEntry
                        returnKeyType="done"
                    />
                </View>

                {/* Botones de Cancelar y Registrarse en la misma línea */}
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
