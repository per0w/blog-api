import Router from 'koa-router';

import auth from './auth';
import articles from './articles';
import users from './users';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(users);
router.use(articles);

export default router.routes();
