import Koa from 'koa';

import jwtService from '../services/jwt-service';
import { User } from '../modules/users';

export default () => async (ctx: Koa.Context, next: Function) => {
    const { authorization } = ctx.headers;

    if (authorization) {
        try {
            const { email }: any = await jwtService.verify(authorization);

            ctx.state.user = await User.findOne({ email });
        } catch (e) {
            ctx.throw(401, { message: 'Unauthorized. Invalid Token' });
        }
    }

    await next();
};
