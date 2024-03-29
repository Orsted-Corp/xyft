import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

interface BalanceDisplayProps {
  balance: string;
  refresh: () => void;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
  refresh,
}) => {
  return (
    <ImageBackground
      source={require("../assets/dashboard.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.walletLabel}>Wallet</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.balanceAmount}>{balance}</Text>
          <TouchableOpacity
            onPress={() => {
              refresh();
            }}
          >
            <Image
              source={require("../assets/reload.png")}
              style={{ width: 25, height: 25, marginLeft: 250 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 25,
    width: 350,
    height: 175,
    flexDirection: "column",
    paddingLeft: 25,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "2.5%",
    color: "#ddd",
  },
  walletLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: "20%",
    color: "#ddd",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2ecc71",
    marginBottom: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Set the image to cover the entire view
    justifyContent: "center", // Center content vertically
    backgroundColor: "rgba(81,56,110,1)",
    borderRadius: 20,
    marginTop: 20,
  },
});

export default BalanceDisplay;
