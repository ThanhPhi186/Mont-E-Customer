import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {
  LoginScreen,
  StartLogin,
  ForgotPassword,
  IntroScreen,
  LoginCompanyScreen,
  Register,
} from '../screens';

const Stack = createStackNavigator();
const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
      <Stack.Screen name="LoginCompanyScreen" component={LoginCompanyScreen} />
      <Stack.Screen name="StartLogin" component={StartLogin} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
