import {Const} from '../utils';
import {create} from 'apisauce';
import qs from 'querystring';

const api = create({
  baseURL: Const.API.baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
// }

const returnData = respone => {
  console.log('response =====>', respone);
  if (respone.status === Const.RESPONSE_CODES.SUCCESS.SUCCESS) {
    return {
      data: respone.data,
      headers: respone.headers,
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: respone.data.message,
    };
  }
};

const setCookies = cookies => {
  api.setHeader('Cookie', `JSESSIONID=${cookies}`);
};

const get = async (url, params) => {
  const respone = await api.get(url, params);
  return returnData(respone);
};
const post = async (url, payload) => {
  const respone = await api.post(url, qs.stringify(payload));
  return returnData(respone);
};
const put = async (url, payload) => {
  const respone = await api.put(url, payload);
  return returnData(respone);
};
const deleteApi = async (url, payload) => {
  const respone = await api.delete(url, payload);
  return returnData(respone);
};

export {get, post, put, deleteApi, setCookies};
