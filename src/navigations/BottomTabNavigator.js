import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ContactScreen,
  HomeScreen,
  ListProduct,
  MainAccount,
  DetailProduct,
  CartScreen,
  PaymentScreen,
  DeliveryAddressScreen,
  AddNewAddress,
  HistoryOrder,
  ListCustomer,
  HistoryPoint,
  ReportScreen,
  NotificationScreen,
  PromotionScreen,
  TopSales,
  Policy,
  ChangeStore,
  ChangePassword,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomButtonTab} from '../components/molecules';
import {trans} from '../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles';
import {FONT_SIZE_10} from '../styles/Typography';
import {device_width} from '../styles/Mixin';
import TabShape from './TabShape';
import {NAVIGATION_BOTTOM_TABS_HEIGHT} from '../styles/GlobalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

    if (
      routeName === 'ListProduct' ||
      routeName === 'DetailProduct' ||
      routeName === 'CartScreen' ||
      routeName === 'PaymentScreen' ||
      routeName === 'DeliveryAddressScreen' ||
      routeName === 'AddNewAddress' ||
      routeName === 'NotificationScreen' ||
      routeName === 'TopSales' ||
      routeName === 'PromotionScreen'
    ) {
      return false;
    }
    return true;
  };

  const getPersonVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MainAccount';

    if (
      routeName === 'HistoryOrder' ||
      routeName === 'ListCustomer' ||
      routeName === 'HistoryPoint' ||
      routeName === 'ReportScreen' ||
      routeName === 'PromotionScreen' ||
      routeName === 'Policy' ||
      routeName === 'ChangePassword'
    ) {
      return false;
    }
    return true;
  };

  const getSalesProductVisibility = route => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ?? 'ListProductInStore';
    if (routeName === 'SalesCart' || routeName === 'PaymentOfSales') {
      return false;
    }
    return true;
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListProduct" component={ListProduct} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen
          name="DeliveryAddressScreen"
          component={DeliveryAddressScreen}
        />
        <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="TopSales" component={TopSales} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
      </Stack.Navigator>
    );
  };

  const AccountStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName="MainAccount">
        <Stack.Screen name="MainAccount" component={MainAccount} />
        <Stack.Screen name="HistoryOrder" component={HistoryOrder} />
        <Stack.Screen name="ListCustomer" component={ListCustomer} />
        <Stack.Screen name="HistoryPoint" component={HistoryPoint} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    );
  };

  function MyTabBar({state, descriptors, navigation}) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const tabWidth = React.useMemo(
      () => device_width / state.routes.length,
      [state.routes.length],
    );

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    const renderIcon = name => {
      switch (name) {
        case trans('home'):
          return 'home';
        case trans('contact'):
          return 'phone-in-talk';
        case 'Lên đơn':
          return 'plus-circle-outline';
        case trans('notification'):
          return 'bell';
        case trans('personal'):
          return 'account';
        default:
          break;
      }
    };

    return (
      <View style={styles.content}>
        <TabShape {...{tabWidth}} />
        <View style={styles.subContent}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            if (index === 2) {
              return (
                <CustomButtonTab
                  onPress={() => navigation.navigate('ListProduct')}
                  key={index}
                />
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={renderIcon(label)}
                  color={isFocused ? Colors.PRIMARY : Colors.GRAY}
                  size={24}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.PRIMARY : Colors.GRAY,
                    marginTop: 8,
                    fontSize: FONT_SIZE_10,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  const middleComponent = () => {
    return null;
  };

  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={trans('home')}
        component={HomeStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen name={trans('contact')} component={ContactScreen} />
      <Tab.Screen
        name="Lên đơn"
        component={middleComponent}
        options={({route}) => ({
          tabBarVisible: getSalesProductVisibility(route),
        })}
      />
      <Tab.Screen
        name={trans('notification')}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View style={{padding: 6}}>
                <MaterialCommunityIcons name="bell" size={size} color={color} />
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 4,
                    width: 16,
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '600'}}>
                    4
                  </Text>
                </View>
              </View>
            );
          },
        }}
        component={NotificationScreen}
      />
      <Tab.Screen
        name={trans('personal')}
        component={AccountStack}
        options={({route}) => ({
          tabBarVisible: getPersonVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = {
  content: {
    position: 'absolute',
    bottom: 0,
  },
  subContent: {
    flexDirection: 'row',
    position: 'absolute',
    height: NAVIGATION_BOTTOM_TABS_HEIGHT,
    width: device_width,
  },
};

export default BottomTabNavigator;
