import {ftxQuery} from './utils.js';

export const getBalance = ({apikey, apiSecret}) => {
  return ftxQuery('/api/wallet/balances', {
    method: 'GET', apikey, apiSecret
  });
}

export const createOrder = ({apikey, apiSecret, body}) => {
  return ftxQuery('/api/orders', {
    method: 'POST', body, apikey, apiSecret
  });
}

export const openOrders = ({apikey, apiSecret, market}) => {
  return ftxQuery(`/api/orders?market=${market}`, {
    method: 'GET', apikey, apiSecret
  });
}

export const ordersHistory = ({apikey, apiSecret, market}) => {
  return ftxQuery(`/api/orders/history?market=${market}`, {
    method: 'GET', apikey, apiSecret
  });
}

export const cancelOrder = ({apikey, apiSecret, id}) => {
  return ftxQuery(`/api/orders/${id}`, {
    method: 'DELETE', apiSecret, apikey
  });
}