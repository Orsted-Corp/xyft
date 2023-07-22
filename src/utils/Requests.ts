import { CHAINS, SIGNING_METHODS, Chain } from "./WalletLib";
import { ethers } from "ethers";
import { Client, Presets } from "userop";
import { getWallet } from "./Wallet";
// @ts-ignore
import config from "../../config.json";
import { formatJsonRpcError, formatJsonRpcResult } from "@json-rpc-tools/utils";
import { SignClientTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import { providers } from "ethers";
import { currentETHAddress, web3wallet } from "./WalletConnectUtils";
import { useCallback } from "react";

export function rejectEIP155Request(
  request: SignClientTypes.EventArguments["session_request"]
) {
  const { id } = request;

  return formatJsonRpcError(id, getSdkError("USER_REJECTED_METHODS").message);
}
