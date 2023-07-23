import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { web3WalletPair } from "../utils/WalletConnectUtils";
import Send from "../screens/send";
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    setData(data);
    // Check if the data starts with "ethereum:"
    if (data.startsWith("ethereum:")) {
      // Remove the "ethereum:" part
      data = data.slice(9);
      // Go to Send screen with the address
      console.log("Pairing successful");
      navigation.navigate('Send', { address: data });
    } else {
    web3WalletPair({ uri: data })
      .then((res) => {
        console.log("Pairing successful"), res;
      })
      .catch((err: unknown) => {
        console.log("Pairing failed", err);
      });
    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    padding: 10,
    width: "100%",
    height: "75%",
    marginTop: 50,
  },
});
