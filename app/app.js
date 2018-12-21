import Koa from 'koa';
import connectrosInit from './connectors';

connectrosInit();

const app = new Koa();

app.use(async (ctx) =>{
    ctx.body = '<h1>Hello World!</h1>';
});

export default app;
