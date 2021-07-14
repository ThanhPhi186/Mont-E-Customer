import {device_height} from '../../styles/Mixin';
import {FONT_SIZE_16, LINE_HEIGHT} from '../../styles/Typography';

const {Colors, Mixin} = require('../../styles');

const styles = {
  containerHeader: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    borderBottomLeftRadius: Mixin.moderateSize(40),
    borderBottomRightRadius: Mixin.moderateSize(40),
    paddingHorizontal: 20,
    paddingTop: Mixin.moderateSize(60),
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
  },
  icClose: {
    width: 22,
    aspectRatio: 1 / 1,
  },

  txtHello: {
    color: Colors.WHITE,
  },
  txtName: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  viewProduct: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEDC8F',
  },
  txtProduct: {
    textAlign: 'center',
    marginTop: 8,
  },
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.LIGHT_GREY,
  },

  btn: {
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: Mixin.moderateSize(60),
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(16),
    borderRadius: Mixin.moderateSize(12),
  },
  storeName: {
    fontWeight: 'bold',
    lineHeight: LINE_HEIGHT,
  },
  storeCode: {
    fontStyle: 'italic',
    lineHeight: LINE_HEIGHT,
  },
  btnActive: {
    height: Mixin.moderateSize(50),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(8),
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
  containerListStore: {
    minHeight: device_height / 4,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export default styles;
