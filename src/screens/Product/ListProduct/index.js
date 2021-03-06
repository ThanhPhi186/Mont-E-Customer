import React, {useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import {images} from '../../../assets';
import {get, post} from '../../../services/ServiceHandle';

import {AppDialog, Button, ItemProduct} from '../../../components/molecules';
import IconCart from '../../../components/molecules/IconCart';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenOverallRedux, CartRedux} from '../../../redux';
import ModalChangeQuantity from '../../../components/molecules/ModalChangeQuantity';
import styles from './styles';
import {Mixin} from '../../../styles';

const ListProduct = ({navigation, route}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const numberProductCart = useSelector(
    state => state.CartReducer.numberProductCart,
  );
  const store = useSelector(state => state.StoreReducer.store);

  const refModal = useRef();

  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [itemProduct, setItemProduct] = useState();
  const [modalLogout, setModalLogout] = useState(false);

  useEffect(() => {
    const params = {
      productStoreId: store,
      pagesize: 0,
      pagenum: 200,
    };
    const getListProduct = () => {
      post(BaseUrl + Const.API.GetListProduct, params).then(res => {
        if (res.ok) {
          if (res.data.login === 'FALSE') {
            return setModalLogout(true);
          }
          setListProduct(res.data.listProducts.filter(elm => elm.available));
        }
      });
    };
    getListProduct();
  }, [BaseUrl]);

  const addToCart = type => {
    const dataProduct = {...itemProduct, ...{amount: refModal.current}};
    dispatch(CartRedux.Actions.addToCart(dataProduct));
    setVisibleModal(false);
    if (type === 'BUY_NOW') {
      navigation.navigate('CartScreen');
    }
  };

  const renderItem = item => {
    return (
      <ItemProduct
        disabled
        item={item}
        // onPress={() => navigation.navigate('DetailProduct', {item})}
        addToCart={() => {
          setItemProduct(item);
          setVisibleModal(true);
        }}
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('listProduct')} />
        {/* <IconCart
          number={numberProductCart}
          onPress={() => navigation.navigate('CartScreen')}
        /> */}
      </Appbar.Header>
      <View style={{flex: 1}}>
        <FlatList
          data={listProduct}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingBottom: Mixin.moderateSize(80),
          }}
        />
      </View>

      {itemProduct && (
        <ModalChangeQuantity
          ref={refModal}
          goBuyNow={() => addToCart('BUY_NOW')}
          addToCart={() => addToCart('CART')}
          detailProduct={itemProduct}
          isVisible={visibleModal}
          onBackdropPress={() => setVisibleModal(false)}
        />
      )}
      {numberProductCart > 0 && (
        <Button
          containerStyle={styles.btnGoCart}
          title={`Gi??? h??ng (${numberProductCart} s???n ph???m)`}
          onPress={() => navigation.navigate('CartScreen')}
        />
      )}
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

export default ListProduct;
