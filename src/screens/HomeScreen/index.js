import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';

import {images} from '../../assets';
import {AppImage, AppText} from '../../components/atoms';
import {container, viewRow, rowSpaceBetween} from '../../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {Colors} from '../../styles';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import IconCart from '../../components/molecules/IconCart';
import numeral from 'numeral';
import {CartRedux} from '../../redux';
import {device_width} from '../../styles/Mixin';
import ItemCategory from './component/ItemCategory';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const numberProductCart = useSelector(
    state => state.CartReducer.numberProductCart,
  );
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const sessionId = useSelector(state => state.AuthenOverallReducer.cookies);

  console.log('caculate', moment(sessionId.route.expires).unix(), moment.now());

  console.log(
    'sessionId',
    moment(sessionId.route.expires).unix() < moment.now() / 1000,
  );

  return (
    <View style={container}>
      {/* header */}
      <View style={styles.containerHeader}>
        <View style={[rowSpaceBetween]}>
          <View>
            <View style={viewRow}>
              <AppImage source={images.avatar} imageStyle={styles.avatar} />
              <View>
                <AppText style={styles.txtHello}>Xin chào,</AppText>
                <AppText title style={styles.txtName}>
                  {userInfo.lastName} {userInfo.middleName} {userInfo.firstName}
                </AppText>
              </View>
            </View>
          </View>
          <IconCart
            number={numberProductCart}
            onPress={() => navigation.navigate('CartScreen')}
          />
        </View>
      </View>

      {/* Card */}

      <View
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '-7%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              borderColor: Colors.PRIMARY,
            }}>
            <AppImage
              source={images.logoHorizontal}
              imageStyle={{width: 120, height: 40}}
            />
            <View style={{flexDirection: 'row'}}>
              <AppText style={{color: Colors.ORANGE, fontWeight: 'bold'}}>
                {numeral(userInfo.point).format()}
              </AppText>
              <AppText style={{fontWeight: 'bold'}}> điểm</AppText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 12,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TopSales')}
                style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="badge-account-horizontal-outline"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </TouchableOpacity>
              <AppText style={styles.txtProduct}>Top Saler</AppText>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ListProduct', {type: 'ORDER'})
              }>
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="download-multiple"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Sản Phẩm</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('PromotionScreen')}>
              <View style={styles.viewProduct}>
                <IconMaterialCommunityIcons
                  name="gift-outline"
                  size={40}
                  color={Colors.PRIMARY}
                />
              </View>
              <AppText style={styles.txtProduct}>Ưu Đãi</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex: 4}}></View>
    </View>
  );
};
export default HomeScreen;
