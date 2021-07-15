import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import ProductPaymentItem from '../Component/ProductPaymentItem';
import styles from './styles';
import numeral from 'numeral';
import {Colors} from '../../../styles';

const PaymentScreen = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const dataCart = useSelector(state => state.CartReducer.listProductCart);
  const store = useSelector(state => state.StoreReducer.store);
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const [orderValue, setOrderValue] = useState();
  const [loading, setLoading] = useState(false);

  const products = dataCart?.map(elm => {
    return {
      productId: elm.productId,
      quantityUomId: elm.uomId,
      quantity: elm.amount,
    };
  });

  useEffect(() => {
    const params = {
      mobilecustomer: 'Y',
      productStoreId: store,
      customerId: userInfo.partyId,
      products: JSON.stringify(products),
    };
    console.log('params', params);
    const modifyCart = () => {
      post(BaseUrl + Const.API.ModifyCart, params).then(res => {
        if (!res.data._ERROR_MESSAGE_) {
          setOrderValue(res.data.order);
        }
      });
    };
    modifyCart();
  }, [BaseUrl]);

  const submitOrder = () => {
    setLoading(true);
    const params = {
      mobilecustomer: 'Y',
      productStoreId: store,
      customerId: userInfo.partyId,
      products: JSON.stringify(products),
    };
    post(BaseUrl + Const.API.SubmitOrder, params).then(res => {
      if (!res.data._ERROR_MESSAGE_ && !res.data.errorMessage) {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(trans('createOrderSuccessfully'), SimpleToast.SHORT);
          navigation.popToTop();
        }, 700);
      } else {
        setLoading(false);
        setTimeout(() => {
          SimpleToast.show(
            res.data._ERROR_MESSAGE_ || res.data.errorMessage,
            SimpleToast.SHORT,
          );
        }, 700);
      }
    });
  };

  const renderItem = item => {
    return <ProductPaymentItem item={item} />;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('purchase')} />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={{flex: 1, padding: 16}}>
        <View style={styles.containerOrder}>
          <FlatList
            data={dataCart}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.viewPayment}>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('orderValue')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.totalAmount).format()} đ
            </AppText>
          </View>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('discount')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.discountAmount).format()} đ
            </AppText>
          </View>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('tax')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.taxAmount).format()} đ
            </AppText>
          </View>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('totalPayment')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.grandTotal).format()} đ
            </AppText>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              containerStyle={styles.btnCancel}
              title={trans('cancelOrder')}
              onPress={submitOrder}
              titleColor={Colors.PRIMARY}
            />
            <Button
              containerStyle={styles.btnOrdered}
              title={trans('confirm')}
              onPress={submitOrder}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
