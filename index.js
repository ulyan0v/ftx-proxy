import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';
import ftxRouter from './routes/ftx/index.js';

dotenv.config();
const app = new Koa();
const port = parseInt(process.env.PORT);

if (!port)
  throw new Error('Port not found. Check .env file');

app.use(koaBody({
  multipart: true,
  urlencoded: true
}));

app.use(ftxRouter.routes());
app.use(ftxRouter.allowedMethods());

app.listen(port, () => {
  console.log('Server has been started');
});