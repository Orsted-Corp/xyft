import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/header';
import BalanceDisplay from '../components/balanceDisplay';

export default function Dashboard() {
    return (
        <View style={styles.container}>
        <Header
            profilePicture="https://avatars.githubusercontent.com/u/1024025?v=4"
            name="John Doe"
            notificationCount={3}
            onPressNotification={() => console.log('Notification pressed')}
        />
        <BalanceDisplay balance={100} />
        <Text>Dashboard</Text>
        <StatusBar style="auto" />
        </View>
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
