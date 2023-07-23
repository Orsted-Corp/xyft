import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import Scanner from "../components/scanner";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, ImageBackground } from "react-native";
import { SessionTypes, SignClientTypes } from "@walletconnect/types";
import useInitialization, {
  currentETHAddress,
  web3wallet,
} from "../utils/WalletConnectUtils";
import { getSdkError } from "@walletconnect/utils";
import { SIGNING_METHODS } from "../utils/WalletLib";
import { Client, Presets } from "userop";
import { formatJsonRpcResult } from "@json-rpc-tools/utils";
import { ethers, providers } from "ethers";
import { id } from "ethers/lib/utils";
import config from "../../config.json";
import axios from "axios";
import { useMyContext } from "../utils/context";

const Pay: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const { accountDetails } = useMyContext();
  const [requestProcessing, setRequestProcessing] = useState(false);
  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments["session_request"]) => {
      console.log("req");
      const det = JSON.parse(JSON.stringify(accountDetails));
      const { topic, params, id } = requestEvent;
      console.log(topic);
      const { request } = params;
      setRequestProcessing(true);
      if (requestProcessing) return;
      switch (request.method) {
        case SIGNING_METHODS.ETH_SEND_TRANSACTION:
          try {
            const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
              config.paymaster.rpcUrl,
              config.paymaster.context
            );
            console.log("paymasterMiddleware", paymasterMiddleware);
            const simpleAccount = await Presets.Builder.Kernel.init(
              new ethers.Wallet(config.key),
              config.rpcUrl,
              { paymasterMiddleware }
            );
            const client = await Client.init(config.rpcUrl);
            const sendTransaction: providers.TransactionRequest =
              request.params[0];

            console.log("sd", sendTransaction);
            const value = sendTransaction.value || 0;

            const res = await client.sendUserOperation(
              simpleAccount.execute({
                to: sendTransaction.to as string,
                value: 0,
                data: sendTransaction.data as string,
              }),
              {}
            );
            console.log("Waiting for transaction...");
            const ev = await res.wait();
            console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
            const response = formatJsonRpcResult(id, ev?.transactionHash);
            console.log(response);
            console.log(topic);
            try {
              await web3wallet.respondSessionRequest({
                topic,
                response,
              });
              setRequestProcessing(false);

              // Transaction successful notification
              const notif = {
                notifTitle: "Transaction successful",
                notifBody: `Transaction hash: ${ev?.transactionHash ?? null}`,
              }

              const url = "http://20.127.16.238:3000/push"

              try {
                const response = await axios.post(url, notif);
        
                // Assuming the server returns a JSON response
                const responseData = response.data;
                console.log('Response Data:', responseData);
              } catch (error) {
                // Handle errors
                console.error('Error:', error);
              }

            } catch (err) {
              console.log(err);
            }
          } catch (err) {
            console.log(err);
            web3wallet
              .respondSessionRequest({
                topic,
                response: formatJsonRpcResult(id, null),
              })
              .then(() => {
                console.log("Session failed");
              })
              .catch((err) => {
                console.log(err);
              });
          }
          return;
        default:
          console.log(request.method);
          console.log(request);
      }
    },
    []
  );

  const handleTextChange = (text: string) => {
    setInputText(text);
  };
  const [currentWCURI, setCurrentWCURI] = useState("");
  const [currentProposal, setCurrentProposal] = useState<any>();
  const [successfulSession, setSuccessfulSession] = useState(false);

  useEffect(() => {
    web3wallet?.on("session_proposal", onSessionProposal);
    web3wallet?.on("session_request", onSessionRequest);
    web3wallet?.on("session_delete", onSessionDisconnect);
  }, []);

  const onSessionProposal = useCallback(
    async (proposal: SignClientTypes.EventArguments["session_proposal"]) => {
      console.log("prop");
      console.log(proposal);
      setCurrentProposal(proposal);
    },
    []
  );

  const onSessionDisconnect = useCallback(
    async (proposal: SignClientTypes.EventArguments["session_delete"]) => {
      const activeSessions = await web3wallet.getActiveSessions();
      console.log(activeSessions);
      Object.values(activeSessions).forEach(async (session) => {
        await web3wallet.disconnectSession({
          topic: session.topic,
          reason: getSdkError("USER_DISCONNECTED"),
        });
      });
    },
    []
  );

  useEffect(() => {
    if (currentProposal) handleAccept();
  }, [currentProposal]);

  async function handleAccept() {
    const { topic, id, params } = currentProposal;
    const { requiredNamespaces, optionalNamespaces, relays } = params;

    if (currentProposal) {
      console.log(currentProposal);
      const namespaces: SessionTypes.Namespaces = {};
      Object.keys(requiredNamespaces).forEach((key) => {
        const accounts: string[] = [];
        requiredNamespaces[key].chains.map((chain: any) => {
          [currentETHAddress].map((acc) => accounts.push(`${chain}:${acc}`));
        });
        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });
      Object.keys(optionalNamespaces).forEach((key) => {
        const accounts: string[] = [];
        optionalNamespaces[key].chains.map((chain: any) => {
          [currentETHAddress].map((acc) => accounts.push(`${chain}:${acc}`));
        });
        namespaces[key] = {
          accounts,
          methods: optionalNamespaces[key].methods,
          events: optionalNamespaces[key].events,
        };
      });
      console.log(namespaces);
      console.log(relays);
      await web3wallet.approveSession({
        id: id,
        namespaces: namespaces,
      });
      console.log(namespaces);

      setCurrentWCURI("");
      setCurrentProposal(undefined);
      setSuccessfulSession(true);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.container}>
        <Scanner />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#111",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    paddingLeft: 10,
    marginTop: "10%",
  },
  button: {
    marginTop: "10%",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Pay;
