import React, {forwardRef, useEffect, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {AppText} from '../atoms';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {Const, trans} from '../../utils';
import {Colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {device_width} from '../../styles/Mixin';
import LinearGradient from 'react-native-linear-gradient';
import numeral from 'numeral';

const ModalChangeQuantity = forwardRef((props, ref) => {
  const {detailProduct, addToCart, goBuyNow, isVisible} = props;

  const [count, setCount] = useState(detailProduct.amount || 1);

  console.log('itemProduct', detailProduct);

  useEffect(() => {
    !isVisible && setCount(1);
  }, [isVisible]);

  useEffect(() => {
    ref.current = count;
  }, [count, ref]);

  const addQuantity = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const lessQuantity = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onChangeQuantity = txt => {
    setCount(Number(txt));
  };

  const viewChangeQuantity = () => {
    return (
      <View style={styles.container}>
        <AppText style={styles.textTitle}>{trans('quantity')} :</AppText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity onPress={lessQuantity}>
            <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
          <TextInput
            onChangeText={onChangeQuantity}
            style={styles.textInput}
            keyboardType="numeric">
            {count}
          </TextInput>

          <TouchableOpacity onPress={addQuantity}>
            <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      style={{margin: 0, justifyContent: 'flex-end'}}
      isVisible={isVisible}
      avoidKeyboard
      {...props}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <FastImage
            source={{
              uri: Const.API.baseURL + detailProduct.photo,
            }}
            style={styles.images}
          />
          <View style={{flex: 1, paddingLeft: 10}}>
            <AppText style={styles.textName} numberOfLines={2}>
              {detailProduct.productName}
            </AppText>
            <AppText style={styles.textKho} numberOfLines={2}>
              {detailProduct.productId} ({detailProduct.uomDescription})
            </AppText>
            <AppText style={styles.price}>
              {numeral(detailProduct.priceVAT).format()} đ
            </AppText>
          </View>
        </View>
        {viewChangeQuantity()}
        <View style={styles.viewBtnBottom}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#00C4FF', '#00A6F0', '#0187E0']}
            style={styles.containerLinear}>
            <TouchableOpacity style={styles.button} onPress={addToCart}>
              <AppText title style={styles.textButton}>
                {trans('addToCard')}
              </AppText>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF9900', '#F47D01', '#E65C03']}
            style={styles.containerLinear}>
            <TouchableOpacity style={styles.button} onPress={goBuyNow}>
              <AppText title style={styles.textButton}>
                {trans('buyNow')}
              </AppText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
});

const styles = {
  content: {
    width: device_width,
    paddingVertical: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  avatar: {
    width: '100%',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 10,
  },
  images: {
    width: 80,
    height: 80,
  },
  textName: {
    marginRight: 25,
    fontSize: 18,
  },
  price: {
    color: Colors.GREEN_1,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    marginRight: 14,
  },
  textKho: {
    fontSize: 16,
    marginTop: 5,
    color: '#888888',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    width: device_width,
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 12,
  },
  textTitle: {
    fontSize: 16,
    color: '#888888',
    paddingHorizontal: 10,
  },
  textInput: {
    width: 80,
    height: 32,
    marginHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 0,
  },
  textButton: {
    fontWeight: '500',
    color: 'white',
  },
  containerLinear: {
    width: '48%',
    borderRadius: 12,
  },
  viewBtnBottom: {
    width: device_width,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
};

export default ModalChangeQuantity;
