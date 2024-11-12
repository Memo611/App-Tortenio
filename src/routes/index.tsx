import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Notificaciones" component={Notificaciones} options={{ headerShown: false }} />
            <Tab.Screen name='Menu' component={Menu} options={{ headerShown:false }} />
            <Tab.Screen name='Carrito' component={Carrito} options={{ headerShown:false }} />
        </Tab.Navigator>
    );
}
function ContainerRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ContainerRoutes;