import fetch from 'node-fetch';
import {createSha256Sign} from '../../utils/crypto.js';
import {isNotEmptyObject} from '../../utils/other.js';

export const ftxQuery = async (url, {reqHeader, method, body}) => {
  const apikey = reqHeader['api-key'];
  const apiSecret = reqHeader['api-secret'];
  const sub = reqHeader['sub'];

  const bodyString = isNotEmptyObject(body)
    ? JSON.stringify(body).replace('/', '\\/')
    : undefined;

  const timestamp = Date.now();
  const payload = `${timestamp}${method.toUpperCase()}${url}${bodyString || ''}`;
  const signature = createSha256Sign(apiSecret, payload);
  const headers = {
    // 'Host': 'ftx.com',
    'Content-Type': 'application/json',
    'FTX-KEY': apikey,
    'FTX-TS': timestamp.toString(),
    'FTX-SIGN': signature,
  };
  console.log(payload);
  if (sub) headers['FTX-SUBACCOUNT'] = encodeURI(sub);

  const res = await fetch(`https://ftx.com${url}`, {
    method,
    headers,
    body: bodyString,
  });

  return await res.json();
}