import Home from "./src/screens/home";
import "./shim.js";
import { polyfillWebCrypto } from "expo-standard-web-crypto";

polyfillWebCrypto();

export default function App() {
  return (
    <Home />
  );
}
