import "@walletconnect/react-native-compat";
import "@ethersproject/shims";

import { Core } from "@walletconnect/core";
import { ICore } from "@walletconnect/types";
import { Web3Wallet, IWeb3Wallet } from "@walletconnect/web3wallet";
import config from "../../config.json";
export let web3wallet: IWeb3Wallet;
export let core: ICore;
export let currentETHAddress: string;

import { useState, useCallback, useEffect } from "react";
import { getWallet } from "./Wallet";

async function createWeb3Wallet() {
  console.log("Initializing wallet")
  currentETHAddress = await getWallet(config.rpcUrl);

  console.log(currentETHAddress);
  console.log(config.walletConnectProjectId);
  const core = new Core({
    projectId: config.walletConnectProjectId,
  });

  web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: "Xyft Wallet",
      description: "Xyft AA Web3Wallet",
      url: "https://walletconnect.com/",
      icons: ["https://avatars.githubusercontent.com/u/37784886"],
    },
  });
}

// Initialize the Web3Wallet
export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet();
      setInitialized(true);
    } catch (err: unknown) {
      console.log("Error for initializing", err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  return initialized;
}

export async function web3WalletPair(params: { uri: string }) {
  return await web3wallet.core.pairing.pair({ uri: params.uri });
}
