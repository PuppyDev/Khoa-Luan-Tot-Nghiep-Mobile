import React, { useRef, useState } from "react";
import { Button, Drawer, List, WhiteSpace } from "@ant-design/react-native";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../../../consts/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

import { StyleSheet } from "react-native";
import { SIZES } from "../../../consts/sizes";

const SearchDrawer = () => {
  const [location, setLocation] = useState();
  const [cuisines, setCuisines] = useState(1);

  const [open, setOpen] = useState(false);
  const [creditCard, setCreditCard] = useState(false);
  const [free, setFree] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>REGION</Text>
          <TextInput
            value={location}
            placeholder="where do you live ?"
            style={styles.input}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>CUISINES</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>FILTER</Text>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
            style={styles.rowFilter}
          >
            <Text style={styles.text}>Open Now</Text>
            {open && <Ionicons name="check" size={20} color={COLORS.primary} />}
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setCreditCard(!creditCard);
            }}
            style={styles.rowFilter}
          >
            <Text style={styles.text}>Credit Card</Text>
            {creditCard && (
              <Ionicons name="check" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => {
              setFree(!free);
            }}
            style={styles.rowFilter}
          >
            <Text style={styles.text}>Free Delivery</Text>
            {free && <Ionicons name="check" size={20} color={COLORS.primary} />}
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>PRICE RANGE ($)</Text>
          {/* <RangeSlider
                        min={0}
                        max={300}
                        handleColor={COLORS.primary}
                        tintColor={COLORS.title}
                        handleDiameter={20}
                        tintColorBetweenHandles={COLORS.primary}
                        lineHeight={5}
                        onChange={(min, max) => {}}
                    /> */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // navigation.closeDrawer();
          }}
        >
          <Text style={styles.buttonTxt}>Apply Filters</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  item: {
    marginVertical: 10,
  },
  title: {
    // color: COLORS.title,
    fontWeight: "bold",
    fontSize: SIZES.h3,
    marginVertical: 5,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.primary,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subtitle: {
    color: COLORS.grey,
    fontWeight: "700",
    fontSize: SIZES.h4,
  },
  category: {
    margin: 3,
    borderRadius: 15,
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 10,
  },
  text: {
    // color: COLORS.,
    fontSize: SIZES.h4,
  },
  line: {
    backgroundColor: COLORS.dark,
    height: 1,
    marginVertical: 10,
  },
  rowFilter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTxt: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h4,
  },
});
