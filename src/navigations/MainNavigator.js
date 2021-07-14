import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './LoginNavigator';

import BottomTabNavigator from './BottomTabNavigator';
import {useSelector} from 'react-redux';
import CompanyNavigator from './CompanyNavigator';

const MainNavigator = () => {
  const authReducer = useSelector(state => state.AuthenOverallReducer);
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  return (
    <NavigationContainer>
      {!BaseUrl ? (
        <CompanyNavigator />
      ) : authReducer.userAuthen._LOGIN_PASSED_ ? (
        <BottomTabNavigator />
      ) : (
        <LoginNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
