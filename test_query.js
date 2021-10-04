import fetch from 'node-fetch';
import {sha256} from 'js-sha256';

// const DEFAULT_URL = 'http://localhost:3000';
const DEFAULT_URL = 'https://ftx.com';

const API_KEY = '9Qk5KVzSYm-gTGuPk_cKKneq44xCC6D4Lw8mZhBz';
const API_SECRET = 'p9b8zNHeN2HcMse8qwFmidTliwHdr--iypWCyxcM';

const method = 'GET';
const path = `/api/orders/history?market=BTC/USDT`;

const ts = Date.now();
const payload = `${ts}${method.toUpperCase()}${path}`;
const signature = sha256.hmac(encodeURI(API_SECRET), encodeURI(payload));
const headers = {
  'FTX-KEY': API_KEY,
  'FTX-TS': ts.toString(),
  'FTX-SIGN': signature
};

const res2 = await fetch(`${DEFAULT_URL}${path}`, {
  method: 'get',
  headers
});

// console.log(res2);

const test = await res2.json();

console.log(test);