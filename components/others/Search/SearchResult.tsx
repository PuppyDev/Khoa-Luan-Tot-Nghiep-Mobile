import { FlatList, Text } from "react-native";
import { CommonPagination } from "../../../models";
import { room } from "../../../models/room";
import SavedScreen from "../../../screens/Home/SavedScreen";

const SearchResult = ({ roomData }: { roomData: CommonPagination<room[]> | null }) => {
  if (!roomData) return <Text>Nothing in here</Text>;
  return (
    <FlatList
      style={{ paddingHorizontal: 20, marginBottom: 120 }}
      data={roomData.items}
      renderItem={({ item }) => <SavedScreen.RoomCard roomData={item} />}
      keyExtractor={(item) => item._id}
    />
  );
};

export default SearchResult;
