import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import COLORS from "../../../consts/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchDrawer from "./SearchDrawer";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <Ionicons name="search" size={25} />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          focusable
        />
        <View style={styles.filter}>
          <Ionicons
            name="filter"
            size={18}
            onPress={() => {
              console.log("Vo filter ne con di");
            }}
          />
        </View>
      </View>

      <SearchDrawer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24 / 1.5,
  },
  inner: {
    flexDirection: "row",
  },
  search: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  field: {
    backgroundColor: COLORS.white,
    paddingLeft: 48,
    paddingRight: 18,
    paddingVertical: 18,
    borderRadius: 16,
    height: 54,
    flex: 1,
  },
  filter: {
    position: "absolute",
    top: 0,
    right: 10,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default SearchInput;
