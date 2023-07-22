import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMyContext } from "../utils/context";
import Home from "./home";

import RPC from "../utils/ethersRPC"; // for using ethers.js

const resolvedRedirectUrl =
  Constants.appOwnership === AppOwnership.Expo || Constants.appOwnership === AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

const clientId = "BIUZyts5pQ2QwwXjyeVu5OiosyboSvJ6mTFFNTQh6Kge3sjd5OVey_i0Y2XE2XomTSMW1y58vJnXTOggM2rO1dQ";

const LoginScreen: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>("");
  const [console, setConsole] = useState<string>("");
  const { sharedValue, setSharedValue } = useMyContext();

  const login = async () => {
    try {
      setConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: "none",
        curve: "secp256k1",
      });

      setUserInfo(info);
      setKey(info.privKey);
      setSharedValue(info.privKey);
    } catch (e) {
      setConsole("Error: " + e);
    }   
  };

  const loggedInView = (
    <Home />
  );

  const unloggedInView = (
      <View style={styles.buttonArea}>
        <Button title="Login with Web3Auth" onPress={login} />
      </View>
  );

  return (
      key ? loggedInView : unloggedInView
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },
  consoleArea: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    color: "#ffffff",
    padding: 10,
    width: Dimensions.get("window").width - 60,
  },
  consoleText: {
    padding: 10,
  },
  buttonArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 30,
  },
});

export default LoginScreen;
