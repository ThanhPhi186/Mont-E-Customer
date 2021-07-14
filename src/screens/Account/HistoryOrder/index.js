import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import numeral from 'numeral';
import {useEffect} from 'react';
import {get, post} from '../../../services/ServiceHandle';
import {useState} from 'react';
import moment from 'moment';
import {useSelector} from 'react-redux';
import ItemOrder from '../component/ItemOrder';

const HistoryOrder = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      // get(Const.API.baseURL + Const.API.Order).then(res => {
      //   if (res.ok) {
      //     setLoading(false);
      //     setDataOrder(res.data.data);
      //   } else {
      //     setLoading(false);
      //     console.log(res.error);
      //   }
      // });
      const params = {
        pagesize: 200,
        pagenum: 0,
      };

      post(BaseUrl + Const.API.GetSaleOrder, params).then(res => {
        if (res.ok) {
          setDataOrder(res.data.salesOrders);
          setLoading(false);
        }
      });
    };
    getData();
  }, []);

  // const renderItem = ({item}) => {
  //   return (
  //     <View
  //       style={{
  //         alignSelf: 'center',
  //         width: '90%',
  //         backgroundColor: Colors.WHITE,
  //         shadowColor: '#000',
  //         shadowOffset: {
  //           width: 0,
  //           height: 2,
  //         },
  //         shadowOpacity: 0.25,
  //         shadowRadius: 3.84,
  //         elevation: 5,
  //         paddingHorizontal: 8,
  //         paddingVertical: 16,
  //         marginTop: 16,
  //         borderRadius: 12,
  //       }}>
  //       {/* <AppText>Mã đơn hàng : {item.id}</AppText> */}
  //       <AppText>Người nhận: {item.fullname}</AppText>
  //       <AppText>Địa chỉ: {item.address_ship}</AppText>
  //       <AppText>
  //         Thời gian tạo:{' '}
  //         {moment(item.createdAt).format('HH:mm:ss - DD-MM/YYYY')}
  //       </AppText>
  //       <View style={{flexDirection: 'row'}}>
  //         <AppText>Sản phẩm: </AppText>
  //       </View>
  //       <View style={{alignItems: 'flex-end', marginTop: 12}}>
  //         <AppText style={{color: Colors.GREEN_1}}>
  //           Tổng: {numeral(item.total).format()} đ
  //         </AppText>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: Colors.GREEN_1,
  //             width: 70,
  //             height: 30,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             marginTop: 8,
  //             borderRadius: 8,
  //           }}>
  //           <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
  //             Huỷ
  //           </AppText>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  const renderItem = ({item}) => {
    return (
      <ItemOrder
        item={item}
        onPress={() =>
          navigation.navigate('OrderDetail', {orderId: item.orderId})
        }
      />
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('historyOrder')} />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={{flex: 1}}>
        <FlatList
          data={dataOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default HistoryOrder;
