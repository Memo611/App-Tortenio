import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Screens
import Login from '../screens/Login/index'
import Home from '../screens/Home/index'
import Register from '../screens/Register/index'
import Cuenta from '../screens/Cuenta/index'
import Menu from '../screens/Menu/index'
import Notificaciones from '../screens/Notificaciones/index'
import Cart from '../screens/Carrito/index'

// Icons
const homeIcon = require('../../assets/iconos/home.png');
const notificationsIcon = require('../../assets/iconos/notifications.png');
const menuIcon = require('../../assets/iconos/Menu.png');
const cartIcon = require('../../assets/iconos/shopping_cart_checkout.png');
const iconUser = require('../../assets/iconUser.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
function MainTabs() {
    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    // Asigna las imágenes según el nombre del tab
                    if (route.name === 'Home') {
                        iconSource = homeIcon;
                    } else if (route.name === 'Notificaciones') {
                        iconSource = notificationsIcon;
                    } else if (route.name === 'Menu') {
                        iconSource = menuIcon;
                    } else if (route.name === 'Cuenta') {
                        iconSource = iconUser;
                    }

                    // Renderiza la imagen con un estilo específico
                    return (
                        <Image
                            source={iconSource}
                            style={{
                                width: size * 1.7,
                                height: size * 1.7,
                                tintColor: focused ? '#c52d09' : 'white', // Cambia el color de la imagen según el estado del tab
                                alignSelf: 'center',
                                marginTop: 20,
                            }}
                        />
                    );
                },
                tabBarActiveTintColor: '#c52d09', // Color para el ícono activo
                tabBarInactiveTintColor: 'white', // Color para el ícono inactivo
                tabBarStyle: {
                    backgroundColor: '#fd5b12', // Color de fondo naranja
                    borderTopLeftRadius: 10, // Bordes redondeados a la izquierda
                    borderTopRightRadius: 10, // Bordes redondeados a la derecha
                    height: 60, // Ajusta la altura del tab
                    paddingBottom: 0,
                    marginBottom: 0, 
                    justifyContent: 'center', 
                    elevation: 0, 
                    shadowOpacity: 0,
                    position: 'absolute',
                    left: 10,
                    right: 10,
                },
                tabBarItemStyle: {
                    marginLeft: 85,
                    justifyContent: 'center',  // Centra cada ítem verticalmente
                    alignItems: 'center',      // Centra los ítems horizontalmente
                },
                tabBarLabelStyle: { display: 'none' }, // Oculta los nombres de los tabs
            })}
        >
            <Tab.Screen name="Notificaciones" component={Notificaciones} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false,
                    tabBarButton: () => null, // Oculta Cart del menú
                }}
            />
        </Tab.Navigator>
    );
}

function ContainerRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='menu' component={Menu} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ContainerRoutes;