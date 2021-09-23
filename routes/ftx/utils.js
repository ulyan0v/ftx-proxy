import fetch from 'node-fetch';
import {createSign, isNotEmptyObject} from '../../utils.js';

export const ftxQuery = async (url, {headers, method, body}) => {
  const apikey = headers['api-key'];
  const apiSecret = headers['api-secret'];
  const sub = headers['sub'];

  const timestamp = Date.now();
  const bodyString = isNotEmptyObject(body) ? JSON.stringify(body) : undefined;
  const signature = createSign(apiSecret, `${timestamp}${method.toUpperCase()}${url}${bodyString || ''}`);
  const header = {
    'FTX-KEY': apikey,
    'FTX-TS': timestamp.toString(),
    'FTX-SIGN': signature,
  };

  if (sub) header['FTX-SUBACCOUNT'] = sub;

  const res = await fetch(`https://ftx.com${url}`, {
    method,
    header,
    body: bodyString,
  });

  return await res.json();
}