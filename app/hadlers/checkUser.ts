import Koa from 'koa';

export default () => async (ctx: Koa.Context, next: Function) => {
    if (!ctx.state.user) {
        ctx.throw(403, { message: 'Forbidden' });
    }

    await next();
};
