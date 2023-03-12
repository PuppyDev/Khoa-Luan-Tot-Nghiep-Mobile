import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CardWallet from "../../components/common/Card/CardWallet";
import MainHeader from "../../components/common/Header/MainHeader";
import ListService from "../../components/others/Wallet/ListService";
import RecentTransaction from "../../components/others/Wallet/RecentTransaction";

const WalletScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <MainHeader title="My Wallet" />
        <View style={styles.card}>
          <CardWallet />
        </View>

        <View>
          <Text style={styles.balanceText}>Balance : 1.000.000 $</Text>
        </View>
        <ListService />
        <RecentTransaction />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    paddingVertical: 14,
  },

  balanceText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 10,
  },
});
