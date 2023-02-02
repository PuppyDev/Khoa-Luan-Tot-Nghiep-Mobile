import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FunctionComponent } from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPass from './ForgotPass'

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPass: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}></Stack.Screen>

        <Stack.Screen
          name='Register'
          component={Register}
          options={{ headerShown: false }}></Stack.Screen>

        <Stack.Screen
          name='ForgotPass'
          component={ForgotPass}
          options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
