import React, { Fragment, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import COLORS from "../../../consts/colors";
import { randomId } from "../../../utils";

const listService = [
  {
    name: "Top Up",
    icon: require("../../../assets/ic_wallet.png"),
  },
  {
    name: "With Draw",
    icon: require("../../../assets/ic_transfer.png"),
  },
];

const renderServiceItem = (item: any) => {
  const [isShowModalTopup, setisShowModalTopup] = useState(false);
  const [moneyTopup, setMoneyTopup] = useState("");
  const isTopup = item.name === "Top Up";
  return (
    <Fragment key={item.name}>
      <TouchableOpacity
        onPress={() => isTopup && setisShowModalTopup(true)}
        style={styles.items}
      >
        <View style={styles.icon}>
          <Image source={item.icon} />
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>

      {isTopup && (
        <Portal>
          <Modal
            visible={isShowModalTopup}
            onDismiss={() => setisShowModalTopup(false)}
            style={{ padding: 20 }}
          >
            <View
              style={{
                padding: 20,
                backgroundColor: "white",
                borderRadius: 6,
              }}
            >
              <TextInput
                label="Enter money"
                onChangeText={(value) => {
                  setMoneyTopup(value);
                }}
                value={moneyTopup}
                mode="outlined"
                style={{
                  color: COLORS.primary,
                  borderColor: COLORS.primary,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log("Vo", moneyTopup);
                }}
              >
                <Button mode="contained" style={{ marginTop: 20 }}>
                  Confirm
                </Button>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      )}
    </Fragment>
  );
};

const ListService = () => {
  return (
    <View>
      <View style={styles.list}>{listService.map(renderServiceItem)}</View>
    </View>
  );
};

export default ListService;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  list: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  icon: {
    padding: 10,
    backgroundColor: "white",
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
  items: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  itemText: {
    marginTop: 10,
  },
});
