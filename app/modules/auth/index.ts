import Router from 'koa-router';

import authController from './controllers/auth-controller';
import checkUser from '../../hadlers/checkUser';

const router = new Router({ prefix: '/auth' });

router
    .post('/signup', authController.signUp)
    .post('/signin', authController.signIn)
    .get('/user', checkUser(), authController.currentUser);

export default router.routes();
