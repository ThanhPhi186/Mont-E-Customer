import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {Const, trans} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import numeral from 'numeral';

const ProductCartItem = props => {
  const {item, removeCartItem, editCartItem} = props;
  return (
    <View style={styles.containerItem}>
      <View style={styles.left}>
        <FastImage
          source={{
            uri: Const.API.baseURL + item.photo,
          }}
          style={styles.avt}
        />
      </View>
      <View style={styles.right}>
        <AppText style={styles.textName}>{item.productName}</AppText>

        <AppText style={styles.textPrice}>
          {numeral(item.priceVAT).format()} đ
        </AppText>

        <View style={styles.soluong}>
          <TouchableOpacity onPress={editCartItem}>
            <Icon name="square-edit-outline" size={20} color={Colors.GRAY} />
          </TouchableOpacity>

          <AppText style={{paddingRight: 8}}>
            {trans('quantity')}: {item.amount}
          </AppText>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonDel} onPress={removeCartItem}>
        <Icon name="trash-can-outline" size={24} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  left: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avt: {
    width: '75%',
    aspectRatio: 1 / 1,
    borderRadius: 5,
  },
  textPro: {
    fontSize: 13,
    color: '#888888',
    marginTop: 3,
  },
  right: {
    width: '75%',
    paddingVertical: 10,
  },
  textName: {
    fontSize: 16,
    flex: 1,
    marginRight: 40,
  },
  icDelete: {
    width: '75%',
    aspectRatio: 1 / 1,
  },
  buttonDel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  textPrice: {
    color: Colors.GREEN_1,
    marginTop: 10,
  },
  soluong: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
};
export default ProductCartItem;
