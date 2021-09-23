import fetch from 'node-fetch';
import {createSign, isNotEmptyObject} from '../../utils.js';

export const ftxQuery = async (url, {reqHeader, method, body}) => {
  const apikey = reqHeader['api-key'];
  const apiSecret = reqHeader['api-secret'];
  const sub = reqHeader['sub'];

  const timestamp = Date.now();
  const bodyString = isNotEmptyObject(body) ? JSON.stringify(body) : undefined;
  const payload = `${timestamp}${method.toUpperCase()}${url}${bodyString || ''}`;
  const signature = createSign(apiSecret, payload);
  const headers = {
    // 'Host': 'ftx.com',
    // 'Content-Type': 'application/json',
    'FTX-KEY': apikey,
    'FTX-TS': timestamp.toString(),
    'FTX-SIGN': signature,
  };

  if (sub) headers['FTX-SUBACCOUNT'] = encodeURI(sub);

  const res = await fetch(`https://ftx.com${url}`, {
    method,
    headers,
    body: bodyString,
  });

  return await res.json();
}