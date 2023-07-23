import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, Text, Button, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";

interface Message {
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  const handleButtonClick = () => {
    // Do something with the input value, for example, update a state variable
    console.log('Input Value:', inputValue);
    // You can set the state variable to 'inputValue' here or use it as needed.
  };


  return (
    <ImageBackground style={styles.container} source={require('../assets/background.png')}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
    <View style={styles.entire}>
    <View style={styles.contain}>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        placeholderTextColor={'#aaa'}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <View style={styles.button}>
      <Button title="Set" onPress={handleButtonClick} color={'#ddd'}/>
      </View>
    </View>
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === "user" ? styles.userMessage : styles.otherMessage
            }
          >
            <Text style={{ color: '#ddd' }} >{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input2}
          placeholder="Type your message..."
          placeholderTextColor={'#aaa'}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          onSubmitEditing={handleSendMessage}
        />
      </View>
    </View>
    </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
    color: '#fff'
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#0a256b",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
    color: '#fff'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0)',
    padding: 10,

  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "80%",
    color: '#ddd',
  },
  input2: {
    height: 40,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    color: '#ddd'
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: '10%',
    justifyContent: 'space-around'
  },
  entire: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#6100FF',
    borderRadius: 10,
  }
});

export default Chat;
