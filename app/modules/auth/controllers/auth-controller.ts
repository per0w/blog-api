import pick from 'lodash/pick';
import Koa from 'koa';

import { User } from 'app/modules/users';
import jwtService from 'app/services/jwt-service';
import { UserService } from 'app/modules/users/services';

export default {
    async signUp(ctx: Koa.Context) {
        const userData = pick(ctx.request.body, User.createFields);
        const { _id } = await UserService.createUser(userData);
        const user = await UserService.getUserWithPublicFiels({ _id });

        ctx.status = 201;
        ctx.body = { data: user };
    },
    async signIn(ctx: Koa.Context) {
        const { email, password } = ctx.request.body;

        if (!email || !password) {
            ctx.throw(400, { message: 'Invalid data' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            ctx.throw(400, { message: 'User not found' });
        }
        if (!user.comparePassword(password)) {
            ctx.throw(400, {
                message: `${user.email} has entered the wrong password`,
            });
        }

        const token = await jwtService.genToken({ email });

        ctx.body = { data: token };
    },
    async currentUser(ctx: Koa.Context) {
        const {
            state: {
                user: { _id },
            },
        } = ctx;
        const user = await UserService.getUserWithPublicFiels({ _id });

        ctx.body = { data: user };
    },
};
