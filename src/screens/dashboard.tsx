import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/header';
import BalanceDisplay from '../components/balanceDisplay';
import RecentTransactions from '../components/recentTransactions';

const recentTransactions = [
    {
      id: '1',
      title: 'Groceries',
      amount: -45.99,
      date: '2023-07-20',
      image: require('../assets/download.png'),
    },
    {
      id: '2',
      title: 'Salary',
      amount: 2000,
      date: '2023-07-19',
      image: require('../assets/download.png'),
    },
    // Add more transactions here
  ];

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
        <RecentTransactions transactions={recentTransactions} />
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
