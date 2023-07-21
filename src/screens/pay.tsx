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
import { Platform } from "react-native";
import { SessionTypes, SignClientTypes } from "@walletconnect/types";
import { currentETHAddress, web3wallet } from "../utils/WalletConnectUtils";
import { getSdkError } from "@walletconnect/utils";

const Pay: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleTextChange = (text: string) => {
    setInputText(text);
  };
  const [currentWCURI, setCurrentWCURI] = useState("");
  const [currentProposal, setCurrentProposal] = useState<any>();
  const [successfulSession, setSuccessfulSession] = useState(false);

  useEffect(() => {
    web3wallet?.on("session_proposal", onSessionProposal);
    // web3wallet?.on("session_request", onSessionRequest);
  }, [
    // pair,
    handleAccept,
    // handleReject,
    currentETHAddress,
    // onSessionRequest,
    // onSessionProposal,
    successfulSession,
  ]);

  const onSessionProposal = useCallback(
    async (proposal: SignClientTypes.EventArguments["session_proposal"]) => {
      setCurrentProposal(proposal);
    },
    []
  );

  useEffect(() => {
    if (currentProposal) handleAccept();
  }, [currentProposal]);

  async function handleAccept() {
    const { id, params } = currentProposal;
    const { requiredNamespaces, relays } = params;

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
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          keyboardType="ascii-capable"
          onChangeText={handleTextChange}
          value={inputText}
        />
        <Button
          title="Pay"
          onPress={() => {
            console.log("Pay");
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
