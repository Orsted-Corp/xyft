import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import Scanner from '../components/scanner';
import React, { useState } from 'react';
import { Platform } from 'react-native';

const Pay: React.FC = () => {
  const [inputText, setInputText] = useState('');

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.container}>
        <Scanner />
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          keyboardType="ascii-capable"
          onChangeText={handleTextChange}
          value={inputText}
        />
        <Button title="Pay" onPress={() => {console.log('Pay')}} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingLeft: 10,
    marginTop: '10%',
  },
  button: {
    marginTop: '10%',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Pay;
