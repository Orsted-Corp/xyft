import {
  CHAINS,
  SIGNING_METHODS,
  Chain,
} from "./WalletLib";
import { ethers } from "ethers";
import { Client, Presets } from "userop";
import { getWallet } from "./Wallet";
// @ts-ignore
import config from "../../config.json";
import { formatJsonRpcError, formatJsonRpcResult } from "@json-rpc-tools/utils";
import { SignClientTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import { providers } from "ethers";
import { currentETHAddress } from "./WalletConnectUtils";

export async function approveEIP155Request(
  requestEvent: SignClientTypes.EventArguments["session_request"]
) {
  const { params, id } = requestEvent;
  const { chainId, request } = params;
  const wallet = getWallet(CHAINS[chainId as Chain].rpc);

  switch (request.method) {
    case SIGNING_METHODS.PERSONAL_SIGN:
    case SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:

    case SIGNING_METHODS.ETH_SEND_TRANSACTION:
      const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
      );
      const simpleAccount = await Presets.Builder.SimpleAccount.init(
        new ethers.Wallet(config.signingKey),
        config.rpcUrl,
        { paymasterMiddleware }
      );
      const client = await Client.init(config.rpcUrl);
      const sendTransaction: providers.TransactionRequest = request.params[0];
      const res = await client.sendUserOperation(
        simpleAccount.execute(
          sendTransaction.to as string,
          sendTransaction.value as ethers.BigNumberish,
          sendTransaction.data as string
        )
      );

      console.log("Waiting for transaction...");
      const ev = await res.wait();
      console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
      return formatJsonRpcResult(id, ev?.transactionHash);

    // case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
    //   const signTransaction = request.params[0];
    //   const signature = await wallet.signTransaction(signTransaction);
    //   return formatJsonRpcResult(id, signature);

    default:
      throw new Error(getSdkError("INVALID_METHOD").message);
  }
}

export function rejectEIP155Request(
  request: SignClientTypes.EventArguments["session_request"]
) {
  const { id } = request;

  return formatJsonRpcError(id, getSdkError("USER_REJECTED_METHODS").message);
}
