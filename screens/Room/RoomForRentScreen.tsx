import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { roomApi } from "../../api/roomApi";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { convertVNDtoUSD } from "../../utils/money";

const RoomForRentScreen = () => {
  const { data: listForRent, isLoading } = useQuery({
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
          style={{ paddingHorizontal: 20 }}
          data={listForRent?.data.items}
          renderItem={({ item }) => <RoomForRentScreen.RoomItem roomData={item.room} />}
          keyExtractor={(item) => item.room._id}
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

RoomForRentScreen.RoomItem = ({ roomData, isFavoritePage = false }: { roomData?: room | undefined | null; isFavoritePage?: boolean }) => {
  if (!roomData) return <View></View>;
  const navigation = useNavigation();

  return (
    <View style={{ paddingVertical: 10 }}>
      <View style={style.StyledWrapRoom}>
        <Image
          style={style.StyledImageRoom}
          source={{
            uri:
              roomData?.roomAttachment?.url?.[0] ||
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1",
          }}
        />
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <Text style={style.StyledHeading}>{roomData?.name || "upading..."}</Text>

        <Menu>
          <MenuTrigger text="..." />
          <MenuOptions>
            <MenuOption
              text="View Contract"
              onSelect={() => navigation.navigate("ContractScreen" as never, { item: roomData, isSign: true } as never)}
            />
            <MenuOption text="Service Declaration" onSelect={() => navigation.navigate("RoomDeclaration" as never, roomData._id as never)} />
          </MenuOptions>
        </Menu>
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <Text style={{ color: COLORS.primary, fontWeight: "500", fontSize: 14 }}>{convertVNDtoUSD(roomData.basePrice)} / person</Text>

        {roomData?.status === "available" && <Text style={{ color: "#385898" }}>Availabed</Text>}
        {roomData?.status === "not-available" && <Text style={{ color: "red" }}>Unsuitable</Text>}
        {roomData?.status === "already-rent" && <Text style={{ color: "green" }}>Currently being rented</Text>}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  StyledWrapRoom: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    overflow: "hidden",
  },

  StyledImageRoom: {
    height: 230,
    borderRadius: 15,
    overflow: "hidden",
  },

  StyledHeading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    flexWrap: "wrap",
    width: "70%",
  },

  StyledTwo: { justifyContent: "space-between", alignItems: "center", flexDirection: "row" },
});

export default RoomForRentScreen;
