import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Const, trans} from '../../utils';
import styles from './styles';
import AppDropDown from '../../components/molecules/Dropdown';
import {AppDialog} from '../../components/molecules';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppLoading, FormInput} from '../../components/atoms';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {post} from '../../services/ServiceHandle';

const Register = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);

  const [modalGender, setModalGender] = useState(false);
  const [gender, setGender] = useState('M');
  const [items, setItems] = useState([
    {label: trans('male'), value: 'M'},
    {label: trans('female'), value: 'F'},
  ]);
  const [customerName, setCustomerName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassWord] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [modalError, setModalError] = useState(false);

  const [note, setNote] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState(moment().format('DD-MM-YYYY'));

  const [loading, setLoading] = useState(false);

  const handelCheckValue = () => {
    if (!userName) {
      setErrMessage('Tên đăng nhập không được để trống');
      return true;
    }
    if (!password) {
      setErrMessage('Mật khẩu không được để trống');
      return true;
    }
    if (password.length < 6) {
      setErrMessage('Mật khẩu không được nhỏ hơn 6 kí tự');
      return true;
    }
    if (!phoneNumber) {
      setErrMessage(trans('phoneNumberNotEmpty'));
      return true;
    }
    if (phoneNumber.length < 9) {
      setErrMessage(trans('phoneNumberNotCorrect'));
      return true;
    }
    return false;
  };

  const createCustomer = () => {
    if (handelCheckValue()) {
      setModalError(true);
      return;
    }
    setLoading(true);
    // const params = {
    //   customerName,
    //   gender,
    //   officeSiteName: storeName,
    //   phone: phoneNumber,
    //   address: address.formatted_address,
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   routeId: rule,
    //   birthDay: new Date(moment(dateOfBirth, 'DD/MM/YYYY').unix() * 1000),
    //   startDate: new Date(moment(startDate, 'DD/MM/YYYY').unix() * 1000),
    //   note,
    //   productStoreId: channel,
    //   districtGeoId: addressDetail[0].long_name,
    //   stateProvinceGeoId: addressDetail[1].long_name,
    //   countryGeoId: addressDetail[2].long_name,
    // };
    post(BaseUrl + Const.API.RegisterCustomerAccount).then(res => {
      if (res.ok) {
      } else {
      }
    });
  };

  return (
    <View style={styles.container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('register')} />
        <Appbar.Action icon="telegram" onPress={createCustomer} />
      </Appbar.Header>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}>
        <FormInput
          isRequired
          title="Tên đăng nhập"
          placeholder="Tên đăng nhập"
          value={userName}
          onChangeText={setUserName}
        />
        <FormInput
          isRequired
          title={trans('password')}
          placeholder={trans('password')}
          value={password}
          onChangeText={setPassWord}
        />
        <FormInput
          isRequired
          title={trans('ReEnterPassword')}
          placeholder={trans('ReEnterPassword')}
          value={password}
          onChangeText={setPassWord}
        />
        <FormInput
          title={trans('firstAndLastName')}
          placeholder={trans('firstAndLastName')}
          value={customerName}
          onChangeText={setCustomerName}
        />
        <FormInput
          title={trans('dateOfBirth')}
          type="selectDate"
          valueSelect={dateOfBirth}
          setValueDate={date =>
            setDateOfBirth(moment(date).format('DD/MM/YYYY'))
          }
        />
        <AppDropDown
          title={trans('gender')}
          open={modalGender}
          setOpen={setModalGender}
          items={items}
          setItems={setItems}
          value={gender}
          setValue={setGender}
          listMode="SCROLLVIEW"
        />

        <FormInput
          title={trans('phoneNumber')}
          isRequired
          placeholder={trans('phoneNumber')}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
        />
        <AppDialog
          content={errMessage}
          isVisible={modalError}
          onPressClose={() => setModalError(false)}
          value={note}
          onChangeText={setNote}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

// Exports
export default Register;
