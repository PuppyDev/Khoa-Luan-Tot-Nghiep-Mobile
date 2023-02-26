import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FunctionComponent } from "react";
import ForgotPass from "./Auth/ForgotPass";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ResetPass from "./Auth/ResetPass";
import DetailsScreen from "./Home/DetailScreen";
import HomeScreen from "./Home/HomeScreen";

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
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
