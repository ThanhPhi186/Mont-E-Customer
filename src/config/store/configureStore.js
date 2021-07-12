import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducer';
import sagas from './rootSagas';
import AsyncStorage from '@react-native-community/async-storage';
import {setCookies} from '../../services/ServiceHandle';
import moment from 'moment';

import {AuthenOverallRedux} from '../../redux';
import SimpleToast from 'react-native-simple-toast';

const config = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  blacklist: [],
  debug: true,
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

const checkCookiesExpirationMiddleware = store => next => action => {
  const stateData = store.getState();
  console.log('checkCookiesExpirationMiddleware', stateData);
  // if (action.type === AuthenOverallRedux.Actions.LOGIN_SUCCESS) {
  //   setToken(action.payload.access_token);
  // }
  if (stateData.AuthenOverallReducer.cookies) {
    if (
      moment(stateData.AuthenOverallReducer.cookies.route.expires).unix() <
      moment.now() / 1000
    ) {
      console.log(
        'aaaa',
        stateData?.AuthenOverallReducer?.cookies?.route?.expires,
      );
      SimpleToast.show('Phiên đăng nhập hết hạn');
    } else {
      console.log('bbbb');
    }
  }
  next(action);
};

middleware.push(sagaMiddleware, checkCookiesExpirationMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}
const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];

const persistConfig = {enhancers};

const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  const stateData = store.getState();

  if (stateData.AuthenOverallReducer.cookies) {
    setCookies(stateData.AuthenOverallReducer.cookies.JSESSIONID.value);
  }
});

const configureStore = () => {
  return {persistor, store};
};
sagaMiddleware.run(sagas);
export default configureStore;
