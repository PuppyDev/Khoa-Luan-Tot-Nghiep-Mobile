import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { roomApi } from "../../api/roomApi";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import SavedScreen from "../Home/SavedScreen";

const RoomRented = () => {
  const { data: listForRent, isLoading } = useQuery({
    queryKey: ["getRoomRented"],
    queryFn: () => roomApi.getRoomrented(),
    refetchOnWindowFocus: false,
  });

  return (
    <SafeAreaView>
      <MainHeader title="Room rented" />

      {isLoading && (
        <View style={styles.styledLoadingWrap}>
          <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
        </View>
      )}
      {!isLoading && listForRent && listForRent.data && listForRent.data.items.length > 0 && (
        <FlatList
          style={{ paddingHorizontal: 20, marginBottom: 120 }}
          data={listForRent?.data.items}
          renderItem={({ item }) => <SavedScreen.RoomCard roomData={item.room} />}
        />
      )}

      {!isLoading && listForRent?.data && listForRent.data.items.length === 0 && (
        <View style={styles.styledLoadingWrap}>
          <Text>No data not found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoomRented;

const styles = StyleSheet.create({
  styledLoadingWrap: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
