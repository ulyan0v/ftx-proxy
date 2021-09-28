import Router from '@koa/router';
import {startBrowser} from './browser.js';

const router = Router({
  prefix: '/tron'
});

router.all('/test', async (ctx) => {
  ctx.body = await startBrowser();
});

export default router;