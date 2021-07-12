import React, {useEffect, useState} from 'react';
import {Platform, TextInput, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {images} from '../../assets';
import {AppImage, AppLoading, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import AppInput from '../../components/molecules/AppInput';
import {container} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import styles from './styles';
import SimpleToast from 'react-native-simple-toast';
import {post, setCookies} from '../../services/ServiceHandle';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';
import CookieManager from '@react-native-cookies/cookies';

const LoginScreen = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState();

  const [password, setPassword] = useState('');

  const handelCheckValue = () => {
    if (!userName) {
      SimpleToast.show('Tên đăng nhập không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (!password) {
      SimpleToast.show('Mật khẩu không được để trống', SimpleToast.SHORT);
      return true;
    }
    if (password.length < 6) {
      SimpleToast.show(
        'Mật khẩu không được nhỏ hơn 6 kí tự',
        SimpleToast.SHORT,
      );
      return true;
    }
    return false;
  };

  const login = () => {
    if (handelCheckValue()) {
      return;
    }
    setLoading(true);

    const params = {
      USERNAME: userName,
      PASSWORD: password,
    };
    // CookieManager.getFromResponse(BaseUrl + Const.API.Login).then(cookies => {
    post(BaseUrl + Const.API.Login, params).then(res => {
      if (!res.data._ERROR_MESSAGE_ && !res.data._ERROR_MESSAGE_LIST_) {
        CookieManager.get(BaseUrl + Const.API.Login).then(cookies => {
          console.log('CookieManager.get =>', cookies);
          setCookies(cookies.JSESSIONID.value);
          dispatch(AuthenOverallRedux.Actions.setCookies(cookies));
          dispatch(AuthenOverallRedux.Actions.loginSuccess(res.data));
        });

        setLoading(false);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(
            res.data._ERROR_MESSAGE_ || trans('errorOccurred'),
            SimpleToast.SHORT,
          );
        }, 700);
      }
    });
    // });
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('login')} />
      </Appbar.Header>
      <View style={styles.viewContent}>
        <View style={styles.viewLogo}>
          <AppImage source={images.logoTransparent} imageStyle={styles.img} />
        </View>
        <View style={styles.viewText}>
          <AppText title style={styles.textHello}>
            Xin chào!
          </AppText>
          <AppText>Xin vui lòng đăng nhập bằng số điện thoại của bạn</AppText>
        </View>
        <View style={styles.viewInput}>
          <View style={styles.viewPhone}>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Tên đăng nhập"
              autoCapitalize="none"
            />
          </View>
          <AppInput
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Mật khẩu"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <AppText
              containerStyle={styles.viewForgotPass}
              style={styles.txtForgot}>
              {trans('forgotPassword')} ?
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        containerStyle={styles.btnContinue}
        title={trans('continue').toUpperCase()}
        onPress={login}
      />
    </View>
  );
};

export default LoginScreen;
