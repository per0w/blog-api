import Koa from 'koa';

import connectrosInit from './connectors';
import initHandlers from './hadlers';
import modules from './modules';
import AppError from './helpers/appError';

connectrosInit();
global.AppError = AppError;

const app = new Koa();

initHandlers(app);
app.use(modules);

app.use(async (ctx: Koa.Context) => {
    ctx.body = '<h1>Hello World!</h1>';
});

app.on('error', console.error);

export default app;
