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
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const CompanyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name="LoginCompanyScreen" component={LoginCompanyScreen} />
    </Stack.Navigator>
  );
};

export default CompanyNavigator;
