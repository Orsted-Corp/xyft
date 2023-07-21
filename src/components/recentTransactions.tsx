import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  image: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Image
            source={item.image}
            style={styles.txnPicture}
        />
      <Text style={styles.transactionTitle}>{item.title}</Text>
      <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    width: '90%',
    height: '55%',
    marginTop: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 14,
    color: 'green',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
    txnPicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 20,
    },
});

export default RecentTransactions;
