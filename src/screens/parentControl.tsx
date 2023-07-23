import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ParentControl = () => {
  const [textInputValue, setTextInputValue] = useState('');

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
  };

  const handleButtonPress = () => {
    // Do something with the text input value
    if (textInputValue) {
      Alert.alert('Input Value', `You entered: ${textInputValue}`);
    } else {
      Alert.alert('Error', 'Please enter some text.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={textInputValue}
        onChangeText={handleTextInputChange}
        placeholder="Enter text..."
      />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ParentControl;
