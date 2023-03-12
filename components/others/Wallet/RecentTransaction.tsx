import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { randomId } from "../../../utils";

const listTransations = [
  {
    type: "With Draw",
    // icon: require("../assets/ic_spotify.png"),
    date: "Jun 12, 12:30",
    payment: "- $12.3",
  },
  {
    type: "Top Up",
    // icon: require("../assets/ic_paypal.png"),
    date: "Jun 12, 12:30",
    payment: "+ $12",
  },
  {
    type: "Top Up",
    // icon: require("../assets/ic_dribble.png"),
    date: "Jun 12, 12:30",
    payment: "+ $14",
  },
];

interface IPropItem {
  type: string;
  icon?: any;
  date: string;
  payment: string;
}

const RenderTransactionItem = (item: IPropItem) => (
  <View key={randomId()} style={styles.items}>
    <View style={styles.icon}>
      <Icon name="attach-money" size={30} />
    </View>
    <View style={styles.itemBody}>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
    <View>
      <Text style={styles.payment}>{item.payment}</Text>
    </View>
  </View>
);

const RecentTransaction = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transaction</Text>
      <ScrollView style={styles.list}>
        {listTransations.map(RenderTransactionItem)}
        {listTransations.map(RenderTransactionItem)}
        {listTransations.map(RenderTransactionItem)}
        {listTransations.map(RenderTransactionItem)}
        {listTransations.map(RenderTransactionItem)}
        {listTransations.map(RenderTransactionItem)}
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

  list: {},
});
