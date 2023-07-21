import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/header';
import BalanceDisplay from '../components/balanceDisplay';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
    return (
        <LinearGradient 
            colors={['#5700E4', 'black']}
            start={[0, 0]}
            end={[0.5, 0.5]}
            style={styles.container}>
        <Header
            profilePicture="https://avatars.githubusercontent.com/u/1024025?v=4"
            name="John Doe"
            notificationCount={3}
            onPressNotification={() => console.log('Notification pressed')}
        />
        <BalanceDisplay balance={100} />
        <Text>Dashboard</Text>
        <StatusBar style="auto" />
        </LinearGradient>
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
