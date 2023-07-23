import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/header";
import BalanceDisplay from "../components/balanceDisplay";
import RecentTransactions from "../components/recentTransactions";
import { useCallback, useEffect, useState } from "react";
import useInitialization, {
  createWeb3Wallet,
} from "../utils/WalletConnectUtils";
import { useMyContext } from "../utils/context";
import { getWallet } from "../utils/Wallet";
import { getBalance } from "../utils/contractInteract";

const recentTransactions = [
  {
    id: "1",
    title: "Groceries",
    amount: -45.99,
    date: "2023-07-20",
    image: require("../assets/download.png"),
    address: "0x1234567890123456789012345678901234567890",
  },
  {
    id: "2",
    title: "Salary",
    amount: 2000,
    date: "2023-07-19",
    image: require("../assets/download.png"),
    address: "0x1234567890123456789012345678901234567890",
  },
  // Add more transactions here
];

export default function Dashboard() {
  const { accountDetails } = useMyContext();
  const [initialized, setInitialized] = useState(false);
  const [details, setDetails] = useState<any>(undefined);

  const onInitialize = useCallback(async () => {
    try {
      await createWeb3Wallet(details.privKey);
      setInitialized(true);
    } catch (err: unknown) {
      console.log("Error for initializing", err);
    }
  }, []);

  useEffect(() => {
    if (details && details.privKey) {
      if (!initialized) {
        onInitialize();
      }
    }
  }, [details, initialized, onInitialize]);

  const refresh = () => {
    const det = JSON.parse(JSON.stringify(accountDetails));
    getWallet(det.privKey).then((res) => {
      getBalance(res).then((res) => {
        setBalance(res);
      });
    });
  };

  useEffect(() => {
    const det = JSON.parse(JSON.stringify(accountDetails));
    setDetails(det);
    if (det) {
      getWallet(det.privKey).then((res) => {
        getBalance(res).then((res) => {
          setBalance(res);
        });
      });
    }
  }, [accountDetails]);
  const [balance, setBalance] = useState("0");

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/background.png")}
    >
      <View style={styles.container}>
        <Header />
        <BalanceDisplay balance={balance} refresh={refresh} />
        <RecentTransactions transactions={recentTransactions} />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});
