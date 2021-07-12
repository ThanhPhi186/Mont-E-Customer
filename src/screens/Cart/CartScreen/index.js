import React, {useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {Button} from '../../../components/molecules';
import ProductCartItem from '../Component/ProductCartItem';
import {CartRedux} from '../../../redux';
import numeral from 'numeral';
import {isEmpty, sum} from 'lodash';
import SimpleToast from 'react-native-simple-toast';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const dataCart = useSelector(state => state.CartReducer.listProductCart);
  const totalPrice = sum(dataCart?.map(elm => elm.priceVAT * elm.amount));

  const [visibleModal, setVisibleModal] = useState(false);
  const [itemCart, setItemCart] = useState();
  const refModal = useRef();

  const removeCartItem = item => {
    dispatch(CartRedux.Actions.removeToCart(item));
  };

  const editCartItem = () => {
    // const params = {
    //   amount: refModal.current,
    // };
    // put(
    //   `${Const.API.baseURL + Const.API.ImportCart}/${itemCart.id}`,
    //   params,
    // ).then(res => {
    //   if (res.ok) {
    //     setVisibleModal(false);
    //     dispatch(CartRedux.Actions.getCart.request());
    //     setTimeout(() => {
    //       SimpleToast.show('Cập nhật sản phẩm thành công', SimpleToast.SHORT);
    //     }, 700);
    //   }
    // });
  };

  const goPayment = () => {
    if (!isEmpty(dataCart)) {
      navigation.navigate('PaymentScreen');
    } else {
      SimpleToast.show('Giỏ hàng trống');
    }
  };

  const renderItem = item => {
    return (
      <ProductCartItem
        item={item}
        removeCartItem={() => removeCartItem(item)}
        editCartItem={() => {
          setItemCart(item);
          setVisibleModal(true);
        }}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('myCart')} />
      </Appbar.Header>
      <View style={{flex: 1, backgroundColor: Colors.BACKGROUND_COLOR}}>
        <FlatList
          data={dataCart}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 16}}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.viewPayment}>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('orderValue')} :</AppText>
            <AppText style={styles.textPrice}>
              {numeral(totalPrice).format()} đ
            </AppText>
          </View>

          <Button
            containerStyle={styles.btnPurchase}
            title={trans('purchase')}
            onPress={goPayment}
          />
        </View>
      </View>
      {itemCart && (
        <ModalChangeQuantity
          ref={refModal}
          addToCart={editCartItem}
          detailProduct={itemCart}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        />
      )}
    </View>
  );
};

const styles = {
  showPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textPay: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  btnPurchase: {
    width: '100%',
    marginBottom: 0,
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
  viewPayment: {
    margin: 20,
    padding: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
};

export default CartScreen;
