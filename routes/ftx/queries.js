import {ftxQuery} from './utils.js';

export const getBalance = ({apiSecret, apikey, sub}) => {
  return ftxQuery('/api/wallet/balances', {
    method: 'GET', apiSecret, apikey, sub
  });
}

export const createOrder = ({apiSecret, apikey, sub, body}) => {
  return ftxQuery('/api/orders', {
    method: 'POST', body, apiSecret, apikey, sub
  });
}

export const openOrders = ({apiSecret, apikey, sub, market}) => {
  return ftxQuery(`/api/orders?market=${market}`, {
    method: 'GET', apiSecret, apikey, sub
  });
}

export const ordersHistory = ({apiSecret, apikey, sub, market}) => {
  return ftxQuery(`/api/orders/history?market=${market}`, {
    method: 'GET', apiSecret, apikey, sub
  });
}

export const cancelOrder = ({apiSecret, apikey, sub, id}) => {
  return ftxQuery(`/api/orders/${id}`, {
    method: 'DELETE', apiSecret, apikey, sub
  });
}