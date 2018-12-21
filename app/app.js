import Koa from 'koa';
import connectrosInit from './connectors';
import initHandlers from './hadlers';
import modules from './modules';

connectrosInit();

const app = new Koa();

initHandlers(app);
app.use(modules);

app.use(async (ctx) =>{
    ctx.body = '<h1>Hello World!</h1>';
});

export default app;

