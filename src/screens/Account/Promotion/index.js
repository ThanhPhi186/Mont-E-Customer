import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {Const, trans} from '../../../utils';
import styles from './styles';
import moment from 'moment';
import {Colors, Mixin} from '../../../styles';
import FastImage from 'react-native-fast-image';
import {images} from '../../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {post} from '../../../services/ServiceHandle';
import {AppDialog} from '../../../components/molecules';
import {AuthenOverallRedux} from '../../../redux';
import {AppText} from '../../../components/atoms';

const PromotionScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const store = useSelector(state => state.StoreReducer.store);

  const [modalLogout, setModalLogout] = useState(false);

  const [listPromotion, setListPromotion] = useState([]);

  useEffect(() => {
    const getPromotion = () => {
      const params = {
        productStoreId: store,
      };
      post(BaseUrl + Const.API.GetOrderPromotions, params).then(res => {
        if (res.ok) {
          if (res.data.login === 'FALSE') {
            return setModalLogout(true);
          }
          setListPromotion(res.data.promotions);
        }
      });
    };
    getPromotion();
  }, [store, BaseUrl]);

  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('emptyPromotion')}</AppText>;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        disabled
        style={styles.containerItem}
        // onPress={() => this.onDetail(data)}
      >
        <View
          style={{
            flex: 0.15,
            backgroundColor: Colors.GREEN_1,
            borderTopLeftRadius: Mixin.moderateSize(8),
            borderBottomLeftRadius: Mixin.moderateSize(8),
          }}
        />
        <View style={styles.left}>
          <FastImage source={images.discount} style={{width: 50, height: 50}} />
          <View style={{marginLeft: 12, flex: 1}}>
            <Text style={styles.textTitle}>{item.promoName}</Text>
            <Text style={styles.textPrice}>
              HSD: {moment(item.thruDate).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>

        <View>
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
        </View>
        <View style={styles.right}>
          <Text style={styles.textValue}>Sales</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUND_COLOR}}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('myOffer')} />
      </Appbar.Header>
      <FlatList
        data={listPromotion}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{padding: 12}}
        ListEmptyComponent={renderEmptyComponent}
      />
      <AppDialog
        content={trans('expiredToken')}
        isVisible={modalLogout}
        onPressClose={() => {
          setModalLogout(false);
          setTimeout(() => {
            dispatch(AuthenOverallRedux.Actions.logout.request());
          }, 500);
        }}
      />
    </View>
  );
};

export default PromotionScreen;
