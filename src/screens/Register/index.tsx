import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import styles from './RegisterStyles';
import global from '../../Styles/Styles';
import Toast from 'react-native-toast-message';


const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

export default function Register({ navigation }) {
    const [userImage, setUserImage] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numeroControl, setNumeroControl] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const actionSheetRef = useRef();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Función para manejar la selección de imagen desde la galería
    const handleSelectPhotoSource = () => {
        actionSheetRef.current?.show();

    };

    // Maneja la selección de la acción (cámara, galería, cancelar)
    const handleActionSheet = (index) => {
        if (index === 0) {
            // Usar la cámara
            launchCamera(
                { mediaType: 'photo', quality: 1.0 },
                (response) => handleImageResponse(response)
            );
        } else if (index === 1) {
            // Usar la galería
            launchImageLibrary(
                { mediaType: 'photo', quality: 1.0 },
                (response) => handleImageResponse(response)
            );
        }
    };

    // Maneja la respuesta después de seleccionar o tomar una imagen
    const handleImageResponse = (response) => {
        if (response.didCancel) {
            Toast.show({ type: 'info', text1: 'Cancelado', text2: 'No se seleccionó ninguna imagen'});
        } else if (response.errorMessage) {
            Toast.show({ type: 'error', text1: 'Error', text2: response.errorMessage });
        } else if (response.assets && response.assets.length > 0) {
            const source = { uri: response.assets[0].uri };
            setUserImage(source);
        }
    };

    const handleRegister = async () => {
        if (!nombre.trim()) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'El campo de Nombre es obligatorio' });
            return;
        }
        if (!apellido.trim()) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'El campo de Apellido es obligatorio' });
            return;
        }
        if (!numeroControl.trim()) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'El campo de Número de Control es obligatorio' });
            return;
        }
        if (!telefono.trim() || telefono.length < 10) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Ingrese un número de teléfono válido' });
            return;
        }
        if (!correo.trim() || !/\S+@\S+\.\S+/.test(correo)) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Ingrese un correo electrónico válido' });
            return;
        }
        if (!contrasena.trim() || contrasena.length < 6) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'La contraseña debe tener al menos 6 caracteres' });
            return;
        }

        const formData = new FormData();
        formData.append('Nombre', nombre);
        formData.append('Apellidos', apellido);
        formData.append('Num_Control', numeroControl);
        formData.append('Correo', correo);
        formData.append('Contrasena', contrasena);
        formData.append('Telefono', telefono);
        formData.append('Habilitado', '1');

        // Asegúrate de agregar la imagen de perfil si existe
        if (userImage) {
            const photo = {
                uri: userImage.uri,
                type: 'image/jpeg',  // o el tipo de imagen correspondiente
                name: 'profile_picture.jpg', // O el nombre dinámico
            };

            formData.append('profile_image', photo);

            try {
                const response = await fetch('http://10.0.2.2:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    Toast.show({ type: 'success', text1: 'Registro existoso', text2: data.message });
                    navigation.navigate('Login');
                } else {
                    Toast.show({ type: 'error', text1: 'Error', text2: data.message });
                }
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                Toast.show({ type: 'error', text1: 'Error', text2: 'Hubo un problema con el servidor' });
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={global.scrollContent}>
                <View style={styles.iconoContainerUser}>
                    {userImage ? (
                        <Image source={userImage} style={styles.IconoUser} />
                    ) : (
                        <Image source={iconUser} style={styles.IconoUser} />
                    )}
                    {/* Botón para tomar o seleccionar la foto */}
                    <TouchableOpacity onPress={handleSelectPhotoSource} style={styles.changePhotoButton}>
                        <Icon name="camera" size={30} />
                    </TouchableOpacity>
                </View>

                {/* Formulario de registro */}
                <View style={styles.formContainerUser}>
                    <Text style={styles.RegisterText}>Registro</Text>

                    {/* Campos de Nombre y Apellido en la misma línea */}
                    <View style={styles.rowContainer}>
                        <View style={styles.halfInputContainer}>
                            <Icon name={"person"} size={20} color="#666" style={global.icon} />
                            <TextInput
                                placeholder="Nombre"
                                style={global.input}
                                value={nombre}
                                onChangeText={setNombre}
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.halfInputContainer}>
                            <Icon name="person" size={20} color="#666" style={global.icon} />
                            <TextInput
                                placeholder="Apellido"
                                style={global.input}
                                value={apellido}
                                onChangeText={setApellido}
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    {/* Campos de Número de Control y Teléfono en la misma línea */}
                    <View style={styles.rowContainer}>
                        <View style={styles.halfInputContainer}>
                            <Icon name="badge" size={20} color="#666" style={global.icon} />
                            <TextInput
                                placeholder="Número de control"
                                style={global.input}
                                value={numeroControl}
                                onChangeText={setNumeroControl}
                                keyboardType="numeric"
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.halfInputContainer}>
                            <Icon name="phone" size={20} color="#666" style={global.icon} />
                            <TextInput
                                placeholder="Teléfono"
                                style={global.input}
                                value={telefono}
                                onChangeText={setTelefono}
                                keyboardType="phone-pad"
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    {/* Campo de Correo Electrónico */}
                    <View style={global.inputContainer}>
                        <Icon name="email" size={20} color="#666" style={global.icon} />
                        <TextInput
                            placeholder="Correo electrónico"
                            style={global.input}
                            value={correo}
                            onChangeText={setCorreo}
                            keyboardType="email-address"
                            returnKeyType="next"

                            
                        />
                    </View>

                    {/* Campo de Contraseña */}
                    <View style={global.inputContainer}>
                        <Icon name="lock" size={20} color="#666" style={global.icon} />
                        <TextInput
                            placeholder="Contraseña"
                            style={global.input}
                            value={contrasena}
                            onChangeText={setContrasena}
                            secureTextEntry={!isPasswordVisible}
                            returnKeyType="done"
                        />
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Cambiar estado
                        style={styles.passwordToggle}
                    >
                        <Icon
                            name={isPasswordVisible ? 'visibility' : 'visibility-off'} // Icono dinámico
                            style={global.icon}
                            color="#666"
                        />
                    </TouchableOpacity>
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
        

            {/* ActionSheet para elegir entre cámara o galería */}
            <ActionSheet
                ref={actionSheetRef}
                title="Elige una opción"
                options={['Tomar Foto', 'Seleccionar de Galería', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={handleActionSheet}
            />
        </View>
    );
}
