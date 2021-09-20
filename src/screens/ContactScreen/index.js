import React, {useState} from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import AppInput from '../../components/molecules/AppInput';
import {post} from '../../services/ServiceHandle';
import {Colors} from '../../styles';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../styles/GlobalStyles';
import {device_height} from '../../styles/Mixin';
import {Const, trans} from '../../utils';

const ContactScreen = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handelCheckValue = () => {
    if (!title) {
      SimpleToast.show('Vui lòng nhập chủ đề phản hồi', SimpleToast.SHORT);
      return true;
    }
    if (!content) {
      SimpleToast.show('Vui lòng nhập nội dung phản hồi', SimpleToast.SHORT);
      return true;
    }
    return false;
  };

  const sendFeedback = () => {
    if (handelCheckValue()) {
      return;
    }
    const params = {
      customerId: userInfo.partyId,
      comment: `${title} - ${content}`,
    };
    post(BaseUrl + Const.API.SubmitFbCustomer, params).then(res => {
      if (res.ok) {
        SimpleToast.show('Gửi phản hồi thành công', SimpleToast.SHORT);
        navigation.reset({
          index: 0,
          routes: [{name: trans('contact')}],
        });
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const openFacebook = () => {
    const pageID = 460699881054856;
    const scheme = Platform.select({
      ios: 'fb://profile/',
      android: 'fb://page/',
    });
    Linking.openURL(`${scheme}${pageID}`);
  };

  const openZalo = () => {
    Linking.openURL('https://zalo.me/0376871280');
  };
  const openGmail = () => {
    Linking.openURL('mailto:thanhphichv96@@gmail.com');
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('contactMonte')}
        />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
        }}>
        <FastImage
          source={images.contactBG}
          style={{width: '100%', height: 200}}
        />
        <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
          <AppText>Liên hệ</AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <TouchableOpacity onPress={openFacebook}>
              <FastImage
                source={images.facebook}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openZalo}>
              <FastImage source={images.zalo} style={{width: 50, height: 50}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openGmail}>
              <FastImage
                source={images.gmail}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <FastImage
                source={images.message}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity> */}
            <View style={{width: 50, height: 50}} />
          </View>
          <AppText style={{marginTop: 20}}>
            Phản hồi chất lượng Dịch vụ / Sản Phẩm
          </AppText>

          <View
            style={{
              height: 40,
              width: '100%',
              backgroundColor: Colors.GREEN_2,
              justifyContent: 'center',
              paddingLeft: 16,
              borderBottomWidth: 1,
              borderBottomColor: Colors.WHITE,
              marginTop: 16,
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}>
            <TextInput
              style={{fontStyle: 'italic', color: Colors.BLACK}}
              placeholderTextColor={Colors.BLACK}
              placeholder="Chủ đề phản hồi của bạn"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View
            style={{
              height: device_height / 4,
              backgroundColor: Colors.GREEN_2,
              padding: 16,
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontStyle: 'italic',
                textAlignVertical: 'top',
                color: Colors.BLACK,
              }}
              multiline
              placeholderTextColor={Colors.BLACK}
              placeholder="Nội dung phản hồi của bạn"
              value={content}
              onChangeText={setContent}
            />
          </View>
          <Button
            onPress={sendFeedback}
            title="Gửi phản hồi"
            titleStyle={{fontSize: 16}}
            containerStyle={{
              width: '40%',
              height: 40,
              backgroundColor: Colors.ORANGE,
              marginTop: 8,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;
