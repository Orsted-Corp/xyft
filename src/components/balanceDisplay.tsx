import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Balance</Text>
      <Text style={styles.balanceAmount}>{balance.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
});

export default BalanceDisplay;
