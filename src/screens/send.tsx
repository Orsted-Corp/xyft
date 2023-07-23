import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import tokens from "../constants/tokens.json";
import {
  getTxData,
  sendTokens,
  sendTokensSame,
} from "../utils/contractInteract";
import { useMyContext } from "../utils/context";

type Props = {
  route: { params: { address: string } };
};

const Send: React.FC<Props> = ({ route }) => {
  let { address } = route.params;
  // State variables for the input field and dropdowns
  const { accountDetails } = useMyContext();

  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState("");

  const [value1, setValue1] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [items1, setItems1] = useState([
    { label: "USDC", value: tokens.wrapped.bsct.USDC },
  ]);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Polygon", value: "80001" },
    { label: "Binance", value: "97" },
  ]);

  // Handler for the button press
  const handleButtonPress = () => {
    // Do something with the form values, for example, handle form submission
    console.log("Input Value:", inputValue);
    console.log("Dropdown 1 Value:", value1);
    console.log("Dropdown 2 Value:", value2);
    const details = JSON.parse(JSON.stringify(accountDetails));
    console.log(getTxData(amount, inputValue, 97));
    if (value2 == "80001") {
      sendTokensSame(inputValue, amount, "0x" + details.privKey);
    } else
      sendTokens(inputValue, amount, 97, "0x" + details.privKey)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  console.log(address);

  useEffect(() => {
    setInputValue(address);
  }, [address]);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/background.png")}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Input field */}
        <Text style={styles.titles}>Address</Text>
        <TextInput
          defaultValue={inputValue}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          style={styles.textInput}
        />
        <Text style={styles.titles}>Amount</Text>
        <TextInput
          defaultValue={amount}
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={styles.textInput}
        />

        <Text style={styles.titles}>Token</Text>
        <View style={styles.dropdown1}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
          />
        </View>

        <Text style={styles.titles}>Chain</Text>
        <View style={styles.dropdown2}>
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
        <View style={styles.button}>
          <Button title="Submit" onPress={handleButtonPress} color={"#ddd"} />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  textInput: {
    width: 325,
    height: 45,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
  dropdown1: {
    height: 40,
    marginTop: 20,
    zIndex: 10,
    width: 325,
    marginBottom: 20,
  },
  dropdown2: {
    height: 40,
    marginTop: 20,
    zIndex: 5,
    width: 325,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6100FF",
    width: 325,
    borderRadius: 10,
    marginTop: 60,
  },
  titles: {
    color: "#ddd",
    marginTop: 10,
    fontSize: 16,
  },
});

export default Send;
