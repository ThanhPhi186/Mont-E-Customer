import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './LoginNavigator';

import BottomTabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';

const MainNavigator = () => {
  // const idToken = useSelector(state => state.AuthenOverallReducer.idToken);
  const authReducer = useSelector(state => state.AuthenOverallReducer);
  return (
    <NavigationContainer>
      {/* {idToken ? <BottomTabNavigator /> : <LoginNavigator />} */}
      {authReducer.userAuthen._LOGIN_PASSED_ ? (
        <BottomTabNavigator />
      ) : (
        <LoginNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
