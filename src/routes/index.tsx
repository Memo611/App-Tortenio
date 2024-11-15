import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
//Screens
import Login from '../screens/Login/index'
import Home from '../screens/Home/index'
import Register from '../screens/Register/index'
import Cuenta from '../screens/Cuenta/index'
import Menu from '../screens/Menu/index'
import Notificaciones from '../screens/Notificaciones/index'
import Carrito from '../screens/Carrito/index'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    // Define el icono para cada tab
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Notificaciones') {
                        iconName = 'notifications';
                    } else if (route.name === 'Menu') {
                        iconName = 'menu';
                    } else if (route.name === 'Carrito') {
                        iconName = 'shopping-cart';
                    }

                    // Retorna el icono de MaterialIcons con el color y tamaño definidos
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'white', // Color para el ícono activo
                tabBarInactiveTintColor: 'white', // Color para el ícono inactivo
                tabBarStyle: {
                    backgroundColor: '#fd5b12', // Color de fondo naranja
                    borderTopLeftRadius: 10, // Bordes redondeados a la izquierda
                    borderTopRightRadius: 10, // Bordes redondeados a la derecha
                    height: 60, // Ajusta la altura del tab
                    position: 'absolute',
                    left: 10,
                    right: 10,
                },
                tabBarLabelStyle: { display: 'none' }, // Oculta los nombres de los tabs
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Notificaciones" component={Notificaciones} options={{ headerShown: false }} />
            <Tab.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Tab.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

function ContainerRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='Cuenta'component={Cuenta} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ContainerRoutes;