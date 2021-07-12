import {put, call, takeEvery, select} from 'redux-saga/effects';
import {get, post} from '../../services/ServiceHandle';
import {Const, trans} from '../../utils';
import {getDomain, getProfile, logout} from './action';

const getBaseUrl = state => state.AuthenOverallReducer.domain;

function* getProfileAsync(action) {
  try {
    const url = Const.API.baseURL + Const.API.CheckAuth;
    const response = yield call(get, url);
    if (response.ok) {
      yield put(getProfile.success(response.data.data));
    } else {
      yield put(getProfile.failed(response.error));
    }
  } catch (error) {
    yield put(getProfile.failed(error));
  }
}

function* getDomainAsync(action) {
  try {
    const url = Const.API.GetDomain;
    const response = yield call(get, url, action.payload);
    if (response.data.domain !== null) {
      yield put(getDomain.success(response.data.domain));
    } else {
      yield put(getDomain.failed(trans('companyCodeIncorrect')));
    }
  } catch (error) {
    // yield put(login.failed(error));
  }
}

function* logoutAsync(action) {
  try {
    const baseURL = yield select(getBaseUrl);

    const url = baseURL + Const.API.Logout;
    const response = yield call(post, url);
    if (response.ok) {
      yield put(logout.success(response.data));
    } else {
      yield put(logout.failed(response.error));
    }
  } catch (error) {
    yield put(logout.failed(error));
  }
}

export function* AuthenOverallWatcher() {
  [yield takeEvery(getProfile.requestName, getProfileAsync)];
  [yield takeEvery(getDomain.requestName, getDomainAsync)];
  [yield takeEvery(logout.requestName, logoutAsync)];
}
