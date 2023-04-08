import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { doRemoveFavorite, doSetFavorite } from "../../app/roomSlice";
import MainHeader from "../../components/common/Header/MainHeader";
import COLORS from "../../consts/colors";
import { room } from "../../models/room";
import { convertVNDtoUSD } from "../../utils/money";

const SavedScreen = () => {
  const { listFavorite } = useAppSelector((state) => state.roomSlice);

  return (
    <SafeAreaView>
      <MainHeader title="Saved" />
      {listFavorite.length < 1 && (
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
      <View style={{ paddingHorizontal: 10 }}>
        {listFavorite.length >= 1 && (
          <FlatList data={listFavorite} initialNumToRender={7} renderItem={({ item }) => <SavedScreen.RoomCard roomData={item} />} />
        )}
      </View>
    </SafeAreaView>
  );
};

SavedScreen.RoomCard = ({ roomData, isFavoritePage = false }: { roomData?: room | undefined | null; isFavoritePage?: boolean }) => {
  if (!roomData) return <View></View>;
  const dispatch = useAppDispatch();
  const { listFavorite } = useAppSelector((state) => state.roomSlice);
  const navigation = useNavigation();

  const handleAddFavoriteRoom = async () => {
    const duplicatedItem = listFavorite.find((item) => item._id === roomData?._id);

    if (duplicatedItem) {
      dispatch(doRemoveFavorite(duplicatedItem._id));
    } else if (roomData) {
      dispatch(doSetFavorite(roomData));
    }
  };

  return (
    <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => navigation.navigate("DetailScreen" as never, roomData as never)}>
      <View
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 230,
            borderRadius: 15,
            overflow: "hidden",
          }}
          source={{
            uri:
              roomData?.roomAttachment?.url?.[0] ||
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1",
          }}
        />
      </View>

      <Ionicons
        name="heart"
        size={30}
        style={{
          position: "absolute",
          right: 10,
          top: 20,
          color: COLORS.primary,
        }}
        onPress={handleAddFavoriteRoom}
      />

      <Text style={{ fontSize: 16, fontWeight: "bold", paddingVertical: 10 }}>{roomData?.name || "upading..."}</Text>

      <Text style={{ color: COLORS.primary, fontWeight: "500", fontSize: 14 }}>{convertVNDtoUSD(roomData.basePrice)} / person</Text>

      <Text style={{ paddingVertical: 10, color: "gray" }}>{roomData?.address.addressDetail}</Text>
    </TouchableOpacity>
  );
};

export default SavedScreen;
