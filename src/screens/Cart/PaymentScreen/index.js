import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {Button} from '../../../components/molecules';
import {CartRedux} from '../../../redux';
import {post} from '../../../services/ServiceHandle';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import ProductPaymentItem from '../Component/ProductPaymentItem';
import styles from './styles';
import numeral from 'numeral';
import {sum} from 'lodash';
import {Colors} from '../../../styles';
import FastImage from 'react-native-fast-image';

const PaymentScreen = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const dataCart = useSelector(state => state.CartReducer.listProductCart);
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const totalPrice = sum(dataCart.map(elm => elm.priceVAT * elm.amount));

  const [orderValue, setOrderValue] = useState();

  const dispatch = useDispatch();

  const products = dataCart?.map(elm => {
    return {
      productId: elm.productId,
      quantityUomId: elm.uomId,
      quantity: elm.amount,
    };
  });

  useEffect(() => {
    const params = {
      productStoreId: 'KBLS2',
      customerId: 'DLBL121290',
      products: JSON.stringify(products),
    };
    const modifyCart = () => {
      post(BaseUrl + Const.API.ModifyCart, params).then(res => {
        if (res.ok) {
          setOrderValue(res.data.order);
        }
      });
    };
    modifyCart();
  }, [BaseUrl]);

  const orderPayment = () => {
    const carts = dataCart.map(elm => elm.id);
    console.log('carts', carts);
    const params = {};
    post(Const.API.baseURL + Const.API.ImportOrder, params).then(res => {
      if (res.ok) {
        // dispatch(CartRedux.Actions.getCart.request());
        SimpleToast.show('Đặt hàng thành công', SimpleToast.SHORT);
        navigation.popToTop();
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
              onPress={orderPayment}
              titleColor={Colors.PRIMARY}
            />
            <Button
              containerStyle={styles.btnOrdered}
              title={trans('confirm')}
              onPress={orderPayment}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
