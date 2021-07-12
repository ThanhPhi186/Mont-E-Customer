import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isIphoneX} from '../../helpers/iphoneXHelper';
import {
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../styles/GlobalStyles';

const CustomButtonTab = (props, children) => {
  const {onPress} = props;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <View style={styles.circleInside}>
        <IconMaterialCommunityIcons
          name="qrcode-scan"
          size={40}
          color={Colors.WHITE}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = {
  container: {
    top: isIphoneX()
      ? -(NAVIGATION_BOTTOM_TABS_HEIGHT / 2 + 5)
      : -(NAVIGATION_BOTTOM_TABS_HEIGHT / 2 + 25),
  },
  circleInside: {
    width: HEIGHT_MIDDLE_HOME_BTN,
    height: HEIGHT_MIDDLE_HOME_BTN,
    borderRadius: HEIGHT_MIDDLE_HOME_BTN / 2,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export default CustomButtonTab;
