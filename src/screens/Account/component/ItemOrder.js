import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import numeral from 'numeral';
import moment from 'moment';
import {trans} from '../../../utils';
import {AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';

const ItemOrder = props => {
  const {item} = props;

  const renderStatus = status => {
    switch (status) {
      case 'ORDER_APPROVED': // Đã duyệt
        return trans('approved');
      case 'ORDER_CANCELLED': // Đã huỷ
        return trans('canceled');
      case 'ORDER_COMPLETED': // Đã hoàn thành
        return trans('completed');
      case 'ORDER_CREATED': // Đã tạo
        return trans('created');
      case 'ORDER_HOLD': // Đã giữ
        return trans('hasKept');
      case 'ORDER_IN_TRANSIT': // Đang chuyển
        return trans('moving');
      case 'ORDER_PROCESSING': // Processing
        return trans('processing');
      case 'ORDER_REJECTED': // Đã bị từ chối
        return trans('wasRejected');
      case 'ORDER_SADAPPROVED': // Sales Admin approved
        return trans('salesAdminApproved');
      case 'ORDER_DELIVERED': // Đã giao hàng
        return trans('delivered');
    }
  };

  const renderColorStatus = status => {
    switch (status) {
      case 'ORDER_APPROVED':
        return Colors.BLUE_CODE.blue600;
      case 'ORDER_CANCELLED':
        return Colors.RED_CODE.red500;
      case 'ORDER_COMPLETED':
        return Colors.GREEN_1;
      case 'ORDER_CREATED':
        return Colors.ORANGE_CODE.orange600;
      case 'ORDER_HOLD':
        return trans('hasKept'); // Đã giữ
      case 'ORDER_IN_TRANSIT':
        return Colors.LIME_CODE.lime800;
      case 'ORDER_PROCESSING':
        return trans('processing'); // Processing
      case 'ORDER_REJECTED':
        return trans('wasRejected'); // Đã bị từ chối
      case 'ORDER_SADAPPROVED':
        return trans('salesAdminApproved'); // Sales Admin approved
      case 'ORDER_DELIVERED':
        return Colors.CYAN_CODE.cyan600;
    }
  };

  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AppText>
          Mã đơn hàng: <Text style={styles.code}>{item.orderId}</Text>
        </AppText>
        <AppText
          style={styles.status}
          containerStyle={{
            backgroundColor: renderColorStatus(item.statusId),
            padding: 8,
            borderRadius: 8,
          }}>
          {renderStatus(item.statusId)}
        </AppText>
      </View>
      <AppText>
        Tổng tiền:{' '}
        <Text style={styles.code}>{numeral(item.grandTotal).format()} đ</Text>
      </AppText>
      <AppText style={{marginTop: 8}}>
        Thời gian tạo:{' '}
        <Text>{moment(item.orderDate).format('DD-MM-YYYY')}</Text>
      </AppText>
      {/* <View style={styles.leftContent}>
        <AppText style={styles.code}>{item.orderId}</AppText>
        <AppText>{numeral(item.grandTotal).format()} đ</AppText>
      </View>
      <View style={styles.rightContent}>
        <AppText style={styles.status}>{renderStatus(item)}</AppText>
        <AppText>{moment(item.orderDate).format('DD-MM-YYYY')}</AppText>
      </View> */}
    </TouchableOpacity>
  );
};
export default ItemOrder;

const styles = {
  container: {
    width: '90%',

    alignSelf: 'center',
    ...Mixin.padding(8, 16, 8, 16),
    marginTop: 16,
    borderRadius: 8,
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
  leftContent: {
    justifyContent: 'space-between',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  code: {
    fontWeight: 'bold',
  },
  status: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
};
