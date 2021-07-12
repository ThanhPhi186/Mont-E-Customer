import {Colors} from '../../../styles';
import {device_width} from '../../../styles/Mixin';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  locationArea: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  vitien: {
    width: device_width,
    flexDirection: 'row',
  },
  btnOrdered: {
    width: '44%',
    marginBottom: 0,
  },
  showPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 3,
  },
  textPay: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
  containerOrder: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  viewPayment: {
    padding: 12,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  btnCancel: {
    width: '44%',
    marginBottom: 0,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
};
export default styles;
