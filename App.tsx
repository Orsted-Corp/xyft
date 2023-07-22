import "./shim.js";
import { polyfillWebCrypto } from "expo-standard-web-crypto";
import LoginScreen from "./src/screens/login";
import { MyContextProvider } from "./src/utils/context";

polyfillWebCrypto();

export default function App() {
  return (
    <MyContextProvider>
      <LoginScreen />
    </MyContextProvider>
  );
}
