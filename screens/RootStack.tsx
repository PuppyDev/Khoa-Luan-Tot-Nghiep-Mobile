import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FunctionComponent } from "react";
import ChangePass from "./Auth/ChangePass";
import ForgotPass from "./Auth/ForgotPass";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ResetPass from "./Auth/ResetPass";
import WalletScreen from "./Auth/WalletScreen";
import BottomScreen from "./BottomScreen";
import DetailsScreen from "./Home/DetailScreen";
import RoomRented from "./Room/\bRoomRented";
import AddRoomScreen from "./Room/AddRoomScreen";
import RoomForRentScreen from "./Room/RoomForRentScreen";
const Stack = createStackNavigator<any>();

const RootStack: FunctionComponent = () => {
  const isAuthentication = true;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthentication ? "BottomScreen" : "Login"}
      >
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="ResetPass"
          component={ResetPass}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="BottomScreen"
          component={BottomScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="WalletScreen"
          component={WalletScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddroomScreen"
          component={AddRoomScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="DetailScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="ChangePassScreen"
          component={ChangePass}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="RoomForRentScreen"
          component={RoomForRentScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="RoomRentedScreen"
          component={RoomRented}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
