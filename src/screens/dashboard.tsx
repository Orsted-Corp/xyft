import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/header';
import BalanceDisplay from '../components/balanceDisplay';
import RecentTransactions from '../components/recentTransactions';
import { useEffect } from 'react';
import useInitialization from '../utils/WalletConnectUtils';

const recentTransactions = [
    {
      id: '1',
      title: 'Groceries',
      amount: -45.99,
      date: '2023-07-20',
      image: require('../assets/download.png'),
      address: '0x1234567890123456789012345678901234567890',
    },
    {
      id: '2',
      title: 'Salary',
      amount: 2000,
      date: '2023-07-19',
      image: require('../assets/download.png'),
        address: '0x1234567890123456789012345678901234567890',
    },
    // Add more transactions here
  ];

export default function Dashboard() {
  const initialized = useInitialization()
    return (
        <View style={styles.container}>
        <Header />
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
