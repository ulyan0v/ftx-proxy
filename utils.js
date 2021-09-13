import {sha256} from 'js-sha256';

export const createSign = (key, message) => {
  return sha256.hmac(encodeURI(key), encodeURI(message));
}

export const isNotEmptyObject = obj => {
  return Boolean(Object.keys(obj || {}).length);
}