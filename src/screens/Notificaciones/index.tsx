import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../../context/CartContext'; // Importar el contexto

const NotificationScreen = () => {
    const { notifications } = useContext(CartContext); // Obtener las notificaciones del contexto
    const statusIcons = {
        'Orden Aceptada': 'check-circle',
        'En Preparación': 'hourglass-empty',
        'Pedido Listo': 'check-circle-outline',
    };
    // Verifica el valor de statusIcon
    const renderNotification = ({ item }) => (

        <View style={styles.notificationCard}>
            <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
            <Text style={styles.notificationDescription}>{item.productDetails}</Text>
            <View style={styles.notificationFooter}>
                <Text style={styles.notificationDescription}>{item.status}</Text>
                <MaterialIcons
                    name={statusIcons[item.status] || 'help-outline'} // Usa 'help-outline' como fallback
                    size={24}
                    color="black"
                />
            </View>
            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${item.progress}%` }]} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>TORTENIO</Text>
            </View>
            <Text style={styles.sectionTitle}>Notificaciones</Text>
            {notifications.length === 0 ? (
                <Text style={styles.noNotifications}>No tienes notificaciones aún.</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNotification}
                    contentContainerStyle={styles.notificationList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#D64619',
        padding: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
        marginLeft: 15,
    },
    notificationList: {
        paddingHorizontal: 15,
    },
    notificationCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    notificationTime: {
        fontSize: 14,
        color: '#666',
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    notificationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    noNotifications: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        fontSize: 16,
    },
    orderNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    progressBar: {
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginTop: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#D64619',
    },
    payButton: {
        backgroundColor: '#D64619',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 20,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
