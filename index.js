import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';
import ftxRouter from './routes/ftx/index.js';
import tronRouter from './routes/tron/index.js';

dotenv.config();
const app = new Koa();
const port = parseInt(process.env.PORT) || 8080;

app.use(koaBody({
  multipart: true,
  urlencoded: true
}));

app.use(ftxRouter.routes());
app.use(tronRouter.routes());

app.use(ftxRouter.allowedMethods());
app.use(tronRouter.allowedMethods());

app.use(async (ctx, next) => {
  await next();
  console.log('request: ' + JSON.stringify(ctx.request, null, 2));
  console.log('response: ' + JSON.stringify(ctx.response, null, 2));
});

app.listen(port, () => {
  console.log('Server has been started');
});