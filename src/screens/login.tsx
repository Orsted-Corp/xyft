import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useMyContext } from "../utils/context";
import Home from "./home";
import { ethers } from "ethers";

import RPC from "../utils/ethersRPC"; // for using ethers.js
import { getWallet } from "../utils/Wallet";

const resolvedRedirectUrl =
  Constants.appOwnership === AppOwnership.Expo ||
  Constants.appOwnership === AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

const clientId =
  "BIUZyts5pQ2QwwXjyeVu5OiosyboSvJ6mTFFNTQh6Kge3sjd5OVey_i0Y2XE2XomTSMW1y58vJnXTOggM2rO1dQ";

const LoginScreen: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>("");
  const [console, setConsole] = useState<string>("");
  const { accountDetails, setAccountDetails } = useMyContext();
  const { publicKey, setPublicKey } = useMyContext();

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
      setAccountDetails(info);
      const privateKey = info.privKey;
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/polygon"
      );
      const signer = wallet.connect(provider);
      setPublicKey(await getWallet(privateKey));
      info;
    } catch (e) {
      setConsole("Error: " + e);
    }
  };

  const loggedInView = <Home />;

  const unloggedInView = (
    <ImageBackground
      style={styles.container}
      source={require("../assets/background.png")}
    >
      <View style={styles.buttonArea}>
        <Image source={require("../assets/circle.png")} style={styles.circle} />
        <Text style={styles.title}>Xyft</Text>
        <View style={styles.button}>
          <Button title="Login" onPress={login} color={"#ddd"} />
        </View>
      </View>
    </ImageBackground>
  );

  return key ? loggedInView : unloggedInView;
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
  circle: {
    alignContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 50,
    color: "#ddd",
    fontFamily: "AppleSDGothicNeo-Light",
    fontWeight: "100",
  },
  button: {
    backgroundColor: "#6100FF",
    width: 300,
    borderRadius: 10,
  },
});

export default LoginScreen;
