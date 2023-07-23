import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './dashboard';
import Pay from './pay';
import Send from './send';
import Chat from './chat';
import ParentControl from './parentControl';

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
            name="chat"
            component={Chat} />
            <Stack.Screen
            name="ParentControl"
            component={ParentControl} />
        </Stack.Navigator>
    );
  }

export default function Home() {
    return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: 'rgba(34,36,40,1)',
                    borderTopWidth: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = 'home';
                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Pay') {
                        iconName = focused ? 'barcode-scan' : 'barcode-scan';
                    } else if (route.name === 'Send') {
                        iconName = focused ? 'account-arrow-up' : 'account-arrow-up-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chat' : 'chat-outline';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={'#ddd'} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                styles
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeStack} />
            <Tab.Screen name="Pay" component={Pay} />
            <Tab.Screen name="Send" component={Send} initialParams={{ address: '0x' }}/>
            <Tab.Screen name="Chat" component={Chat} />
        </Tab.Navigator>
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A596BA',
        alignItems: 'center',
        flexDirection: 'column',
    }
});
