import {sha256} from 'js-sha256';

export const createSha256Sign = (key, message) => {
  return sha256.hmac(key, message);
}