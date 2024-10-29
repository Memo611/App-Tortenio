import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Login from '../screens/Login/index'
import Home from '../screens/Home/index'
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

function ContainerRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ContainerRoutes;