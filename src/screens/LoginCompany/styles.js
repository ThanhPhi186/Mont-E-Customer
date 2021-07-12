import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_40} from '../../styles/Typography';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  txtTile: {
    color: Colors.WHITE,
    fontSize: FONT_SIZE_40,
    fontWeight: 'bold',
    marginBottom: Mixin.moderateSize(20),
  },
  txtInput: {
    width: '100%',
    height: Mixin.moderateSize(40),
    marginBottom: Mixin.moderateSize(8),
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 8,
  },
  btn: {
    width: '100%',
    height: Mixin.moderateSize(40),
    backgroundColor: Colors.BUTTON_HIGTH,
    justifyContent: 'center',
    borderRadius: 8,
  },
};

export default styles;
