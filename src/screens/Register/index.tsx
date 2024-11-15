import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import styles from './RegisterStyles';
import global from '../../Styles/Styles';

const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

export default function Register({ navigation }) {
    // Estado para almacenar la imagen de perfil seleccionada por el usuario
    const [userImage, setUserImage] = useState(null);

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
    const handleRegister = async () => {
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
            const response = await fetch('http://192.168.100.104:3000/register', { // Reemplaza 192.168.x.x con la IP local de tu máquina
                method: 'POST',
                headers: {
                'Content-Type': 'multipart/form-data', // Cambiar a multipart para enviar archivos
            },
            body: formData,
        });

        const data = await response.json();
        
        if (response.ok) {
            Alert.alert('Éxito', data.message);
            navigation.navigate('Login');
        } else {
            Alert.alert('Error', data.message);
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        Alert.alert('Error', 'Hubo un problema con el servidor');
    }
};
    };

    return (
        <ScrollView contentContainerStyle={global.scrollContent}>

            {/* Imagen de perfil del usuario */}
            <View style={styles.iconoContainerUser}>
                {userImage ? (
                    <Image source={userImage} style={styles.IconoUser} />
                ) : (
                    <Image source={iconUser} style={styles.IconoUser} />
                )}
                {/* Botón para cambiar la foto de perfil */}
                <TouchableOpacity onPress={handleChangePhoto} style={styles.changePhotoButton}>
                    <Icon name="edit" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* Formulario de registro */}
            <View style={styles.formContainerUser}>
                <Text style={styles.RegisterText}>Registro</Text>

                {/* Campos de Nombre y Apellido en la misma línea */}
                <View style={styles.rowContainer}>
                    <View style={styles.halfInputContainer}>
                        <Icon name="person" size={20} color="#666" style={global.icon} />
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
                            placeholder="Número de Control"
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
                        secureTextEntry={true}
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
