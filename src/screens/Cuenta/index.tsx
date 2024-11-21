import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import styles from './CuentaStyles';
import global from '../../Styles/Styles';
import Toast from 'react-native-toast-message';

const logo = require('../../../assets/logo.jpg');
const iconUser = require('../../../assets/iconUser.png');

export default function Cuenta({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const actionSheetRef = useRef();

    useEffect(() => {
        // Simula la obtención de datos de la base de datos (backend)
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://10.0.2.2:3000/user/profile'); // Cambia la URL por la de tu backend
                const data = await response.json();

                if (response.ok) {
                    setUserData(data);
                    setUserImage({ uri: data.profile_image }); // Imagen de perfil desde el servidor
                } else {
                    Toast.show({ type: 'error', text1: 'Error', text2: data.message });
                }
            } catch (error) {
                Toast.show({ type: 'error', text1: 'Error', text2: 'Hubo un problema con el servidor' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleSelectPhotoSource = () => {
        actionSheetRef.current?.show();
    };

    const handleActionSheet = (index) => {
        if (index === 0) {
            launchCamera({ mediaType: 'photo', quality: 1.0 }, (response) => handleImageResponse(response));
        } else if (index === 1) {
            launchImageLibrary({ mediaType: 'photo', quality: 1.0 }, (response) => handleImageResponse(response));
        }
    };

    const handleImageResponse = (response) => {
        if (response.didCancel) {
            Toast.show({ type: 'info', text1: 'Cancelado', text2: 'No se seleccionó ninguna imagen' });
        } else if (response.errorMessage) {
            Toast.show({ type: 'error', text1: 'Error', text2: response.errorMessage });
        } else if (response.assets && response.assets.length > 0) {
            const source = { uri: response.assets[0].uri };
            setUserImage(source);
        }
    };

    const handleSaveChanges = async () => {
        const updatedData = { ...userData };
        if (userImage) {
            updatedData.profile_image = userImage.uri;
        }

        try {
            const response = await fetch('http://10.0.2.2:3000/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();

            if (response.ok) {
                Toast.show({ type: 'success', text1: 'Perfil actualizado', text2: data.message });
                setIsEditing(false);
            } else {
                Toast.show({ type: 'error', text1: 'Error', text2: data.message });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Hubo un problema con el servidor' });
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Cargando perfil...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={global.scrollContent}>
                <View style={styles.iconoContainerUser}>
                    {userImage ? (
                        <Image source={userImage} style={styles.IconoUser} />
                    ) : (
                        <Image source={iconUser} style={styles.IconoUser} />
                    )}
                    <TouchableOpacity onPress={handleSelectPhotoSource} style={styles.changePhotoButton}>
                        <Icon name="camera" size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainerUser}>
                    <Text style={styles.RegisterText}>Mi Cuenta</Text>

                    {/* Formulario de perfil */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={global.input}
                            value={userData?.nombre || ''}
                            editable={isEditing}
                            onChangeText={(text) => setUserData({ ...userData, nombre: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Apellido</Text>
                        <TextInput
                            style={global.input}
                            value={userData?.apellido || ''}
                            editable={isEditing}
                            onChangeText={(text) => setUserData({ ...userData, apellido: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Número de Control</Text>
                        <TextInput
                            style={global.input}
                            value={userData?.numeroControl || ''}
                            editable={isEditing}
                            keyboardType="numeric"
                            onChangeText={(text) => setUserData({ ...userData, numeroControl: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={global.input}
                            value={userData?.telefono || ''}
                            editable={isEditing}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setUserData({ ...userData, telefono: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo</Text>
                        <TextInput
                            style={global.input}
                            value={userData?.correo || ''}
                            editable={isEditing}
                            keyboardType="email-address"
                            onChangeText={(text) => setUserData({ ...userData, correo: text })}
                        />
                    </View>

                    {/* Botones de acciones */}
                    <View style={styles.rowContainer}>
                        {!isEditing ? (
                            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                                <Text style={styles.editButtonText}>Editar</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Guardar</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

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
