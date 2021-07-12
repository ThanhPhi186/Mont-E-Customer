import React, {useState} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {AppText} from '../../components/atoms';
import AppIntroSlider from 'react-native-app-intro-slider';
import {images} from '../../assets';
import {Colors} from '../../styles';
import FastImage from 'react-native-fast-image';

const IntroScreen = ({navigation}) => {
  const data = [
    {
      key: 'one',
      title: 'Nền tảng phát triển cho nhà phân phối',
      text: 'Chưa bao giờ dễ dàng đến thế',
      image: images.logoWhite,
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Lên đơn nhanh chóng',
      text: 'Giá cả hấp dẫn',
      image: images.intro2,
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Hãy đến với chúng tôi',
      text: 'Bạn đã sẵn sàng trải nhiệm',
      image: images.intro4,
    },
  ];

  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View style={[styles.slide]}>
        <View style={{flex: 2, justifyContent: 'center', width: '80%'}}>
          <Text style={styles.title}>{item.title.toUpperCase()}</Text>
        </View>
        <View style={{flex: 2}}>
          <FastImage
            resizeMode="contain"
            source={item.image}
            style={styles.image}
          />
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };
  const onDone = () => {
    // setShowRealApp(true);
    navigation.navigate('LoginCompanyScreen');
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={item => item.title}
        renderItem={renderItem}
        data={data}
        onDone={onDone}
        showSkipButton
        onSkip={() => navigation.navigate('LoginCompanyScreen')}
      />
    </View>
  );
};
const styles = {
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: 240,
    height: 240,
    marginVertical: 32,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};
export default IntroScreen;
