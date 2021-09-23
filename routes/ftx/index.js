import Router from '@koa/router';
import {getBalance, createOrder, cancelOrder, ordersHistory, openOrders} from './queries.js';
import {isNotEmptyObject} from '../../utils.js';

const router = Router({
  prefix: '/ftx'
});

router.all('/balance', async (ctx) => {
  ctx.body = await getBalance({
    headers: ctx.request.header
  });
});

router.all('/createorder', async (ctx) => {
  ctx.body = await createOrder({
    body: isNotEmptyObject(ctx.request.body) ? ctx.request.body : ctx.request.query,
    headers: ctx.request.header
  });
});

router.all('/cancelorder', async (ctx) => {
  ctx.body = await cancelOrder({
    id: ctx.request.query?.order_id || ctx.request.body?.order_id,
    headers: ctx.request.header
  });
});

router.all('/ordershistory', async (ctx) => {
  ctx.body = await ordersHistory({
    market: ctx.request.query?.market || ctx.request.body?.market,
    headers: ctx.request.header
  });
});

router.all('/openorders', async (ctx) => {
  ctx.body = await openOrders({
    market: ctx.request.query?.market || ctx.request.body?.market,
    headers: ctx.request.header
  });
});

export default router;