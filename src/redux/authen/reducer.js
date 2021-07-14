import {createReducer} from '@reduxjs/toolkit';
import * as Actions from './action';

const initialState = {
  domain: '',
  userAuthen: {
    // accessToken: null,
    // refreshToken: null,
    // id: null,
  },
  location: null,
  errorMessage: '',
  loading: false,
  type: '',
  accountUser: null,
  cookies: '',
};

const overallReducer = createReducer(initialState, {
  //getDomain
  [Actions.getDomain.request]: (state, action) => {
    state.errorMessage = '';
    state.type = action.type;
  },
  [Actions.getDomain.success]: (state, action) => {
    state.domain = `https://${action.payload}/customer-apis/control`;
    // state.domain = `https://${action.payload}/mobileservices/control`;
    state.errorMessage = '';
    state.type = action.type;
  },
  [Actions.getDomain.failed]: (state, action) => {
    state.errorMessage = action.payload;
    state.type = action.type;
  },

  //login
  [Actions.loginSuccess]: (state, action) => {
    state.loading = false;
    state.userAuthen = action.payload;
  },

  [Actions.getProfile.success]: (state, action) => {
    state.errorMessage = '';
    state.userAuthen = action.payload;
  },

  [Actions.setCookies]: (state, action) => {
    state.loading = false;
    state.cookies = action.payload;
  },

  //logout
  [Actions.logout.success]: (state, action) => {
    state.userAuthen = initialState;
    state.accountUser = null;
  },

  // reset Company
  [Actions.resetCompany]: (state, action) => {
    state.domain = '';
    state.type = '';
  },
});

export default overallReducer;
