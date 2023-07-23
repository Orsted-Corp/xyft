import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';

const ParentControl = () => {

  const handleButtonPress1 = () => {
    axios.get('http://20.127.16.238:5555/createSafe')
  };

  const handleButtonPress2 = () => {
    axios.get('http://20.127.16.238:5555/addMoneyToSafe')
  };

  const handleButtonPress3 = () => {
    axios.get('http://20.127.16.238:5555/proposeTransaction')
  };

  const handleButtonPress4 = () => {
    axios.get('http://20.127.16.238:5555/confirmTransaction')
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/background.png")}
    >
    <View style={styles.button}>
      <Button title="Create Parental Crontol" onPress={handleButtonPress1} color={'#ddd'}/>
    </View>
    <View style={styles.button}>
      <Button title="Fill up" onPress={handleButtonPress2} color={'#ddd'}/>
    </View>
    <View style={styles.button}>
      <Button title="Request" onPress={handleButtonPress3} color={'#ddd'}/>
    </View>
    <View style={styles.button}>
      <Button title="Accept Request" onPress={handleButtonPress4} color={'#ddd'}/>
    </View>
    </ImageBackground>
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
  button: {
    backgroundColor: "#6100FF",
    width: 300,
    borderRadius: 10,
    marginTop: 30,
  }
});

export default ParentControl;
