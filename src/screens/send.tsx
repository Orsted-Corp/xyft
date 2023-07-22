import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Send = () => {
  // State variables for the input field and dropdowns
  const [inputValue, setInputValue] = useState('');
  const [value1, setValue1] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [items1, setItems1] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

  // Handler for the button press
  const handleButtonPress = () => {
    // Do something with the form values, for example, handle form submission
    console.log('Input Value:', inputValue);
    console.log('Dropdown 1 Value:', value1);
    console.log('Dropdown 2 Value:', value2);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Input field */}
      <TextInput
        placeholder="Enter something..."
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        style={{ width: '80%', height: 40, borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      {/* Dropdown 1 */}
      <View style={{ width: '80%', height: 40, marginTop: 10, zIndex: 10 }}>
        <DropDownPicker
            open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
        />
      </View>

      {/* Dropdown 2 */}
      <View style={{ width: '80%', height: 40, marginTop: 50, zIndex: 5 }}>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
        />
      </View>

      {/* Button */}
      <View style={{ marginTop: 100 }}>
      <Button title="Submit" onPress={handleButtonPress} />
      </View>
    </View>
  );
};

export default Send;
