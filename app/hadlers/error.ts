import Koa from 'koa';

import { AppError } from 'app/helpers/types';

export default () => async (ctx: Koa.Context, next: Function) => {
    try {
        await next();
    } catch ({ status = 500, message = 'Server Error', name, errors }) {
        const ex: AppError = errors;
        if (name === 'ValidationError') {
            ctx.status = 400;
            ctx.body = {
                errors: Object.values(ex).reduce(
                    (err, error) => ({
                        ...err,
                        [error.path]: error.message,
                    }),
                    {},
                ),
            };
        } else {
            ctx.status = status;
            ctx.body = { status, message };
        }
    }
};
