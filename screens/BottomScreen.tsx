import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import Ionicons from "react-native-vector-icons/Ionicons";
import { userApi } from "../api/userApi";
import COLORS from "../consts/colors";
import AccountScreen from "./Auth/AccountScreen";
import HomeScreen from "./Home/HomeScreen";
import NotificationsScreen from "./Home/NotificationsScreen";
import SavedScreen from "./Home/SavedScreen";
import SearchRoom from "./Room/SearchRoom";

const Tab = createBottomTabNavigator();

const BottomScreen = () => {
  const { data: notificationList, isLoading } = useQuery({
    queryKey: ["getAllNotifications"],
    queryFn: () => userApi.getAllNotifications(),
  });

  const notificationUnCheck = notificationList?.data.items.filter((notification) => !notification.isChecked).length;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === "notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (rn === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === "Saved") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName || ""} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchRoom} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="notifications" component={NotificationsScreen} options={{ tabBarBadge: notificationUnCheck }} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default BottomScreen;
