import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {images} from '../../assets';
import {AppImage, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import {AuthenOverallRedux} from '../../redux';
import {Colors} from '../../styles';
import {containerCenter} from '../../styles/GlobalStyles';

const StartLogin = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={containerCenter}>
      <View style={{flex: 1}} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <AppImage
          source={images.logoTransparent}
          imageStyle={{width: 120, height: 120}}
        />
      </View>

      <AppText>Đăng nhập để kinh doanh cùng Mont-E</AppText>
      <Button
        containerStyle={{marginTop: 40}}
        title="Đăng nhập bằng tài khoản"
        onPress={() => navigation.navigate('LoginScreen')}
      />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText>Đăng ký tài khoản để sử dụng ứng dụng Mont-E</AppText>
        <Button
          containerStyle={{
            width: '30%',
            height: 40,
            backgroundColor: Colors.ORANGE,
            marginTop: 20,
          }}
          title="Đăng ký"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={() => dispatch(AuthenOverallRedux.Actions.resetCompany())}>
        <AppText style={{fontWeight: 'bold'}}>Quay lại</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default StartLogin;
