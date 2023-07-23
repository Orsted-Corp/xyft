import AsyncStorage from "@react-native-async-storage/async-storage";
import { ethers } from "ethers";
import { Presets } from "userop";
import config from "../../config.json";

/**
 * Utilities
 */
export const setLocalStorage = async (pk: string) => {
  try {
    const value = await AsyncStorage.setItem("SIGNING_KEY", pk);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("setLocalStorage Error:", e);
  }
};

export const getLocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem("SIGNING_KEY");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("getLocalStorage Error:", e);
  }
};

// Function to create or restore a wallet
export async function getWallet(key: string) {
  // let pk = await getLocalStorage();
  const simpleAccount = await Presets.Builder.Kernel.init(
    new ethers.Wallet("0x" + key),
    config.rpcUrl
  );
  const address = simpleAccount.getSender();
  return address;
}
