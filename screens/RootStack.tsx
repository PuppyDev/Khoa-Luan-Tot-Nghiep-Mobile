import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FunctionComponent } from "react";
import ChangePass from "./Auth/ChangePass";
import ForgotPass from "./Auth/ForgotPass";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ResetPass from "./Auth/ResetPass";
import BottomScreen from "./BottomScreen";
import DetailsScreen from "./Home/DetailScreen";
import AddRoomScreen from "./Room/AddRoomScreen";
const Stack = createStackNavigator<any>();

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
