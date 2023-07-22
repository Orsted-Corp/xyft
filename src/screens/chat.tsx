import React, { useState } from "react";
import { View, TextInput, FlatList, StyleSheet, Text, Button, KeyboardAvoidingView, Platform } from "react-native";

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
    <View style={styles.entire}>
    <View style={styles.contain}>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button title="Set" onPress={handleButtonClick} />
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
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input2}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          onSubmitEditing={handleSendMessage}
        />
      </View>
    </View>
    </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "80%",
  },
  input2: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: '10%',
    justifyContent: 'space-around'
  },
  entire: {
    flex: 1,
    flexDirection: 'column',
  }
});

export default Chat;
