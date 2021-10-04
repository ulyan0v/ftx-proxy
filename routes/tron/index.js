import Router from '@koa/router';
import {createTronWallet} from './utils.js';
import {logInFile} from '../../utils/logger.js';

const router = Router({
  prefix: '/tron'
});

router.all('/wallet', async (ctx) => {
  try {
    const data = await createTronWallet();
    const currentTime = new Date().toLocaleTimeString();
    const logData = JSON.stringify(data);

    logInFile('tron', `${currentTime} ${logData}`);

    ctx.body = data;
  } catch (error) {
    ctx.status = 500;
  }
});

export default router;