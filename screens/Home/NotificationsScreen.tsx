import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import MainHeader from "../../components/common/Header/MainHeader";
import { ArrayFrom, formatDate, getColor } from "../../utils";
import Ionicons from "react-native-vector-icons/Ionicons";

const NotificationsScreen = () => {
  return (
    <SafeAreaView>
      <MainHeader title="Notifications" />

      <View style={styles.container}>
        <FlatList
          data={ArrayFrom(10)} 
          renderItem={() => <NotificationsScreen.NotificationItem />}
        />
      </View>
    </SafeAreaView>
  );
};

NotificationsScreen.NotificationItem = () => {
  return (
    <View style={styles.NotiItem}>
      <View style={styles.icon}>
        <Ionicons name="checkmark-outline" size={30} color="white" />
      </View>

      <View style={{ marginLeft: 10 }}>
        <Text style={{ ...styles.HeadingNoti, color: getColor("primary") }}>
          Your room is rented
        </Text>
        <Text style={{ paddingVertical: 10 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          consequatur, libero non quos repellat cupiditate, sit tempore
          perspiciatis ad, eos reiciendis magni mollitia ex. Sequi doloribus
          consequuntur nihil quod earum.
        </Text>
        <Text>Time : {formatDate(new Date())}</Text>
      </View>
    </View>
  );
};
export default NotificationsScreen;

const styles = StyleSheet.create({
  NotiItem: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    backgroundColor: getColor("primary"),
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 1,

    borderRadius: 50,
  },
  container: {},

  HeadingNoti: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
