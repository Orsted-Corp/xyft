import { registerRootComponent } from "expo";

import App from "./App";
import "./shim.js";
import "@walletconnect/react-native-compat"

registerRootComponent(App);