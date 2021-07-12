import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../components/atoms';

import {trans} from '../../utils';
import styles from './styles';

import {Colors} from '../../styles';
import {StoreRedux} from '../../redux';
import {container} from '../../styles/GlobalStyles';

const ChangeStore = ({navigation}) => {
  const listStore = useSelector(state => state.StoreReducer.listStore);
  const store = useSelector(state => state.StoreReducer.store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StoreRedux.Actions.getListStore.request());
  }, [dispatch]);

  const onChangeStore = item => {
    // RNBootSplash.show();
    dispatch(StoreRedux.Actions.changeStore(item.productStoreId));
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
    // setTimeout(() => {
    //   RNBootSplash.hide();
    // }, 1000);
  };

  const renderItem = elm => {
    return (
      <TouchableOpacity
        disabled={store === elm.productStoreId}
        style={
          store === elm.productStoreId
            ? {...styles.btn, backgroundColor: Colors.PRIMARY}
            : styles.btn
        }
        onPress={() => onChangeStore(elm)}>
        <AppText
          style={
            store === elm.productStoreId
              ? {...styles.storeName, color: Colors.WHITE}
              : styles.storeName
          }>
          {elm.storeName}
        </AppText>
        <AppText
          style={
            store === elm.productStoreId
              ? {...styles.storeCode, color: Colors.WHITE}
              : styles.storeCode
          }>
          {elm.productStoreId}
        </AppText>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('notStore')}</AppText>;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.Content title={trans('changeStore')} />
      </Appbar.Header>

      <FlatList
        data={listStore}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{paddingHorizontal: 16}}
      />
    </View>
  );
};
export default ChangeStore;
