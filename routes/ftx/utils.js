import fetch from 'node-fetch';
import {createSign, isNotEmptyObject} from '../../utils.js';

export const ftxQuery = async (url, {apiSecret, apikey, sub, method, body}) => {
  const timestamp = Date.now().toString().slice(0, -3) + '000';
  const bodyString = isNotEmptyObject(body) ? JSON.stringify(body) : undefined;
  const payload = `${timestamp}${method.toUpperCase()}${url}${bodyString || ''}`;
  const signature = createSign(apiSecret, payload);
  const header = {
    'Host': 'ftx.com',
    'Content-Type': 'application/json',
    'FTX-KEY': apikey,
    'FTX-TS': timestamp,
    'FTX-SIGN': signature,
  };

  if (sub) header['FTX-SUBACCOUNT'] = encodeURI(sub);

  console.log(`
    ${url}
    apikey: ${apikey}
    apiSecret: ${apiSecret}
    payload: ${payload}
  `);
  console.log(header);

  const res = await fetch(`https://ftx.com${url}`, {
    method,
    header,
    body: bodyString,
  });

  return await res.json();
}