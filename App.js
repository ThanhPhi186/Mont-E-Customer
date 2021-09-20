import React, {useEffect, useRef, useState} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/config/store/configureStore';
import MainNavigator from './src/navigations/MainNavigator';
import {RootView} from './src/screens';
import {Colors} from './src/styles';
import BootSplash from 'react-native-bootsplash';
import {images} from './src/assets';
import {Animated, StyleSheet} from 'react-native';
import {device_height} from './src/styles/Mixin';

const {persistor, store} = configureStore();
// persistor.purge();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    text: Colors.BLACK,
  },
};

const App = () => {
  let [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  let [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
  let opacity = useRef(new Animated.Value(1));
  let translateY = useRef(new Animated.Value(0));

  const fakeApiCallWithoutBadNetwork = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  const init = async () => {
    // You can uncomment this line to add a delay on app startup
    // await fakeApiCallWithoutBadNetwork(400);

    await BootSplash.hide();

    Animated.stagger(300, [
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: -50,
      }),
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: device_height,
      }),
    ]).start();

    Animated.timing(opacity.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 200,
      delay: 400,
    }).start(() => {
      setBootSplashIsVisible(false);
    });
  };

  useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <RootView>
            {bootSplashIsVisible ? (
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  styles.bootsplash,
                  {opacity: opacity.current},
                ]}>
                <Animated.Image
                  source={images.logoWhite}
                  fadeDuration={0}
                  onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                  style={[
                    styles.logo,
                    {transform: [{translateY: translateY.current}]},
                  ]}
                />
              </Animated.View>
            ) : (
              <MainNavigator />
            )}
          </RootView>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LOGO_BACKGROUND_COLOR,
  },
  logo: {
    height: 95,
    width: 160,
  },
});

export default App;
