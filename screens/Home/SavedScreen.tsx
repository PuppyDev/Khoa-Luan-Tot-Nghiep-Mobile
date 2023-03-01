import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";

const SavedScreen = () => {
  const [roomData, setRoomData] = useState([]);

  return (
    <SafeAreaView>
      <MainHeader title="Saved" />
      {roomData.length < 1 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            display: "flex",
          }}
        >
          <Ionicons name="sad-outline" size={60} />
          <Text style={{ paddingTop: 10 }}>You haven't saved any room yet</Text>
        </View>
      )}

      {roomData.length >= 1 && (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <SavedScreen.RoomCard />
          <SavedScreen.RoomCard />
          <SavedScreen.RoomCard />
          <SavedScreen.RoomCard />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

SavedScreen.RoomCard = () => {
  return (
    <View style={{ paddingVertical: 10 }}>
      <Image
        style={{
          width: "100%",
          height: 230,
          borderRadius: 15,
          overflow: "hidden",

          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        source={{
          uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1",
        }}
      />

      <Ionicons
        name="heart"
        size={30}
        style={{
          position: "absolute",
          right: 10,
          top: 20,
          color: COLORS.primary,
        }}
      />

      <Text style={{ fontSize: 16, fontWeight: "bold", paddingVertical: 10 }}>
        Homestay Biệt thự 134/15G Nguyễn thị thập quận 7
      </Text>

      <Text style={{ color: COLORS.primary, fontWeight: "500", fontSize: 14 }}>
        1.5M VND/ person
      </Text>

      <Text style={{ paddingVertical: 10, color: "gray" }}>
        134/15G Nguyễn thị thập, Phường Bình Thuận, Quận 7, Hồ Chí Minh
      </Text>
    </View>
  );
};

export default SavedScreen;
