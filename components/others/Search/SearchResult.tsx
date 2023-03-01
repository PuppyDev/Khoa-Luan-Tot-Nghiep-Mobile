import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../consts/colors";
import SavedScreen from "../../../screens/Home/SavedScreen";

const Item = ({ title }: { title: string }) => (
  <View style={styles.item}>
    <Image
      style={{
        width: "100%",
        height: 250,
      }}
      source={{
        uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/234762091.jpg?k=45540c95d66e3278d194a4a35994dd3491811d644b2a6cb3e3da1b187dfa7d06&o=&hp=1",
      }}
    />
    <View
      style={{
        position: "absolute",
        right: 10,
        top: 15,
        backgroundColor: "white",
        padding: 3,
        borderRadius: 50,
      }}
    >
      <Ionicons
        name="heart-outline"
        size={25}
        style={{
          color: COLORS.primary,
        }}
      />
    </View>

    <View style={{ paddingLeft: 25, paddingVertical: 12 }}>
      <Text style={{ fontWeight: "bold", fontSize: 15, color: "black" }}>
        Royal Hildeaway Corales Suited
      </Text>
    </View>
  </View>
);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const SearchResult = () => {
  return (
    <FlatList
      style={{ paddingHorizontal: 20, marginBottom: 120 }}
      data={DATA}
      renderItem={({ item }) => <SavedScreen.RoomCard />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
});
