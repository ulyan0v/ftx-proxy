import {ftxQuery} from './utils.js';

export const getBalance = ({reqHeader}) => {
  return ftxQuery('/api/wallet/balances', {
    method: 'GET', reqHeader
  });
}

export const createOrder = ({reqHeader, body}) => {
  return ftxQuery('/api/orders', {
    method: 'POST', body, reqHeader
  });
}

export const openOrders = ({reqHeader, market}) => {
  return ftxQuery(`/api/orders?market=${market}`, {
    method: 'GET', reqHeader
  });
}

export const ordersHistory = ({reqHeader, market}) => {
  return ftxQuery(`/api/orders/history?market=${market}`, {
    method: 'GET', reqHeader
  });
}

export const cancelOrder = ({reqHeader, id}) => {
  return ftxQuery(`/api/orders/${id}`, {
    method: 'DELETE', reqHeader
  });
}