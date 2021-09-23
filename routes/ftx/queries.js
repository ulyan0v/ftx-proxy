import {ftxQuery} from './utils.js';

export const getBalance = ({headers}) => {
  return ftxQuery('/api/wallet/balances', {
    method: 'GET', headers
  });
}

export const createOrder = ({headers, body}) => {
  return ftxQuery('/api/orders', {
    method: 'POST', body, headers
  });
}

export const openOrders = ({headers, market}) => {
  return ftxQuery(`/api/orders?market=${market}`, {
    method: 'GET', headers
  });
}

export const ordersHistory = ({headers, market}) => {
  return ftxQuery(`/api/orders/history?market=${market}`, {
    method: 'GET', headers
  });
}

export const cancelOrder = ({headers, id}) => {
  return ftxQuery(`/api/orders/${id}`, {
    method: 'DELETE', headers
  });
}