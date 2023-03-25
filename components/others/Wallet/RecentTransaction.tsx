import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ITransaction } from "../../../models/user";
import { randomId } from "../../../utils";
import { convertVNDtoUSD } from "../../../utils/money";

const RenderTransactionItem = ({ transaction }: { transaction: ITransaction }) => (
  <View key={randomId()} style={styles.items}>
    <View style={styles.icon}>
      <Icon name="attach-money" size={30} />
    </View>
    <View style={styles.itemBody}>
      <Text style={styles.type}>{transaction.action}</Text>
      <Text style={styles.date}>{transaction.createdAt}</Text>
    </View>
    <View>
      <Text style={styles.payment}>{convertVNDtoUSD(transaction.actionAmount)}</Text>
    </View>
  </View>
);

const RecentTransaction = ({ listTransactions }: { listTransactions: ITransaction[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transaction</Text>
      <ScrollView style={styles.list}>
        <FlatList data={listTransactions} renderItem={({ item }) => <RenderTransactionItem transaction={item} />} keyExtractor={(item) => item._id} />
      </ScrollView>
    </View>
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    marginTop: 12,
    flex: 1,
    height: 360,
    paddingBottom: 40,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  icon: {
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { height: 10, width: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemBody: {
    flex: 1,
    paddingLeft: 14,
  },

  type: {
    fontWeight: "500",
    fontSize: 16,
  },

  date: {
    marginTop: 5,
  },

  payment: {
    fontWeight: "bold",
    fontSize: 16,
  },

  list: {
    marginTop: 10,
  },
});
