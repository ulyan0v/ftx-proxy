import Router from '@koa/router';
import {getBalance, createOrder, cancelOrder, ordersHistory, openOrders} from './queries.js';
import {isNotEmptyObject} from '../../utils.js';

const router = Router({
  prefix: '/ftx'
});

router.all('/balance', async (ctx) => {
  const apikey = ctx.request.header['api-key'];
  const apiSecret = ctx.request.header['api-secret'];

  ctx.body = await getBalance({
    apiSecret, apikey
  });
});

router.all('/createorder', async (ctx) => {
  const apikey = ctx.request.header['api-key'];
  const apiSecret = ctx.request.header['api-secret'];

  ctx.body = await createOrder({
    body: isNotEmptyObject(ctx.request.body) ? ctx.request.body : ctx.request.query,
    apiSecret, apikey
  });
});

router.all('/cancelorder', async (ctx) => {
  const apikey = ctx.request.header['api-key'];
  const apiSecret = ctx.request.header['api-secret'];

  ctx.body = await cancelOrder({
    id: ctx.request.query?.order_id || ctx.request.body?.order_id,
    apiSecret, apikey
  });
});

router.all('/ordershistory', async (ctx) => {
  const apikey = ctx.request.header['api-key'];
  const apiSecret = ctx.request.header['api-secret'];

  ctx.body = await ordersHistory({
    market: ctx.request.query?.market || ctx.request.body?.market,
    apiSecret, apikey
  });
});

router.all('/openorders', async (ctx) => {
  const apikey = ctx.request.header['api-key'];
  const apiSecret = ctx.request.header['api-secret'];

  ctx.body = await openOrders({
    market: ctx.request.query?.market || ctx.request.body?.market,
    apiSecret, apikey
  });
});

export default router;