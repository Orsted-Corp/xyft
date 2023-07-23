import "./shim.js";
import { polyfillWebCrypto } from "expo-standard-web-crypto";
import LoginScreen from "./src/screens/login";
import { MyContextProvider } from "./src/utils/context";
import { StyleSheet, View, ImageBackground } from 'react-native'

polyfillWebCrypto();

export default function App() {
  return (
    <MyContextProvider>
      <LoginScreen />
    </MyContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
})

export default App;