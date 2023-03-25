import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { roomApi } from "../../api/roomApi";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import SavedScreen from "../Home/SavedScreen";

const RoomForRentScreen = () => {
  const {
    data: listForRent,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getRoomRented"],
    queryFn: () => roomApi.getRoomForRent(),
    refetchOnWindowFocus: false,
  });

  return (
    <SafeAreaView>
      <MainHeader title="Room for rent" />

      {isLoading && (
        <View style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
        </View>
      )}
      {!isLoading && listForRent && listForRent.data && listForRent.data.items.length > 0 && (
        <FlatList
          style={{ paddingHorizontal: 20, marginBottom: 120 }}
          data={listForRent?.data.items}
          renderItem={({ item }) => <SavedScreen.RoomCard roomData={item.room} />}
          keyExtractor={(item) => item._id}
        />
      )}

      {!isLoading && listForRent?.data && listForRent.data.items.length === 0 && (
        <View style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Text>No data not found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoomForRentScreen;
