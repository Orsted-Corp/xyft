import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './dashboard';
import Pay from './pay';
import Send from './send';
import LoginScreen from './login/login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{headerShown: false}}
          >
          <Stack.Screen
            name="Dashboard"
            component={Dashboard} />
          <Stack.Screen
            name="Pay"
            component={Pay} />
            <Stack.Screen
            name="send"
            component={Send} />
            <Stack.Screen
            name="Login"
            component={LoginScreen} />
        </Stack.Navigator>
    );
  }

export default function Home() {
    return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = 'home';
                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Pay') {
                        iconName = focused ? 'account' : 'account-outline';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeStack} />
            <Tab.Screen name="Pay" component={Pay} />
            <Tab.Screen name="Send" component={Send} />
            <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        alignItems: 'center',
        flexDirection: 'column',
    }
});
